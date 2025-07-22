"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MultiSelectWithDisabledProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabledOptions?: string[];
}

export function MultiSelectWithDisabled({
  options,
  value = [],
  onChange,
  placeholder = "Select items...",
  disabledOptions = [],
}: MultiSelectWithDisabledProps) {
  const [open, setOpen] = React.useState(false);

  const handleToggle = (item: string) => {
    if (disabledOptions.includes(item)) return;

    const newValue = value.includes(item)
      ? value.filter((v) => v !== item)
      : [...value, item];
    onChange(newValue);
  };

  const displayText =
    value.length === 0
      ? placeholder
      : value.length === 1
        ? value[0]
        : `${value.length} selected`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-9 w-full justify-between font-normal"
        >
          {displayText}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => {
              const isDisabled = disabledOptions.includes(option);
              return (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => handleToggle(option)}
                  disabled={isDisabled}
                  className={cn(isDisabled && "opacity-50 cursor-not-allowed")}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(option) ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <span className={cn(isDisabled && "text-muted-foreground")}>
                    {option}
                  </span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
