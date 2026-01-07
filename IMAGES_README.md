# Tennis Website Images Guide

## Required Images

### String Images (public/images/strings/)
You need images for each tennis string review. Save as JPG format, ~800x600px.

**Current strings needing images:**
- babolat-rpm-blast.jpg
- wilson-nxt.jpg
- luxilon-alu-power.jpg
- head-lyon.jpg
- technifibre-x-one.jpg
- kirschbaum-super-smash.jpg
- yonex-poly-tour-pro.jpg
- solstice-boomerang.jpg

### Article Images (public/images/articles/)
Featured images for articles, ~1200x600px.

**Current articles needing images:**
- string-tension-guide.jpg
- best-beginner-strings.jpg
- stringing-guide.jpg
- machine-buyers-guide.jpg
- string-maintenance.jpg
- hybrid-strings-guide.jpg

### Machine Images (public/images/machines/)
Stringing machine photos, ~800x600px.

**Current machines needing images:**
- gamma-progression-ii.jpg
- alpha-revo-4000.jpg
- eagnas-delta.jpg
- true-tension-professional.jpg
- eagnas-fusion.jpg
- klipper-usa-ultra.jpg

## Where to Find Images

### Free Stock Photo Sites:
1. **Unsplash** (unsplash.com) - Search for "tennis strings", "stringing machine"
2. **Pexels** (pexels.com) - Great for sports equipment photos
3. **Pixabay** (pixabay.com) - Free commercial use images

### Tennis-Specific Sources:
1. **Manufacturer websites** - Download from Babolat, Wilson, Head, etc.
2. **Tennis Warehouse** - Professional product photos
3. **Amazon product images** - Use for reference (don't copy directly)
4. **Your own photos** - Take pictures of your equipment

### Important Notes:
- Use high-quality images (at least 800x600px)
- Ensure images are in focus and well-lit
- Crop images appropriately for web use
- Compress images for web (under 200KB each)
- Check licensing - use royalty-free or properly licensed images

## Quick Setup with Placeholder Images

For testing purposes, you can use placeholder services:

```bash
# Download placeholder images (example commands)
curl "https://picsum.photos/800/600?random=1" -o public/images/strings/babolat-rpm-blast.jpg
curl "https://picsum.photos/800/600?random=2" -o public/images/strings/wilson-nxt.jpg
# ... repeat for all images
```

## Image Optimization

Before uploading, optimize your images:

```bash
# Install image optimization tools
npm install -g imagemin-cli

# Optimize images
imagemin public/images/**/*.{jpg,png} --out-dir=public/images/optimized --plugin=mozjpeg --plugin=pngquant
```

## File Naming Convention

- Use lowercase with hyphens: `babolat-rpm-blast.jpg`
- Match the slug from your data files
- Use JPG format for photos
- PNG for logos or transparent images