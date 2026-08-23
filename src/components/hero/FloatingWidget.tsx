'use client';

export default function FloatingWidget() {
  return (
    <div className="absolute bottom-10 left-10 z-20 rounded-xl border border-white/10 bg-white/5 p-5 font-mono text-sm backdrop-blur-xl">
      <p className="text-orange-500">STATUS</p>

      <p className="text-blue-400">ONLINE</p>

      <p className="mt-2 text-gray-400">NEXT.JS • UNITY</p>
    </div>
  );
}
