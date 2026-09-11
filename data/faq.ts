import { FAQItem } from "@/types";
import type { Locale } from "@/types";

// Phase 11 : vocabulaire généralisé aux deux technologies piliers (film LED
// transparent / écran LED transparent) — auparavant rédigé avec "écran LED"
// comme terme générique par défaut, résidu du positionnement précédent.
// Informations factuelles conservées à l'identique lorsqu'elles restaient
// valides ; seul le vocabulaire a été neutralisé. Deux nouvelles questions
// ajoutées (différence film/écran, comment savoir quelle solution convient)
// sans jamais établir de hiérarchie universelle entre les deux technologies.
const faqItemsFr: FAQItem[] = [
  { category: "technique", question: "Quelle est la différence entre un film LED transparent et un écran LED transparent ?", answer: "Le film LED transparent s'applique directement sur un vitrage existant, sans en modifier la structure. L'écran LED transparent est une structure autonome, intégrée à la surface vitrée ou à proximité. Aucune des deux n'est systématiquement supérieure à l'autre : le choix dépend de votre projet, de votre surface et de vos objectifs." },
  { category: "technique", question: "Comment savoir quelle solution convient à mon projet ?", answer: "Cela dépend de plusieurs éléments : le type de surface, l'environnement intérieur ou extérieur, les contraintes du bâtiment et le résultat recherché. Notre configurateur en ligne donne une première orientation ; une étude personnalisée permet ensuite de confirmer la solution la plus adaptée." },
  { category: "technique", question: "Ces solutions résistent-elles à la pluie et à la poussière ?", answer: "Le choix du produit dépend de son exposition réelle sur site. Pour les installations extérieures, nous sélectionnons des solutions adaptées aux contraintes climatiques locales et réalisons une étude préalable avant toute recommandation." },
  { category: "technique", question: "Quelle est la durée de vie d'une solution LED transparente ?", answer: "Elle varie selon le produit choisi, les conditions d'utilisation et la qualité de la maintenance. Nous vous communiquons les informations spécifiques au produit retenu lors de l'étude de votre projet." },
  { category: "technique", question: "Ces solutions consomment-elles beaucoup d'électricité ?", answer: "La consommation dépend de la taille, de la luminosité et du temps d'utilisation de la solution installée. Ce point est étudié avec vous en amont afin d'intégrer cette donnée dans votre décision." },
  { category: "technique", question: "Peut-on changer les contenus facilement une fois la solution installée ?", answer: "Oui, la gestion de contenu est conçue pour être prise en main par vos équipes après une formation. Nous restons disponibles en assistance si besoin." },
  { category: "commercial", question: "Est-ce adapté à mon type de bâtiment ?", answer: "Chaque projet fait l'objet d'une étude spécifique. Le configurateur en ligne vous donne une première orientation, mais seule une étude personnalisée permet de confirmer la solution la plus adaptée — film ou écran LED transparent." },
  { category: "commercial", question: "Combien coûte un projet de film ou d'écran LED transparent ?", answer: "Le coût dépend de la technologie retenue, de la taille et de la complexité d'installation. Nous ne communiquons pas de tarif générique afin d'éviter toute estimation trompeuse : chaque devis est établi après étude du projet." },
  { category: "commercial", question: "Combien de temps dure une installation ?", answer: "Le délai dépend de l'ampleur du projet et sera précisé dans la proposition qui vous sera adressée après l'étude de votre bâtiment." },
  { category: "commercial", question: "Comment se déroule une étude de projet ?", answer: "L'étude suit les étapes présentées sur la page Notre méthode : découverte, analyse du bâtiment, simulation visuelle, conseils, puis proposition détaillée." },
  { category: "apres-vente", question: "Que se passe-t-il en cas de panne après l'installation ?", answer: "Un contrat de maintenance corrective peut être mis en place pour intervenir selon des délais convenus à l'avance. Voir la page Maintenance & Support pour le détail de notre accompagnement." },
  { category: "apres-vente", question: "Puis-je demander une simulation avant de commander ?", answer: "Oui, la simulation visuelle de votre façade fait partie intégrante de notre méthode, avant toute proposition commerciale." },
];

const faqItemsEn: FAQItem[] = [
  { category: "technique", question: "What is the difference between a transparent LED film and a transparent LED screen?", answer: "Transparent LED film is applied directly onto existing glazing, without altering its structure. A transparent LED screen is a standalone structure, integrated into or near the glazed surface. Neither is systematically superior to the other: the choice depends on your project, your surface and your objectives." },
  { category: "technique", question: "How do I know which solution fits my project?", answer: "This depends on several factors: the type of surface, the indoor or outdoor environment, the building's constraints and the desired outcome. Our online configurator gives a first recommendation; a personalized assessment then confirms the most suitable solution." },
  { category: "technique", question: "Do these solutions withstand rain and dust?", answer: "Product choice depends on its actual on-site exposure. For outdoor installations, we select solutions suited to local climate conditions and carry out a preliminary assessment before any recommendation." },
  { category: "technique", question: "What is the lifespan of a transparent LED solution?", answer: "It varies depending on the product chosen, usage conditions and maintenance quality. We provide the specific information for the selected product during your project assessment." },
  { category: "technique", question: "Do these solutions use a lot of electricity?", answer: "Consumption depends on the size, brightness and usage time of the installed solution. This is assessed with you upfront so it can factor into your decision." },
  { category: "technique", question: "Can content be changed easily once the solution is installed?", answer: "Yes, content management is designed to be handled by your teams after training. We remain available for support if needed." },
  { category: "commercial", question: "Is this suited to my type of building?", answer: "Every project undergoes a specific assessment. The online configurator gives you a first recommendation, but only a personalized study can confirm the most suitable solution — film or transparent LED screen." },
  { category: "commercial", question: "How much does a transparent LED film or screen project cost?", answer: "Cost depends on the technology chosen, size and installation complexity. We do not communicate generic pricing to avoid misleading estimates: every quote is prepared after a project assessment." },
  { category: "commercial", question: "How long does an installation take?", answer: "Timing depends on the scope of the project and will be specified in the proposal sent to you after assessing your building." },
  { category: "commercial", question: "How does a project assessment work?", answer: "The assessment follows the steps presented on the Our Method page: discovery, building analysis, visual simulation, recommendation, then a detailed proposal." },
  { category: "apres-vente", question: "What happens if there's a fault after installation?", answer: "A corrective maintenance contract can be set up to intervene within agreed timeframes. See the Maintenance & Support page for details of our support." },
  { category: "apres-vente", question: "Can I request a simulation before ordering?", answer: "Yes, a visual simulation of your facade is an integral part of our method, before any commercial proposal." },
];

export function getFaqItems(locale: Locale = "fr"): FAQItem[] {
  return locale === "en" ? faqItemsEn : faqItemsFr;
}

export const faqItems = faqItemsFr;
