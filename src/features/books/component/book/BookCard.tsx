import type { Book } from "../../../../services/library/book/books.type.ts";
import Button from "../../../../shared/components/Button.tsx";

type BookCardProps = {
  book: Book;
  onEdit: () => void;
  onDelete: () => void;
};

export default function BookCard({
  book,
  onEdit,
  onDelete,
}: BookCardProps) {
  const coverValue =
    typeof book.cover === "string" ? book.cover.trim() : "";
  const hasCover = Boolean(coverValue);

  return (
    <article className="flex min-h-full flex-col overflow-hidden rounded-[20px] border border-white/85 bg-white/90 shadow-[0_18px_40px_rgba(63,41,90,0.12)] animate-floatIn">
      <div className="flex h-[170px] items-center justify-center bg-[linear-gradient(135deg,rgba(255,210,220,0.7),rgba(210,223,255,0.8))]">
        {hasCover ? (
          <img
            src={coverValue}
            alt={`Cover ${book.book_name}`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-[0.9rem] uppercase tracking-[0.12em] text-[#5f4b73]">No cover</div>
        )}
      </div>

      <div className="grid gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#6b5a80]">Book #{book.id_book}</p>
            <h3 className="text-[1.2rem] font-semibold text-[#2f1f3a]">{book.book_name}</h3>
          </div>
          <span className="rounded-full bg-[#ffd492]/80 px-3 py-1.5 text-sm font-semibold text-[#4c2c2c]">
            {book.stock} stok
          </span>
        </div>

        <dl className="grid gap-2.5 text-sm text-[#3e2f56]">
          <div className="grid grid-cols-[90px_1fr] gap-2.5">
            <dt className="font-semibold text-[#5a4a6e]">Author</dt>
            <dd>{book.author}</dd>
          </div>
          <div className="grid grid-cols-[90px_1fr] gap-2.5">
            <dt className="font-semibold text-[#5a4a6e]">Publisher</dt>
            <dd>{book.publisher}</dd>
          </div>
          <div className="grid grid-cols-[90px_1fr] gap-2.5">
            <dt className="font-semibold text-[#5a4a6e]">Release</dt>
            <dd>{book.release_year}</dd>
          </div>
          <div className="grid grid-cols-[90px_1fr] gap-2.5">
            <dt className="font-semibold text-[#5a4a6e]">Pages</dt>
            <dd>{book.total_page || "-"}</dd>
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
