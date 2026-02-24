import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { createMember, deleteMember, getMembers, updateMember } from "../../services/library/member/members.api.ts";
import type { CreateMemberDTO, Member, UpdateMemberDTO } from "../../services/library/member/members.type.ts";
import MemberCard from "./components/MemberCard.tsx";
import MemberForm from "./components/MemberForm.tsx";
import Navbar from "../../shared/components/Navbar.tsx";
import Button from "../../shared/components/Button.tsx";
import Modal from "../../shared/components/Modal.tsx";

type MembersPageProps = {
    onBack?: () => void;
};

export default function MembersPage({ onBack }: MembersPageProps) {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [page, setPage] = useState(0);
    const pageSize = 6;
    const hasNextPage = members.length === pageSize;
    const [showCreate, setShowCreate] = useState(false);
    const [editing, setEditing] = useState<Member | null>(null);

    async function loadMembers(targetPage = page) {
        setLoading(true);
        setError("");
        try {
            const data = await getMembers(targetPage);
            setMembers(data);
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadMembers();
    }, [page]);

    async function handleCreate(payload: CreateMemberDTO) {
        await createMember(payload);
        setShowCreate(false);
        await loadMembers();
    }

    async function handleUpdate(payload: UpdateMemberDTO) {
        if (!editing) return;
        await updateMember(editing.id_member, payload);
        setEditing(null);
        await loadMembers();
    }

    async function handleDelete(member: Member) {
        const ok = confirm("Yakin mau hapus member ini?");
        if (!ok) return;

        try {
            await deleteMember(member.id_member);
            await loadMembers();
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
            <Navbar title="Members" />
            <header className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#8d7aa5]">Community</p>
                    <h2 className="mt-2 text-base text-[#5e4f73]">Kelola data member dengan tampilan kartu.</h2>
                </div>
                <div className="flex flex-wrap gap-2.5">
                    {onBack && (
                        <Button variant="ghost" onClick={onBack}>
                            Dashboard
                        </Button>
                    )}
                    <Button variant="ghost" onClick={loadMembers} disabled={loading}>
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
                title="Tambah Member"
                onClose={() => setShowCreate(false)}
            >
                <MemberForm
                    mode="create"
                    onSubmit={handleCreate}
                    onCancel={() => setShowCreate(false)}
                    showHeader={false}
                />
            </Modal>

            <Modal
                open={Boolean(editing)}
                title="Edit Member"
                onClose={() => setEditing(null)}
            >
                {editing && (
                    <MemberForm
                        mode="edit"
                        initial={editing}
                        onSubmit={handleUpdate}
                        onCancel={() => setEditing(null)}
                        showHeader={false}
                    />
                )}
            </Modal>

            {!loading && !error && members.length === 0 && (
                <div className="grid max-w-[320px] gap-3 rounded-2xl bg-white/70 p-5 text-[#5a4a6e]">
                    <p>Data kosong.</p>
                </div>
            )}

            {!loading && !error && members.length > 0 && (
                <section className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
                    {members.map((member) => (
                        <MemberCard
                            key={member.id_member}
                            member={member}
                            onEdit={() => {
                                setShowCreate(false);
                                setEditing(member);
                            }}
                            onDelete={() => handleDelete(member)}
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
