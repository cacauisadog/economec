import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const categories = [
  { value: "restaurante", label: "restaurante" },
  { value: "supermercado", label: "supermercado" },
  { value: "delivery", label: "delivery" },
  { value: "carro", label: "carro" },
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
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [possibleCategories, setPossibleCategories] = useState(categories);
  const [categoryValue, setCategoryValue] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "expense",
      value: "0.00",
      description: "",
      category: "",
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

  function addNewCategory() {
    const newCategory = {
      value: categoryValue,
      label: categoryValue,
    };
    setPossibleCategories((prev) => [...prev, newCategory]);
    form.setValue("category", categoryValue, {
      shouldValidate: true,
    });
    setCategoryOpen(false);
  }

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-6", className)}
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="expense" id="expense" />
                    <Label htmlFor="expense">Despesa</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="income" id="income" />
                    <Label htmlFor="income">Recebimento</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <Input
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input placeholder="Ex.: almoço no MacDonald's" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => {
            const selectedCategory = possibleCategories.find(
              (category) => category.value === field.value,
            );

            return (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={categoryOpen}
                      >
                        {selectedCategory?.label || "Selecione uma categoria"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent portal={false} className="w-full p-0">
                    <Command className="w-full">
                      <CommandInput
                        placeholder="Digite algo"
                        value={categoryValue}
                        onValueChange={setCategoryValue}
                        maxLength={24}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const hasMatch = possibleCategories.some((cat) =>
                              cat.label
                                .toLowerCase()
                                .includes(categoryValue.toLowerCase()),
                            );
                            if (!hasMatch && categoryValue.trim()) {
                              e.preventDefault();
                              addNewCategory();
                            }
                          }
                        }}
                      />
                      <CommandList>
                        <CommandEmpty className="w-full p-4">
                          <Button
                            variant="ghost"
                            className="w-full"
                            onClick={addNewCategory}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Adicionar "{categoryValue}"
                          </Button>
                        </CommandEmpty>
                        <CommandGroup>
                          {possibleCategories.map((category) => (
                            <CommandItem
                              value={category.label}
                              key={category.value}
                              onSelect={() => {
                                form.setValue("category", category.value, {
                                  shouldValidate: true,
                                });
                                setCategoryOpen(false);
                              }}
                            >
                              {category.label}
                              <Check
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  category.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </form>
    </Form>
  );
}
