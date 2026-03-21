import type { Metadata } from "next";
import { writeClient } from "@/sanity/lib/client";
import AutoRefresh from "./AutoRefresh";
import OrderCard from "./OrderCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Orders Admin",
  robots: {
    index: false,
    follow: false,
  },
};

interface OrderRecord {
  _id: string;
  customerName: string;
  phone: string;
  submittedAt: string;
  total: number;
  currency?: string;
  status?: string;
  whatsAppMessage: string;
  items: Array<{
    _key: string;
    mealName: string;
    category?: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
    notes?: string;
  }>;
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const providedToken = typeof params.token === "string" ? params.token : "";
  const expectedToken = process.env.ADMIN_DASHBOARD_TOKEN || "";

  if (!expectedToken) {
    return (
      <main className="min-h-screen bg-[#F5F3EE] px-6 py-16 text-[#2E2A26]">
        <div className="mx-auto max-w-3xl rounded-3xl border border-[#E2DDD2] bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold">Admin token not configured</h1>
          <p className="mt-3 text-sm text-[#5B544D]">
            Set <code>ADMIN_DASHBOARD_TOKEN</code> in your environment variables to
            protect this page.
          </p>
        </div>
      </main>
    );
  }

  if (providedToken !== expectedToken) {
    return (
      <main className="min-h-screen bg-[#F5F3EE] px-6 py-16 text-[#2E2A26]">
        <div className="mx-auto max-w-3xl rounded-3xl border border-[#E2DDD2] bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold">Unauthorized</h1>
          <p className="mt-3 text-sm text-[#5B544D]">
            This page is hidden. Use the correct admin token in the URL to access it.
          </p>
        </div>
      </main>
    );
  }

  let orders: OrderRecord[] = [];
  let fetchError: string | null = null;

  try {
    orders = await writeClient.fetch<OrderRecord[]>(
      `*[_type == "orderSubmission"] | order(submittedAt desc) {
        _id,
        customerName,
        phone,
        submittedAt,
        total,
        currency,
        status,
        whatsAppMessage,
        items[]{
          _key,
          mealName,
          category,
          quantity,
          unitPrice,
          lineTotal,
          notes
        }
      }`,
    );
  } catch (error) {
    console.error("Failed to fetch admin orders:", error);
    fetchError =
      "Orders could not be loaded right now. Please check the Sanity connection and try again.";
  }

  return (
    <main className="min-h-screen bg-[#F5F3EE] px-6 py-10 text-[#2E2A26]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6E7A3C]">
            Hidden Admin
          </p>
          <h1 className="text-4xl font-light">Website Orders</h1>
          <p className="text-sm text-[#5B544D]">
            {orders.length} saved order{orders.length === 1 ? "" : "s"} from the menu
            flow.
          </p>
          <div className="pt-2">
            <AutoRefresh />
          </div>
        </div>

        <div className="space-y-6">
          {fetchError && (
            <div className="rounded-3xl border border-[#E6C9C1] bg-[#FFF5F2] p-6 shadow-sm">
              <p className="text-sm font-medium text-[#A04632]">{fetchError}</p>
            </div>
          )}
          {orders.length === 0 ? (
            <div className="rounded-3xl border border-[#E2DDD2] bg-white p-8 shadow-sm">
              <p className="text-sm text-[#5B544D]">No orders have been saved yet.</p>
            </div>
          ) : (
            orders.map((order) => (
              <OrderCard key={order._id} order={order} token={providedToken} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
