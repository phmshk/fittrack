import {
  ProductCardCollapsedSkeleton,
  useGetProductByQuery,
} from "@/entities/product";
import { Button } from "@/shared/shadcn/components/ui/button";
import { Input } from "@/shared/shadcn/components/ui/input";
import { ProductsView } from "@/widgets/productsView";
import { Frown, ScanBarcode, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

const NUMBER_OF_SKELETONS = 5;

interface SearchProductProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  searchQuery: string;
  isMobile: boolean;
}

export const SearchProduct = (props: SearchProductProps) => {
  const { searchQuery, onInputChange, inputValue, isMobile } = props;
  const { t } = useTranslation("searchProduct");
  const { data, error, isLoading } = useGetProductByQuery({
    search_terms: searchQuery,
    page_size: 10,
  });

  const renderContent = () => {
    if (isLoading && searchQuery.trim() !== "") {
      return (
        <div className="mx-auto w-full space-y-4">
          {[...Array(NUMBER_OF_SKELETONS)].map((_, index) => (
            <ProductCardCollapsedSkeleton key={index} />
          ))}
        </div>
      );
    }
    if (error) {
      return (
        <div className="text-destructive p-4 text-center">
          {t("searchProduct:error")}
        </div>
      );
    }
    //No products found
    if (
      searchQuery.trim() !== "" &&
      !isLoading &&
      (!data?.products || data.products.length === 0)
    ) {
      return (
        <div className="p-4 text-center">
          <Frown className="text-foreground mx-auto size-10" />
          <p>{t("searchProduct:noResults")}</p>
        </div>
      );
    }
    // Found data
    if (data?.products && data.products.length > 0) {
      return <ProductsView products={data.products} />;
    }
    // Initial state
    return (
      <div className="text-muted-foreground p-4 text-center">
        {t("searchProduct:startTyping")}
      </div>
    );
  };

  return (
    <div>
      <div className="bg-background sticky top-0 z-10 p-4">
        <div className="relative">
          <Search className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search products by name"
            className="text-foreground h-12 pl-10"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
          />
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <ScanBarcode className="h-6 w-6" />
            </Button>
          )}
        </div>
      </div>
      {renderContent()}
    </div>
  );
};
