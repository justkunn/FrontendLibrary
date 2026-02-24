import { apiDelete, apiGet, apiPost, apiPut } from "../../http/client.ts";
import type { ApiResponse, CreateEmployeeDTO, Employee, UpdateEmployeeDTO } from "./employees.type.ts";

export function getEmployees(page = 0) {
    return apiGet<ApiResponse<Employee[]>>(`/employe/get/all?page=${page}`).then((res) => res.data ?? []);
}

export function getEmployeeById(id: number) {
    return apiGet<ApiResponse<Employee>>(`/employe/get/${id}`).then((res) => res.data);
}

export function createEmployee(payload: CreateEmployeeDTO) {
    return apiPost<ApiResponse<Employee>>("/employe/add", payload).then((res) => res.data);
}

export function updateEmployee(id: number, payload: UpdateEmployeeDTO) {
    return apiPut<ApiResponse<Employee>>(`/employe/edit/${id}`, payload).then((res) => res.data);
}

export function deleteEmployee(id: number) {
    return apiDelete<ApiResponse<null>>(`/employe/delete/${id}`);
}
