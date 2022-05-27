import useSWR, { SWRConfiguration } from "swr";
const fetcher = (...args: [key: string]) => fetch(...args).then((res) => res.json());

export const useProducts =<T extends Object> (url:string,config:SWRConfiguration = {}) => {
  const { error, data } = useSWR<T>(`/api/${url}`, fetcher,config);
  return {
      isError:error,
      isLoading: !data && !error,
      data:data 
  }
};
