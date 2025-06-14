import useSWR from "swr";
import { BaseItem } from "../types/base-products";

/**
 * Hook to fetch all base products
 * @returns Object containing products array, loading state, and error state
 */
export function useBaseProducts() {
    const { data, error, isLoading } = useSWR("/api/base-products", async () => {
        const data = (await import("@/mocks/base-products.json"))
            .default as unknown as BaseItem[];

        return data || [];
    });
    return {
        products: data,
        isLoading,
        error,
    };
}

/**
 * Hook to fetch a single base product by ID
 * @param id - The ID of the base product to fetch
 * @returns Object containing product data, loading state, and error state
 */
export function useBaseProduct(id: string) {
    const { data, error, isLoading } = useSWR(
        `/api/base-products/${id}`,
        async () => {
            const data = (await import("@/mocks/base-products.json"))
                .default as unknown as BaseItem[];

            return data.find((item) => item.id === id) || null;
        }
    );
    return {
        product: data as BaseItem | null,
        isLoading,
        error,
    };
}
