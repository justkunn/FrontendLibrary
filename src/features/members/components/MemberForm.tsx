import { useEffect, useState } from "react";
import type { CreateMemberDTO, Member, UpdateMemberDTO } from "../../../services/library/member/members.type.ts";
import Button from "../../../shared/components/Button.tsx";

type MemberFormProps =
    | {
          mode: "create";
          initial?: Member;
          onSubmit: (payload: CreateMemberDTO) => Promise<void>;
          onCancel?: () => void;
          showHeader?: boolean;
      }
    | {
          mode: "edit";
          initial: Member;
          onSubmit: (payload: UpdateMemberDTO) => Promise<void>;
          onCancel?: () => void;
          showHeader?: boolean;
      };

export default function MemberForm({ mode, initial, onSubmit, onCancel, showHeader = true }: MemberFormProps) {
    const [name, setName] = useState("");
    const [age, setAge] = useState<number>(18);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [level, setLevel] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (mode === "edit" && initial) {
            setName(initial.member_name ?? "");
            setAge(initial.age ?? 18);
            setPhoneNumber(initial.phone_number ?? "");
            setEmail(initial.email ?? "");
            setLevel(initial.level ?? "");
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
            const resolvedLevel = level.trim();

            if (!resolvedName) throw new Error("Nama member wajib diisi.");

            const payload: CreateMemberDTO = {
                member_name: resolvedName,
                age,
                phone_number: resolvedPhone,
                email: resolvedEmail,
                level: resolvedLevel,
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
                        {mode === "create" ? "Tambah Member" : "Edit Member"}
                    </h2>
                    <p className="text-sm text-[#6b5a80]">Lengkapi data member untuk layanan perpustakaan.</p>
                </div>
            )}

            {error && <p className="font-semibold text-[#a73c50]">Error: {error}</p>}

            <label className="grid gap-1.5 text-sm text-[#3e2f56]">
                <span>Nama Member</span>
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
                <span>Phone Number</span>
                <input
                    className="w-full rounded-xl border border-[#6f5a8c]/20 bg-white/90 px-3 py-2 shadow-[inset_0_1px_2px_rgba(30,18,50,0.06)] focus:border-[#ff91c7]/70 focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#ff91c7]/50"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                <span>Level</span>
                <input
                    className="w-full rounded-xl border border-[#6f5a8c]/20 bg-white/90 px-3 py-2 shadow-[inset_0_1px_2px_rgba(30,18,50,0.06)] focus:border-[#ff91c7]/70 focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#ff91c7]/50"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
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
