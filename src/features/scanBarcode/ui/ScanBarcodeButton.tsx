import { Button } from "@/shared/shadcn/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/shadcn/components/ui/dialog";
import { ScanBarcode } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { UserCamera } from "../model/UserCamera";

interface ScanBarcodeButtonProps {
  onScanSuccess: (barcode: string) => void;
}

export const ScanBarcodeButton = (props: ScanBarcodeButtonProps) => {
  const { onScanSuccess } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("food:scanner.srScanBarcode", "Scan barcode")}
        >
          <ScanBarcode className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{t("food:scanner.title", "Scan Barcode")}</DialogTitle>
          <DialogDescription>
            <br />
            {t("food:scanner.placeBarcode")}
          </DialogDescription>
        </DialogHeader>
        <UserCamera
          onScanSuccess={onScanSuccess}
          setIsModalOpen={setIsModalOpen}
        />
      </DialogContent>
    </Dialog>
  );
};
