import { Product } from "@/types/product";
import useSWR from "swr";

export function useBaseProducts() {
    const {data, error, isLoading} = useSWR("/api/base-products", async () => {
        const data:Product[] = (await import("@/mocks/base-products.json")).default;
       
        return data || [];
    }
    );
    return {
        products: data,
        isLoading,
        error,
    };
}
