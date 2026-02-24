import { apiDelete, apiGet, apiPost, apiPut } from "../../http/client.ts";
import type { ApiResponse, CreateMemberDTO, Member, UpdateMemberDTO } from "./members.type.ts";

export function getMembers(page = 0) {
    return apiGet<ApiResponse<Member[]>>(`/member/get/all?page=${page}`).then((res) => res.data ?? []);
}

export function getMemberById(id: number) {
    return apiGet<ApiResponse<Member>>(`/member/get/${id}`).then((res) => res.data);
}

export function createMember(payload: CreateMemberDTO) {
    return apiPost<ApiResponse<Member>>("/member/add", payload).then((res) => res.data);
}

export function updateMember(id: number, payload: UpdateMemberDTO) {
    return apiPut<ApiResponse<Member>>(`/member/edit/${id}`, payload).then((res) => res.data);
}

export function deleteMember(id: number) {
    return apiDelete<ApiResponse<null>>(`/member/delete/${id}`);
}
