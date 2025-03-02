"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // This is where you would typically initialize and track page views
    // with services like Google Analytics, Plausible, etc.
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    // Example tracking code (replace with your actual tracking code)
    console.log(`Page view tracked: ${url}`);

    // For Google Analytics, you might do something like:
    // if (typeof window.gtag === 'function') {
    //   window.gtag('config', 'GA-MEASUREMENT-ID', {
    //     page_path: url,
    //   });
    // }
  }, [pathname, searchParams]);

  return null;
}
