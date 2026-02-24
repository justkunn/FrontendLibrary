import { apiDelete, apiGet, apiPost, apiPut } from "../../http/client.ts";
import type { CoreResponse, CreateLoanDTO, Loan } from "./loans.type.ts";

export function getLoans(page = 0) {
    return apiGet<CoreResponse<Loan[]>>(`/loan/get/all?page=${page}`).then((res) => res.data ?? []);
}

export function getLoanById(id: number) {
    return apiGet<CoreResponse<Loan>>(`/loan/get/${id}`).then((res) => res.data);
}

export function createLoan(payload: CreateLoanDTO) {
    return apiPost<CoreResponse<Loan>>("/loan/add", payload).then((res) => res.data);
}

export function updateLoan(id: number, payload: Partial<CreateLoanDTO>) {
    return apiPut<CoreResponse<Loan>>(`/loan/edit/${id}`, payload).then((res) => res.data);
}

export function deleteLoan(id: number) {
    return apiDelete<CoreResponse<null>>(`/loan/delete/${id}`);
}
