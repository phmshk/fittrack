import type { ApiPaths } from "@/shared/api/schema";
import { products } from "../db/products.db";

type SearchResponse =
  ApiPaths["/cgi/search.pl"]["get"]["responses"]["200"]["content"]["application/json"];
type ProductResponse =
  ApiPaths["/api/v2/product/{barcode}"]["get"]["responses"]["200"]["content"]["application/json"];

export const mockResponses: SearchResponse & ProductResponse = {
  count: products.length,
  products,
};
