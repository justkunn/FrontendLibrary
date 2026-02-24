export type ApiResponse<TData> = {
    status: string;
    message: string;
    data: TData;
    response_code: number;
    timestamp: string;
};

export type Member = {
    id_member: number;
    member_name: string;
    age: number;
    phone_number: string;
    email: string;
    level: string;
};

export type CreateMemberDTO = {
    member_name: string;
    age: number;
    phone_number: string;
    email: string;
    level: string;
};

export type UpdateMemberDTO = Partial<CreateMemberDTO>;
