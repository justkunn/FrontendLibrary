export type CoreResponse<TData> = {
    status: string;
    message: string;
    data: TData;
    response_code: number;
    timestamp: string;
};

export type CreateLoanDTO = {
    id_book: number;
    id_member: number;
    loan_date: string;
    due_date: string;
    return_date?: string;
};

export type Loan = {
    id_loan: number;
    book: {
        id_book: number;
        book_name: string;
    } | string;
    member: {
        id_member: number;
        member_name: string;
    } | string;
    loan_date: string;
    due_date: string;
    return_date?: string;
    timestamp: string;
};
