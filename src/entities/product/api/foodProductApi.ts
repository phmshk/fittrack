import { CONFIG } from "@/shared/model/config";
import { useQuery } from "@tanstack/react-query";
import {
  type ProductResponse,
  type SearchParams,
  type SearchResponse,
} from "../model/types";

// --- Keys for product logs ---
export const productKeys = {
  all: ["product-logs"] as const,
  lists: () => [...productKeys.all, "search"] as const,
  list: (params: Omit<SearchParams, "json" | "search_simple">) =>
    [...productKeys.lists(), { params }] as const,
};

// Simple API client function
const apiClient = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json() as Promise<T>;
};

// --- Hooks for product logs ---
// -- Fetch products based on search parameters --
export const useGetProductByQuery = (
  searchParams: Omit<SearchParams, "json" | "search_simple">,
) => {
  return useQuery({
    queryKey: productKeys.list(searchParams),
    queryFn: async () => {
      const query = new URLSearchParams({
        search_terms: searchParams.search_terms,
        page_size: String(searchParams.page_size || 5),
        json: "1",
        search_simple: "1",
      }).toString();

      if (!searchParams.search_terms) {
        return { products: [] } as SearchResponse;
      }

      return await apiClient<SearchResponse>(
        `${CONFIG.FOOD_API_BASE_URL}/cgi/search.pl?${query}`,
      );
    },
    enabled: !!searchParams.search_terms,
  });
};

// -- Fetch a single product by its barcode --
export const useGetProductByBarcode = (barcode: string) => {
  return useQuery({
    queryKey: ["product", barcode],
    queryFn: async () => {
      return apiClient<ProductResponse>(
        `${CONFIG.FOOD_API_BASE_URL}/api/v2/product/${barcode}`,
      );
    },
    enabled: !!barcode,
  });
};
