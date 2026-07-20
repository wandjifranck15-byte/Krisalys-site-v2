export default function Loader({ label = "Chargement..." }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-10 text-krisalys-gray-light" role="status" aria-live="polite">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-krisalys-blue border-t-transparent" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
