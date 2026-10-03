"use client";

import { useEffect, useRef, useState } from "react";

import { ContactMethodIcon, methodAccent } from "@/components/contact-method-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CONTACT_METHOD_CONFIG,
  CONTACT_METHODS,
  type ContactMethod,
  getHandleError,
  inputPropsForKind,
} from "@/lib/contact-methods";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "sending" | "ok" | "error";

const fieldClass = "h-11 rounded-xl px-3";

export const ContactForm = () => {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [handleInvalid, setHandleInvalid] = useState(false);
  const [method, setMethod] = useState<ContactMethod>("email");
  const [handle, setHandle] = useState("");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const config = CONTACT_METHOD_CONFIG[method];
  const inputProps = inputPropsForKind(config.kind);

  const handleMethodChange = (next: ContactMethod) => {
    if (CONTACT_METHOD_CONFIG[next].kind !== config.kind) setHandle("");
    setMethod(next);
    setHandleInvalid(false);
    setError(null);
    setStatus("idle");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const handleError = getHandleError(method, handle);
    if (handleError) {
      setStatus("error");
      setError(handleError);
      setHandleInvalid(true);
      return;
    }

    setStatus("sending");
    setError(null);
    setHandleInvalid(false);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      method,
      handle: handle.trim(),
      message: String(formData.get("message") ?? ""),
      company: String(formData.get("company") ?? ""),
      startedAt: startedAt.current,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { error?: string; field?: string | null };
      if (!res.ok) {
        setStatus("error");
        setError(data.error ?? "Something went wrong");
        setHandleInvalid(data.field === "handle");
        return;
      }
      setStatus("ok");
      form.reset();
      setHandle("");
      startedAt.current = Date.now();
    } catch {
      setStatus("error");
      setError("Network error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-lg flex-col gap-5"
      aria-labelledby="contact-heading"
      noValidate
    >
      <h2 id="contact-heading" className="text-center font-tesla text-lg tracking-[0.25em]">
        TRANSMIT
      </h2>

      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          required
          autoComplete="name"
          maxLength={120}
          className={fieldClass}
        />
      </div>

      <fieldset className="grid gap-2">
        <legend className="mb-2 text-sm font-medium">Reach me via</legend>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
          {CONTACT_METHODS.map((value) => {
            const selected = value === method;
            const accent = methodAccent(value);
            return (
              <label key={value} className="relative">
                <input
                  type="radio"
                  name="method"
                  value={value}
                  checked={selected}
                  onChange={() => handleMethodChange(value)}
                  className="peer sr-only"
                />
                <span
                  className={cn(
                    "flex min-h-16 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-border/60 bg-muted/20 px-1 py-2 text-muted-foreground transition-colors",
                    "hover:border-border hover:text-foreground",
                    "peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50",
                    selected && "border-foreground/70 bg-muted/50 text-foreground",
                  )}
                  style={selected && accent ? { color: accent } : undefined}
                >
                  <ContactMethodIcon method={value} />
                  <span
                    className={cn(
                      "max-w-full truncate text-[0.65rem] leading-none",
                      selected ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {CONTACT_METHOD_CONFIG[value].label}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-2">
        <Label htmlFor="handle">{config.fieldLabel}</Label>
        <Input
          key={config.kind}
          id="handle"
          name="handle"
          required
          value={handle}
          onChange={(event) => setHandle(event.target.value)}
          type={inputProps.type}
          inputMode={inputProps.inputMode}
          autoComplete={inputProps.autoComplete}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder={config.placeholder}
          maxLength={254}
          aria-invalid={handleInvalid || undefined}
          aria-describedby={config.hint ? "handle-hint" : undefined}
          className={fieldClass}
        />
        {config.hint ? (
          <p id="handle-hint" className="text-xs text-muted-foreground">
            {config.hint}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={4}
          maxLength={4000}
          className="min-h-28 rounded-xl px-3 py-2.5"
        />
      </div>

      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <Button type="submit" disabled={status === "sending"} className="h-11 w-full rounded-xl">
        {status === "sending" ? "Sending…" : "Send"}
      </Button>

      <p
        className={cn(
          "min-h-5 text-center text-xs",
          status === "ok" && "text-emerald-500",
          status === "error" && "text-destructive",
          status !== "ok" && status !== "error" && "text-transparent",
        )}
        role="status"
        aria-live="polite"
      >
        {status === "ok" ? "ok" : error}
      </p>
    </form>
  );
};
