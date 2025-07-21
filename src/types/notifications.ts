export type NotificationType =
  | "search"
  | "digest"
  | "team"
  | "billing"
  | "system"
  | "case_update";

export type NotificationChannel = "email" | "portal" | "both";

export interface NotificationPreference {
  type: NotificationType;
  email: boolean;
  portal: boolean;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: NotificationType;
  isRead: boolean;
  actionUrl?: string;
  metadata?: Record<string, unknown>;
}

export interface NotificationSettings {
  preferences: NotificationPreference[];
  globalEmail: boolean;
  globalPortal: boolean;
}
