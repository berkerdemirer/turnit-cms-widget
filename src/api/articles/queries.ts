import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api";
import qs from "qs";

export const useFetchArticles = (
  urlId?: number,
  locale?: string,
  config?: any,
  searchTerms?: string,
) => {
  const query = {
    urlPath: {
      equals: urlId,
    },
  };

  const searchQuery = {
    rawContent: {
      contains: searchTerms,
    },
  };
  const stringifiedQuery = qs.stringify(
    {
      locale: locale,
      where: urlId ? query : searchQuery,
    },
    { addQueryPrefix: true },
  );
  const fetchArticles = async () => {
    return (await apiClient.get(`short-articles${stringifiedQuery}`)).data;
  };

  return useQuery(
    ["short-articles", urlId, locale, searchTerms],
    fetchArticles,
    {
      ...config,
      retry: 0,
    },
  );
};

export interface UrlPaths {
  docs: Array<{ id: number; urlPath: string }>;
}
export const useFetchUrlPaths = () => {
  const fetchUrlPaths = async () => {
    return (await apiClient.get<UrlPaths>("paths")).data;
  };

  return useQuery(["url-paths"], fetchUrlPaths, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
