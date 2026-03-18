# ÉduSecure — School Management System

## Overview
A complete Next.js 14 frontend application for school management with QR-based access control. Built for francophone West African schools (Benin/Ghana context). Frontend-only — no backend, no database. All data is mocked.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS variables
- **Icons**: Boxicons (CDN)
- **Fonts**: Syne (display) + DM Sans (body) via next/font
- **Auth simulation**: localStorage (`edusecure_session`)
- **Port**: 5000

## Project Structure
```
app/
├── page.tsx                    → Welcome / Role selection
├── auth/login/page.tsx         → Login form
├── auth/register/page.tsx      → Multi-step registration
├── parent/
│   ├── layout.tsx              → Parent sidebar layout (auth guard)
│   ├── dashboard/page.tsx      → Parent dashboard with child cards
│   ├── children/page.tsx       → Manage children list
│   ├── children/add/page.tsx   → Add child + QR generation
│   ├── payments/page.tsx       → Payment history + pending
│   └── profile/page.tsx        → Parent profile settings
├── admin/
│   ├── layout.tsx              → Admin sidebar layout (auth guard)
│   ├── dashboard/page.tsx      → Admin stats + access log
│   ├── students/page.tsx       → Students table by class + side drawer
│   ├── notifications/page.tsx  → Notifications (placeholder)
│   └── settings/page.tsx       → Settings (placeholder)

components/
├── Logo.tsx          → QR-inspired SVG logo + text
├── Sidebar.tsx       → Responsive sidebar (mobile: bottom tab bar)
├── StatCard.tsx      → Animated metric card
├── StatusBadge.tsx   → ACTIVÉ/SUSPENDU/REFUSÉ badge
├── ChildCard.tsx     → Child card with payment progress + tranche pills
├── PaymentModal.tsx  → Payment flow modal (Mobile Money / Card)
└── QRPlaceholder.tsx → Decorative SVG QR code pattern

lib/
├── mockData.ts  → All mock data (104 students, children, payments, access log)
├── api.ts       → API stub functions (all marked TODO)
└── utils.ts     → formatXOF, formatDate, getInitials, getAvatarColor
```

## Authentication (Mock)
- Login with any email → parent dashboard
- Login with email containing "admin" → admin dashboard
- Session stored in `localStorage` as `edusecure_session` JSON
- Auth guards in `parent/layout.tsx` and `admin/layout.tsx`

## Color Palette
- Midnight: `#0A1628`
- Midnight-mid: `#112240`
- Accent: `#2563EB`
- Success: `#10B981`
- Warning: `#F59E0B`
- Danger: `#EF4444`

## Key Features
- Role-based routing (parent / admin)
- QR code placeholder SVG generator
- Payment modal with Mobile Money + Card tabs
- Student table with class tabs, search, and side drawer
- Animated stat cards (count-up on mount)
- Responsive design (sidebar → bottom tab bar on mobile)
- XOF currency formatting with French locale
- 104 mock students across 13 class levels with West African names

## Development
```bash
npm run dev   # starts on port 5000
npm run build # production build
```

## API Replacement Guide
All API calls are in `lib/api.ts`. Each function is stubbed and marked `// TODO`. Replace the mock return values with real `fetch()` calls to your backend.

Mock data lives exclusively in `lib/mockData.ts`.
