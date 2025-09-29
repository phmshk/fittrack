import { http, HttpResponse } from "msw";
import { mockResponses } from "../openFood/mockResponses";

export const openFoodFactsHandlers = [
  http.get(
    "https://world.openfoodfacts.org/cgi/search.pl",
    async ({ request }) => {
      const url = new URL(request.url);
      const searchTerm = url.searchParams.get("search_terms");
      console.log(
        `[MSW] Intercepted Open Food Facts search for: "${searchTerm}"`,
      );

      const filteredProducts = mockResponses?.products?.filter((product) =>
        product.product_name
          ?.toLowerCase()
          .includes(searchTerm?.toLowerCase() || ""),
      );

      const response = {
        count: filteredProducts?.length || 0,
        products: filteredProducts,
      };
      //simulate network delay
      await new Promise((res) => setTimeout(res, 1000));

      return HttpResponse.json(response);
    },
  ),

  http.get(
    "https://world.openfoodfacts.org/api/v2/product/:barcode",
    ({ params }) => {
      console.log(
        `[MSW] Intercepted Open Food Facts fetch for barcode: ${params.barcode}`,
      );

      const product = mockResponses?.products?.find(
        (p) => p.code === params.barcode,
      );
      return HttpResponse.json(
        product || { status: 404, message: "Product not found" },
      );
    },
  ),
];
