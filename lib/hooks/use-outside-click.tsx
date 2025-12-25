"use client";

import { useEffect, useRef } from "react";

export function useClickOutside(callback: () => void) {
  const ref = useRef<any>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const el = ref?.current;

      // If no element or click is inside the element → do nothing
      if (
        !el ||
        el.contains(event.target as Node) ||
        // TODO: figure out why it doesnt work with button with this id
        // workaround to prevent outside click
        el.id === "edit-list-button"
      )
        return;
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
