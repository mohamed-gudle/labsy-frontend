import { BaseItem } from "@/app/base-products/_types/api";
import useSWR from "swr";

export function useBaseProducts() {
  const { data, error, isLoading } = useSWR("/api/base-products", async () => {
    const data: BaseItem[] = (await import("@/mocks/base-products.json"))
      .default;

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
      const data: BaseItem[] = (await import("@/mocks/base-products.json"))
        .default;

      return data.find((item) => item.id === id) || null;
    }
  );
  return {
    product: data as BaseItem | null,
    isLoading,
    error,
  };
}
