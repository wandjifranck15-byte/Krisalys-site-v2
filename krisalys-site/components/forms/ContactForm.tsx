"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormValues } from "@/lib/validations/contact";
import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-white/15 bg-krisalys-black px-4 py-3 text-sm text-white placeholder:text-krisalys-gray-dark focus:border-krisalys-blue focus:outline-none";
const labelClass = "mb-1.5 block text-sm font-medium text-krisalys-gray-light";
const errorClass = "mt-1 text-xs text-krisalys-orange";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactFormSchema) });

  const onSubmit = async (values: ContactFormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("request-failed");
      setSubmitted(true);
      reset();
    } catch {
      setServerError(
        "Une erreur est survenue lors de l'envoi. Vous pouvez aussi nous contacter directement via WhatsApp."
      );
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-krisalys-blue/30 bg-krisalys-anthracite p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-krisalys-blue" />
        <h3 className="text-lg font-semibold text-white">Merci pour votre demande.</h3>
        <p className="text-sm text-krisalys-gray-light">
          Notre équipe analysera votre projet et vous recontactera afin de préparer une simulation
          personnalisée.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">Nom complet</label>
          <input id="name" className={inputClass} {...register("name")} />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="company">Entreprise</label>
          <input id="company" className={inputClass} {...register("company")} />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">Téléphone</label>
          <input id="phone" className={inputClass} {...register("phone")} />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="email">Adresse email</label>
          <input id="email" type="email" className={inputClass} {...register("email")} />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="city">Ville</label>
          <input id="city" className={inputClass} {...register("city")} />
          {errors.city && <p className={errorClass}>{errors.city.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="buildingType">Type de bâtiment</label>
          <input id="buildingType" className={inputClass} {...register("buildingType")} />
          {errors.buildingType && <p className={errorClass}>{errors.buildingType.message}</p>}
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="message">Votre message</label>
        <textarea id="message" rows={4} className={inputClass} {...register("message")} />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      {serverError && <p className="text-sm text-krisalys-orange">{serverError}</p>}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
      </Button>
    </form>
  );
}
