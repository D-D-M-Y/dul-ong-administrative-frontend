import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Links */}
      <div className="space-y-4">
        <a href="/dashboard/generate-route">
          <span className="text-xl font-bold text-indigo-600 hover:underline">Generate Route</span>
        </a>
      </div>
    </div>
  );
}
