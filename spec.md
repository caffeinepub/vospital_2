# Vospital

## Current State
PatientsScreen exists with search bar, 6 mock patients, and a FAB. Status is binary (urgent/not), no colored status dot, no toast on FAB tap.

## Requested Changes (Diff)

### Add
- Three-value `status` field on each patient: "healthy" | "follow-up" | "urgent"
- Colored status dot on each card: green = healthy, amber = follow-up, red = urgent
- Toast/placeholder when "+" FAB is tapped

### Modify
- Update mock data to distribute all three statuses
- Card layout: replace avatar background color urgency indicator with explicit status dot
- Remove old "URGENT" badge in favor of the dot

### Remove
- Binary `urgent` boolean field

## Implementation Plan
1. Update PATIENTS mock data with `status` field
2. Add StatusDot component (colored circle) inside each card
3. Wire FAB to show a toast ("New patient form coming soon")
4. Keep search bar, FAB position, and all other screens untouched
