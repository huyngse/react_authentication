import { useState, useEffect, useCallback, useRef } from "react";
import { type AxiosResponse } from "axios";

export function useApi<T>(apiCall: () => Promise<AxiosResponse<T>>) {
    const [data, setData] = useState<T | null>(null);
    const [response, setResponse] = useState<AxiosResponse<T> | null>(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const isFetchingRef = useRef(false);

    const fetchData = useCallback(() => {
        if (isFetchingRef.current) return;

        let isMounted = true;
        isFetchingRef.current = true;
        setLoading(true);
        setError(null);

        apiCall()
            .then((res) => {
                if (isMounted) {
                    setData(res.data);
                    setResponse(res); 
                }
            })
            .catch((err: any) => {
                if (isMounted) {
                    setError(err.message || "Unknown error");
                    setResponse(err.response || null);
                }
            })
            .finally(() => {
                if (isMounted) setLoading(false);
                isFetchingRef.current = false;
            });

        return () => {
            isMounted = false;
        };
    }, [apiCall]);

    useEffect(() => {
        const cleanup = fetchData();
        return cleanup;
    }, [fetchData]);

    return { data, response, loading, error, refetch: fetchData };
}
