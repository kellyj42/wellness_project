import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/client";

interface IncomingOrderItem {
  mealName: string;
  category?: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  notes?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const customerName = body.customerName?.trim();
    const phone = body.phone?.trim();
    const whatsAppMessage = body.whatsAppMessage?.trim();
    const total = Number(body.total);
    const items = Array.isArray(body.items) ? body.items : [];

    if (!customerName || !phone || !whatsAppMessage || !Number.isFinite(total)) {
      return NextResponse.json(
        { error: "Customer details and order summary are required." },
        { status: 400 },
      );
    }

    if (customerName.length < 2 || customerName.length > 100) {
      return NextResponse.json(
        { error: "Customer name must be between 2 and 100 characters." },
        { status: 400 },
      );
    }

    if (!/^[a-zA-Z\s'-]+$/.test(customerName)) {
      return NextResponse.json(
        { error: "Customer name can only contain letters, spaces, hyphens and apostrophes." },
        { status: 400 },
      );
    }

    const cleanPhone = phone.replace(/[\s\-()]/g, "");
    if (!/^(\+256|0)[0-9]{9}$/.test(cleanPhone)) {
      return NextResponse.json(
        { error: "Invalid phone number. Please use a valid Ugandan phone number." },
        { status: 400 },
      );
    }

    if (items.length === 0) {
      return NextResponse.json(
        { error: "At least one ordered item is required." },
        { status: 400 },
      );
    }

    const normalizedItems: IncomingOrderItem[] = items.map((item: IncomingOrderItem) => ({
      mealName: item.mealName?.trim(),
      category: item.category?.trim(),
      quantity: Number(item.quantity),
      unitPrice: Number(item.unitPrice),
      lineTotal: Number(item.lineTotal),
      notes: item.notes?.trim(),
    }));

    const hasInvalidItem = normalizedItems.some(
      (item) =>
        !item.mealName ||
        !Number.isFinite(item.quantity) ||
        item.quantity < 1 ||
        !Number.isFinite(item.unitPrice) ||
        item.unitPrice < 0 ||
        !Number.isFinite(item.lineTotal) ||
        item.lineTotal < 0,
    );

    if (hasInvalidItem) {
      return NextResponse.json(
        { error: "One or more ordered items are invalid." },
        { status: 400 },
      );
    }

    const submission = await writeClient.create({
      _type: "orderSubmission",
      customerName,
      phone,
      submittedAt: new Date().toISOString(),
      total,
      currency: "UGX",
      status: "new",
      whatsAppMessage,
      items: normalizedItems.map((item) => ({
        _key: crypto.randomUUID(),
        mealName: item.mealName,
        category: item.category,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        lineTotal: item.lineTotal,
        notes: item.notes,
      })),
      source: "website_menu",
    });

    return NextResponse.json(
      {
        success: true,
        submissionId: submission._id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating order submission:", error);

    return NextResponse.json(
      { error: "Failed to save the order. Please try again." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const adminToken = request.headers.get("x-admin-token")?.trim();
    const expectedToken = process.env.ADMIN_DASHBOARD_TOKEN || "";

    if (!expectedToken || adminToken !== expectedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orderId } = await request.json();

    if (!orderId || typeof orderId !== "string") {
      return NextResponse.json(
        { error: "A valid order id is required." },
        { status: 400 },
      );
    }

    await writeClient.delete(orderId);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting order submission:", error);

    return NextResponse.json(
      { error: "Failed to delete the order. Please try again." },
      { status: 500 },
    );
  }
}
