import { useEffect, useState } from "react";
import { getBooks } from "../../../services/library/book/books.api.ts";
import type { Book } from "../../../services/library/book/books.type.ts";
import { getMembers } from "../../../services/library/member/members.api.ts";
import type { Member } from "../../../services/library/member/members.type.ts";
import type { CreateLoanDTO, Loan } from "../../../services/library/loan/loans.type.ts";
import Button from "../../../shared/components/Button.tsx";

type LoanFormProps =
    | {
          mode: "create";
          initial?: Loan;
          onSubmit: (payload: CreateLoanDTO) => Promise<void>;
          onCancel?: () => void;
          showHeader?: boolean;
      }
    | {
          mode: "edit";
          initial: Loan;
          onSubmit: (payload: Partial<CreateLoanDTO>) => Promise<void>;
          onCancel?: () => void;
          showHeader?: boolean;
      };

export default function LoanForm({ mode, initial, onSubmit, onCancel, showHeader = true }: LoanFormProps) {
    const [idBook, setIdBook] = useState<number>(0);
    const [idMember, setIdMember] = useState<number>(0);
    const [bookQuery, setBookQuery] = useState("");
    const [memberQuery, setMemberQuery] = useState("");
    const [loanDate, setLoanDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [books, setBooks] = useState<Book[]>([]);
    const [members, setMembers] = useState<Member[]>([]);
    const [loadingRefs, setLoadingRefs] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (mode === "edit" && initial) {
            setLoanDate(initial.loan_date ?? "");
            setDueDate(initial.due_date ?? "");
            setReturnDate(initial.return_date ?? "");
        }
    }, [mode, initial]);

    useEffect(() => {
        if (mode !== "create") return;

        const pageSize = 6;

        async function loadReferences() {
            setLoadingRefs(true);
            try {
                const allBooks: Book[] = [];
                const allMembers: Member[] = [];

                let page = 0;
                while (true) {
                    const data = await getBooks(page);
                    const normalized = Array.isArray(data)
                        ? data
                        : (data as { data?: Book[] }).data ?? [];
                    allBooks.push(...normalized);
                    if (normalized.length < pageSize) break;
                    page += 1;
                    if (page > 50) break;
                }

                page = 0;
                while (true) {
                    const data = await getMembers(page);
                    allMembers.push(...data);
                    if (data.length < pageSize) break;
                    page += 1;
                    if (page > 50) break;
                }

                setBooks(allBooks);
                setMembers(allMembers);
            } catch (e) {
                setError(e instanceof Error ? e.message : String(e));
            } finally {
                setLoadingRefs(false);
            }
        }

        loadReferences();
    }, [mode]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setSaving(true);

        try {
            if (!loanDate.trim()) throw new Error("Loan date wajib diisi.");
            if (!dueDate.trim()) throw new Error("Due date wajib diisi.");

            const resolvedBookId =
                idBook ||
                Number(bookQuery) ||
                books.find((book) => book.book_name.toLowerCase() === bookQuery.toLowerCase())?.id_book ||
                0;
            const resolvedMemberId =
                idMember ||
                Number(memberQuery) ||
                members.find((member) => member.member_name.toLowerCase() === memberQuery.toLowerCase())?.id_member ||
                0;

            if (mode === "create") {
                if (!resolvedBookId || !resolvedMemberId) {
                    throw new Error("ID book dan ID member wajib diisi.");
                }
            }

            const payload: CreateLoanDTO = {
                id_book: resolvedBookId,
                id_member: resolvedMemberId,
                loan_date: loanDate.trim(),
                due_date: dueDate.trim(),
                return_date: returnDate.trim() || undefined,
            };

            await onSubmit(payload);
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        } finally {
            setSaving(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="grid max-w-[640px] gap-3">
            {showHeader && (
                <div className="grid gap-1">
                    <h2 className="text-xl font-semibold text-[#2f1f3a]">
                        {mode === "create" ? "Tambah Loan" : "Edit Loan"}
                    </h2>
                    <p className="text-sm text-[#6b5a80]">Lengkapi data peminjaman buku.</p>
                </div>
            )}

            {error && <p className="font-semibold text-[#a73c50]">Error: {error}</p>}

            {mode === "create" && (
                <>
                    <label className="grid gap-1.5 text-sm text-[#3e2f56]">
                        <span>ID Book</span>
                        <input
                            className="w-full rounded-xl border border-[#6f5a8c]/20 bg-white/90 px-3 py-2 shadow-[inset_0_1px_2px_rgba(30,18,50,0.06)] focus:border-[#ff91c7]/70 focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#ff91c7]/50"
                            list="loan-books"
                            value={bookQuery}
                            onChange={(e) => {
                                const value = e.target.value;
                                setBookQuery(value);
                                const parsed = Number(value);
                                setIdBook(Number.isFinite(parsed) ? parsed : 0);
                            }}
                            disabled={loadingRefs}
                        />
                        <span className="text-xs text-[#6b5a80]">Ketik nama buku atau ID.</span>
                        <datalist id="loan-books">
                            {books.map((book) => (
                                <option
                                    key={book.id_book}
                                    value={book.book_name}
                                    label={`#${book.id_book}`}
                                />
                            ))}
                        </datalist>
                    </label>

                    <label className="grid gap-1.5 text-sm text-[#3e2f56]">
                        <span>ID Member</span>
                        <input
                            className="w-full rounded-xl border border-[#6f5a8c]/20 bg-white/90 px-3 py-2 shadow-[inset_0_1px_2px_rgba(30,18,50,0.06)] focus:border-[#ff91c7]/70 focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#ff91c7]/50"
                            list="loan-members"
                            value={memberQuery}
                            onChange={(e) => {
                                const value = e.target.value;
                                setMemberQuery(value);
                                const parsed = Number(value);
                                setIdMember(Number.isFinite(parsed) ? parsed : 0);
                            }}
                            disabled={loadingRefs}
                        />
                        <span className="text-xs text-[#6b5a80]">Ketik nama member atau ID.</span>
                        <datalist id="loan-members">
                            {members.map((member) => (
                                <option
                                    key={member.id_member}
                                    value={member.member_name}
                                    label={`#${member.id_member}`}
                                />
                            ))}
                        </datalist>
                        {loadingRefs && <span className="text-xs text-[#6b5a80]">Loading data...</span>}
                    </label>
                </>
            )}

            <label className="grid gap-1.5 text-sm text-[#3e2f56]">
                <span>Loan Date</span>
                <input
                    className="w-full rounded-xl border border-[#6f5a8c]/20 bg-white/90 px-3 py-2 shadow-[inset_0_1px_2px_rgba(30,18,50,0.06)] focus:border-[#ff91c7]/70 focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#ff91c7]/50"
                    type="date"
                    value={loanDate}
                    onChange={(e) => setLoanDate(e.target.value)}
                />
            </label>

            <label className="grid gap-1.5 text-sm text-[#3e2f56]">
                <span>Due Date</span>
                <input
                    className="w-full rounded-xl border border-[#6f5a8c]/20 bg-white/90 px-3 py-2 shadow-[inset_0_1px_2px_rgba(30,18,50,0.06)] focus:border-[#ff91c7]/70 focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#ff91c7]/50"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </label>

            <label className="grid gap-1.5 text-sm text-[#3e2f56]">
                <span>Return Date</span>
                <input
                    className="w-full rounded-xl border border-[#6f5a8c]/20 bg-white/90 px-3 py-2 shadow-[inset_0_1px_2px_rgba(30,18,50,0.06)] focus:border-[#ff91c7]/70 focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#ff91c7]/50"
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                />
            </label>

            <div className="flex flex-wrap gap-2.5">
                <Button variant="primary" type="submit" disabled={saving}>
                    {saving ? "Menyimpan..." : mode === "create" ? "Create" : "Update"}
                </Button>

                {onCancel && (
                    <Button variant="ghost" type="button" onClick={onCancel} disabled={saving}>
                        Cancel
                    </Button>
                )}
            </div>
        </form>
    );
}
