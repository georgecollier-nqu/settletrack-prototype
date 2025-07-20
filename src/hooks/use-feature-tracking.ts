import { useCallback } from 'react';
import { trackFeatureUsage } from '@/components/google-analytics';

export function useFeatureTracking() {
  const trackFeature = useCallback((featureName: string, metadata?: Record<string, any>) => {
    trackFeatureUsage(featureName, metadata);
    
    // Also track in local analytics (can be sent to your backend)
    if (typeof window !== 'undefined') {
      const event = {
        feature: featureName,
        timestamp: new Date().toISOString(),
        metadata,
        userId: localStorage.getItem('userId'),
        sessionId: sessionStorage.getItem('sessionId'),
      };
      
      // Queue for batch sending to backend
      const events = JSON.parse(localStorage.getItem('pendingAnalytics') || '[]');
      events.push(event);
      localStorage.setItem('pendingAnalytics', JSON.stringify(events));
      
      // Send immediately if online, otherwise will be sent when online
      if (navigator.onLine) {
        sendAnalyticsBatch();
      }
    }
  }, []);

  return { trackFeature };
}

async function sendAnalyticsBatch() {
  const events = JSON.parse(localStorage.getItem('pendingAnalytics') || '[]');
  if (events.length === 0) return;
  
  try {
    const response = await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events }),
    });
    
    if (response.ok) {
      localStorage.removeItem('pendingAnalytics');
    }
  } catch (error) {
    console.error('Failed to send analytics:', error);
  }
}