import React, { useEffect, useState } from "react";

const useAsync = <T,>(fn: () => Promise<T>, deps?: any[]) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>();
  const [result, setRes] = useState<T | undefined>();

  useEffect(() => {
    setLoading(true);
    let cancel = false;
    fn().then(
      (res) => {
        if (cancel) return;
        setLoading(false);
        setRes(res);
      },
      (error) => {
        if (cancel) return;
        setLoading(false);
        setError(error);
      }
    );
    return () => {
      cancel = true;
    };
  }, []);

  return { loading, error, result };
};

export default useAsync;
