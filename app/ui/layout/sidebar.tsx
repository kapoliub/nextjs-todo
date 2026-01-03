"use client";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { ReactNode, useState } from "react";

interface SidebarProps {
  title?: ReactNode;
  children: ReactNode;
  topContent?: ReactNode;
}

export default function Sidebar({ title, children, topContent }: SidebarProps) {
  const [open, setOpen] = useState(true);

  return (
    <aside
      className={`
        /* 1. Animation Properties */
        transition-[width] duration-300 ease-in-out
        
        /* 2. Width Logic */
        ${open ? "w-80" : "w-[73px]"} 
        
        /* 3. Styling - Removed overflow-auto from here */
        border-r border-divider bg-primary-50 
        h-[calc(100vh-65px)] flex flex-col
        overflow-x-hidden gap-4
      `}
    >
      <div className="flex flex-col items-stretch justify-between flex-shrink-0 gap-4">
        <div className="flex items-center justify-between p-4 pb-0">
          <div
            className={`
              transition-all duration-300 ease-in-out
              whitespace-nowrap overflow-hidden
              ${open ? "opacity-100 w-full" : "opacity-0 w-0 pointer-events-none"}
              tracking-tight
            `}
          >
            {title}
          </div>
          <Tooltip content={open ? "Collapse" : "Expand"} delay={1000}>
            <Button
              isIconOnly
              className={`${open && "ml-1"}`}
              color="primary"
              variant="bordered"
              onPress={() => setOpen(!open)}
            >
              {open ? "<" : ">"}
            </Button>
          </Tooltip>
        </div>
        <div
          className={`
            flex-1 overflow-y-auto px-4
            flex flex-col gap-2 transition-opacity duration-200
            ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
            min-w-[280px] no-scrollbar bg-inherit
          `}
        >
          {topContent}
        </div>
      </div>
      <div
        className={`
          flex-1 overflow-y-auto p-4 pt-0
          flex flex-col gap-2 transition-opacity duration-200
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
          min-w-[280px] no-scrollbar
        `}
      >
        {children}
      </div>
    </aside>
  );
}
