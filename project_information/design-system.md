# Design System

## Colors

Use Tailwind CSS color classes that map to our CSS variables:

### Primary Palette

- **Background**: `bg-background` / `text-background`
- **Foreground**: `bg-foreground` / `text-foreground`
- **Primary**: `bg-primary` / `text-primary`
- **Secondary**: `bg-secondary` / `text-secondary`
- **Muted**: `bg-muted` / `text-muted-foreground`
- **Accent**: `bg-accent` / `text-accent`
- **Destructive**: `bg-destructive` / `text-destructive`

### UI Elements

- **Cards**: `bg-card` / `text-card-foreground`
- **Popovers**: `bg-popover` / `text-popover-foreground`
- **Borders**: `border-border`
- **Input**: `border-input`
- **Ring**: `ring-ring`

## Spacing

Use Tailwind spacing utilities consistently:

- **Extra small**: `p-1` (4px)
- **Small**: `p-2` (8px)
- **Medium**: `p-4` (16px)
- **Large**: `p-6` (24px)
- **Extra large**: `p-8` (32px)

## Typography

Use Tailwind typography classes:

- **Headings**:
  - H1: `text-4xl font-bold`
  - H2: `text-3xl font-semibold`
  - H3: `text-2xl font-semibold`
  - H4: `text-xl font-medium`
- **Body**: `text-base` (16px)
- **Small**: `text-sm` (14px)
- **Muted text**: Add `text-muted-foreground`

## Component Usage

### Buttons

```tsx
<Button>Primary Action</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

### Cards

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>Content goes here</CardContent>
  <CardFooter>Footer content</CardFooter>
</Card>
```

### Forms

```tsx
<Form>
  <FormField
    control={form.control}
    name="fieldName"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Label</FormLabel>
        <FormControl>
          <Input placeholder="Enter value" {...field} />
        </FormControl>
        <FormDescription>Helper text</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
</Form>
```

## Layout Patterns

### Container

```tsx
<div className="container mx-auto px-4 py-8">{/* Content */}</div>
```

### Grid

```tsx
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {/* Grid items */}
</div>
```

### Flex

```tsx
<div className="flex items-center justify-between">{/* Flex items */}</div>
```

## Responsive Design

- Mobile first approach
- Breakpoints:
  - `sm:` 640px
  - `md:` 768px
  - `lg:` 1024px
  - `xl:` 1280px
  - `2xl:` 1536px

## Shadows

- Small: `shadow-sm`
- Default: `shadow`
- Medium: `shadow-md`
- Large: `shadow-lg`

## Border Radius

- Small: `rounded-sm`
- Default: `rounded`
- Medium: `rounded-md`
- Large: `rounded-lg`
- Full: `rounded-full`
