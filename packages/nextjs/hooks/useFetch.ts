import { useCallback, useEffect, useState } from "react";

export function useFetch(uri: string) {
  const [data, setData] = useState<any>();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const get = useCallback(async () => {
    setIsLoading(true);

    try {
      const result = await fetch(uri);
      setData(await result.json());
      setIsError(false);
    } catch (e) {
      setIsError(true);
    }

    setIsLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uri]);

  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uri]);

  return { data, setData, refetch: get, isLoading, isError };
}
