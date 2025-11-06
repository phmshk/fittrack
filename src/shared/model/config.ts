export const CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  // Open Food Facts API base URL. Staging: https://world.openfoodfacts.net, Production: https://world.openfoodfacts.org
  FOOD_API_BASE_URL:
    import.meta.env.VITE_FOOD_API_URL || "https://world.openfoodfacts.net",
  APP_VERSION: import.meta.env.APP_VERSION || "0.0.1-beta",
};
