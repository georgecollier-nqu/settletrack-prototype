# SettleTrack Design System v0.1

_A comprehensive guide to our design language, components, and patterns for building consistent legal‑settlement applications._

**Last updated 11 July 2025**

---

## 1  Core Palette

### 1.1  Primary Brand Colors

| Token                 | Hex       | Usage                              |
| --------------------- | --------- | ---------------------------------- |
| **Primary 700**       | `#2E7D5B` | Brand anchors, primary buttons     |
| **Primary 600**       | `#3B9671` | Button hover, active navigation    |
| **Primary 500**       | `#4CAF82` | Charts, subtle highlights          |
| **Primary 300**       | `#80CFA3` | Disabled states, secondary accents |
| **Primary 50** (Tint) | `#E8F5EE` | Chip backgrounds, table‑row hover  |

### 1.2  Neutral Colors

| Token           | Hex       | Usage                   |
| --------------- | --------- | ----------------------- |
| **Neutral 900** | `#111827` | Body text               |
| **Neutral 700** | `#374151` | Sub‑text, table headers |
| **Neutral 300** | `#D1D5DB` | Borders, dividers       |
| **Neutral 50**  | `#F8FAFC` | App background          |

### 1.3  Status Colors (Foreground)

| Status          | Token   | Hex       | Usage                           |
| --------------- | ------- | --------- | ------------------------------- |
| **Success 600** | Success | `#2E7D32` | Positive badges, success toasts |
| **Warning 600** | Warning | `#B45309` | Warning banners, cautions       |
| **Error 600**   | Error   | `#991B1B` | Destructive actions, errors     |
| **Info 600**    | Info    | `#2E7D5B` | Neutral information, outlines   |

### 1.4  Surface Tints (Background)

| Token          | Hex       | Pairs with  |
| -------------- | --------- | ----------- |
| **Success 50** | `#ECF4EC` | Success 600 |
| **Warning 50** | `#FFF7E6` | Warning 600 |
| **Error 50**   | `#FCE8E8` | Error 600   |
| **Info 50**    | `#E8F5EE` | Info 600    |

> **Accessibility** — All defined foreground/background pairs meet WCAG 2.1 AA contrast requirements in normal, hover, and disabled states.

---

## 2  Typography

Our typographic scale pairs a humanist serif for headings with a clean geometric sans‑serif for body copy.

| Style       | Typeface      | Size / Line‑height | Weight | Tracking | Sample                               |
| ----------- | ------------- | ------------------ | ------ | -------- | ------------------------------------ |
| **H1**      | Merriweather  | 32 / 40 px         | 700    | −0.5     | _Primary Page Heading_               |
| **H2**      | Merriweather  | 24 / 32 px         | 700    | −0.25    | _Section Heading_                    |
| **H3**      | Merriweather  | 20 / 28 px         | 700    | 0        | _Sub‑section Heading_                |
| **Body L**  | Inter         | 16 / 24 px         | 400    | 0        | This is the primary body text style… |
| **Body S**  | Inter         | 14 / 20 px         | 400    | 0        | Secondary body text is used…         |
| **Caption** | Inter         | 12 / 16 px         | 500    | +0.5     | CAPTIONS ARE USED FOR LABELS…        |
| **Mono**    | IBM Plex Mono | 13 / 20 px         | 400    | 0        | `SET‑123456‑A`                       |

---

## 3  Layout

### 3.1  Spacing — 8 pt Grid

| Token | Value |
| ----- | ----- |
| 2     | 2 px  |
| 4     | 4 px  |
| 8     | 8 px  |
| 12    | 12 px |
| 16    | 16 px |
| 24    | 24 px |
| 32    | 32 px |
| 48    | 48 px |
| 64    | 64 px |

### 3.2  Containers

| Break‑point | Viewport    | Content Width     | Gutter |
| ----------- | ----------- | ----------------- | ------ |
| **Mobile**  | ≤ 640 px    | fluid             | 16 px  |
| **Tablet**  | 641–1024 px | 704 px            | 24 px  |
| **Desktop** | ≥ 1025 px   | 1080 px (centred) | 32 px  |

### 3.3  Elevation (Shadow Tokens)

| Token  | Purpose                 | Example                             |
| ------ | ----------------------- | ----------------------------------- |
| **e0** | Base surface            | none                                |
| **e1** | Cards, light containers | `0 1px 2px rgba(17, 24, 39, 0.05)`  |
| **e2** | Popovers, dropdowns     | `0 4px 8px rgba(17, 24, 39, 0.08)`  |
| **e3** | Modals, dialogs         | `0 8px 24px rgba(17, 24, 39, 0.14)` |

---

## 4  Components Library

### 4.1  Buttons

_Corner radius 8 px · Padding 12 × 20 px_

| Variant         | Fill        | Text        | Border           | States                                                       |
| --------------- | ----------- | ----------- | ---------------- | ------------------------------------------------------------ |
| **Primary**     | Primary 700 | `#FFFFFF`   | —                | Hover: Primary 600 · Disabled: Primary 300 + Neutral 50 text |
| **Secondary**   | transparent | Primary 700 | 1 px Primary 700 | Hover: bg Primary 50                                         |
| **Tertiary**    | transparent | Primary 700 | —                | Hover: underline                                             |
| **Destructive** | Error 600   | `#FFFFFF`   | —                | Hover: Error 500                                             |

### 4.2  Form Inputs

_Height 40 px · Radius 4 px · Border 1 px Neutral 300_

| State     | Border                                    | Helper Text | Notes                          |
| --------- | ----------------------------------------- | ----------- | ------------------------------ |
| Default   | Neutral 300                               | —           | —                              |
| **Focus** | Primary 500 + 2 px inner‑shadow `#D8EFDF` | —           | Maintain field width           |
| **Error** | Error 600                                 | Error 600   | Validation message below field |
| Disabled  | Neutral 300 @ 40 % opacity                | —           | Input + label reduced opacity  |

### 4.3  Tables & Data Grid

_Zebra rows Primary 50 tint · Header row Primary 50 (bold)_

- Column min‑width 120 px
- Numerical data right‑aligned

### 4.4  Navigation

#### Top Bar

_Height 64 px · Background white · Shadow e1_
`logo → section links → spacer → user avatar`

#### Side Nav (≥ 1280 px)

_Width 240 px · Background white_

- Active item: background Primary 50, left border 2 px Primary 600

### 4.5  Cards & Modals

| Component          | Radius | Shadow | Padding | Max‑Width |
| ------------------ | ------ | ------ | ------- | --------- |
| **Card**           | 12 px  | e1     | 24 px   | fluid     |
| **Modal / Dialog** | 12 px  | e3     | 24 px   | 600 px    |

### 4.6  Charts & Data Visualisation

- Default series colour Primary 500
- Success overlays Success 600
- Gridlines Neutral 300 @ 40 % opacity
- Tooltip surface e1

#### 4.6.1  Data‑Vis Series Palette

| Series Token | Hex       | Suggested Use          |
| ------------ | --------- | ---------------------- |
| **dv‑1**     | `#4CAF82` | Primary / first series |
| **dv‑2**     | `#5AA5DA` | Secondary accent blue  |
| **dv‑3**     | `#F4AF3D` | Golden highlight       |
| **dv‑4**     | `#B45309` | Warning contrast       |
| **dv‑5**     | `#2E86DE` | Azure mid‑tone         |
| **dv‑6**     | `#FF6B6B` | Error highlight        |
| **dv‑7**     | `#8E44AD` | Purple accent          |
| **dv‑8**     | `#2E7D5B` | Deep brand green       |

> *Accessibility tip* — When more than four series are displayed, offer shape or pattern differentiation for colour‑blind users.

---

## 5  Feedback & Status

### 5.1  Status Badges

| Status    | Background | Foreground  |
| --------- | ---------- | ----------- |
| Completed | Success 50 | Success 600 |
| Pending   | Warning 50 | Warning 600 |
| Rejected  | Error 50   | Error 600   |
| In Review | Info 50    | Info 600    |

### 5.2  Inline Alert Messages

- Surface colour matches **Background** in table above
- Left accent bar 4 px corresponding **Foreground** colour
- Elevation e1

---

## 6  Iconography

- **Icon set**: _Lucide_
- Active: Primary 700 · Default: Neutral 700

| Category   | Examples                                                      |
| ---------- | ------------------------------------------------------------- |
| Navigation | Home · Dashboard · Documents · Clients · Analytics · Settings |
| Actions    | Search · Folder · Calendar · User · Documentation             |
| Status     | Success · Error · Info · Personal Injury                      |

---
