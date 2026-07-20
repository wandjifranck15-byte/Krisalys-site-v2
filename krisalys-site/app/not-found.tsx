import Link from "next/link";
import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-krisalys-black">
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-krisalys-orange">Erreur 404</p>
        <h1 className="mt-3 text-3xl font-bold text-white">Cette page n&apos;existe pas.</h1>
        <p className="mt-3 text-krisalys-gray-light">
          Elle a peut-être été déplacée, ou l&apos;adresse comporte une erreur.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <ButtonLink href="/">Retour à l&apos;accueil</ButtonLink>
          <Link href="/contact" className="inline-flex items-center px-5 py-2.5 text-sm text-krisalys-blue">
            Nous contacter
          </Link>
        </div>
      </Container>
    </section>
  );
}
