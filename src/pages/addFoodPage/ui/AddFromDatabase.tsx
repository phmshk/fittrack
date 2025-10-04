import { SearchProduct } from "@/features/searchProduct";
import { useDebounce } from "@/shared/lib";
import { Button } from "@/shared/shadcn/components/ui/button";
import { Container } from "@/shared/ui/container";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const DEBOUNCE_DELAY = 800; // milliseconds

export const AddFromDatabase = () => {
  //State for the search query and debounced search query
  const [searchQuery, setSearchQuery] = useState("");
  // Debounce the search input to avoid excessive API calls
  const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE_DELAY);

  return (
    <Container className="min-h-screen">
      <Button
        variant="ghost"
        onClick={() => {}}
        className="mb-4 self-start"
        asChild
      >
        <Link to="/diary">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to diary
        </Link>
      </Button>
      <SearchProduct
        inputValue={searchQuery}
        onInputChange={setSearchQuery}
        searchQuery={debouncedSearchQuery}
      />
    </Container>
  );
};
