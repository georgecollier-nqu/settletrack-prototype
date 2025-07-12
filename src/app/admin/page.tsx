"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminAnalyticsPage() {
  return (
    <div className="flex-1 overflow-hidden">
      {/* Header */}
      <header className="border-b bg-white px-6 py-4 shadow-[0_1px_2px_rgba(17,24,39,0.05)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="lg:hidden" />
            <h1 className="text-2xl font-serif font-bold">
              Analytics Dashboard
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <p className="text-muted-foreground">
            Analytics dashboard coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}
