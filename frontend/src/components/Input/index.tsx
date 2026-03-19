import { useState } from "react";
import { InputProps } from "./interface";

export default function ContainerInput({
  label,
  name,
  id,
  className,
  onChange,
  placeholder,
  type,
  children,
  value,
  required,
}: InputProps) {
  

  return (
    <div className="mb-4 relative">
      {label && (
        <label
          htmlFor={id || name}
          className="block mb-1 text-sm font-medium text-white"
        >
          {label}
        </label>
      )}
      <input
        id={id || name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-6 py-4 text-white bg-primary border border-secondary rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
      />
      {children}

    </div>
  );
}
