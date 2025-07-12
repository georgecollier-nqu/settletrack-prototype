"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Bell, Search, FileText, Users, CreditCard, Clock } from "lucide-react";

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  // Mock notifications data
  const notifications = [
    {
      id: "1",
      title: "New case matches your saved search",
      description: "Data Breach > $10M found 3 new cases",
      time: "2 hours ago",
      type: "search",
      icon: Search,
    },
    {
      id: "2",
      title: "Weekly digest is ready",
      description: "Settlement trends and insights for this week",
      time: "1 day ago",
      type: "digest",
      icon: FileText,
    },
    {
      id: "3",
      title: "Team member joined",
      description: "Emily Davis accepted the invitation",
      time: "2 days ago",
      type: "team",
      icon: Users,
    },
    {
      id: "4",
      title: "Payment successful",
      description: "Monthly subscription charged $299",
      time: "3 days ago",
      type: "billing",
      icon: CreditCard,
    },
  ];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-4 pb-2">
          <h4 className="font-semibold">Notifications</h4>
          <Badge variant="secondary" className="text-xs">
            {notifications.length} new
          </Badge>
        </div>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((notification, index) => {
            const Icon = notification.icon;
            return (
              <div key={notification.id}>
                <div className="flex items-start gap-3 p-4 hover:bg-secondary/50 transition-colors cursor-pointer">
                  <div className="p-2 bg-secondary rounded-full">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {notification.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {notification.time}
                    </div>
                  </div>
                </div>
                {index < notifications.length - 1 && <DropdownMenuSeparator />}
              </div>
            );
          })}
        </div>
        <DropdownMenuSeparator />
        <div className="p-2">
          <Button
            variant="ghost"
            className="w-full text-sm"
            onClick={() => setIsOpen(false)}
          >
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
