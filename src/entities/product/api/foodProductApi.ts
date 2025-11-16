import { useQuery } from "@tanstack/react-query";
import {
  type Product,
  type ProductResponse,
  type SearchParams,
} from "../model/types";
import { CONFIG } from "@/shared/model";
import { t } from "i18next";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase/firebase.setup";

const FOOD_NAME_CHAR_LIMIT = 30;

// --- Keys for product logs ---
export const productKeys = {
  all: ["product-logs"] as const,
  lists: () => [...productKeys.all, "search"] as const,
  list: (params: Omit<SearchParams, "json" | "search_simple">) =>
    [...productKeys.lists(), { params }] as const,
};

// Simple API client function for fetching data from Open Food Facts API
const apiClient = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Basic " + btoa("off:off"),
      "User-Agent":
        "FitTrack personal portfolio project https://fittrack-app-rt2cp.ondigitalocean.app",
    },
  });
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
  return searchParams;
};

// -- Fetch a single product by its barcode --
// At first it checks the Firestore cache, if not found then fetches from the API
export const useGetProductByBarcode = (
  barcode: string | null,
  params?: string,
) => {
  return useQuery({
    queryKey: ["product", barcode, params],
    queryFn: async (): Promise<Product> => {
      console.log("API CALL FOR BARCODE:", barcode);

      const productRef = doc(db, "products", barcode as string);

      // Check Firestore cache first
      try {
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          const cachedProduct = productSnap.data() as Product;
          console.log("Fetched Product from Cache:", cachedProduct);
          return cachedProduct;
        }
      } catch (error) {
        console.error("Error fetching product from cache:", error);
      }

      // If not in cache, fetch from API
      let productFromOFF: Product;
      try {
        const response = await apiClient<ProductResponse>(
          `${CONFIG.FOOD_API_BASE_URL}/api/v2/product/${barcode}${params ? `?${params}` : ""}`,
        );

        if (response.status === 0) {
          throw new Error("Product not found");
        }

        const rawProduct = response.product;
        const nutriments = response.product?.nutriments || {};
        // Shorten product name if it's longer than 50 characters
        const shortendProductName = rawProduct?.product_name
          ? rawProduct.product_name.length > FOOD_NAME_CHAR_LIMIT
            ? rawProduct.product_name.slice(0, FOOD_NAME_CHAR_LIMIT) + "..." // Truncate and add ellipsis
            : rawProduct?.product_name // Use full name
          : t("food:unknownFood.name"); // Fallback name

        // Construct the final product object with necessary fields
        productFromOFF = {
          code: response.code,
          image_url: rawProduct?.image_url,
          nutriments: {
            ["energy-kcal_100g"]: nutriments["energy-kcal_100g"],
            proteins_100g: nutriments["proteins_100g"],
            fat_100g: nutriments["fat_100g"],
            ["saturated-fat_100g"]: nutriments["saturated-fat_100g"],
            carbohydrates_100g: nutriments["carbohydrates_100g"],
            sugars_100g: nutriments["sugars_100g"],
          },
          product_name: shortendProductName,
        };

        console.log("Fetched Product:", productFromOFF);
      } catch (error) {
        console.error("Error fetching product from API:", error);
        throw error;
      }

      // Save the fetched product to Firestore cache
      if (productFromOFF && productFromOFF.code) {
        const cacheRef = doc(db, "products", productFromOFF.code);
        try {
          await setDoc(cacheRef, productFromOFF);
          console.log("Product cached successfully:", productFromOFF);
        } catch (error) {
          console.error("Error caching product:", error);
        }
      } else {
        console.error("Invalid product data, not caching.");
      }
      return productFromOFF;
    },
    enabled: !!barcode,
  });
};
