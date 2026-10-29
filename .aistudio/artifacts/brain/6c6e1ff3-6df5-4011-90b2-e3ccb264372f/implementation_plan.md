# Responsive 3D Robot Viewport & Environment Scaling

Deliver an adaptive, viewport-aware presentation of the Spline 3D robot background that scales down gracefully on mobile devices (60% scale) while preserving breathing room for hero typography, ensuring smooth mobile touch scrolling, and presenting a majestic full-scale presence on desktop.

## User Review & Critical Decisions

> [!IMPORTANT]
> Based on your selections in Phase 1, the following core specifications have been established for the robot viewport adjustments:
>
> - **Mobile Scale Target**: 60% scale on mobile viewports (<640px) to prevent the 3D model from overpowering the screen, with graduated steps for tablet (75%–85%) and desktop (100%).
> - **Touch Gesture Handling**: Pass-through touch behavior on mobile (`pointer-events-none` on mobile, interactive on desktop `md:pointer-events-auto`) so user swipes and scrolls are butter-smooth without accidental 3D model capture.
> - **Spatial Placement**: Centered background positioning with optical vertical offsetting (`translate-y`) calculated to give comfortable breathing room beneath the headline and CTA buttons.

---

## 1. Overview & Core Concept

- **What It Does**: Enhances `SplineBackground.tsx` to automatically adapt the 3D robot's size, transform origin, and vertical centering across mobile, tablet, and desktop viewports using CSS hardware-accelerated transforms.
- **Target Audience**: Mobile and desktop visitors browsing XetaForge on diverse devices (smartphones, foldables, tablets, ultrawides).
- **Key Value**: Solves mobile visual crowding where the 3D robot previously consumed excessive viewport space, establishing balanced typographic hierarchy and uninhibited scrolling.

---

## 2. User Experience & Visual Design

### Viewport Scaling Hierarchy
- **Mobile (< 640px)**: 
  - Scale: `0.60` (60%)
  - Alignment: Centered with subtle `-translate-y-4` to sit harmoniously behind the hero text and action buttons without clipping.
  - Interaction: Touch events pass through to underlying sections; page scrolling is completely effortless.
- **Tablet / Phablet (640px – 1024px)**:
  - Scale: `0.78` (78%)
  - Alignment: Centered vertically and horizontally.
- **Desktop (1024px+)**:
  - Scale: `1.0` (100%)
  - Alignment: Full-size immersive presentation with ambient illumination, desktop mouse interaction, and particle refraction.

### Interaction & Touch Policy
- Retains `pointer-events-none` on mobile touchscreens to guarantee that vertical finger scrolling is never intercepted or stalled by the WebGL canvas.
- Re-enables pointer interaction on medium-and-above screens (`md:pointer-events-auto`) so desktop mouse drag and cursor tracking remain fully interactive.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: CSS Hardware Transforms vs. Window Resize JS State**:
  - *Chosen Approach*: Pure CSS media-query utility classes (`scale-[0.60] sm:scale-[0.78] lg:scale-100`) combined with `transform-gpu origin-center`.
  - *Why*: Eliminates JavaScript resize listeners, eliminates layout re-renders on scroll or keyboard open/close, avoids hydration flicker, and leverages GPU compositing.
  - *Alternatives Considered*: Dynamic JS resize listeners were previously tested, but caused re-render latency and jitter during orientation flips.

- **Decision 2: Canvas Wrapper Isolation**:
  - *Chosen Approach*: Apply scaling directly to an inner container wrapping the `<Spline />` component while keeping the ambient glow orbs and gradient background at 100% full viewport bleed.
  - *Why*: Prevents ambient glow effects and background cyber-grid lines from shrinking or clipping, maintaining full edge-to-edge atmosphere.

---

## 4. Technical Architecture & Component Structure

```
┌──────────────────────────────────────────────────────────────┐
│                    SplineBackground Component                │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Ambient Glow Orbs & Cybernetic Grid (Full Viewport)    │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ motion.div Container (Fade-in on WebGL Scene Ready)     │  │
│  │                                                        │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │ Responsive Scaled & Offset Canvas Wrapper        │  │  │
│  │  │  • Mobile: scale-60, -translate-y-4              │  │  │
│  │  │  • Tablet: scale-78                              │  │  │
│  │  │  • Desktop: scale-100                            │  │  │
│  │  │  • Pointer events: none (mobile) / auto (desktop)│  │  │
│  │  │                                                  │  │  │
│  │  │  ┌────────────────────────────────────────────┐  │  │  │
│  │  │  │ <Spline scene="...scene.splinecode" />     │  │  │  │
│  │  │  └────────────────────────────────────────────┘  │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### Component & Style Mapping
- **File**: `components/SplineBackground.tsx`
- **Class Configuration**:
  ```tsx
  <div className="w-full h-full flex items-center justify-center origin-center transform-gpu scale-[0.60] sm:scale-[0.78] lg:scale-100 -translate-y-4 sm:translate-y-0 transition-transform duration-500 ease-out">
    <Spline ... />
  </div>
  ```
- **Verification**: Run `compile_applet` to confirm zero lint or TypeScript errors.
