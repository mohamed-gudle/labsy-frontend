import React from 'react';

export default function ExamplePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-white dark:bg-gray-950">
            <div className="max-w-md w-full text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard Example</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    This is an example page inside the <span className="font-semibold">/dashboard/example</span> route.
                </p>
            </div>
        </main>
    );
}