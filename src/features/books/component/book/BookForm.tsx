import { useEffect, useState } from "react";
import type { Book, CreateBookDTO, UpdateBookDTO } from "../../../../services/library/book/books.type.ts";
import { uploadCoverImage } from "../../../../services/supabase/storage.ts";
import Button from "../../../../shared/components/Button.tsx";

type BookFormProps =
    | {
          mode: "create";
          initial?: Book;
          onSubmit: (payload: CreateBookDTO) => Promise<void>;
          onCancel?: () => void;
          showHeader?: boolean;
      }
    | {
          mode: "edit";
          initial: Book;
          onSubmit: (payload: UpdateBookDTO) => Promise<void>;
          onCancel?: () => void;
          showHeader?: boolean;
      };

export default function BookForm({ mode, initial, onSubmit, onCancel, showHeader = true }: BookFormProps) {
    const [bookName, setBookName] = useState("");
    const [totalPage, setTotalPage] = useState("");
    const [publisher, setPublisher] = useState("");
    const [author, setAuthor] = useState("");
    const [release, setRelease] = useState<number>(2025);
    const [stock, setStock] = useState<number>(0);
    const [coverUrl, setCoverUrl] = useState<string>("");
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (mode === "edit" && initial) {
            setBookName(initial.book_name ?? "");
            setTotalPage(initial.total_page ?? "");
            setPublisher(initial.publisher ?? "");
            setAuthor(initial.author ?? "");
            setRelease(initial.release_year ?? 2025);
            setStock(initial.stock ?? 0);
            setCoverUrl(initial.cover ?? "");
            setCoverFile(null);
        }
    }, [mode, initial]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setSaving(true);

        try {
            if (!bookName.trim()) throw new Error("Nama buku wajib diisi.");
            if (!author.trim()) throw new Error("Author wajib diisi.");
            if (!publisher.trim()) throw new Error("Publisher wajib diisi.");

            let resolvedCover = coverUrl.trim();
            if (coverFile) {
                setUploading(true);
                const { publicUrl } = await uploadCoverImage(coverFile);
                resolvedCover = publicUrl;
                setCoverUrl(publicUrl);
            }

            if (mode === "create") {
                const payload: CreateBookDTO = {
                    book_name: bookName,
                    total_page: totalPage,
                    publisher,
                    author,
                    release_year :release,
                    stock,
                    cover: resolvedCover || undefined,
                };
                await onSubmit(payload);
            } else {
                const payload: UpdateBookDTO = {
                    book_name: bookName,
                    total_page: totalPage,
                    publisher,
                    author,
                    release_year : release,
                    stock,
                    cover: resolvedCover || undefined,
                };
                await onSubmit(payload);
            }
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        } finally {
            setSaving(false);
            setUploading(false);
        }
    }

    const busy = saving || uploading;

    return (
        <form onSubmit={handleSubmit} className="grid max-w-[640px] gap-3">
            {showHeader && (
                <div className="grid gap-1">
                    <h2 className="text-xl font-semibold text-[#2f1f3a]">
                        {mode === "create" ? "Tambah Buku" : "Edit Buku"}
                    </h2>
                    <p className="text-sm text-[#6b5a80]">Lengkapi detail buku agar siap tampil.</p>
                </div>
            )}

            {error && <p className="font-semibold text-[#a73c50]">Error: {error}</p>}

            <label className="grid gap-1.5 text-sm text-[#3e2f56]">
                <span>Nama Buku</span>
                <input
                    className="w-full rounded-xl border border-[#6f5a8c]/20 bg-white/90 px-3 py-2 shadow-[inset_0_1px_2px_rgba(30,18,50,0.06)] focus:border-[#ff91c7]/70 focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#ff91c7]/50"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                />
            </label>

            <label className="grid gap-1.5 text-sm text-[#3e2f56]">
                <span>Halaman (text)</span>
                <input
                    className="w-full rounded-xl border border-[#6f5a8c]/20 bg-white/90 px-3 py-2 shadow-[inset_0_1px_2px_rgba(30,18,50,0.06)] focus:border-[#ff91c7]/70 focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#ff91c7]/50"
                    value={totalPage}
                    onChange={(e) => setTotalPage(e.target.value)}
                />
            </label>

            <label className="grid gap-1.5 text-sm text-[#3e2f56]">
                <span>Publisher</span>
                <input
                    className="w-full rounded-xl border border-[#6f5a8c]/20 bg-white/90 px-3 py-2 shadow-[inset_0_1px_2px_rgba(30,18,50,0.06)] focus:border-[#ff91c7]/70 focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#ff91c7]/50"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                />
            </label>

            <label className="grid gap-1.5 text-sm text-[#3e2f56]">
                <span>Author</span>
                <input
                    className="w-full rounded-xl border border-[#6f5a8c]/20 bg-white/90 px-3 py-2 shadow-[inset_0_1px_2px_rgba(30,18,50,0.06)] focus:border-[#ff91c7]/70 focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#ff91c7]/50"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
            </label>

            <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))]">
                <label className="grid gap-1.5 text-sm text-[#3e2f56]">
                    <span>Release (tahun)</span>
                    <input
                        className="w-full rounded-xl border border-[#6f5a8c]/20 bg-white/90 px-3 py-2 shadow-[inset_0_1px_2px_rgba(30,18,50,0.06)] focus:border-[#ff91c7]/70 focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#ff91c7]/50"
                        type="number"
                        value={release}
                        onChange={(e) => setRelease(Number(e.target.value))}
                    />
                </label>

                <label className="grid gap-1.5 text-sm text-[#3e2f56]">
                    <span>Stock</span>
                    <input
                        className="w-full rounded-xl border border-[#6f5a8c]/20 bg-white/90 px-3 py-2 shadow-[inset_0_1px_2px_rgba(30,18,50,0.06)] focus:border-[#ff91c7]/70 focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#ff91c7]/50"
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(Number(e.target.value))}
                    />
                </label>
            </div>

            <label className="grid gap-1.5 text-sm text-[#3e2f56]">
                <span>Cover (upload)</span>
                <input
                    className="w-full rounded-xl border border-[#6f5a8c]/20 bg-white/90 px-3 py-2 shadow-[inset_0_1px_2px_rgba(30,18,50,0.06)] focus:border-[#ff91c7]/70 focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#ff91c7]/50"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
                />
                {coverFile && (
                    <span className="text-xs text-[#6b5a80]">Selected: {coverFile.name}</span>
                )}
                {coverUrl && !coverFile && (
                    <span className="text-xs text-[#6b5a80]">Current URL: {coverUrl}</span>
                )}
            </label>

            <div className="flex flex-wrap gap-2.5">
                <Button variant="primary" type="submit" disabled={busy}>
                    {uploading ? "Uploading..." : saving ? "Menyimpan..." : mode === "create" ? "Create" : "Update"}
                </Button>

                {onCancel && (
                    <Button variant="ghost" type="button" onClick={onCancel} disabled={busy}>
                        Cancel
                    </Button>
                )}
            </div>
        </form>
    );
}
