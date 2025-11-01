import { SearchProduct } from "@/features/searchProduct";
import { useBreakpoint, useDebounce } from "@/shared/lib";
import { Button } from "@/shared/shadcn/components/ui/button";
import { Container } from "@/shared/ui/container";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { router } from "@/app/main";
import { useTranslation } from "react-i18next";

const DEBOUNCE_DELAY = 800; // milliseconds

export const AddFromDatabase = () => {
  //State for the search query and debounced search query
  const [searchQuery, setSearchQuery] = useState("");
  // Debounce the search input to avoid excessive API calls
  const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE_DELAY);
  const isMobile = useBreakpoint();
  const { t } = useTranslation("food");

  return (
    <Container>
      {!isMobile && (
        <Button
          variant="ghost"
          onClick={() => router.history.back()}
          className="mb-4 self-start"
          asChild
        >
          <div>
            <ArrowLeft className="mr-2 h-4 w-4" />{" "}
            {t("food:addFood.backToMeal")}
          </div>
        </Button>
      )}
      <SearchProduct
        inputValue={searchQuery}
        onInputChange={setSearchQuery}
        searchQuery={debouncedSearchQuery}
        isMobile={isMobile}
      />
    </Container>
  );
};
