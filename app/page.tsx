"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Bible Checklist</h1>
      <p className="text-lg mb-6">
        Track your Bible reading and stay consistent!
      </p>
      <Link href="/checklist">
        <button className="bg-blue-500 text-white py-2 px-4 rounded">
          Go to Checklist
        </button>
      </Link>
    </div>
  );
}
