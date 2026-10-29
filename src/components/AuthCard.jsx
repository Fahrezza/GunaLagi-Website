export default function AuthCard({ title, children }) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-neutral-100 p-3 sm:p-4">
      <section className="w-full max-w-md rounded-2xl bg-white p-4 shadow-sm sm:p-8">
        <h1 className="mb-3 font-display text-lg font-bold sm:mb-6 sm:text-2xl">{title}</h1>
        {children}
      </section>
    </main>
  );
}