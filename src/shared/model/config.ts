export const CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  FOOD_API_BASE_URL:
    import.meta.env.VITE_FOOD_API_URL || "https://world.openfoodfacts.org",
  APP_VERSION: import.meta.env.APP_VERSION || "0.0.1-beta",
};
