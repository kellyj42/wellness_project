"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import DeleteOrderButton from "./DeleteOrderButton";

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

interface OrderCardProps {
  order: OrderRecord;
  token: string;
}

export default function OrderCard({ order, token }: OrderCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="rounded-3xl border border-[#E2DDD2] bg-white p-6 shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <div className="min-w-0">
          <h2 className="truncate text-2xl font-semibold text-[#2E2A26]">
            {order.customerName}
          </h2>
        </div>
        <ChevronRight
          className={`h-5 w-5 shrink-0 text-[#6E7A3C] transition-transform ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="mt-5 border-t border-[#EEE7DB] pt-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm text-[#5B544D]">{order.phone}</p>
              <p className="mt-1 text-sm text-[#8B7F74]">
                {new Date(order.submittedAt).toLocaleString("en-UG", {
                  dateStyle: "medium",
                  timeStyle: "short",
                  timeZone: "Africa/Kampala",
                })}
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
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
              <DeleteOrderButton orderId={order._id} token={token} />
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
        </div>
      )}
    </section>
  );
}
