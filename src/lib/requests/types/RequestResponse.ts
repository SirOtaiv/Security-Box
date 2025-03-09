export type RequestErrorType = {
    message: string;
    status: number | undefined;
};

type RequestResponse<T> = {
    result?: T;
    error?: RequestErrorType;
};

export default RequestResponse;