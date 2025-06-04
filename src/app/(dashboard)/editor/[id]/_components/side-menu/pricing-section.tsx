'use client';

export const PricingSection = () => {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-medium mb-3">Set your pricing</h3>
      <p className="text-xs text-gray-500 mb-3">
        Enter your desired retail price for fans from different regions
      </p>
      <div className="flex gap-2 mb-3">
        <button className="px-4 py-2 bg-black text-white rounded-full text-sm">
          USA
        </button>
        <button className="px-4 py-2 border rounded-full text-sm hover:bg-gray-50 transition-colors">
          EUR
        </button>
      </div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          value="$ 22.99"
          className="border rounded px-3 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-gray-300"
          readOnly
        />
        <span className="text-sm text-gray-500">$7.09 Profit/Sale</span>
      </div>
    </div>
  );
};