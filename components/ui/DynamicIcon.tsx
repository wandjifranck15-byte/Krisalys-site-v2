import * as Icons from "lucide-react";
import type { ComponentType } from "react";
import { LucideProps } from "lucide-react";

// Permet de stocker le nom d'une icône (string) dans les fichiers /data
// tout en rendant le composant Lucide correspondant. Repli sur un cercle
// neutre si le nom ne correspond à aucune icône connue.
export default function DynamicIcon({
  name,
  ...props
}: { name: string } & LucideProps) {
  const IconComponent = (Icons as unknown as Record<string, ComponentType<LucideProps>>)[name];
  if (!IconComponent) {
    return <Icons.Circle {...props} />;
  }
  return <IconComponent {...props} />;
}
