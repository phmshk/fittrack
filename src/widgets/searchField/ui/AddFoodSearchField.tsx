import { ScanBarcodeButton } from "@/features/scanBarcode";
import { useBreakpoint } from "@/shared/lib";
import { Input } from "@/shared/shadcn/components/ui/input";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

interface AddFoodSearchFieldProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  setScannedBarcode: (value: string | null) => void;
}

export const AddFoodSearchField = (props: AddFoodSearchFieldProps) => {
  const { searchQuery, setSearchQuery, setScannedBarcode } = props;
  const { t } = useTranslation("searchProduct");
  const isMobile = useBreakpoint();

  return (
    <div className="bg-background sticky top-0 z-10 p-4">
      <div className="relative">
        <Search className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" />
        <Input
          type="text"
          placeholder={t("searchProduct:placeholder")}
          className="text-foreground h-12 pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {isMobile && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <ScanBarcodeButton onScanSuccess={setScannedBarcode} />
          </div>
        )}
      </div>
    </div>
  );
};
