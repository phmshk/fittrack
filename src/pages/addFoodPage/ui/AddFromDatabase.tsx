import { SearchProduct } from "@/features/searchProduct";
import { useDebounce } from "@/shared/lib";
import { useState } from "react";

const DEBOUNCE_DELAY = 800; // milliseconds

export const AddFromDatabase = () => {
  //State for the search query and debounced search query
  const [searchQuery, setSearchQuery] = useState("");

  // Debounce the search input to avoid excessive API calls
  const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE_DELAY);

  return (
    <section className="container mx-auto flex max-w-6xl flex-col gap-4 p-4 md:gap-6">
      <SearchProduct
        inputValue={searchQuery}
        onInputChange={setSearchQuery}
        searchQuery={debouncedSearchQuery}
      />
    </section>
  );
};
