import type { InputHTMLAttributes } from "react";
import "./style.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, ...props }: InputProps) => (
  <label className="modal-label">
    {label}
    <input className="modal-input" {...props} />
  </label>
);
