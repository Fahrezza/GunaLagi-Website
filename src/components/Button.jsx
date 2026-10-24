export default function Button({ variant = "primary", children, ...props }) {
  const styles =
    variant === "primary"
      ? "bg-lime-brand hover:bg-lime-brand-dark font-semibold"
      : "bg-white border border-neutral-200 hover:bg-neutral-50";
  return (
    <button
      className={`w-full rounded-lg py-2.5 text-sm transition flex items-center justify-center gap-2 ${styles}`}
      {...props}
    >
      {children}
    </button>
  );
}