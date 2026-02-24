import type { Loan } from "../../../services/library/loan/loans.type.ts";
import Button from "../../../shared/components/Button.tsx";

type LoanCardProps = {
    loan: Loan;
    onEdit: () => void;
    onDelete: () => void;
};

export default function LoanCard({ loan, onEdit, onDelete }: LoanCardProps) {
    const bookLabel =
        typeof loan.book === "string" ? loan.book : loan.book?.book_name ?? "Book";
    const memberLabel =
        typeof loan.member === "string" ? loan.member : loan.member?.member_name ?? "Member";

    return (
        <article className="flex min-h-full flex-col rounded-[20px] border border-white/85 bg-white/90 shadow-[0_18px_40px_rgba(63,41,90,0.12)] animate-floatIn">
            <div className="grid gap-4 p-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#6b5a80]">Loan #{loan.id_loan}</p>
                        <h3 className="text-[1.2rem] font-semibold text-[#2f1f3a]">{bookLabel}</h3>
                    </div>
                    <span className="rounded-full bg-[#ffd492]/80 px-3 py-1.5 text-sm font-semibold text-[#4c2c2c]">
                        {memberLabel}
                    </span>
                </div>

                <dl className="grid gap-2.5 text-sm text-[#3e2f56]">
                    <div className="grid grid-cols-[90px_1fr] gap-2.5">
                        <dt className="font-semibold text-[#5a4a6e]">Loan Date</dt>
                        <dd>{loan.loan_date}</dd>
                    </div>
                    <div className="grid grid-cols-[90px_1fr] gap-2.5">
                        <dt className="font-semibold text-[#5a4a6e]">Due Date</dt>
                        <dd>{loan.due_date}</dd>
                    </div>
                    <div className="grid grid-cols-[90px_1fr] gap-2.5">
                        <dt className="font-semibold text-[#5a4a6e]">Return Date</dt>
                        <dd>{loan.return_date || "-"}</dd>
                    </div>
                </dl>
            </div>

            <div className="mt-auto flex flex-wrap gap-2.5 px-5 pb-5">
                <Button onClick={onEdit}>Edit</Button>
                <Button variant="ghost" onClick={onDelete}>
                    Delete
                </Button>
            </div>
        </article>
    );
}
