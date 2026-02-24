// Data book dari backend
export type Book = {
    id_book: number;
    book_name: string;
    total_page: string;
    publisher: string;
    author: string;
    release_year: number;
    stock: number;
    cover?: string;
};

// Data saat create
export type CreateBookDTO = {
    book_name: string;
    total_page: string;
    publisher: string;
    author: string;
    release_year: number;
    stock: number;
    cover?: string;
};

// Data saat update (partial)
export type UpdateBookDTO = Partial<CreateBookDTO>;
