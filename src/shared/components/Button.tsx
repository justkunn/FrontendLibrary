import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: "primary" | "ghost";
    size?: "xs";
};

export default function Button({
    children,
    variant,
    size,
    className,
    type = "button",
    ...rest
}: ButtonProps) {
    const base =
        "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-[0.95rem] font-semibold transition duration-150 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff93c8]/60 disabled:cursor-not-allowed disabled:opacity-60";
    const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
        primary:
            "bg-gradient-to-br from-[#ffd28b] to-[#ff93c8] text-[#2f1f3a] shadow-[0_10px_18px_rgba(255,142,196,0.3)]",
        ghost: "border border-white/90 bg-white/60 text-[#3e2f56]",
    };
    const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
        xs: "px-3 py-1.5 text-[0.85rem]",
    };

    const classes = [
        base,
        variant ? variants[variant] : "bg-white/80 text-[#3e2f56] shadow-[0_8px_16px_rgba(63,41,90,0.12)]",
        size ? sizes[size] : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button type={type} className={classes} {...rest}>
            {children}
        </button>
    );
}
