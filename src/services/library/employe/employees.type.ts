export type ApiResponse<TData> = {
    status: string;
    message: string;
    data: TData;
    response_code: number;
    timestamp: string;
};

export type Employee = {
    id_employee: number;
    employee_name: string;
    age: number;
    email: string;
    phone_number: string;
    position: string;
};

export type CreateEmployeeDTO = {
    employee_name: string;
    age: number;
    email: string;
    phone_number: string;
    position: string;
};

export type UpdateEmployeeDTO = Partial<CreateEmployeeDTO>;
