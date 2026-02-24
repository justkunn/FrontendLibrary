import { useEffect, type ReactNode } from "react";

type ModalProps = {
    open: boolean;
    title?: string;
    onClose: () => void;
    children: ReactNode;
};

export default function Modal({ open, title, onClose, children }: ModalProps) {
    useEffect(() => {
        if (!open) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") onClose();
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-20 grid place-items-center bg-[rgba(14,16,30,0.5)] p-6"
            onClick={onClose}
        >
            <div
                className="w-full max-w-[720px] rounded-[20px] border border-white/90 bg-white/90 shadow-[0_20px_45px_rgba(28,18,54,0.28)] animate-floatIn"
                role="dialog"
                aria-modal="true"
                aria-label={title ?? "Dialog"}
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-center justify-between gap-3 px-5 pt-4">
                    {title && (
                        <h3 className="text-[1.3rem] font-semibold text-[#2f1f3a]">
                            {title}
                        </h3>
                    )}
                    <button
                        className="h-[34px] w-[34px] rounded-full bg-white/60 text-[#3e2f56] shadow-[0_6px_12px_rgba(63,41,90,0.16)] transition hover:-translate-y-0.5"
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        x
                    </button>
                </div>
                <div className="px-5 pb-6 pt-4">{children}</div>
            </div>
        </div>
    );
}
