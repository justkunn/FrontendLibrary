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
        <form onSubmit={handleSubmit} className="form">
            {showHeader && (
                <div className="form__header">
                    <h2 className="form__title">
                        {mode === "create" ? "Tambah Buku" : "Edit Buku"}
                    </h2>
                    <p className="form__hint">Lengkapi detail buku agar siap tampil.</p>
                </div>
            )}

            {error && <p className="form__error">Error: {error}</p>}

            <label className="field">
                <span>Nama Buku</span>
                <input
                    className="input"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                />
            </label>

            <label className="field">
                <span>Halaman (text)</span>
                <input
                    className="input"
                    value={totalPage}
                    onChange={(e) => setTotalPage(e.target.value)}
                />
            </label>

            <label className="field">
                <span>Publisher</span>
                <input
                    className="input"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                />
            </label>

            <label className="field">
                <span>Author</span>
                <input
                    className="input"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
            </label>

            <div className="field-row">
                <label className="field">
                    <span>Release (tahun)</span>
                    <input
                        className="input"
                        type="number"
                        value={release}
                        onChange={(e) => setRelease(Number(e.target.value))}
                    />
                </label>

                <label className="field">
                    <span>Stock</span>
                    <input
                        className="input"
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(Number(e.target.value))}
                    />
                </label>
            </div>

            <label className="field">
                <span>Cover (upload)</span>
                <input
                    className="input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
                />
                {coverFile && (
                    <span className="field__hint">Selected: {coverFile.name}</span>
                )}
                {coverUrl && !coverFile && (
                    <span className="field__hint">Current URL: {coverUrl}</span>
                )}
            </label>

            <div className="form__actions">
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
