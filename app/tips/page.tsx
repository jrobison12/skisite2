import React from 'react';
import Image from 'next/image';
import SkiingTips from '../components/SkiingTips';

export default function TipsPage() {
  return (
    <main className="min-h-screen bg-white pt-20 relative">
      <div className="fixed inset-0 z-0">
        <Image
          src="/Snowbird Logo.png"
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
          sizes="100vw"
        />
      </div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-4xl font-bold mb-8">Skiing Tips & Guides</h1>
        <p className="text-gray-700 mb-12 bg-white/30 backdrop-blur-sm p-4 rounded-lg max-w-4xl">Enhance your skiing experience with our comprehensive guides and expert tips. From perfecting your form to mastering advanced techniques, we've got you covered.</p>
        <SkiingTips />
      </div>
    </main>
  );
} 