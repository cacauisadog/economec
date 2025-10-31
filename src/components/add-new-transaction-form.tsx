import { Creatable, type CreatableOption } from "@/components/ui/creatable";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const categories = [
  { value: "restaurante", label: "restaurante" },
  { value: "supermercado", label: "supermercado" },
  { value: "delivery", label: "delivery" },
  { value: "carro", label: "carro" },
];

const sources = [
  {
    label: "conta corrente nubank",
    value: "conta corrente nubank",
    type: "asset",
  },
  {
    label: "cartão de crédito nubank",
    value: "cartão de crédito nubank",
    type: "liability",
  },
];

const formSchema = z.object({
  type: z.enum(["expense", "income"]),
  value: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Formato inválido")
    .refine((val) => parseFloat(val) >= 0.01, {
      message: "O valor deve ser maior que R$ 0,00",
    })
    .refine((val) => parseFloat(val) <= 999999999.99, {
      message: "Você realmente transacionou algo na casa do bilhão?",
    }),
  description: z
    .string()
    .min(3, { message: "Pelo menos 3" })
    .max(512, { message: "Máx 512 chars" }),
  category: z.string().min(1, { message: "Selecione uma categoria" }),
  source: z
    .string()
    .min(1, { message: "Selecione uma origem" })
    .refine((val) => val !== "escolha", { message: "Selecione uma origem" }),
});

// Format cents value to currency display (e.g., 560 -> "R$ 5,60")
function formatCurrency(cents: number): string {
  const reais = Math.floor(cents / 100);
  const centavos = cents % 100;
  return `R$ ${reais},${centavos.toString().padStart(2, "0")}`;
}

// Parse input string to extract numeric value as cents
function parseInputToCents(input: string): number {
  // Extract only digits
  const cleaned = input.replace(/\D/g, "");
  if (!cleaned) return 0;
  return parseInt(cleaned, 10);
}

// Convert cents to decimal string for form submission (e.g., 560 -> "5.60")
function centsToDecimal(cents: number): string {
  return (cents / 100).toFixed(2);
}

export default function AddNewTransactionForm({
  className,
  formId,
}: {
  className?: string;
  formId: string;
}) {
  const [displayValue, setDisplayValue] = useState("R$ 0,00");
  const [possibleCategories, setPossibleCategories] =
    useState<CreatableOption[]>(categories);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "expense",
      value: "0.00",
      description: "",
      category: "",
      source: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Apply negative sign if it's an expense
    const finalValue =
      values.type === "expense" ? `-${values.value}` : values.value;

    console.log({
      ...values,
      value: finalValue,
    });
  }

  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("space-y-6", className)}
    >
      <FieldGroup>
        <Controller
          name="type"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <RadioGroup
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                className="flex gap-4"
                aria-invalid={fieldState.invalid}
              >
                <Field orientation="horizontal">
                  <RadioGroupItem value="expense" id="expense" />
                  <FieldLabel htmlFor="expense" className="font-normal">
                    Despesa
                  </FieldLabel>
                </Field>
                <Field orientation="horizontal">
                  <RadioGroupItem value="income" id="income" />
                  <FieldLabel htmlFor="income" className="font-normal">
                    Recebimento
                  </FieldLabel>
                </Field>
              </RadioGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="value"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="value">Valor</FieldLabel>
              <Input
                id="value"
                type="tel"
                value={displayValue}
                maxLength={15}
                onChange={(e) => {
                  const cents = parseInputToCents(e.target.value);
                  const formatted = formatCurrency(cents);
                  setDisplayValue(formatted);
                  field.onChange(centsToDecimal(cents));
                }}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="description">Descrição</FieldLabel>
              <Input
                {...field}
                id="description"
                placeholder="Ex.: almoço no MacDonald's"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="category"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="category">Categoria</FieldLabel>
              <Creatable
                id="category"
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                }}
                options={possibleCategories}
                onCreateOption={(newOption) => {
                  setPossibleCategories((prev) => [...prev, newOption]);
                }}
                placeholder="Selecione uma categoria"
                invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="source"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="source">Origem</FieldLabel>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger id="source" aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent position="item-aligned">
                  <SelectItem value="escolha">Escolha da lista</SelectItem>
                  <SelectSeparator />
                  {sources.map((source) => (
                    <SelectItem key={source.value} value={source.value}>
                      {source.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
