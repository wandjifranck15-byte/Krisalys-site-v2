import { Project } from "@/types";
import { getSolutionBySlug } from "@/data/solutions";

export default function ProjectCard({ project }: { project: Project }) {
  const solution = getSolutionBySlug(project.solutionSlug);

  return (
    <div className="overflow-hidden rounded-2xl border border-subtle bg-surface shadow-sm">
      <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-krisalys-blue-deep/15 to-krisalys-gray-light/60">
        <span className="rounded-full bg-krisalys-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-krisalys-orange-dark">
          {project.isSimulation ? "Simulation" : "Réalisation"}
        </span>
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-krisalys-blue-deep">
          {project.city} · {project.buildingType}
        </p>
        <h3 className="mt-2 text-base font-semibold text-ink">{project.title}</h3>
        <p className="mt-2 text-sm text-ink-muted">{project.description}</p>
        <p className="mt-3 text-sm text-ink-muted">
          <span className="font-medium text-ink">Objectif : </span>
          {project.objective}
        </p>
        {solution && (
          <p className="mt-1 text-sm text-krisalys-blue-deep">Solution : {solution.name}</p>
        )}
      </div>
    </div>
  );
}
