# Phase 2 Implementation Plan: Core Data Models & Types

**Status**: ✅ Mostly Complete - Verification & Enhancement Needed

This document provides a detailed plan to verify and complete Phase 2 (Steps 2.1-2.2) from `IMPLEMENTATION_STEPS.md`.

---

## 📋 Current Status Assessment

### ✅ Already Completed
- ✅ TypeScript types defined for all three entities:
  - `StringReview` with comprehensive interface
  - `StringingMachine` with specifications
  - `Article` with categories and metadata
- ✅ Type exports configured (`src/lib/types/index.ts`)
- ✅ Sample data files created:
  - `sample-strings.json` (3+ examples)
  - `sample-machines.json` (3+ examples)
  - `sample-articles.json` (3+ examples)
- ✅ Content loading utilities implemented (`src/lib/utils/content.ts`)
- ✅ Data storage solution chosen: JSON files (MVP approach)

### ⚠️ Needs Verification/Enhancement
- Verify types match all requirements from IMPLEMENTATION_STEPS.md
- Check for missing fields or improvements
- Verify data structure consistency
- Consider adding validation (Zod schemas)
- Document data storage approach
- Consider future migration path to D1/KV

---

## Step 2.1: Define TypeScript Types

### Verification Checklist

#### String Review Types (`src/lib/types/string-review.ts`)

**Current Implementation**: ✅ Comprehensive

**Required Fields Check**:
- [x] String type enum (polyester, multifilament, hybrid, natural_gut, synthetic_gut)
- [x] Gauge (number)
- [x] Ratings structure:
  - [x] Stiffness (1-10)
  - [x] Power (1-10)
  - [x] Spin (1-10)
  - [x] Durability (1-10)
  - [x] Comfort (1-10)
  - [x] Overall (1-5 stars)
- [x] Price (number)
- [x] Affiliate links structure (amazon, tennisWarehouse, dicks)
- [x] Review metadata:
  - [x] Author (implicit in content)
  - [x] Date (publishedAt, updatedAt)
  - [x] Rating (in ratings.overall)
- [x] Content structure (summary, pros, cons, fullReview)
- [x] SEO fields (metaDescription, keywords)
- [x] Images (featured, gallery)

**Status**: ✅ **Complete** - All required fields present

**Optional Enhancements**:
- [ ] Add `author` field explicitly if needed
- [ ] Add `tags` field for categorization
- [ ] Add `relatedReviews` field for internal linking
- [ ] Add `popularity` or `views` field for analytics

#### Stringing Machine Types (`src/lib/types/stringing-machine.ts`)

**Current Implementation**: ✅ Comprehensive

**Required Fields Check**:
- [x] Machine type enum (drop-weight, crank, electronic)
- [x] Mounting system (in specifications)
- [x] Tension range (in specifications)
- [x] Price (number, with optional priceRange)
- [x] Pros/cons arrays (in content)
- [x] Affiliate links structure
- [x] Specifications structure
- [x] SEO fields
- [x] Images

**Status**: ✅ **Complete** - All required fields present

**Note**: Current implementation uses `specifications` object which is more flexible than separate fields.

**Optional Enhancements**:
- [ ] Add explicit `tensionRange` object with `min` and `max` numbers
- [ ] Add `ratings` object similar to StringReview (easeOfUse, durability, value, overall)
- [ ] Add `warranty` field explicitly
- [ ] Add `weight` and `dimensions` as separate fields

#### Article Types (`src/lib/types/article.ts`)

**Current Implementation**: ✅ Comprehensive

**Required Fields Check**:
- [x] Article metadata:
  - [x] Title
  - [x] Slug
  - [x] Category (enum with guide, tutorial, comparison, buyers-guide, news)
  - [x] Tags (array)
- [x] Content structure
- [x] SEO fields (metaDescription, keywords)
- [x] Author field
- [x] Published/updated dates
- [x] Reading time (optional)

**Status**: ✅ **Complete** - All required fields present

**Optional Enhancements**:
- [ ] Add `featured` boolean for homepage display
- [ ] Add `relatedArticles` field for internal linking
- [ ] Add `tableOfContents` auto-generated field

### Action Items

#### 1. Verify Type Consistency
- [ ] Review all types against IMPLEMENTATION_STEPS.md requirements
- [ ] Ensure naming conventions are consistent
- [ ] Verify all enums match expected values
- [ ] Check TypeScript compilation: `npm run check`

#### 2. Add Type Validation (Optional but Recommended)
- [ ] Create Zod schemas for runtime validation
- [ ] Add validation to content loading functions
- [ ] Create type guards for type checking

**Example Zod Schema** (`src/lib/types/string-review.schema.ts`):
```typescript
import { z } from 'zod';
import type { StringReview, StringType } from './string-review';

const StringTypeSchema = z.nativeEnum(StringType);

const StringRatingsSchema = z.object({
  stiffness: z.number().min(1).max(10),
  power: z.number().min(1).max(10),
  spin: z.number().min(1).max(10),
  durability: z.number().min(1).max(10),
  comfort: z.number().min(1).max(10),
  overall: z.number().min(1).max(5),
});

const StringReviewSchema: z.ZodType<StringReview> = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  brand: z.string(),
  type: StringTypeSchema,
  gauge: z.number().positive(),
  ratings: StringRatingsSchema,
  price: z.number().positive(),
  affiliateLinks: z.object({
    amazon: z.string().url().optional(),
    tennisWarehouse: z.string().url().optional(),
    dicks: z.string().url().optional(),
  }),
  content: z.object({
    summary: z.string(),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    fullReview: z.string(),
  }),
  seo: z.object({
    metaDescription: z.string(),
    keywords: z.array(z.string()),
  }),
  images: z.object({
    featured: z.string(),
    gallery: z.array(z.string()).optional(),
  }),
  publishedAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
});

export function validateStringReview(data: unknown): StringReview {
  return StringReviewSchema.parse(data);
}
```

#### 3. Update Type Exports
- [x] Verify `src/lib/types/index.ts` exports all types
- [ ] Add schema exports if validation is added

### Testing
- [ ] TypeScript compilation: `npm run check`
- [ ] Import types in test file - should work without errors
- [ ] Verify type inference works correctly
- [ ] Test with sample data files

---

## Step 2.2: Set Up Data Storage

### Current Implementation: JSON Files (MVP Approach)

**Status**: ✅ **Complete** - Using Option C (JSON files)

**Storage Solution**: JSON files in `src/lib/data/` directory
- ✅ `src/lib/data/reviews/strings/sample-strings.json`
- ✅ `src/lib/data/reviews/machines/sample-machines.json`
- ✅ `src/lib/data/articles/sample-articles.json`

### Verification Checklist

#### Data Structure
- [x] Data files organized in proper directory structure
- [x] JSON files contain valid data matching types
- [x] Sample data includes all required fields
- [x] Data is properly formatted and readable

#### Content Loading Utilities (`src/lib/utils/content.ts`)

**Current Functions**:
- [x] `loadStringReviews()` - Load all string reviews
- [x] `loadMachineReviews()` - Load all machine reviews
- [x] `loadArticles()` - Load all articles
- [x] `getStringReviewBySlug()` - Get single review by slug
- [x] `getMachineReviewBySlug()` - Get single machine by slug
- [x] `getArticleBySlug()` - Get single article by slug
- [x] `filterStringReviews()` - Filter reviews by criteria
- [x] `searchContent()` - Search across all content types

**Status**: ✅ **Complete** - All essential functions implemented

### Action Items

#### 1. Enhance Content Loading Utilities

**Add Missing Functions**:
- [ ] `getStringReviewById()` - Get by ID instead of slug
- [ ] `getMachineReviewById()` - Get by ID
- [ ] `getArticleById()` - Get by ID
- [ ] `filterMachineReviews()` - Filter machines by type, price, etc.
- [ ] `filterArticles()` - Filter articles by category, tags
- [ ] `getRelatedReviews()` - Get related reviews based on type/brand
- [ ] `getRelatedArticles()` - Get related articles
- [ ] `getFeaturedContent()` - Get featured reviews/articles for homepage

**Example Enhancements**:
```typescript
// Get featured content for homepage
export async function getFeaturedContent(): Promise<{
  strings: StringReview[];
  machines: StringingMachine[];
  articles: Article[];
}> {
  const [strings, machines, articles] = await Promise.all([
    loadStringReviews(),
    loadMachineReviews(),
    loadArticles(),
  ]);

  return {
    strings: strings
      .sort((a, b) => b.ratings.overall - a.ratings.overall)
      .slice(0, 4),
    machines: machines
      .sort((a, b) => (b.price || 0) - (a.price || 0))
      .slice(0, 3),
    articles: articles
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 4),
  };
}

// Get related reviews
export async function getRelatedReviews(
  review: StringReview,
  limit: number = 3
): Promise<StringReview[]> {
  const allReviews = await loadStringReviews();
  return allReviews
    .filter(
      (r) =>
        r.id !== review.id &&
        (r.type === review.type || r.brand === review.brand)
    )
    .slice(0, limit);
}
```

#### 2. Add Data Validation

- [ ] Validate JSON data on load
- [ ] Add error handling for invalid data
- [ ] Log validation errors for debugging
- [ ] Provide fallback for missing data

**Example Validation**:
```typescript
import { validateStringReview } from '$lib/types/string-review.schema';

export async function loadStringReviews(): Promise<StringReview[]> {
  try {
    const module = await import('$lib/data/reviews/strings/sample-strings.json');
    const data = module.default as unknown[];
    
    // Validate each review
    return data.map((item) => validateStringReview(item));
  } catch (error) {
    console.error('Error loading string reviews:', error);
    return [];
  }
}
```

#### 3. Document Data Storage Approach

- [ ] Create `docs/DATA_STORAGE.md` documenting:
  - Current JSON file approach
  - File structure
  - How to add new content
  - Future migration path to D1/KV

#### 4. Consider Database Schema (Future Migration)

**If migrating to Cloudflare D1**, create schema documentation:

```sql
-- String Reviews Table
CREATE TABLE string_reviews (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  type TEXT NOT NULL,
  gauge INTEGER NOT NULL,
  stiffness INTEGER NOT NULL,
  power INTEGER NOT NULL,
  spin INTEGER NOT NULL,
  durability INTEGER NOT NULL,
  comfort INTEGER NOT NULL,
  overall INTEGER NOT NULL,
  price REAL NOT NULL,
  amazon_link TEXT,
  tennis_warehouse_link TEXT,
  dicks_link TEXT,
  summary TEXT NOT NULL,
  pros TEXT NOT NULL, -- JSON array
  cons TEXT NOT NULL, -- JSON array
  full_review TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  keywords TEXT NOT NULL, -- JSON array
  featured_image TEXT NOT NULL,
  gallery_images TEXT, -- JSON array
  published_at TEXT NOT NULL,
  updated_at TEXT
);

-- Stringing Machines Table
CREATE TABLE stringing_machines (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  type TEXT NOT NULL,
  price REAL NOT NULL,
  price_min REAL,
  price_max REAL,
  mounting_system TEXT NOT NULL,
  tension_range TEXT NOT NULL,
  weight TEXT,
  dimensions TEXT,
  warranty TEXT,
  amazon_link TEXT,
  tennis_warehouse_link TEXT,
  dicks_link TEXT,
  summary TEXT NOT NULL,
  pros TEXT NOT NULL, -- JSON array
  cons TEXT NOT NULL, -- JSON array
  full_review TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  keywords TEXT NOT NULL, -- JSON array
  featured_image TEXT NOT NULL,
  gallery_images TEXT, -- JSON array
  published_at TEXT NOT NULL,
  updated_at TEXT
);

-- Articles Table
CREATE TABLE articles (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT NOT NULL, -- JSON array
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  keywords TEXT NOT NULL, -- JSON array
  featured_image TEXT NOT NULL,
  gallery_images TEXT, -- JSON array
  published_at TEXT NOT NULL,
  updated_at TEXT,
  reading_time INTEGER
);

-- Categories Table (for future use)
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  parent_id TEXT
);
```

### Testing

#### Data Loading Tests
- [ ] Test loading all string reviews
- [ ] Test loading all machines
- [ ] Test loading all articles
- [ ] Test getting by slug
- [ ] Test filtering functions
- [ ] Test search function
- [ ] Test error handling (invalid data, missing files)

#### Data Validation Tests
- [ ] Test with valid data
- [ ] Test with invalid data (should handle gracefully)
- [ ] Test with missing fields
- [ ] Test with wrong types

### Sample Data Requirements

**Current Status**: ✅ Good sample data exists

**Verification**:
- [x] At least 3 string reviews
- [x] At least 3 machine reviews
- [x] At least 3 articles
- [x] All required fields populated
- [x] Realistic data values
- [x] Proper image paths

**Enhancement Opportunities**:
- [ ] Add more sample data (aim for 5-10 of each type)
- [ ] Ensure variety in types (all string types represented)
- [ ] Add more realistic affiliate links (placeholder format)
- [ ] Verify image paths match actual files

---

## Final Verification Checklist

### Type Definitions
- [ ] All three type files exist and are complete
- [ ] All required fields present
- [ ] Enums match requirements
- [ ] Type exports working
- [ ] TypeScript compilation passes

### Data Storage
- [ ] Data files exist and are valid JSON
- [ ] Sample data matches type definitions
- [ ] Content loading utilities work
- [ ] Filtering and search functions work
- [ ] Error handling implemented

### Code Quality
- [ ] Types are well-documented
- [ ] Functions have proper return types
- [ ] Error handling is robust
- [ ] Code follows TypeScript best practices

### Testing
- [ ] TypeScript compilation: `npm run check`
- [ ] Data loads correctly
- [ ] All utility functions work
- [ ] No runtime errors
- [ ] Data validation works (if implemented)

---

## Implementation Commands

### Verification Commands
```bash
# Check TypeScript compilation
npm run check

# Test data loading (create test script)
npm run test:data

# Verify JSON files are valid
node -e "JSON.parse(require('fs').readFileSync('src/lib/data/reviews/strings/sample-strings.json'))"
```

### Adding New Content
```bash
# Add new string review
# Edit: src/lib/data/reviews/strings/sample-strings.json

# Add new machine review
# Edit: src/lib/data/reviews/machines/sample-machines.json

# Add new article
# Edit: src/lib/data/articles/sample-articles.json
```

---

## Success Criteria

Phase 2 is complete when:
- ✅ All TypeScript types defined and match requirements
- ✅ All required fields present in types
- ✅ Sample data files exist with valid data
- ✅ Content loading utilities implemented
- ✅ Filtering and search functions work
- ✅ TypeScript compilation passes
- ✅ Data structure is consistent
- ✅ Documentation exists (optional but recommended)

---

## Next Steps

After completing Phase 2:
1. Move to **Phase 3: Core Components**
2. Use types in component props
3. Use content loading utilities in routes
4. Test components with sample data

---

## Optional Enhancements

### 1. Add Data Validation with Zod
- Provides runtime type safety
- Validates data on load
- Better error messages

### 2. Add Data Migration Scripts
- Script to migrate JSON to D1 (when ready)
- Script to validate all JSON files
- Script to generate TypeScript types from JSON schema

### 3. Add Content Management Utilities
- Functions to add new content
- Functions to update content
- Functions to delete content (for future admin interface)

### 4. Add Caching Layer
- Cache loaded data in memory
- Invalidate cache on updates
- Improve performance

### 5. Add Data Indexing
- Create search indexes
- Improve search performance
- Add full-text search capabilities

---

## Troubleshooting

### Common Issues

**Issue**: TypeScript errors when importing types
- **Solution**: Verify `src/lib/types/index.ts` exports all types
- **Check**: Ensure imports use correct paths (`$lib/types`)

**Issue**: JSON data doesn't match types
- **Solution**: Add Zod validation to catch mismatches
- **Check**: Verify JSON structure matches TypeScript interfaces

**Issue**: Content loading functions return wrong data
- **Solution**: Check import paths and file structure
- **Check**: Verify JSON files are valid

**Issue**: Filtering/search not working
- **Solution**: Check filter logic and search implementation
- **Check**: Verify data structure matches expectations

---

## Notes

- Current implementation uses JSON files (MVP approach) - perfect for getting started
- Types are comprehensive and match requirements
- Content loading utilities are well-implemented
- Consider adding validation for production readiness
- Future migration to D1/KV is straightforward with current structure
- Sample data is good quality and realistic

---

**Last Updated**: Based on current project state assessment
**Status**: Ready for verification and optional enhancements
