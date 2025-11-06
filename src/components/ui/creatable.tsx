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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, Plus } from "lucide-react";
import { useCallback, useState } from "react";

export interface CreatableOption {
  value: string;
  label: string;
}

interface CreatableProps {
  /** Unique identifier for the input */
  id?: string;
  /** Currently selected value */
  value: string;
  /** Callback when selection changes */
  onChange: (value: string) => void;
  /** Available options to select from */
  options: CreatableOption[];
  /** Callback when user creates a new option. If not provided, creation is disabled. */
  onCreateOption?: (option: CreatableOption) => void;
  /** Text shown when no option is selected */
  placeholder?: string;
  /** Placeholder for search input */
  searchPlaceholder?: string;
  /** Customize the "Create" button label */
  createLabel?: (value: string) => string;
  /** Max length for search input */
  maxLength?: number;
  /** Whether the field has validation errors */
  invalid?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function Creatable({
  id,
  value,
  onChange,
  options,
  onCreateOption,
  placeholder = "Selecione uma opção",
  searchPlaceholder = "Digite algo",
  createLabel = (value) => `Adicionar "${value}"`,
  maxLength = 24,
  invalid = false,
  className,
}: CreatableProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const selectedOption = options.find((option) => option.value === value);

  // Reset search when popover closes
  const handleOpenChange = useCallback((isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setSearchValue("");
    }
  }, []);

  // Select existing option and close
  const handleSelectOption = useCallback(
    (optionValue: string) => {
      onChange(optionValue);
      setOpen(false);
      setSearchValue("");
    },
    [onChange],
  );

  // Create new option from search value
  const handleCreateOption = useCallback(() => {
    const trimmedValue = searchValue.trim();
    if (!trimmedValue || !onCreateOption) return;

    const newOption: CreatableOption = {
      value: trimmedValue,
      label: trimmedValue,
    };

    onCreateOption(newOption);
    onChange(trimmedValue);
    setOpen(false);
    setSearchValue("");
  }, [searchValue, onChange, onCreateOption]);

  // Check if search matches any existing option
  const hasMatchingOption = useCallback(
    (search: string) => {
      const lowerSearch = search.toLowerCase();
      return options.some((opt) =>
        opt.label.toLowerCase().includes(lowerSearch),
      );
    },
    [options],
  );

  // Handle Enter key in search input
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (
        e.key === "Enter" &&
        searchValue.trim() &&
        !hasMatchingOption(searchValue)
      ) {
        e.preventDefault();
        handleCreateOption();
      }
    },
    [searchValue, hasMatchingOption, handleCreateOption],
  );

  return (
    <Popover open={open} onOpenChange={handleOpenChange} modal={true}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-invalid={invalid}
          className={cn("w-full justify-between", className)}
        >
          {selectedOption?.label || placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="pointer-events-auto p-0"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <Command className="w-full">
          <CommandInput
            placeholder={searchPlaceholder}
            value={searchValue}
            onValueChange={setSearchValue}
            maxLength={maxLength}
            onKeyDown={handleKeyDown}
          />
          <CommandList>
            {onCreateOption && (
              <CommandEmpty className="w-full p-4">
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={handleCreateOption}
                  disabled={!searchValue.trim()}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {createLabel(searchValue)}
                </Button>
              </CommandEmpty>
            )}
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  value={option.label}
                  key={option.value}
                  onSelect={() => handleSelectOption(option.value)}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      option.value === value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
