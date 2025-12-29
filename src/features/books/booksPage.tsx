import { useEffect, useState } from "react";
import { createBook, deleteBook, getBooks, updateBook } from "../../services/library/book/books.api.ts";
import type { Book, CreateBookDTO, UpdateBookDTO } from "../../services/library/book/books.type.ts";
import BookForm from "./component/book/BookForm.tsx";
import BookCard from "./component/book/BookCard.tsx";
import Navbar from "../../shared/components/Navbar.tsx";
import Button from "../../shared/components/Button.tsx";
import Modal from "../../shared/components/Modal.tsx";
import AddIcon from '@mui/icons-material/Add';

type BooksPageProps = {
    onBack?: () => void;
};

export default function BooksPage({ onBack }: BooksPageProps) {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // mode UI
    const [showCreate, setShowCreate] = useState(false);
    const [editing, setEditing] = useState<Book | null>(null);

    async function loadBooks() {
        setLoading(true);
        setError("");
        try {
            const data = await getBooks();
            console.info("[books] raw response", data);
            const normalized = Array.isArray(data)
                ? data
                : (data as { data?: Book[] }).data ?? [];
            console.info("[books] normalized", normalized);
            setBooks(normalized);
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadBooks();
    }, []);

    async function handleCreate(payload: CreateBookDTO) {
        await createBook(payload);
        setShowCreate(false);
        await loadBooks();
    }

    async function handleUpdate(payload: UpdateBookDTO) {
        if (!editing) return;
        await updateBook(editing.id_book, payload);
        setEditing(null);
        await loadBooks();
    }

    async function handleDelete(id_book: number) {
        const ok = confirm("Yakin mau hapus buku ini?");
        if (!ok) return;

        try {
            await deleteBook(id_book);
            await loadBooks();
        } catch (e) {
            alert(e instanceof Error ? e.message : String(e));
        }
    }

    function handleCreateClick() {
        setEditing(null);
        setShowCreate(true);
    }

    return (
        <main className="page">
            <Navbar title="Books" />
            <header className="page__header">
                <div>
                    <p className="eyebrow">Collections</p>
                    <h2 className="page__subtitle">Kelola daftar buku dengan tampilan kartu.</h2>
                </div>
                <div className="page__actions">
                    {onBack && (
                        <Button variant="ghost" onClick={onBack}>
                            Dashboard
                        </Button>
                    )}
                    <Button variant="ghost" onClick={loadBooks} disabled={loading}>
                        Refresh
                    </Button>
                    <Button variant="primary" onClick={handleCreateClick} size="xs" className="rounded-full">
                        <AddIcon />
                    </Button>
                </div>
            </header>

            {loading && <p className="status status--loading">Loading...</p>}
            {error && <p className="status status--error">Error: {error}</p>}

            {/* CREATE */}
            <Modal
                open={showCreate}
                title="Tambah Buku"
                onClose={() => setShowCreate(false)}
            >
                <BookForm
                    mode="create"
                    onSubmit={handleCreate}
                    onCancel={() => setShowCreate(false)}
                    showHeader={false}
                />
            </Modal>

            {/* EDIT */}
            <Modal
                open={Boolean(editing)}
                title="Edit Buku"
                onClose={() => setEditing(null)}
            >
                {editing && (
                    <BookForm
                        mode="edit"
                        initial={editing}
                        onSubmit={handleUpdate}
                        onCancel={() => setEditing(null)}
                        showHeader={false}
                    />
                )}
            </Modal>

            {!loading && !error && books.length === 0 && (
                <div className="empty-card">
                    <p className="empty-card__text">Data kosong.</p>
                </div>
            )}

            {!loading && !error && books.length > 0 && (
                <section className="book-grid">
                    {books.map((b) => (
                        <BookCard
                            key={b.id_book}
                            book={b}
                            onEdit={() => {
                                setShowCreate(false);
                                setEditing(b);
                            }}
                            onDelete={() => handleDelete(b.id_book)}
                        />
                    ))}
                </section>
            )}
        </main>
    );
}
