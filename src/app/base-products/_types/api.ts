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
    /** Print quality in DPI (dots per inch) */
    dpi?: number;
    /** Whether this area is currently enabled for printing */
    printable?: boolean;
    /** Optional description for this print area */
    description?: string;
}

export interface BaseItem {
    id: string;
    /** Product title or name */
    title: string;
    /** Product description */
    description: string;
    /** Main product image or mockup URL */
    image: string;
    /** Product brand or manufacturer */
    brand: string;
    /** Product category (e.g., T-shirt, Hoodie) */
    category: string;
    /** Material (e.g., 100% cotton) */
    material: string;
    /** Manufacturer name */
    manufacturer: string;
    /** Available color options */
    colors: string[];
    /** Country of origin or fulfillment */
    country: string;
    /** Estimated fulfillment time (e.g., ISO 8601 duration or descriptive string) */
    fulfillmentTime: string;
    /** Available sizes (structure TBD) */
    available_sizes: Record<string, unknown>;
    /** List of printable areas for this item */
    print_areas: PrintableArea[];
    /** Base cost of the item (before printing) */
    base_cost: number;
    /** Print cost per cm² */
    print_cost_per_cm2: number;
}
