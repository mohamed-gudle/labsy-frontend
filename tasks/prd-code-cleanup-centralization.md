# Product Requirements Document: Code Cleanup & Centralization

## Introduction/Overview

This initiative aims to refactor the current codebase by consolidating scattered API calls, Zod schemas, TypeScript types, hooks, and contexts from feature-specific directories into centralized, resource-based files within the `lib/` directory. Currently, these shared concerns are duplicated across multiple features, making the codebase harder to maintain and develop against.

**Problem Statement:** The current feature-based structure has led to code duplication, inconsistent import paths, and difficulty in maintaining shared logic across the application. API calls, schemas, and types for the same resources are scattered across multiple `_lib/actions/`, `_form-schemas/`, and `_types/` directories.

**Goal:** Create a centralized, resource-based organization within `lib/` that eliminates duplication, provides consistent import paths, and improves maintainability for current and future developers.

## Goals

1. **Eliminate Code Duplication:** Consolidate all duplicate API calls, schemas, and types into single-source-of-truth files
2. **Improve Developer Experience:** Provide predictable, consistent import paths that are easy to discover and use
3. **Enhance Maintainability:** Make it easier to update shared logic by centralizing it in one location per resource
4. **Establish Clear Architecture:** Create a clear separation between feature-specific and shared concerns
5. **Reduce Development Friction:** Remove the need to search across multiple feature directories for shared functionality

## User Stories

1. **As a developer**, I want to import all product-related API calls from one predictable location (`lib/api/products.ts`) so that I don't have to search across multiple feature directories.

2. **As a developer**, I want to use consistent Zod schemas across features so that validation logic is standardized and maintained in one place.

3. **As a developer**, I want TypeScript types to be organized by resource so that I can easily find and import the types I need for any given domain.

4. **As a maintainer**, I want to update an API endpoint or schema in only one file so that changes are automatically reflected across all features that use it.

5. **As a new team member**, I want a clear, predictable file structure so that I can quickly understand where to find and add shared functionality.

## Functional Requirements

### Directory Structure Migration
1. The system must create new directories within `lib/`:
   - `lib/api/` - for all API calls organized by resource
   - `lib/schemas/` - for all Zod validation schemas organized by resource
   - `lib/types/` - for all TypeScript types organized by resource
   - `lib/hooks/` - for all custom hooks organized by resource
   - `lib/contexts/` - for all React contexts organized by resource

2. The system must create new directories within `components/`:
   - `components/products/` - for all product-related shared components
   - `components/base-products/` - for all base-product-related shared components
   - `components/designs/` - for all design-related shared components
   - `components/auth/` - for all auth-related shared components
   - `components/users/` - for all user-related shared components

3. The system must create new directories within `utils/`:
   - `utils/products/` - for all product-related utility functions
   - `utils/base-products/` - for all base-product-related utility functions
   - `utils/designs/` - for all design-related utility functions
   - `utils/auth/` - for all auth-related utility functions
   - `utils/users/` - for all user-related utility functions

### API Calls Consolidation
4. The system must move all API calls from `Feature/_lib/actions/` to `lib/api/[resource].ts` files
5. The system must group API calls by resource type (products, base-products, designs, auth, users)
6. The system must maintain all existing API functionality without breaking existing behavior
7. The system must export API functions with consistent naming conventions

### Schema Consolidation
8. The system must move all Zod schemas from `Feature/_form-schemas/` to `lib/schemas/[resource].ts` files
9. The system must consolidate duplicate schemas into single definitions
10. The system must export schema types for use across features
11. The system must maintain all existing validation rules and error messages

### Type Consolidation
12. The system must move all TypeScript types from `Feature/_types/` to `lib/types/[resource].ts` files
13. The system must consolidate duplicate type definitions
14. The system must organize types by resource domain (products, base-products, designs, auth, users)
15. The system must export both runtime types and type definitions

### Hooks & Contexts Migration
16. The system must move all custom hooks from `Feature/_lib/hooks/` to `lib/hooks/[resource].ts` files
17. The system must move all React contexts from `Feature/_lib/contexts/` to `lib/contexts/[resource].ts` files
18. The system must maintain all existing hook and context functionality

### Components Migration
19. The system must move all reusable components from `Feature/_components/` to `components/[resource]/` directories
20. The system must organize components by resource domain (products, base-products, designs, auth, users)
21. The system must maintain all existing component functionality and props interfaces
22. The system must preserve component-specific types within each component directory

### Utils Migration
23. The system must move all utility functions from `Feature/_utils/` to `utils/[resource]/` directories
24. The system must organize utilities by resource domain (products, base-products, designs, auth, users)
25. The system must consolidate duplicate utility functions
26. The system must maintain all existing utility functionality

### Import Path Updates
27. The system must update all import statements across the codebase to use new centralized paths
28. The system must ensure all components, pages, and other files use the new import structure
29. The system must remove unused import statements and clean up import organization

### Directory Cleanup
30. The system must remove empty `_lib/`, `_components/`, `_utils/`, `_form-schemas/`, and `_types/` directories after migration
31. The system must maintain the existing feature-based page structure
32. The system must preserve only page-specific files (page.tsx, layout.tsx, loading.tsx, error.tsx, not-found.tsx) in feature directories

## Non-Goals (Out of Scope)

- **Component Refactoring:** No changes to React component structure or logic
- **Feature Structure Changes:** No modifications to the existing `Feature/` directory organization for pages and components
- **API Endpoint Changes:** No modifications to actual API endpoints or backend integration
- **UI/UX Changes:** No visual or user interface modifications
- **Performance Optimization:** Focus is on organization, not performance improvements
- **Testing Implementation:** Test updates are explicitly out of scope for this phase
- **Gradual Migration:** This is a complete refactor, not an incremental migration
- **Backwards Compatibility:** Breaking changes are acceptable and expected

## Design Considerations

### Resource Organization
- **Clear Resource Boundaries:** Each resource (products, base-products, designs, auth, users) should have its own file in each lib subdirectory
- **Consistent Naming:** Use kebab-case for directory names and camelCase for file exports
- **Predictable Structure:** Each resource file should follow the same export pattern for discoverability

### Import Path Strategy
- **Absolute Imports:** Use `@/lib/api/products` style imports for consistency
- **Named Exports:** Prefer named exports over default exports for better tree-shaking and autocomplete
- **Barrel Exports:** Consider index files for cleaner imports where appropriate

### Migration Strategy
- **Complete Refactor:** This is a breaking change that affects the entire codebase
- **File-by-File:** Migrate each resource completely before moving to the next
- **Import Update:** Update all imports simultaneously to prevent broken builds

## Technical Considerations

### Dependencies & Integration
- **TypeScript:** Ensure all type exports maintain strict typing
- **Next.js App Router:** Maintain compatibility with existing Next.js structure
- **SWR Integration:** Preserve all SWR hooks and caching behavior
- **Zod Validation:** Maintain all existing validation schemas and error handling

### File Structure Requirements
```
lib/
├── api/
│   ├── products.ts
│   ├── base-products.ts
│   ├── designs.ts
│   ├── auth.ts
│   └── users.ts
├── schemas/
│   ├── products.ts
│   ├── base-products.ts
│   ├── designs.ts
│   ├── auth.ts
│   └── users.ts
├── types/
│   ├── products.ts
│   ├── base-products.ts
│   ├── designs.ts
│   ├── auth.ts
│   └── users.ts
├── hooks/
│   ├── products.ts
│   ├── base-products.ts
│   ├── designs.ts
│   ├── auth.ts
│   └── users.ts
└── contexts/
    ├── products.ts
    ├── base-products.ts
    ├── designs.ts
    ├── auth.ts
    └── users.ts

components/
├── ui/ (shadcn components - existing)
├── products/
│   ├── ProductForm/
│   ├── ProductCard/
│   └── index.ts
├── base-products/
│   ├── BaseProductList/
│   ├── BaseProductFilter/
│   └── index.ts
├── designs/
│   ├── DesignCanvas/
│   ├── DesignPicker/
│   └── index.ts
├── auth/
│   ├── SignInForm/
│   ├── SignUpForm/
│   └── index.ts
└── users/
    ├── UserProfile/
    ├── UserSettings/
    └── index.ts

utils/
├── products/
│   ├── validation.ts
│   ├── formatting.ts
│   └── index.ts
├── base-products/
│   ├── filtering.ts
│   ├── sorting.ts
│   └── index.ts
├── designs/
│   ├── canvas-utils.ts
│   ├── image-processing.ts
│   └── index.ts
├── auth/
│   ├── validation.ts
│   ├── tokens.ts
│   └── index.ts
└── users/
    ├── profile-utils.ts
    ├── preferences.ts
    └── index.ts
```

### Breaking Changes Management
- **Import Statement Updates:** All existing imports must be updated to new paths
- **Build System:** Ensure TypeScript compilation succeeds after migration
- **IDE Support:** Verify autocomplete and IntelliSense work with new structure

## Success Metrics

### Code Quality Metrics
- **Duplication Reduction:** Eliminate all duplicate API calls, schemas, and types across features
- **Import Consistency:** Achieve 100% consistent import paths for shared functionality
- **File Organization:** Reduce complexity by centralizing shared concerns in predictable locations

### Developer Experience Metrics
- **Discoverability:** New developers can find shared functionality within 30 seconds
- **Maintenance Effort:** Updates to shared logic require changes in only one file per resource
- **Development Speed:** Reduced time spent searching for existing implementations

### Technical Metrics
- **Build Success:** TypeScript compilation succeeds without errors after migration
- **Import Path Length:** Shorter, more predictable import paths
- **Code Reuse:** Increased reuse of centralized API calls and schemas across features

## Open Questions

1. **Index Files:** Should we create index.ts files in each lib subdirectory for barrel exports?
2. **Resource Boundaries:** Are there any edge cases where functionality doesn't clearly belong to one resource?
3. **Legacy Support:** Should we maintain any temporary backwards compatibility during the transition?
4. **Documentation:** Should we create documentation for the new import patterns and file organization?
5. **IDE Configuration:** Do we need to update any IDE or linting configurations to support the new structure?

## Implementation Priority

### Phase 1: Foundation Setup
- Create new directory structure in `lib/`
- Identify all files to be migrated and their target locations

### Phase 2: Resource-by-Resource Migration
- Migrate products resource (API calls, schemas, types, hooks, contexts, components, utils)
- Migrate base-products resource
- Migrate designs resource
- Migrate auth resource
- Migrate users resource

### Phase 3: Import Path Updates
- Update all import statements across features
- Remove old, empty directories
- Verify build system functionality

### Phase 4: Cleanup & Validation
- Remove unused files and directories
- Validate all functionality works as expected
- Update documentation and coding guidelines
