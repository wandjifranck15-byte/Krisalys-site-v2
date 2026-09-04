import { FAQItem } from "@/types";
import type { Locale } from "@/types";

const faqItemsFr: FAQItem[] = [
  { category: "technique", question: "Les écrans résistent-ils à la pluie et à la poussière ?", answer: "Le choix du produit dépend de son exposition réelle sur site. Pour les installations extérieures, nous sélectionnons des solutions adaptées aux contraintes climatiques locales et réalisons une étude préalable avant toute recommandation." },
  { category: "technique", question: "Quelle est la durée de vie d'un écran LED ?", answer: "Elle varie selon le produit choisi, les conditions d'utilisation et la qualité de la maintenance. Nous vous communiquons les informations spécifiques au produit retenu lors de l'étude de votre projet." },
  { category: "technique", question: "Les écrans consomment-ils beaucoup d'électricité ?", answer: "La consommation dépend de la taille, de la luminosité et du temps d'utilisation de l'écran. Ce point est étudié avec vous en amont afin d'intégrer cette donnée dans votre décision." },
  { category: "technique", question: "Peut-on changer les contenus facilement une fois l'écran installé ?", answer: "Oui, la gestion de contenu est conçue pour être prise en main par vos équipes après une formation. Nous restons disponibles en assistance si besoin." },
  { category: "commercial", question: "Est-ce adapté à mon type de bâtiment ?", answer: "Chaque projet fait l'objet d'une étude spécifique. Le configurateur en ligne vous donne une première orientation, mais seule une étude personnalisée permet de confirmer la solution la plus adaptée." },
  { category: "commercial", question: "Combien coûte un projet d'écran LED ?", answer: "Le coût dépend de la taille, du type d'écran et de la complexité d'installation. Nous ne communiquons pas de tarif générique afin d'éviter toute estimation trompeuse : chaque devis est établi après étude du projet." },
  { category: "commercial", question: "Combien de temps dure une installation ?", answer: "Le délai dépend de l'ampleur du projet et sera précisé dans la proposition qui vous sera adressée après l'étude de votre bâtiment." },
  { category: "commercial", question: "Comment se déroule une étude de projet ?", answer: "L'étude suit les étapes présentées sur la page Notre méthode : découverte, analyse du bâtiment, simulation visuelle, conseils, puis proposition détaillée." },
  { category: "apres-vente", question: "Que se passe-t-il en cas de panne après l'installation ?", answer: "Un contrat de maintenance corrective peut être mis en place pour intervenir selon des délais convenus à l'avance. Voir la page Maintenance & Support pour le détail des offres." },
  { category: "apres-vente", question: "Puis-je demander une simulation avant de commander ?", answer: "Oui, la simulation visuelle de votre façade fait partie intégrante de notre méthode, avant toute proposition commerciale." },
];

const faqItemsEn: FAQItem[] = [
  { category: "technique", question: "Do the screens withstand rain and dust?", answer: "Product choice depends on its actual on-site exposure. For outdoor installations, we select solutions suited to local climate conditions and carry out a preliminary assessment before any recommendation." },
  { category: "technique", question: "What is the lifespan of an LED screen?", answer: "It varies depending on the product chosen, usage conditions and maintenance quality. We provide the specific information for the selected product during your project assessment." },
  { category: "technique", question: "Do the screens use a lot of electricity?", answer: "Consumption depends on the screen's size, brightness and usage time. This is assessed with you upfront so it can factor into your decision." },
  { category: "technique", question: "Can content be changed easily once the screen is installed?", answer: "Yes, content management is designed to be handled by your teams after training. We remain available for support if needed." },
  { category: "commercial", question: "Is this suited to my type of building?", answer: "Every project undergoes a specific assessment. The online configurator gives you a first recommendation, but only a personalized study can confirm the most suitable solution." },
  { category: "commercial", question: "How much does an LED screen project cost?", answer: "Cost depends on size, screen type and installation complexity. We do not communicate generic pricing to avoid misleading estimates: every quote is prepared after a project assessment." },
  { category: "commercial", question: "How long does an installation take?", answer: "Timing depends on the scope of the project and will be specified in the proposal sent to you after assessing your building." },
  { category: "commercial", question: "How does a project assessment work?", answer: "The assessment follows the steps presented on the Our Method page: discovery, building analysis, visual simulation, recommendation, then a detailed proposal." },
  { category: "apres-vente", question: "What happens if there's a fault after installation?", answer: "A corrective maintenance contract can be set up to intervene within agreed timeframes. See the Maintenance & Support page for offer details." },
  { category: "apres-vente", question: "Can I request a simulation before ordering?", answer: "Yes, a visual simulation of your facade is an integral part of our method, before any commercial proposal." },
];

export function getFaqItems(locale: Locale = "fr"): FAQItem[] {
  return locale === "en" ? faqItemsEn : faqItemsFr;
}

export const faqItems = faqItemsFr;
