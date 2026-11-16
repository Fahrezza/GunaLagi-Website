export default function Toast({ pesan }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed bottom-6 left-1/2 z-40 -translate-x-1/2"
    >
      {pesan && (
        <div className="rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white shadow-lg">{pesan}</div>
      )}
    </div>
  );
}