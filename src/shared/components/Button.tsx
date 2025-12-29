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
    const classes = [
        "btn",
        variant ? `btn--${variant}` : "",
        size ? `btn--${size}` : "",
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
