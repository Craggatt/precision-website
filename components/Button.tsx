import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { JSX } from "react";

interface ButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variation?: "primary" | "secondary" | "outline" | "destructive" | "tertiary";
  size?: "sm" | "md" | "lg";
  dark?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  loadingText?: string;
  onPress?: () => void;
  disabled?: boolean;
}

export function Button({
  className,
  text,
  variation = "primary",
  size = "md",
  dark = false,
  icon,
  iconPosition,
  isLoading = false,
  loadingText,
  disabled,
  ...props
}: ButtonProps): JSX.Element {
  const color = dark ? "dark" : "light";

  const sizeClasses = {
    sm: "px-300 py-100",
    md: "px-400 py-200",
    lg: "px-500 py-300",
  };

  const variationClasses = {
    light: {
      primary:
        "bg-brand-primary hover:bg-brand-primary-hover active:bg-brand-primary-active text-neutral-0",
      secondary:
        "bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 text-neutral-700",
      outline:
        "border border-neutral-300 hover:bg-neutral-200 hover:border-none active:bg-neutral-300 text-neutral-700",
      tertiary: "hover:underline text-neutral-700",
      destructive:
        "bg-red-600 hover:bg-red-700 active:bg-red-800 text-neutral-0",
    },
    dark: {
      primary:
        "bg-brand-primary hover:bg-brand-primary-hover active:bg-brand-primary-active text-neutral-0",
      secondary:
        "bg-neutral-600 hover:bg-neutral-500 active:bg-neutral-400 text-neutral-0",
      outline:
        "border border-neutral-400 hover:bg-neutral-500 hover:border-none active:bg-neutral-400 text-neutral-0",
      tertiary: "hover:underline text-neutral-700",
      destructive:
        "bg-red-600 hover:bg-red-700 active:bg-red-800 text-neutral-0",
    },
  };

  return (
    <button
      className={cn(
        className,
        sizeClasses[size],
        variationClasses[color][variation],
        "transition-all hover:scale-[99%] active:scale-[98%] rounded-sm text-label flex flex-row items-center justify-center gap-200",
      )}
      {...props}
      disabled={disabled}
    >
      {iconPosition === "left" && icon && icon}
      {isLoading ? loadingText : text}
      {isLoading && (
        <LoaderCircle className="animate-spin h-4 w-4" strokeWidth={3} />
      )}
      {iconPosition === "right" && icon && icon}
    </button>
  );
}
