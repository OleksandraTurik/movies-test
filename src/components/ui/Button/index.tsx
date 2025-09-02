import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./style.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "cancel" | "danger";
}

export const Button = ({
  children,
  variant = "primary",
  ...props
}: ButtonProps) => (
  <button className={`btn ${variant}`} {...props}>
    {children}
  </button>
);
