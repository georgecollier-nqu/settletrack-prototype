"use client";

import { ReactNode } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface AdminHeaderProps {
  title?: string;
  children?: ReactNode;
}

export function AdminHeader({ title, children }: AdminHeaderProps) {
  return (
    <header className="border-b bg-white px-6 py-4 shadow-[0_1px_2px_rgba(17,24,39,0.05)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="lg:hidden" />
          {title && <h1 className="text-2xl font-serif font-bold">{title}</h1>}
        </div>

        {children && <div className="flex items-center gap-4">{children}</div>}
      </div>
    </header>
  );
}
