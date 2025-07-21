import { Notification, NotificationSettings } from "@/types/notifications";

// Mock API functions for notification management
// These would be replaced with actual API calls in production

export async function getNotifications(): Promise<Notification[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return mock data - in production this would fetch from backend
  return [
    {
      id: "1",
      title: "New case matches your saved search",
      description: "Data Breach > $10M found 3 new cases",
      time: "2 hours ago",
      type: "search",
      isRead: false,
      actionUrl: "/dashboard/cases/search?filter=data-breach",
    },
    {
      id: "2",
      title: "Weekly digest is ready",
      description: "Settlement trends and insights for this week",
      time: "1 day ago",
      type: "digest",
      isRead: false,
      actionUrl: "/dashboard/reports/weekly-digest",
    },
  ];
}

export async function markNotificationAsRead(id: string): Promise<void> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 200));

  // In production, this would update the notification status in the backend
  console.log(`Marked notification ${id} as read`);
}

export async function deleteNotification(id: string): Promise<void> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 200));

  // In production, this would delete the notification from the backend
  console.log(`Deleted notification ${id}`);
}

export async function clearAllNotifications(): Promise<void> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300));

  // In production, this would clear all notifications for the user
  console.log("Cleared all notifications");
}

export async function markAllNotificationsAsRead(): Promise<void> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300));

  // In production, this would mark all notifications as read
  console.log("Marked all notifications as read");
}

export async function getNotificationSettings(): Promise<NotificationSettings> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return mock settings - in production this would fetch from backend
  return {
    globalEmail: true,
    globalPortal: true,
    preferences: [
      { type: "search", email: true, portal: true },
      { type: "digest", email: true, portal: false },
      { type: "team", email: false, portal: true },
      { type: "billing", email: true, portal: true },
      { type: "system", email: true, portal: true },
      { type: "case_update", email: false, portal: true },
    ],
  };
}

export async function updateNotificationSettings(
  settings: NotificationSettings,
): Promise<void> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In production, this would update the user's notification settings
  console.log("Updated notification settings:", settings);
}
