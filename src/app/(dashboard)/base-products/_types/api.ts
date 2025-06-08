// BaseItem API response type for base-products feature

/**
 * PrintableArea represents a print location on a product, following industry standards.
 * - Coordinates and dimensions are in millimeters (mm).
 * - DPI (dots per inch) is used for print quality.
 * - mockup_url should be a WebP image for performance.
 */
export interface PrintableArea {
    /** Name of the print area (e.g., "Front", "Back", "Left Sleeve") */
    name?: string;
    /** X coordinate (mm) from the top-left of the mockup */
    x: number;
    /** Y coordinate (mm) from the top-left of the mockup */
    y: number;
    /** Width of the printable area (mm) */
    width: number;
    /** Height of the printable area (mm) */
    height: number;
    /** WebP mockup image URL for this print area */
    mockup_url: string;
    /** DPI for print quality (typical: 150-300) */
    dpi?: number;
}

/**
 * BaseItem represents a product available for customization.
 * This is the main data structure for products in the catalog.
 */
export interface BaseItem {
    /** Unique product identifier */
    id: string;
    /** Product name/title */
    title: string;
    /** Product description */
    description?: string;    /** Brand name */
    brand: string;
    /** Product type/category */
    type?: string;
    /** Product category (alternative to type) */
    category?: string;
    /** Base cost in cents (USD) */
    base_cost: number;
    /** Currency code (default: USD) */
    currency?: string;
    /** Main product image URL (WebP preferred) */
    image: string;
    /** Available color codes (hex format) */
    colors: string[];    /** Available sizes with stock quantities */
    available_sizes: Record<string, number> | string[];
    /** Country of origin/manufacture */
    country?: string;
    /** Fulfillment time in days or ISO 8601 duration string */
    fulfillmentTime?: number | string;
    /** Array of printable areas on this product */
    print_areas: PrintableArea[];
    /** Additional product metadata */
    metadata?: {
        /** Material composition */
        material?: string;
        /** Care instructions */
        care_instructions?: string;
        /** Weight in grams */
        weight_grams?: number;
        /** Product dimensions */
        dimensions?: {
            length_cm?: number;
            width_cm?: number;
            height_cm?: number;
        };
    };
    /** Product availability status */
    is_available?: boolean;
    /** Tags for categorization/filtering */
    tags?: string[];
    /** Creation timestamp */
    created_at?: string;
    /** Last update timestamp */
    updated_at?: string;
}

/**
 * Product list response interface for API calls
 */
export interface BaseProductsResponse {
    items: BaseItem[];
    total: number;
    page?: number;
    limit?: number;
}

/**
 * Product filter options for searching/filtering
 */
export interface ProductFilters {
    category?: string;
    brand?: string;
    color?: string;
    size?: string;
    minPrice?: number;
    maxPrice?: number;
    country?: string;
    material?: string;
    search?: string;
}
