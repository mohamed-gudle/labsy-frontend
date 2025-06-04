'use client';

export const DesignTools = () => {
  return (
    <div className="flex gap-4 mb-8">
      <button className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:border-gray-400 transition-colors">
        <div className="w-8 h-8 bg-gray-200 rounded"></div>
        <span className="text-sm">Add Image</span>
      </button>
      <button className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:border-gray-400 transition-colors">
        <div className="w-8 h-8 bg-gray-200 rounded"></div>
        <span className="text-sm">Add Text</span>
      </button>
      <button className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:border-gray-400 transition-colors relative">
        <div className="w-8 h-8 bg-gray-200 rounded"></div>
        <span className="text-sm">Design with Adobe Express</span>
        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
          New
        </span>
      </button>
    </div>
  );
};