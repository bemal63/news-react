import { useEffect, useState } from "react";

interface FetchFunction<P, T> {
  (params?: P): Promise<T>;
}

interface UseFetchResult<T> {
  data: T | null | undefined;
  isLoading: boolean;
  error: Error | null;

}

export const useFetch = <T, P>(fetchFunction: FetchFunction<P, T>, params?: P): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const stringParams = params ? JSON.stringify(params) : "";

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await fetchFunction(params);
        if (active) setData(result);
      } catch (error) {
        if (active) { setError(error as Error); setData(null); }
      } finally {
        if (active) setIsLoading(false);
      }
    })();
    return () => { active = false; };
  }, [fetchFunction, stringParams]); 
  return { data, isLoading, error };
};
