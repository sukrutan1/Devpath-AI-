---
name: Lumina Tech Guide
colors:
  surface: '#15121b'
  surface-dim: '#15121b'
  surface-bright: '#3b3742'
  surface-container-lowest: '#0f0d15'
  surface-container-low: '#1d1a23'
  surface-container: '#211e27'
  surface-container-high: '#2c2832'
  surface-container-highest: '#37333d'
  on-surface: '#e7e0ed'
  on-surface-variant: '#cbc3d7'
  inverse-surface: '#e7e0ed'
  inverse-on-surface: '#322f39'
  outline: '#958ea0'
  outline-variant: '#494454'
  surface-tint: '#d0bcff'
  primary: '#d0bcff'
  on-primary: '#3c0091'
  primary-container: '#a078ff'
  on-primary-container: '#340080'
  inverse-primary: '#6d3bd7'
  secondary: '#adc6ff'
  on-secondary: '#002e6a'
  secondary-container: '#0566d9'
  on-secondary-container: '#e6ecff'
  tertiary: '#4cd7f6'
  on-tertiary: '#003640'
  tertiary-container: '#009eb9'
  on-tertiary-container: '#002f38'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#15121b'
  on-background: '#e7e0ed'
  surface-variant: '#37333d'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is engineered for a tech-forward SaaS platform, evoking a sense of high-performance energy and professional reliability. The brand personality is **Bold, Tech-forward, and Energetic**, targeting ambitious software developers and tech professionals.

The visual style is a sophisticated blend of **Modern Minimalism** and **Glassmorphism**. It utilizes deep spatial depth through translucent layers and vibrant glow effects to create a "command center" aesthetic. Every interface element is designed to feel like a premium tool, using high-contrast typography and neon-infused accents to guide the user's journey through career data and learning paths.

## Colors

The palette is built on a deep slate foundation to reduce eye strain while providing a high-contrast canvas for vibrant accents.

- **Primary (Vibrant Purple):** Used for main actions, active states, and brand highlights.
- **Secondary (Electric Blue):** Used for secondary interactions and supporting information.
- **Tertiary (Cyan):** Used for success states, data visualizations, and accents.
- **Background & Surfaces:** A tiered system of `#0f172a` for the base and `#1e293b` for elevated glass cards.
- **Gradients:** Use linear gradients from Primary to Secondary (135deg) for high-impact display elements and CTA buttons.

## Typography

This design system uses a dual-font approach to balance personality with utility. 

**Plus Jakarta Sans** is the headline workhorse. Its geometric yet friendly curves provide the "energetic" feel required for the brand. Use Bold (700) or ExtraBold (800) for all headings to establish a clear information hierarchy.

**Inter** is used for all body text and UI labels. It ensures maximum readability for dense career guides and technical documentation. Use "Body-md" as the standard text size. For labels and small metadata, use Medium or SemiBold weights to maintain legibility against dark backgrounds.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** model with a maximum container width of 1280px for desktop. 

- **Grid:** Use a 12-column grid for desktop, 8-column for tablet, and 4-column for mobile.
- **Rhythm:** All spacing must be a multiple of 4px. Use `md` (24px) as the default padding for cards and sections.
- **Margins:** Desktop margins should be at least `lg` (48px) to provide breathable whitespace, while mobile margins should shrink to `sm` (16px) to maximize screen real estate.
- **Vertical Spacing:** Use `xl` (80px) between major sections to define clear content boundaries.

## Elevation & Depth

This design system utilizes **Glassmorphism** to create a sense of hierarchy in a dark environment. Depth is not communicated through traditional black shadows, but through light and transparency.

1.  **Level 0 (Base):** Deep Slate (`#0f172a`).
2.  **Level 1 (Cards/Panels):** Semi-transparent surface (`#1e293b` at 60% opacity) with a `backdrop-filter: blur(12px)`.
3.  **Borders:** Subtle 1px solid borders using White at 10% opacity create a "glass edge" effect.
4.  **Glowing Shadows:** High-priority elements (like active CTA buttons) use a colored outer glow rather than a dark shadow. Use the Primary color at 30% opacity with a 20px blur to create a "neon" lift effect.

## Shapes

The shape language is modern and approachable, utilizing a **Rounded** (8px/0.5rem) base.

- **Standard Elements:** Inputs, buttons, and small widgets use `0.5rem` radius.
- **Container Elements:** Large cards and modals use `rounded-lg` (1rem) or `rounded-xl` (1.5rem) to soften the "tech" aesthetic and make the platform feel more welcoming.
- **Accents:** Use perfectly circular shapes for avatars and status indicators.

## Components

### Buttons
- **Primary:** Gradient background (Purple to Blue), bold white text, and a primary-colored glow shadow on hover. Large radius (8px+).
- **Secondary:** Ghost style with a 1px white (10% opacity) border and blur background. Text is white.
- **Tertiary/Ghost:** No border, Cyan text, background appears only on hover at 10% opacity.

### Input Fields
- Dark background (`#1e293b`), subtle white border. On focus, the border changes to the Primary Purple with a subtle glow.

### Cards
- The cornerstone of the system. Must feature `backdrop-filter: blur(12px)`, a 1px soft border, and `rounded-xl` corners. Headers inside cards should use Plus Jakarta Sans SemiBold.

### Chips/Badges
- Small, pill-shaped elements with a low-opacity Tertiary (Cyan) background and high-opacity Cyan text. Used for "Tech Stack" tags or "Status" indicators.

### Progress Bars
- High-contrast background track (Dark Slate) with a Vibrant Purple to Cyan gradient fill to represent career progression or course completion.

### Glow Orbs
- Decorative background elements. Large, low-opacity (5-10%) blurred circles of Primary and Secondary colors placed behind content to add depth and "energy" to the dark UI.