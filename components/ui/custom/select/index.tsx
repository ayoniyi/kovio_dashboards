/** @format */
import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../../shadcn/select";
import { Controller, Control, FieldValues } from "react-hook-form";

interface SelectProps<T extends FieldValues = any> {
  data: { id: string | number; value: string }[];
  placeholder?: string;
  control: Control<T>;
  name: string;
  rules?: any;
  error?: string;
  defaultValue?: string;
  disabled?: boolean;

  renderItem?: (item: {
    id: string | number;
    value: string;
  }) => React.ReactNode;
  className?: string;
}

const CustomSelect: React.FC<SelectProps> = ({
  data,
  placeholder = "Select",
  control,
  name,
  rules,
  renderItem,
  error,
  defaultValue,

  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger
              className={`w-full ${error ? "border-red-500" : ""}`}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {data.map((item) =>
                  renderItem ? (
                    renderItem(item)
                  ) : (
                    <SelectItem key={item.id.toString()} value={item.value}>
                      {item.value}
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default CustomSelect;
