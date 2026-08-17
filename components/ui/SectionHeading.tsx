import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-krisalys-orange">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl font-bold tracking-tight sm:text-4xl",
          light ? "text-white" : "text-krisalys-black"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-lg", light ? "text-krisalys-gray-light" : "text-krisalys-gray-dark")}>
          {description}
        </p>
      )}
    </div>
  );
}
