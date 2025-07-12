# Project Scope - Example E-commerce Dashboard

## Overview

Create a clickable prototype for an e-commerce admin dashboard that demonstrates key functionality for managing an online store.

## Pages Required

### 1. Dashboard Overview (`/dashboard`)

- Summary cards showing:
  - Total revenue
  - Orders today
  - Active products
  - Customer count
- Recent orders table
- Revenue chart (last 7 days)
- Top selling products

### 2. Products Page (`/products`)

- Product list table with:
  - Product image
  - Name
  - SKU
  - Price
  - Stock status
  - Actions (Edit, Delete)
- Search and filter functionality
- "Add Product" button

### 3. Add/Edit Product (`/products/new` or `/products/[id]/edit`)

- Form fields:
  - Product name
  - Description
  - Price
  - SKU
  - Category (select)
  - Stock quantity
  - Product images
- Save and Cancel buttons

### 4. Orders Page (`/orders`)

- Orders table with:
  - Order ID
  - Customer name
  - Date
  - Status (badge)
  - Total amount
  - Actions
- Status filter tabs (All, Pending, Shipped, Delivered)

### 5. Order Details (`/orders/[id]`)

- Order information card
- Customer details
- Order items list
- Shipping address
- Order timeline
- Action buttons (Mark as Shipped, etc.)

## Key Interactions

1. **Navigation**: Sidebar navigation between pages
2. **Data tables**: Sortable columns, pagination
3. **Forms**: Validation feedback, loading states
4. **Modals**: Confirm dialogs for delete actions
5. **Toast notifications**: Success/error messages
6. **Responsive**: Works on mobile and desktop

## Mock Data Requirements

- 20-30 sample products
- 50+ sample orders
- 5-10 customers
- Revenue data for charts

## Visual Style

- Clean, modern interface
- Use brand colors consistently
- Clear information hierarchy
- Accessible contrast ratios

## Success Criteria

- All pages are navigable
- Forms show validation
- Tables are sortable/filterable
- Mobile responsive
- Feels like a real application
