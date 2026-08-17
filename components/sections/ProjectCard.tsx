import { Project } from "@/types";
import { getSolutionBySlug } from "@/data/solutions";

export default function ProjectCard({ project }: { project: Project }) {
  const solution = getSolutionBySlug(project.solutionSlug);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-krisalys-anthracite">
      <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-krisalys-blue/20 to-krisalys-orange/15">
        <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
          {project.isSimulation ? "Simulation" : "Réalisation"}
        </span>
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-krisalys-orange">
          {project.city} · {project.buildingType}
        </p>
        <h3 className="mt-2 text-base font-semibold text-white">{project.title}</h3>
        <p className="mt-2 text-sm text-krisalys-gray-light">{project.description}</p>
        <p className="mt-3 text-sm text-krisalys-gray-light">
          <span className="font-medium text-white">Objectif : </span>
          {project.objective}
        </p>
        {solution && (
          <p className="mt-1 text-sm text-krisalys-blue">Solution : {solution.name}</p>
        )}
      </div>
    </div>
  );
}
