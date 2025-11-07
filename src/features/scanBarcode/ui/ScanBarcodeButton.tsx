import { RealisticBarcodeIcon } from "@/shared/assets/icons/BarcodeIcon";
import { Button } from "@/shared/shadcn/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/shadcn/components/ui/dialog";
import type { Result } from "@zxing/library";
import { Flashlight, FlashlightOff, ScanBarcode } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import BarcodeScanner from "react-qr-barcode-scanner";

//const TEST_BARCODE = "737628064502";

interface ScanBarcodeButtonProps {
  onScanSuccess: (barcode: string) => void;
}

export const ScanBarcodeButton = (props: ScanBarcodeButtonProps) => {
  const { onScanSuccess } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [scannerError, setScannerError] = useState<string | null>(null);
  const [stopStream, setStopStream] = useState<boolean>(false);
  const [torchIsOn, setTorchIsOn] = useState<boolean>(false);
  const { t } = useTranslation("food");

  const handleScan = (err: unknown, result: Result | undefined) => {
    if (result) {
      const scannedBarcode = result.getText();
      onScanSuccess(scannedBarcode);
      setIsModalOpen(false);
      setScannerError(null);
    } else if (err) {
      if (!isModalOpen) {
        return;
      }
      console.error("Barcode scan error:", err);
      setScannerError(err instanceof Error ? err.message : String(err));
    }
  };

  const onScannerError = (error: string | DOMException) => {
    console.error("Barcode scanner error:", error);
    if (typeof error === "string") {
      setScannerError(error);
      return;
    }
    if (error instanceof DOMException && error.name === "NotAllowedError") {
      setScannerError(t("food:scanner.permissionDenied"));
    } else if (
      error instanceof DOMException &&
      error.name === "NotFoundError"
    ) {
      setScannerError(t("food:scanner.noCamera"));
    } else {
      setScannerError(t("food:scanner.unknownError"));
    }
  };

  const toggleTorch = () => {
    setTorchIsOn((prev) => !prev);
  };

  const dismissScanner = () => {
    // Stop the QR Reader stream (fixes issue where the browser freezes when closing the modal) and then dismiss the modal one tick later
    setStopStream(true);
    setTimeout(() => setIsModalOpen(false), 0);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setScannerError(null);
      setIsModalOpen(true);
    } else {
      dismissScanner();
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
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
            {t("food:scanner.placeBarcode")}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <div className="bg-muted relative w-full overflow-hidden rounded-md">
            <BarcodeScanner
              width="100%"
              height="100%"
              facingMode="environment"
              torch={torchIsOn}
              onUpdate={(error, result) => handleScan(error, result)}
              onError={onScannerError}
              stopStream={stopStream}
            />
            {/* Barcode overlay */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <RealisticBarcodeIcon className="w-100 h-20 text-white/50" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-2 left-2 z-10"
              onClick={toggleTorch}
            >
              {torchIsOn ? (
                <FlashlightOff className="h-4 w-4" />
              ) : (
                <Flashlight className="h-4 w-4" />
              )}
            </Button>
          </div>

          {scannerError && (
            <p className="text-destructive mt-2 text-center text-sm">
              {scannerError}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
