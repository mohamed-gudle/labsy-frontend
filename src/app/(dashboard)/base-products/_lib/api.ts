
import useSWR from "swr";
import { BaseItem } from "../_types/api";

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
