import type { Metadata } from "next";
import { writeClient } from "@/sanity/lib/client";
import AutoRefresh from "./AutoRefresh";

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

function formatUGX(amount: number) {
  return `UGX ${amount.toLocaleString()}`;
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
              <section
                key={order._id}
                className="rounded-3xl border border-[#E2DDD2] bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-3 border-b border-[#EEE7DB] pb-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">{order.customerName}</h2>
                    <p className="mt-1 text-sm text-[#5B544D]">{order.phone}</p>
                    <p className="mt-1 text-sm text-[#8B7F74]">
                      {new Date(order.submittedAt).toLocaleString("en-UG", {
                        dateStyle: "medium",
                        timeStyle: "short",
                        timeZone: "Africa/Kampala",
                      })}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#F3F0E8] px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#8B7F74]">
                      Total
                    </p>
                    <p className="mt-1 text-xl font-semibold text-[#6E7A3C]">
                      {formatUGX(order.total)}
                    </p>
                    <p className="mt-1 text-xs text-[#5B544D]">
                      Status: {order.status || "new"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-y-2">
                    <thead>
                      <tr className="text-left text-xs uppercase tracking-[0.18em] text-[#8B7F74]">
                        <th className="pb-2 pr-4">Meal</th>
                        <th className="pb-2 pr-4">Qty</th>
                        <th className="pb-2 pr-4">Unit</th>
                        <th className="pb-2 pr-4">Total</th>
                        <th className="pb-2">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => (
                        <tr key={item._key} className="align-top text-sm text-[#2E2A26]">
                          <td className="rounded-l-2xl bg-[#FCFBF8] px-4 py-3 font-medium">
                            <div>{item.mealName}</div>
                            {item.category && (
                              <div className="mt-1 text-xs text-[#8B7F74]">{item.category}</div>
                            )}
                          </td>
                          <td className="bg-[#FCFBF8] px-4 py-3">{item.quantity}</td>
                          <td className="bg-[#FCFBF8] px-4 py-3">
                            {formatUGX(item.unitPrice)}
                          </td>
                          <td className="bg-[#FCFBF8] px-4 py-3">
                            {formatUGX(item.lineTotal)}
                          </td>
                          <td className="rounded-r-2xl bg-[#FCFBF8] px-4 py-3 text-[#5B544D]">
                            {item.notes || "No extra notes"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-5 rounded-2xl bg-[#F8F5EE] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8B7F74]">
                    Saved WhatsApp Message
                  </p>
                  <pre className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[#5B544D]">
                    {order.whatsAppMessage}
                  </pre>
                </div>
              </section>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
