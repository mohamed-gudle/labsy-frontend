"use client";

import { BaseItem } from "@/app/(dashboard)/base-products/_types/api";
import { ProductListItem } from "./_components/list-item";
import { useBaseProducts } from "./_lib/api";

export default function BaseProductsPage() {
  const { products, isLoading, error } = useBaseProducts();

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading products: {error.message}
      </div>
    );
  }

  return (
    <main className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products?.map((product: BaseItem) => (
          <ProductListItem key={product.id} {...product} />
        ))}
      </div>
    </main>
  );
}
