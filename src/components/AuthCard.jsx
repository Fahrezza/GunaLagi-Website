export default function AuthCard({ title, children }) {
  return (
    <main className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="font-display text-2xl font-bold mb-6">{title}</h1>
        {children}
      </section>
    </main>
  );
}