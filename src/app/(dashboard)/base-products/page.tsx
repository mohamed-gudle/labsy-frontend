"use client";

import { BaseItem } from "@/lib/types/base-products";
import { ProductListItem } from "@/components/base-products";
import { useBaseProducts } from "@/lib/hooks/base-products";

export default function BaseProductsPage() {
  const { baseProducts, loading, error } = useBaseProducts();

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }
  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading products: {error}
      </div>
    );
  }

  return (
    <main className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {baseProducts?.map((product: BaseItem) => (
          <ProductListItem key={product.id} {...product} />
        ))}
      </div>
    </main>
  );
}
