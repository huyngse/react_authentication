import { useState } from "react";
import { type AxiosResponse } from "axios";

export function useMutation<T, V>(apiCall: (data: V) => Promise<AxiosResponse<T>>) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T | null>(null);
    const [response, setResponse] = useState<AxiosResponse<T> | null>(null); 

    const mutate = async (payload: V) => {
        setLoading(true);
        setError(null);
        try {
            const res = await apiCall(payload);
            setData(res.data);
            setResponse(res);
            return res;
        } catch (err: any) {
            setError(err.message || "Unknown error");
            setResponse(err.response || null);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { data, response, loading, error, mutate };
}
