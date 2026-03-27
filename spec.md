# Creator Growth Network (CGN)

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Single-page web app with toggle between two modes: **Investor** and **Kreator**
- Pitch deck sections rendered visually per mode (13 slides for investor, 10 slides for kreator)
- Simulation engine with manual input form: followers count, average views, niche (dropdown), platform (dropdown)
- Simulation output changes based on active mode:
  - Investor mode: CPM estimate, brand deal value, CGN projected revenue, ROI scaling projection
  - Kreator mode: monthly income estimate (60-80% share), valuation grade (A/B/C), growth potential, next-step recommendations
- All text in Bahasa Indonesia

### Modify
- None

### Remove
- None

## Implementation Plan

### Backend
- Store simulation parameters and calculation logic as query functions
- `simulateInvestor(followers, avgViews, niche, platform)` → returns CPM, brandDealValue, cgnRevenue, roiProjection
- `simulateKreator(followers, avgViews, niche, platform)` → returns monthlyIncome, valuationGrade, growthPotential, recommendations

### Frontend
- Toggle bar at top: switch between "Mode Investor" and "Mode Kreator"
- Pitch deck section: full-screen slide-by-slide navigation, content changes per mode
- Simulation section below pitch deck: shared input form, output panel changes per mode
- Investor visual tone: dark professional, data-heavy, charts/numbers
- Kreator visual tone: warm, aspirational, motivational language
