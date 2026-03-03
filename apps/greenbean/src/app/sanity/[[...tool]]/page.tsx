/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

"use client";

import { useEffect } from "react";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  useEffect(() => {
    // Suppress the "changing an uncontrolled input to be controlled" warning
    // This is a known issue with Sanity Studio and doesn't affect functionality
    const originalError = console.error;
    console.error = (...args) => {
      if (
        args[0]?.includes?.(
          "changing an uncontrolled input to be controlled",
        ) ||
        (typeof args[0] === "string" &&
          args[0].includes("changing an uncontrolled input"))
      ) {
        return;
      }
      originalError.call(console, ...args);
    };
    return () => {
      console.error = originalError;
    };
  }, []);

  return <NextStudio config={config} />;
}
