import { apiGet, apiPost, apiPut, apiDelete } from "../../http/client.ts";
import type { Book, CreateBookDTO, UpdateBookDTO } from "./books.type";

// GET /books
export function getBooks() {
    return apiGet<Book[]>("/book/get/all");
}

// GET /books/:id
export function getBookById(id: number) {
    return apiGet<Book>(`/book/get/${id}`);
}

// POST /books
export function createBook(payload: CreateBookDTO) {
    return apiPost<Book>("/book/add", payload);
}

// PUT /books/:id
export function updateBook(id: number, payload: UpdateBookDTO) {
    return apiPut<Book>(`/book/edit/${id}`, payload);
}

// DELETE /books/:id
export function deleteBook(id: number) {
    return apiDelete<void>(`/book/delete/${id}`);
}
