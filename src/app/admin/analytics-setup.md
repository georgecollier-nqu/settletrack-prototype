# Analytics Setup Guide

## Google Analytics Integration

### 1. Setup Google Analytics

Add the Google Analytics component to your root layout:

```tsx
// app/layout.tsx
import { GoogleAnalytics } from '@/components/google-analytics';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
```

### 2. Environment Variables

Add to your `.env.local`:

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Feature Tracking Implementation

Track feature usage in your components:

```tsx
import { useFeatureTracking } from '@/hooks/use-feature-tracking';

export function CaseSearchComponent() {
  const { trackFeature } = useFeatureTracking();
  
  const handleSearch = (query: string) => {
    trackFeature('case_search', {
      query_length: query.length,
      has_filters: hasActiveFilters,
      result_count: results.length,
    });
    
    // Perform search...
  };
  
  return (
    // Your component JSX
  );
}
```

### 4. Common Features to Track

- **Case Search**: Track queries, filters used, result counts
- **Data Export**: Track format, row count, columns selected
- **Advanced Filters**: Track filter types, combinations
- **Trend Analysis**: Track date ranges, chart types viewed
- **Citation Links**: Track which citations are clicked

### 5. Backend Analytics API

Create an API endpoint to collect analytics:

```tsx
// app/api/analytics/track/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { events } = await request.json();
  
  // Store in your database
  // Example: await db.analytics.createMany({ data: events });
  
  return NextResponse.json({ success: true });
}
```

### 6. Analytics Dashboard Data

To populate the admin analytics with real data:

```tsx
// app/admin/page.tsx
import { getFeatureUsageStats } from '@/lib/analytics';

export default async function AdminAnalyticsPage() {
  const stats = await getFeatureUsageStats();
  
  // Use real data instead of mock data
  const featureUsageData = stats.features.map(f => ({
    name: f.name,
    value: f.count,
    percentage: f.percentage,
  }));
  
  // ... rest of component
}
```

## Privacy Considerations

1. Add cookie consent banner
2. Allow users to opt-out of tracking
3. Anonymize user data
4. Follow GDPR/CCPA guidelines
5. Document data usage in privacy policy

## Testing Analytics

1. Use Google Analytics Debug mode
2. Check Network tab for GA requests
3. Use Google Analytics Real-time view
4. Test offline event queueing
5. Verify data in GA dashboard