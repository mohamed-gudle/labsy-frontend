# Product Requirements Document: Admin Base Products Upload & Print Area Configuration

## Introduction/Overview

This feature enables admin users to upload new base products to the catalog and configure printable areas through an interactive interface. Admins will be able to upload product images, specify product details according to the existing BaseItem schema, and define printable areas by highlighting regions on mockup images. This feature is essential for expanding the product catalog and ensuring accurate print placement for custom designs.

**Problem Statement:** Currently, there's no admin interface for adding new base products or configuring their printable areas, limiting catalog expansion and customization capabilities.

**Goal:** Create a comprehensive admin interface that allows authorized users to efficiently add new base products with precise print area specifications.

## Goals

1. **Primary Goals:**
   - Enable admin users to upload new base products with complete product information
   - Provide an intuitive interface for defining printable areas on product mockups
   - Ensure role-based access control restricts feature to admin users only
   - Integrate seamlessly with existing `/base-products` API endpoints
   - Maintain data consistency with the established BaseItem schema

2. **Performance Goals:**
   - Page load time under 2 seconds
   - Image upload processing under 5 seconds
   - Real-time preview updates during print area selection
   - Support concurrent admin users without performance degradation

## User Stories

1. **As an admin user**, I want to authenticate using Firebase and access the admin product upload interface, so that I can manage the product catalog securely.

2. **As an admin user**, I want to upload product images and fill in product details (title, description, brand, pricing, sizes, colors), so that I can add comprehensive product information to the catalog.

3. **As an admin user**, I want to specify the number of printable areas for a product and highlight them on the mockup image, so that I can define where designs can be applied.

4. **As an admin user**, I want to see a real-time preview of selected print areas with coordinates and dimensions, so that I can ensure accurate placement before saving.

5. **As an admin user**, I want to edit existing base products and update their print areas, so that I can maintain and improve the product catalog.

6. **As an admin user**, I want to save products with all specifications and see them immediately available in the base products list, so that I can quickly expand the catalog.

## Functional Requirements

### Authentication & Access Control
1. The system must verify admin role through Firebase authentication before allowing access to the upload interface.
2. The system must redirect non-admin users away from the admin interface.
3. The system must maintain session state and handle authentication errors gracefully.

### Product Information Capture
4. The system must provide form fields for all BaseItem properties as defined in the API schema:
   - Required: title, brand, base_cost, image, colors, available_sizes, print_areas
   - Optional: description, type/category, currency, country, fulfillmentTime, metadata, tags
5. The system must validate all required fields before allowing submission.
6. The system must support color selection via hex color picker with visual preview.
7. The system must allow size specification with stock quantities (Record<string, number> format).
8. The system must auto-populate currency as "USD" and allow override.

### Image Upload & Management
9. The system must support image upload for the main product image and print area mockups.
10. The system must accept JPG, PNG, and WebP formats with maximum file size of 10MB.
11. The system must automatically convert uploaded images to WebP format for performance.
12. The system must generate optimized thumbnails for list views.
13. The system must validate image dimensions (minimum 800x800px for main image).

### Print Area Configuration
14. The system must allow admins to specify the number of printable areas (1-10 areas).
15. The system must provide an interactive image overlay for highlighting print areas.
16. The system must capture print area coordinates in millimeters relative to the mockup image.
17. The system must allow naming of print areas (e.g., "Front", "Back", "Left Sleeve").
18. The system must set default DPI to 300 with option to modify (150-600 range).
19. The system must display real-time dimensions and coordinates during selection.
20. The system must validate that print areas don't overlap.

### Data Integration
21. The system must integrate with existing `/base-products` API endpoints for CRUD operations.
22. The system must generate unique product IDs following the current system format.
23. The system must set creation and update timestamps automatically.
24. The system must validate data against the BaseItem interface before submission.

### Edit & Update Functionality
25. The system must allow editing of existing base products through the same interface.
26. The system must pre-populate all fields with existing product data.
27. The system must allow modification of print areas while preserving other configurations.
28. The system must track and display last update timestamp.

## Non-Goals (Out of Scope)

- **Product Duplication:** No functionality to clone/duplicate existing products
- **Bulk Upload:** Single product upload only (bulk upload is out of scope)
- **Design Preview:** No preview of how actual designs look on products (only print area selection)
- **Inventory Management:** No stock tracking or inventory alerts
- **Price Calculation:** No dynamic pricing based on print areas or complexity
- **Multi-language Support:** English interface only
- **Advanced Image Editing:** No built-in image editing tools beyond basic cropping
- **Product Variants:** No complex variant management (colors/sizes handled as simple arrays)

## Design Considerations

### UI/UX Requirements
- **Responsive Design:** Desktop-first approach using Tailwind CSS
- **Component Library:** Utilize Shadcn UI and Radix UI components
- **Layout:** Two-column layout with form on left, image preview on right
- **Interactive Elements:** Drag-to-select functionality for print area highlighting
- **Visual Feedback:** Real-time coordinate display, validation messages, loading states
- **Accessibility:** Keyboard navigation support, screen reader compatibility

### Print Area Selection Interface
- **Interactive Overlay:** Translucent overlay on product mockup for area selection
- **Visual Indicators:** Border highlights, resize handles, coordinate tooltips
- **Measurement Units:** Display coordinates and dimensions in millimeters
- **Grid System:** Optional grid overlay for precise alignment
- **Zoom Functionality:** Zoom in/out for detailed print area placement

## Technical Considerations

### Dependencies & Integration
- **Frontend Framework:** Next.js App Router with TypeScript
- **Authentication:** Firebase Auth with role-based access control
- **State Management:** React Hook Form with Zod validation
- **File Upload:** Integration with existing image storage solution
- **API Integration:** SWR for data fetching and caching with existing `/base-products` endpoints

### Performance Requirements
- **Image Optimization:** Automatic WebP conversion and compression
- **Lazy Loading:** Progressive image loading for better perceived performance
- **Caching Strategy:** Implement SWR caching for product data
- **File Upload:** Chunked upload for large images with progress indicators

### Data Validation
- **Form Validation:** Zod schemas for all input validation
- **Image Validation:** File type, size, and dimension checks
- **Print Area Validation:** Coordinate bounds checking, overlap prevention
- **API Validation:** Server-side validation matching frontend schemas

## Success Metrics

### Performance Metrics
- **Page Load Time:** < 2 seconds initial load
- **Image Upload Speed:** < 5 seconds for 10MB files
- **Form Submission Time:** < 3 seconds end-to-end
- **Print Area Selection Response:** < 100ms for interaction feedback

### Usage Metrics
- **Admin Adoption:** 100% of admin users successfully upload products within first week
- **Data Quality:** < 5% validation errors in submitted products
- **Feature Completion Rate:** > 95% of started product uploads completed
- **System Reliability:** 99.9% uptime for admin interface

### Business Metrics
- **Catalog Growth:** Enable addition of 50+ new products per month
- **Time Efficiency:** Reduce product setup time by 70% compared to manual processes
- **Error Reduction:** < 2% print area configuration errors in production

## Open Questions

1. **Image Storage:** What cloud storage service should be used for uploaded images? (AWS S3, Firebase Storage, etc.)
2. **Print Area Templates:** Should we provide pre-defined templates for common product types to speed up configuration?
3. **Approval Workflow:** Do uploaded products need approval before becoming available, or should they be immediately live?
4. **Version Control:** Should we maintain version history for product updates?
5. **Backup Strategy:** What backup and recovery procedures are needed for product data?
6. **Analytics Integration:** Should we track detailed analytics on print area usage and performance?
7. **API Rate Limits:** Are there any rate limiting considerations for the upload API?
8. **Multi-admin Conflicts:** How should we handle concurrent editing of the same product by multiple admins?

## Implementation Priority

### Phase 1 (MVP)
- Authentication and access control
- Basic product information form
- Single image upload
- Simple print area selection (rectangular areas only)
- Integration with existing API

### Phase 2 (Enhanced)
- Multiple print area support
- Advanced print area shapes
- Edit/update functionality
- Enhanced validation and error handling

### Phase 3 (Optimization)
- Performance optimizations
- Advanced UI features (zoom, grid overlay)
- Comprehensive analytics and monitoring
