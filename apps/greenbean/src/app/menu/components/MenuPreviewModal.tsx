"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { MenuPreviewState } from "../types";

interface MenuPreviewModalProps {
  preview: MenuPreviewState | null;
  onClose: () => void;
}

export function MenuPreviewModal({ preview, onClose }: MenuPreviewModalProps) {
  return (
    <AnimatePresence>
      {preview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full bg-[#F5F3EE]">
              <Image
                src={preview.src}
                alt={preview.alt}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex items-center justify-between border-t border-[#E7E1D7] px-5 py-4">
              <p className="text-sm font-medium text-[#2E2A26]">{preview.alt}</p>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-[#D7D1C6] px-4 py-2 text-sm font-medium text-[#5B544D] transition-colors hover:border-[#A3AD5F] hover:text-[#2E2A26]"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
