# Task List: Code Cleanup & Centralization

## Relevant Files

### New Directories to Create
- `lib/api/` - Resource-based API calls directory
- `lib/schemas/` - Resource-based Zod schemas directory  
- `lib/types/` - Resource-based TypeScript types directory
- `lib/hooks/` - Resource-based custom hooks directory
- `lib/contexts/` - Resource-based React contexts directory
- `components/products/` - Product-related shared components directory
- `components/base-products/` - Base product-related shared components directory
- `components/designs/` - Design-related shared components directory
- `components/auth/` - Auth-related shared components directory
- `components/users/` - User-related shared components directory
- `utils/products/` - Product-related utility functions directory
- `utils/base-products/` - Base product-related utility functions directory
- `utils/designs/` - Design-related utility functions directory
- `utils/auth/` - Auth-related utility functions directory
- `utils/users/` - User-related utility functions directory

### Files to Create
- `lib/api/products.ts` - All product-related API calls (from admin/products/new)
- `lib/api/base-products.ts` - All base product API calls (from base-products/_lib/api.ts)
- `lib/api/designs.ts` - All design-related API calls (from editor/_lib/actions)
- `lib/api/auth.ts` - All authentication API calls
- `lib/api/users.ts` - All user-related API calls
- `lib/schemas/products.ts` - All product validation schemas (from admin/products/new/_form-schemas)
- `lib/schemas/base-products.ts` - All base product schemas
- `lib/schemas/designs.ts` - All design validation schemas
- `lib/schemas/auth.ts` - All auth validation schemas
- `lib/schemas/users.ts` - All user validation schemas
- `lib/types/products.ts` - All product types (from admin/products/new/_types)
- `lib/types/base-products.ts` - All base product types (from base-products/_types/api.ts)
- `lib/types/designs.ts` - All design types (from editor/_types/design.ts)
- `lib/types/auth.ts` - All auth types
- `lib/types/users.ts` - All user types
- `lib/hooks/products.ts` - All product-related hooks
- `lib/hooks/base-products.ts` - All base product hooks
- `lib/hooks/designs.ts` - All design hooks (from editor/_hooks)
- `lib/hooks/auth.ts` - All auth hooks
- `lib/hooks/users.ts` - All user hooks
- `lib/contexts/products.ts` - All product contexts
- `lib/contexts/base-products.ts` - All base product contexts
- `lib/contexts/designs.ts` - All design contexts (from editor/_components/side-menu/_utils)
- `lib/contexts/auth.ts` - All auth contexts
- `lib/contexts/users.ts` - All user contexts
- `components/products/index.ts` - Barrel export for product components
- `components/base-products/index.ts` - Barrel export for base product components
- `components/designs/index.ts` - Barrel export for design components
- `components/auth/index.ts` - Barrel export for auth components
- `components/users/index.ts` - Barrel export for user components
- `utils/products/index.ts` - Barrel export for product utilities
- `utils/base-products/index.ts` - Barrel export for base product utilities
- `utils/designs/index.ts` - Barrel export for design utilities (from editor/_components/side-menu/_utils)
- `utils/auth/index.ts` - Barrel export for auth utilities
- `utils/users/index.ts` - Barrel export for user utilities

### Notes

- All existing files in feature `_lib/`, `_components/`, `_types/`, `_form-schemas/`, `_hooks/`, `_utils/`, and `_context/` directories will be migrated to the centralized structure
- Import statements across the entire codebase will need to be updated to use new paths
- Empty directories will be removed after migration
- Page-specific files (page.tsx, layout.tsx, loading.tsx, error.tsx, not-found.tsx) will remain in feature directories

## Tasks

- [x] 1.0 Create New Directory Structure
  - [x] 1.1 Create `lib/api/` directory for resource-based API calls
  - [x] 1.2 Create `lib/schemas/` directory for resource-based Zod schemas
  - [x] 1.3 Create `lib/types/` directory for resource-based TypeScript types
  - [x] 1.4 Create `lib/hooks/` directory for resource-based custom hooks
  - [x] 1.5 Create `lib/contexts/` directory for resource-based React contexts
  - [x] 1.6 Create `components/products/` directory for product-related components
  - [x] 1.7 Create `components/base-products/` directory for base product components
  - [x] 1.8 Create `components/designs/` directory for design-related components
  - [x] 1.9 Create `components/auth/` directory for auth-related components
  - [x] 1.10 Create `components/users/` directory for user-related components
  - [x] 1.11 Create `utils/products/` directory for product utilities
  - [x] 1.12 Create `utils/base-products/` directory for base product utilities
  - [x] 1.13 Create `utils/designs/` directory for design utilities
  - [x] 1.14 Create `utils/auth/` directory for auth utilities
  - [x] 1.15 Create `utils/users/` directory for user utilities

- [x] 2.0 Migrate API Calls to Centralized Structure
  - [x] 2.1 Move base-products API calls from `base-products/_lib/api.ts` to `lib/api/base-products.ts`
  - [x] 2.2 Move design upload actions from `editor/[id]/_lib/actions/use-upload-design.ts` to `lib/api/designs.ts`
  - [x] 2.3 Create `lib/api/products.ts` and consolidate any product-related API calls from admin features
  - [x] 2.4 Create `lib/api/auth.ts` for authentication-related API calls (if any exist)
  - [x] 2.5 Create `lib/api/users.ts` for user-related API calls (if any exist)
  - [x] 2.6 Update all API function exports to use consistent naming conventions
  - [x] 2.7 Add JSDoc comments to all API functions for better documentation

- [x] 3.0 Migrate Schemas to Centralized Structure
  - [x] 3.1 Move product form schemas from `admin/products/new/_form-schemas/index.ts` to `lib/schemas/products.ts`
  - [x] 3.2 Create `lib/schemas/base-products.ts` for base product validation schemas
  - [x] 3.3 Create `lib/schemas/designs.ts` for design-related validation schemas
  - [x] 3.4 Create `lib/schemas/auth.ts` for authentication validation schemas
  - [x] 3.5 Create `lib/schemas/users.ts` for user validation schemas
  - [x] 3.6 Consolidate any duplicate schema definitions across features
  - [x] 3.7 Ensure all schemas follow consistent naming and export patterns

- [x] 4.0 Migrate Types to Centralized Structure
  - [x] 4.1 Move product types from `admin/products/new/_types/admin.ts` and `admin/products/new/_types/admin-new.ts` to `lib/types/products.ts`
  - [x] 4.2 Move base product types from `base-products/_types/api.ts` to `lib/types/base-products.ts`
  - [x] 4.3 Move design types from `editor/[id]/_types/design.ts` to `lib/types/designs.ts`
  - [x] 4.4 Create `lib/types/auth.ts` for authentication-related types
  - [x] 4.5 Create `lib/types/users.ts` for user-related types
  - [x] 4.6 Consolidate duplicate interface definitions across features
  - [x] 4.7 Add JSDoc comments to all interface definitions
  - [x] 4.8 Ensure consistent naming conventions for all types and interfaces

- [x] 5.0 Migrate Hooks to Centralized Structure
  - [x] 5.1 Move design hooks from `editor/[id]/_hooks/use-design-states.ts` to `lib/hooks/designs.ts`
  - [x] 5.2 Move color overlay hook from `editor/[id]/_hooks/use-color-overlay.ts` to `lib/hooks/designs.ts`
  - [x] 5.3 Move canvas size hook from `editor/[id]/_hooks/use-canva-size.ts` to `lib/hooks/designs.ts`
  - [x] 5.4 Create `lib/hooks/products.ts` for product-related custom hooks
  - [x] 5.5 Create `lib/hooks/base-products.ts` for base product custom hooks
  - [x] 5.6 Create `lib/hooks/auth.ts` for authentication custom hooks
  - [x] 5.7 Create `lib/hooks/users.ts` for user-related custom hooks
  - [x] 5.8 Consolidate all hooks into their respective resource files

- [x] 6.0 Migrate Contexts to Centralized Structure
  - [x] 6.1 Move uploaded designs context from `editor/[id]/_components/side-menu/_utils/uploaded-designs-context.tsx` to `lib/contexts/designs.ts`
  - [x] 6.2 Move sidebar context from `(dashboard)/_context/sidebar-context.tsx` to `lib/contexts/layout.ts`
  - [x] 6.3 Create `lib/contexts/products.ts` for product-related contexts
  - [x] 6.4 Create `lib/contexts/base-products.ts` for base product contexts
  - [x] 6.5 Create `lib/contexts/auth.ts` for authentication contexts
  - [x] 6.6 Create `lib/contexts/users.ts` for user-related contexts
  - [x] 6.7 Update all context providers to use consistent patterns and naming

- [x] 7.0 Migrate Components to Centralized Structure
  - [x] 7.1 Move base product components from `base-products/_components/` to `components/base-products/`
  - [x] 7.2 Move design-related components from `editor/[id]/_components/` to `components/designs/`
  - [x] 7.3 Move auth components from `(auth)/_components/` to `components/auth/`
  - [x] 7.4 Move product admin components from `admin/products/new/_components/` to `components/products/`
  - [x] 7.5 Create barrel export files (`index.ts`) for each component directory
  - [x] 7.6 Update component imports to use new centralized paths
  - [x] 7.7 Ensure all components follow consistent naming and structure patterns

- [x] 8.0 Migrate Utilities to Centralized Structure
  - [x] 8.1 Move file validation utility from `editor/[id]/_components/side-menu/_utils/file-validation.ts` to `utils/designs/`
  - [x] 8.2 Create `utils/products/` directory and add product-related utility functions
  - [x] 8.3 Create `utils/base-products/` directory and add base product utility functions
  - [x] 8.4 Create `utils/auth/` directory and add authentication utility functions
  - [x] 8.5 Create `utils/users/` directory and add user-related utility functions
  - [x] 8.6 Create barrel export files (`index.ts`) for each utility directory
  - [x] 8.7 Consolidate any duplicate utility functions across features

- [ ] 9.0 Update Import Statements Across Codebase
  - [x] 9.1 Update all imports in page components to use new centralized paths
  - [x] 9.2 Update all imports in layout components to use new centralized paths
  - [x] 9.3 Update all imports in component files to use new centralized paths
  - [x] 9.4 Update all imports in hook files to use new centralized paths
  - [x] 9.5 Update all imports in context files to use new centralized paths
  - [x] 9.6 Update all imports in utility files to use new centralized paths
  - [x] 9.7 Verify all import paths are correct and resolve properly
  - [x] 9.8 Remove any unused import statements during the migration

- [ ] 10.0 Cleanup and Directory Removal
  - [ ] 10.1 Remove empty `_lib/` directories from all feature folders
  - [ ] 10.2 Remove empty `_components/` directories from all feature folders
  - [ ] 10.3 Remove empty `_types/` directories from all feature folders
  - [ ] 10.4 Remove empty `_form-schemas/` directories from all feature folders
  - [ ] 10.5 Remove empty `_hooks/` directories from all feature folders
  - [ ] 10.6 Remove empty `_utils/` directories from all feature folders
  - [ ] 10.7 Remove empty `_context/` directories from all feature folders
  - [ ] 10.8 Verify all page-specific files remain in feature directories
  - [ ] 10.9 Run TypeScript compilation to ensure no broken imports
  - [ ] 10.10 Run linting to ensure code quality standards are maintained
