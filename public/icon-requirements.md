# PWA Icon Requirements for Senhorio

This file documents the required PWA icons that need to be created for the Senhorio application.

## Required Icon Files:

### 1. `/public/icon-192.png`
- Size: 192x192 pixels
- Format: PNG with transparency
- Purpose: Main app icon for Android devices
- Design: Senhorio logo (geometric house silhouette) with teal background (#0F766E)

### 2. `/public/icon-512.png`
- Size: 512x512 pixels  
- Format: PNG with transparency
- Purpose: Large app icon for Android devices and splash screens
- Design: Same as 192px version, scaled up

### 3. `/public/apple-touch-icon.png`
- Size: 180x180 pixels
- Format: PNG without transparency (solid background)
- Purpose: iOS home screen icon
- Design: Senhorio logo with solid background (no rounded corners - iOS handles this)

### 4. `/public/favicon.ico`
- Size: Multiple sizes (16x16, 32x32, 48x48)
- Format: ICO
- Purpose: Browser tab/bookmark icon
- Design: Simplified Senhorio logo

## Icon Design Guidelines:

- **Color Scheme**: Primary teal (#0F766E), white elements
- **Logo**: Geometric house silhouette as shown in the current SVG logo
- **Background**: Solid teal for app icons, transparent for favicon
- **Style**: Clean, modern, Portuguese-friendly design
- **Contrast**: Ensure good visibility on various backgrounds

## Current Logo SVG (for reference):
```svg
<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" rx="8" fill="#0F766E" />
  <path d="M16 7L27 15.5V25H21V19.5H11V25H5V15.5L16 7Z" fill="white" fillOpacity="0.95" />
  <rect x="13" y="19.5" width="6" height="5.5" fill="#0F766E" />
</svg>
```

## Implementation Notes:

1. Icons should be created by a designer or using icon generation tools
2. Test icons on various devices (Android, iOS, different screen densities)
3. Ensure icons look good when rounded (iOS) and square (Android)
4. Consider adding maskable icon variants for better Android integration

## Temporary Solution:
Until proper icons are created, the PWA will function but may show default browser icons for installation prompts.