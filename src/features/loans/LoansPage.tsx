import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { createLoan, deleteLoan, getLoans, updateLoan } from "../../services/library/loan/loans.api.ts";
import type { CreateLoanDTO, Loan } from "../../services/library/loan/loans.type.ts";
import LoanCard from "./components/LoanCard.tsx";
import LoanForm from "./components/LoanForm.tsx";
import Navbar from "../../shared/components/Navbar.tsx";
import Button from "../../shared/components/Button.tsx";
import Modal from "../../shared/components/Modal.tsx";

type LoansPageProps = {
    onBack?: () => void;
};

export default function LoansPage({ onBack }: LoansPageProps) {
    const [loans, setLoans] = useState<Loan[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [page, setPage] = useState(0);
    const pageSize = 6;
    const hasNextPage = loans.length === pageSize;
    const [showCreate, setShowCreate] = useState(false);
    const [editing, setEditing] = useState<Loan | null>(null);

    async function loadLoans(targetPage = page) {
        setLoading(true);
        setError("");
        try {
            const data = await getLoans(targetPage);
            setLoans(data);
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadLoans();
    }, [page]);

    async function handleCreate(payload: CreateLoanDTO) {
        await createLoan(payload);
        setShowCreate(false);
        await loadLoans();
    }

    async function handleUpdate(payload: Partial<CreateLoanDTO>) {
        if (!editing) return;
        await updateLoan(editing.id_loan, payload);
        setEditing(null);
        await loadLoans();
    }

    async function handleDelete(loan: Loan) {
        const ok = confirm("Yakin mau hapus loan ini?");
        if (!ok) return;

        try {
            await deleteLoan(loan.id_loan);
            await loadLoans();
        } catch (e) {
            alert(e instanceof Error ? e.message : String(e));
        }
    }

    function handleCreateClick() {
        setEditing(null);
        setShowCreate(true);
    }

    return (
        <main className="relative z-10 mx-auto grid w-full max-w-[1080px] gap-6 px-4 pb-16 pt-9 sm:px-6 sm:pb-20 sm:pt-12">
            <Navbar title="Loans" />
            <header className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#8d7aa5]">Loans</p>
                    <h2 className="mt-2 text-base text-[#5e4f73]">Kelola data peminjaman buku.</h2>
                </div>
                <div className="flex flex-wrap gap-2.5">
                    {onBack && (
                        <Button variant="ghost" onClick={onBack}>
                            Dashboard
                        </Button>
                    )}
                    <Button variant="ghost" onClick={loadLoans} disabled={loading}>
                        Refresh
                    </Button>
                    <Button variant="primary" onClick={handleCreateClick} size="xs" className="rounded-full">
                        <AddIcon />
                    </Button>
                </div>
            </header>

            {loading && (
                <p className="rounded-xl bg-[#d2dfff]/60 px-4 py-3 font-medium text-[#3654a8]">Loading...</p>
            )}
            {error && (
                <p className="rounded-xl bg-[#ffd2dc]/70 px-4 py-3 font-medium text-[#992b43]">
                    Error: {error}
                </p>
            )}

            <Modal
                open={showCreate}
                title="Tambah Loan"
                onClose={() => setShowCreate(false)}
            >
                <LoanForm
                    mode="create"
                    onSubmit={handleCreate}
                    onCancel={() => setShowCreate(false)}
                    showHeader={false}
                />
            </Modal>

            <Modal
                open={Boolean(editing)}
                title="Edit Loan"
                onClose={() => setEditing(null)}
            >
                {editing && (
                    <LoanForm
                        mode="edit"
                        initial={editing}
                        onSubmit={handleUpdate}
                        onCancel={() => setEditing(null)}
                        showHeader={false}
                    />
                )}
            </Modal>

            {!loading && !error && loans.length === 0 && (
                <div className="grid max-w-[320px] gap-3 rounded-2xl bg-white/70 p-5 text-[#5a4a6e]">
                    <p>Data kosong.</p>
                </div>
            )}

            {!loading && !error && loans.length > 0 && (
                <section className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
                    {loans.map((loan) => (
                        <LoanCard
                            key={loan.id_loan}
                            loan={loan}
                            onEdit={() => {
                                setShowCreate(false);
                                setEditing(loan);
                            }}
                            onDelete={() => handleDelete(loan)}
                        />
                    ))}
                </section>
            )}

            {!loading && !error && (page > 0 || hasNextPage) && (
                <div className="mt-2 flex items-center justify-center gap-3">
                    <Button
                        variant="ghost"
                        onClick={() => setPage((current) => Math.max(0, current - 1))}
                        disabled={page === 0}
                    >
                        Prev
                    </Button>
                    <span className="text-sm font-semibold text-[#4f4161]">Page {page + 1}</span>
                    <Button
                        variant="ghost"
                        onClick={() => setPage((current) => current + 1)}
                        disabled={!hasNextPage}
                    >
                        Next
                    </Button>
                </div>
            )}
        </main>
    );
}
