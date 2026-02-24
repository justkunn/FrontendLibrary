import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { createEmployee, deleteEmployee, getEmployees, updateEmployee } from "../../services/library/employe/employees.api.ts";
import type { CreateEmployeeDTO, Employee, UpdateEmployeeDTO } from "../../services/library/employe/employees.type.ts";
import EmployeeCard from "./components/EmployeeCard.tsx";
import EmployeeForm from "./components/EmployeeForm.tsx";
import Navbar from "../../shared/components/Navbar.tsx";
import Button from "../../shared/components/Button.tsx";
import Modal from "../../shared/components/Modal.tsx";

type EmployeesPageProps = {
    onBack?: () => void;
};

export default function EmployeesPage({ onBack }: EmployeesPageProps) {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [page, setPage] = useState(0);
    const pageSize = 6;
    const hasNextPage = employees.length === pageSize;
    const [showCreate, setShowCreate] = useState(false);
    const [editing, setEditing] = useState<Employee | null>(null);

    async function loadEmployees(targetPage = page) {
        setLoading(true);
        setError("");
        try {
            const data = await getEmployees(targetPage);
            setEmployees(data);
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadEmployees();
    }, [page]);

    async function handleCreate(payload: CreateEmployeeDTO) {
        await createEmployee(payload);
        setShowCreate(false);
        await loadEmployees();
    }

    async function handleUpdate(payload: UpdateEmployeeDTO) {
        if (!editing) return;
        await updateEmployee(editing.id_employee, payload);
        setEditing(null);
        await loadEmployees();
    }

    async function handleDelete(employee: Employee) {
        const ok = confirm("Yakin mau hapus employee ini?");
        if (!ok) return;

        try {
            await deleteEmployee(employee.id_employee);
            await loadEmployees();
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
            <Navbar title="Employees" />
            <header className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#8d7aa5]">Staff</p>
                    <h2 className="mt-2 text-base text-[#5e4f73]">Kelola data pegawai dengan tampilan kartu.</h2>
                </div>
                <div className="flex flex-wrap gap-2.5">
                    {onBack && (
                        <Button variant="ghost" onClick={onBack}>
                            Dashboard
                        </Button>
                    )}
                    <Button variant="ghost" onClick={loadEmployees} disabled={loading}>
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
                title="Tambah Employee"
                onClose={() => setShowCreate(false)}
            >
                <EmployeeForm
                    mode="create"
                    onSubmit={handleCreate}
                    onCancel={() => setShowCreate(false)}
                    showHeader={false}
                />
            </Modal>

            <Modal
                open={Boolean(editing)}
                title="Edit Employee"
                onClose={() => setEditing(null)}
            >
                {editing && (
                    <EmployeeForm
                        mode="edit"
                        initial={editing}
                        onSubmit={handleUpdate}
                        onCancel={() => setEditing(null)}
                        showHeader={false}
                    />
                )}
            </Modal>

            {!loading && !error && employees.length === 0 && (
                <div className="grid max-w-[320px] gap-3 rounded-2xl bg-white/70 p-5 text-[#5a4a6e]">
                    <p>Data kosong.</p>
                </div>
            )}

            {!loading && !error && employees.length > 0 && (
                <section className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
                    {employees.map((employee) => (
                        <EmployeeCard
                            key={employee.id_employee}
                            employee={employee}
                            onEdit={() => {
                                setShowCreate(false);
                                setEditing(employee);
                            }}
                            onDelete={() => handleDelete(employee)}
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
