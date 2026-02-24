import { useEffect, useState } from "react";
import type { CreateEmployeeDTO, Employee, UpdateEmployeeDTO } from "../../../services/library/employe/employees.type.ts";
import Button from "../../../shared/components/Button.tsx";

type EmployeeFormProps =
    | {
          mode: "create";
          initial?: Employee;
          onSubmit: (payload: CreateEmployeeDTO) => Promise<void>;
          onCancel?: () => void;
          showHeader?: boolean;
      }
    | {
          mode: "edit";
          initial: Employee;
          onSubmit: (payload: UpdateEmployeeDTO) => Promise<void>;
          onCancel?: () => void;
          showHeader?: boolean;
      };

export default function EmployeeForm({ mode, initial, onSubmit, onCancel, showHeader = true }: EmployeeFormProps) {
    const [name, setName] = useState("");
    const [age, setAge] = useState<number>();
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [position, setPosition] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (mode === "edit" && initial) {
            setName(initial.employee_name ?? "");
            setAge(initial.age ?? 20);
            setEmail(initial.email ?? "");
            setPhoneNumber(initial.phone_number ?? "");
            setPosition(initial.position ?? "");
        }
    }, [mode, initial]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setSaving(true);

        try {
            const resolvedName = name.trim();
            const resolvedEmail = email.trim();
            const resolvedPhone = phoneNumber.trim();
            const resolvedPosition = position.trim();

            if (!resolvedName) throw new Error("Nama employee wajib diisi.");

            const payload: CreateEmployeeDTO = {
                employee_name: resolvedName,
                age,
                email: resolvedEmail,
                phone_number: resolvedPhone,
                position: resolvedPosition,
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
                        {mode === "create" ? "Tambah Employee" : "Edit Employee"}
                    </h2>
                    <p className="text-sm text-[#6b5a80]">Lengkapi data pegawai agar operasional tetap lancar.</p>
                </div>
            )}

            {error && <p className="font-semibold text-[#a73c50]">Error: {error}</p>}

            <label className="grid gap-1.5 text-sm text-[#3e2f56]">
                <span>Nama Employee</span>
                <input
                    className="w-full rounded-xl border border-[#6f5a8c]/20 bg-white/90 px-3 py-2 shadow-[inset_0_1px_2px_rgba(30,18,50,0.06)] focus:border-[#ff91c7]/70 focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#ff91c7]/50"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>

            <label className="grid gap-1.5 text-sm text-[#3e2f56]">
                <span>Age</span>
                <input
                    className="w-full rounded-xl border border-[#6f5a8c]/20 bg-white/90 px-3 py-2 shadow-[inset_0_1px_2px_rgba(30,18,50,0.06)] focus:border-[#ff91c7]/70 focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#ff91c7]/50"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                />
            </label>

            <label className="grid gap-1.5 text-sm text-[#3e2f56]">
                <span>Email</span>
                <input
                    className="w-full rounded-xl border border-[#6f5a8c]/20 bg-white/90 px-3 py-2 shadow-[inset_0_1px_2px_rgba(30,18,50,0.06)] focus:border-[#ff91c7]/70 focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#ff91c7]/50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>

            <label className="grid gap-1.5 text-sm text-[#3e2f56]">
                <span>Phone Number</span>
                <input
                    className="w-full rounded-xl border border-[#6f5a8c]/20 bg-white/90 px-3 py-2 shadow-[inset_0_1px_2px_rgba(30,18,50,0.06)] focus:border-[#ff91c7]/70 focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#ff91c7]/50"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </label>

            <label className="grid gap-1.5 text-sm text-[#3e2f56]">
                <span>Position</span>
                <input
                    className="w-full rounded-xl border border-[#6f5a8c]/20 bg-white/90 px-3 py-2 shadow-[inset_0_1px_2px_rgba(30,18,50,0.06)] focus:border-[#ff91c7]/70 focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#ff91c7]/50"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
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
