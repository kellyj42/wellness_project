"use client";

import { useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteOrderButtonProps {
  orderId: string;
  token: string;
}

export default function DeleteOrderButton({
  orderId,
  token,
}: DeleteOrderButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  async function handleDelete() {
    setError(null);

    try {
      const response = await fetch("/api/orders", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify({ orderId }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete order.");
      }

      setIsConfirmOpen(false);

      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete order.",
      );
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={() => setIsConfirmOpen(true)}
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-full border border-[#E7C8BE] px-4 py-2 text-sm font-medium text-[#B14F38] transition-colors hover:border-[#D06A4E] hover:bg-[#FFF5F2]"
      >
        <Trash2 className="h-4 w-4" />
        {isPending ? "Deleting..." : "Delete"}
      </button>
      {error && <p className="text-xs text-[#B14F38]">{error}</p>}

      <AnimatePresence>
        {isConfirmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1917]/55 px-4"
            onClick={() => setIsConfirmOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="w-full max-w-md rounded-[2rem] border border-[#E7DED3] bg-white p-6 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF3EF] text-[#B14F38]">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <button
                  type="button"
                  onClick={() => setIsConfirmOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5DDD2] text-[#8B7F74] transition-colors hover:border-[#D7CABC] hover:text-[#2E2A26]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-5">
                <h3 className="text-xl font-semibold text-[#2E2A26]">
                  Delete saved order?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5B544D]">
                  This order will be permanently removed from the admin records.
                  This action cannot be undone.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsConfirmOpen(false)}
                  className="inline-flex items-center justify-center rounded-full border border-[#DCD4C7] px-5 py-3 text-sm font-medium text-[#5B544D] transition-colors hover:border-[#BFB5A8] hover:text-[#2E2A26]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isPending}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B14F38] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#973D28]"
                >
                  <Trash2 className="h-4 w-4" />
                  {isPending ? "Deleting..." : "Yes, delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
