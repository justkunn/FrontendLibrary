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
        <div className="modal-backdrop" onClick={onClose}>
            <div
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-label={title ?? "Dialog"}
                onClick={(event) => event.stopPropagation()}
            >
                <div className="modal__header">
                    {title && <h3 className="modal__title">{title}</h3>}
                    <button className="modal__close" type="button" onClick={onClose} aria-label="Close">
                        x
                    </button>
                </div>
                <div className="modal__body">{children}</div>
            </div>
        </div>
    );
}
