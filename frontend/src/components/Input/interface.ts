import { ReactNode } from "react";

export interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  children?: ReactNode;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  id?: string;
  required?: boolean;
  typeInput?: string;
}
