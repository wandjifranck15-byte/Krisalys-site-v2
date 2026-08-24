"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContactFormSchema, ContactFormValues } from "@/lib/validations/contact";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { useDictionary } from "@/lib/i18n/LocaleContext";

const inputClass =
  "w-full rounded-lg border border-subtle bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-krisalys-blue-deep focus:outline-none";
const selectClass = inputClass + " appearance-none pr-10";
const labelClass = "mb-1.5 block text-sm font-medium text-ink-muted";
const errorClass = "mt-1 text-xs text-krisalys-blue-deep";

export default function ContactForm() {
  const dictionary = useDictionary();
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Le schéma est reconstruit à chaque changement de langue pour que les
  // messages d'erreur restent traduits (voir lib/validations/contact.ts).
  const schema = useMemo(() => createContactFormSchema(dictionary), [dictionary]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({ resolver: zodResolver(schema) });

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
      setServerError(dictionary.form.errorServer);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-krisalys-blue-deep/20 bg-surface p-10 text-center shadow-sm">
        <CheckCircle2 className="h-10 w-10 text-krisalys-blue-deep" />
        <h3 className="text-lg font-semibold text-ink">{dictionary.form.successTitle}</h3>
        <p className="text-sm text-ink-muted">{dictionary.form.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">{dictionary.form.name}</label>
          <input id="name" className={inputClass} {...register("name")} />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="company">{dictionary.form.company}</label>
          <input id="company" className={inputClass} {...register("company")} />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">{dictionary.form.phone}</label>
          <input id="phone" className={inputClass} {...register("phone")} />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="email">{dictionary.form.email}</label>
          <input id="email" type="email" className={inputClass} {...register("email")} />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="city">{dictionary.form.city}</label>
          <input id="city" className={inputClass} {...register("city")} />
          {errors.city && <p className={errorClass}>{errors.city.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="buildingType">{dictionary.form.buildingType}</label>
          <div className="relative">
            <select
              id="buildingType"
              className={selectClass}
              defaultValue=""
              {...register("buildingType")}
            >
              <option value="" disabled>{dictionary.form.buildingTypePlaceholder}</option>
              {dictionary.form.buildingTypeOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          </div>
          {errors.buildingType && <p className={errorClass}>{errors.buildingType.message}</p>}
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="message">{dictionary.form.message}</label>
        <textarea id="message" rows={4} className={inputClass} {...register("message")} />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      {serverError && <p className="text-sm text-krisalys-blue-deep">{serverError}</p>}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? dictionary.form.submitting : dictionary.form.submit}
      </Button>
    </form>
  );
}
