"use client";

import { useEffect, useRef } from "react";

export function useClickOutside(callback: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const el = ref?.current;

      // If no element or click is inside the element → do nothing
      if (!el || el.contains(event.target as Node)) return;

      // Clicked outside
      callback();
    }

    window?.addEventListener("click", handleClick, { capture: true });

    return () => {
      window.removeEventListener("click", handleClick, { capture: true });
    };
  }, [callback, ref]);

  return ref;
}
