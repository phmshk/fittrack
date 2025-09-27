import {
  ProductCardCollapsedSkeleton,
  useGetProductByQuery,
} from "@/entities/product";
import { Button } from "@/shared/shadcn/components/ui/button";
import { Input } from "@/shared/shadcn/components/ui/input";
import { ProductsView } from "@/widgets/productsView";
import { Frown, ScanBarcode, Search } from "lucide-react";

const NUMBER_OF_SKELETONS = 5;

interface SearchProductProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  searchQuery: string;
}

export const SearchProduct = (props: SearchProductProps) => {
  const { searchQuery, onInputChange, inputValue } = props;

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
        <div className="p-4 text-center text-destructive">
          An error occurred
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
          <Frown className="mx-auto size-10 text-foreground" />
          <p>No products matching the search found</p>
        </div>
      );
    }
    // Found data
    if (data?.products && data.products.length > 0) {
      return <ProductsView products={data.products} />;
    }
    // Initial state
    return (
      <div className="p-4 text-center text-muted-foreground">
        Start typing to search for products
      </div>
    );
  };

  return (
    <div>
      <div className="sticky top-0 z-10 bg-background p-4">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products by name"
            className="h-12 pl-10 text-foreground"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-2 -translate-y-1/2"
          >
            <ScanBarcode className="h-6 w-6" />
          </Button>
        </div>
      </div>
      {renderContent()}
    </div>
  );
};
