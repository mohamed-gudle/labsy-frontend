"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? "w-64" : "w-16"
          } bg-gray-800 text-white p-4 transition-all duration-300`}
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="mb-4 p-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          {isSidebarOpen ? "Collapse" : "Expand"}
        </button>
        <h2 className="text-lg font-bold mb-4">Dashboard</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="#" className="block p-2 rounded hover:bg-gray-700">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block p-2 rounded hover:bg-gray-700">
                Profile
              </a>
            </li>
            <li>
              <a href="#" className="block p-2 rounded hover:bg-gray-700">
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card key={item} className="p-4">
              <h2 className="text-lg font-bold">Card {item}</h2>
              <p className="text-sm text-gray-600">This is a sample card.</p>
              <Button className="mt-2">Action</Button>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
