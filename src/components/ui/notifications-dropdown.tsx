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
import {
  Bell,
  Search,
  FileText,
  Users,
  CreditCard,
  Clock,
  CheckCheck,
  X,
} from "lucide-react";
import { NotificationType } from "@/types/notifications";
import { useNotifications } from "@/hooks/use-notifications";
import { useRouter } from "next/navigation";

const getNotificationIcon = (type: NotificationType) => {
  const iconMap = {
    search: Search,
    digest: FileText,
    team: Users,
    billing: CreditCard,
    system: Bell,
    case_update: FileText,
  };
  return iconMap[type] || Bell;
};

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const {
    notifications,
    unreadCount,
    markAsRead,
    removeNotification,
    clearAll,
    markAllAsRead,
  } = useNotifications();

  const handleNotificationClick = async (
    notification: (typeof notifications)[0],
  ) => {
    await markAsRead(notification.id);
    if (notification.actionUrl) {
      router.push(notification.actionUrl);
    }
  };

  const handleClearAll = async () => {
    await clearAll();
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96">
        <div className="flex items-center justify-between p-4 pb-2">
          <h4 className="font-semibold">Notifications</h4>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {unreadCount} new
              </Badge>
            )}
            {notifications.length > 0 && (
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={markAllAsRead}
                  title="Mark all as read"
                >
                  <CheckCheck className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={handleClearAll}
                  title="Clear all notifications"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No notifications</p>
            </div>
          ) : (
            notifications.map((notification, index) => {
              const Icon = getNotificationIcon(notification.type);
              return (
                <div key={notification.id}>
                  <div
                    className={`group flex items-start gap-3 p-4 hover:bg-secondary/50 transition-colors cursor-pointer relative ${
                      !notification.isRead ? "bg-secondary/20" : ""
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="p-2 bg-secondary rounded-full">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">
                        {notification.title}
                        {!notification.isRead && (
                          <span className="ml-2 inline-block w-2 h-2 bg-primary rounded-full" />
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.description}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {notification.time}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notification.id);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  {index < notifications.length - 1 && (
                    <DropdownMenuSeparator />
                  )}
                </div>
              );
            })
          )}
        </div>
        <DropdownMenuSeparator />
        <div className="p-2">
          <Button
            variant="ghost"
            className="w-full text-sm"
            onClick={() => {
              setIsOpen(false);
              router.push("/dashboard/settings?tab=notifications");
            }}
          >
            Manage notification settings
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
