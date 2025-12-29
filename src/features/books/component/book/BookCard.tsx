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
    <article className="book-card">
      <div className="book-card__media">
        {hasCover ? (
          <img
            src={coverValue}
            alt={`Cover ${book.book_name}`}
            loading="lazy"
          />
        ) : (
          <div className="book-card__placeholder">No Cover</div>
        )}
      </div>

      <div className="book-card__body">
        <div className="book-card__header">
          <div>
            <p className="book-card__eyebrow">Book #{book.id_book}</p>
            <h3 className="book-card__title">{book.book_name}</h3>
          </div>
          <span className="book-card__badge">{book.stock} stok</span>
        </div>

        <dl className="book-card__details">
          <div>
            <dt>Author</dt>
            <dd>{book.author}</dd>
          </div>
          <div>
            <dt>Publisher</dt>
            <dd>{book.publisher}</dd>
          </div>
          <div>
            <dt>Release</dt>
            <dd>{book.release_year}</dd>
          </div>
          <div>
            <dt>Pages</dt>
            <dd>{book.total_page || "-"}</dd>
          </div>
        </dl>
      </div>

      <div className="book-card__actions">
        <Button onClick={onEdit}>Edit</Button>
        <Button variant="ghost" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </article>
  );
}
