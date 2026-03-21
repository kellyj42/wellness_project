"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AutoRefreshProps {
  intervalMs?: number;
}

export default function AutoRefresh({
  intervalMs = 5000,
}: AutoRefreshProps) {
  const router = useRouter();
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    setLastUpdated(new Date());

    const interval = window.setInterval(() => {
      router.refresh();
      setLastUpdated(new Date());
    }, intervalMs);

    return () => {
      window.clearInterval(interval);
    };
  }, [intervalMs, router]);

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-[#D8D2C6] bg-white px-4 py-2 text-xs text-[#5B544D] shadow-sm">
      <span className="h-2.5 w-2.5 rounded-full bg-[#6E7A3C]" />
      <span>Live updates every {Math.round(intervalMs / 1000)}s</span>
      <span className="text-[#8B7F74]">
        Last refresh:{" "}
        {lastUpdated
          ? lastUpdated.toLocaleTimeString("en-UG", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          : "--:--:--"}
      </span>
    </div>
  );
}
