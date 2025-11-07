import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

function formatDate(date: Date | undefined, locale: string = "pt-BR") {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

interface DatePickerProps {
  /** Unique identifier for the input */
  id?: string;
  /** Currently selected date */
  value?: Date;
  /** Callback when date changes */
  onChange?: (date: Date | undefined) => void;
  /** Callback when input loses focus */
  onBlur?: () => void;
  /** Placeholder text for input */
  placeholder?: string;
  /** Locale for date formatting */
  locale?: string;
  /** Whether the field has validation errors */
  invalid?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Disable the date picker */
  disabled?: boolean;
}

export function DatePicker({
  id,
  value,
  onChange,
  onBlur,
  placeholder = "Selecione uma data",
  locale = "pt-BR",
  invalid = false,
  className,
  disabled = false,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(value);

  // Update month when external value changes
  React.useEffect(() => {
    if (value) {
      setMonth(value);
    }
  }, [value]);

  const handleSelectDate = (selectedDate: Date | undefined) => {
    onChange?.(selectedDate);
    setOpen(false);
  };

  return (
    <div className={cn("relative flex gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen} modal>
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground",
            )}
            disabled={disabled}
            aria-invalid={invalid}
            onBlur={onBlur}
          >
            <CalendarIcon className="mr-2 size-4" />
            {value ? formatDate(value, locale) : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0">
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            month={month}
            onMonthChange={setMonth}
            onSelect={handleSelectDate}
            disabled={false}
            endMonth={new Date(2035, 11)}
            locale={ptBR}
          />
          <div className="border-t p-3">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => {
                const today = new Date();
                onChange?.(today);
                setMonth(today);
              }}
            >
              Hoje
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
