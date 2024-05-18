import { useCallback, useEffect, useState } from "react";

export function useTokenURI(contract: any, tokenId: bigint) {
  const [uri, setUri] = useState<string>();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetch = useCallback(async () => {
    setIsLoading(true);

    try {
      const result = await contract.read.tokenURI([tokenId]);
      console.log(result);
      setUri(result);
      setIsError(false);
    } catch (e) {
      setIsError(true);
    }

    setIsLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract?.address, tokenId]);

  useEffect(() => {
    async function get() {
      await fetch();
    }

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract?.address, tokenId]);

  return { uri, setUri, refetch: fetch, isLoading, isError };
}
