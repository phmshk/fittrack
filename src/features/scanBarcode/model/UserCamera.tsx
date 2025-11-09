import { RealisticBarcodeIcon } from "@/shared/assets/icons/BarcodeIcon";
import { Button } from "@/shared/shadcn/components/ui/button";
import { useEffect, useRef, useState } from "react";
import {
  BrowserMultiFormatReader,
  type IScannerControls,
} from "@zxing/browser";
import { useTranslation } from "react-i18next";

interface UserCameraProps {
  onScanSuccess: (barcode: string) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const UserCamera = (props: UserCameraProps) => {
  const { onScanSuccess, setIsModalOpen } = props;

  const { t } = useTranslation("food");

  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useRef<BrowserMultiFormatReader | null>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const isScanningRef = useRef(false);

  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Sync ref with state for async callbacks
  useEffect(() => {
    isScanningRef.current = isScanning;
  }, [isScanning]);

  useEffect(() => {
    if (isScanning) setError(null);
  }, [isScanning]);

  // Initialize code reader and clean up on unmount
  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader();

    return () => {
      stopWebcam();
      codeReader.current = null;
    };
  }, []);

  const startScanning = async (videoElement: HTMLVideoElement) => {
    if (!codeReader.current) return;

    try {
      const controls = await codeReader.current.decodeFromVideoElement(
        videoElement,
        (result, err, ctrls) => {
          if (!isScanningRef.current) {
            ctrls.stop();
            return;
          }

          if (result) {
            const barcode = result.getText();
            onScanSuccess(barcode.trim());
            ctrls.stop();
            stopWebcam();
            setIsModalOpen(false);
          } else if (err) {
            if (err.name !== "NotFoundException") {
              console.error("Error during barcode scan:", err);
            }
          }
        },
      );
      controlsRef.current = controls;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError(t("food:scanner.errorStarting"));
    }
  };

  const startCamera = async () => {
    if (isScanningRef.current) return;

    try {
      setError(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          frameRate: { max: 20, ideal: 10 },
        },
        audio: false,
      });

      if (!videoRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      videoRef.current.srcObject = stream;
      setMediaStream(stream);
      setIsScanning(true);
      startScanning(videoRef.current);
    } catch (err) {
      if (err instanceof DOMException && err.name === "NotFoundError") {
        setError(t("food:scanner.noCamera"));
      } else if (
        err instanceof DOMException &&
        err.name === "NotAllowedError"
      ) {
        setError(t("food:scanner.permissionDenied"));
      } else {
        setError(
          t("food:scanner.unknownError") + ": " + (err as Error).message,
        );
      }
    }
  };

  const stopWebcam = () => {
    // Stop the scanning process
    if (controlsRef.current) {
      controlsRef.current.stop();
      controlsRef.current = null;
    }

    // Stop all media tracks
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsScanning(false);
  };

  return (
    <div className="relative mx-auto max-h-[400px] w-full max-w-sm">
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-full">
          <video
            className="h-1/2 max-h-60 w-full object-cover"
            ref={videoRef}
            autoPlay
            muted
            playsInline
          />
          {mediaStream && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <RealisticBarcodeIcon className="h-20 w-20 text-white/50" />
            </div>
          )}
        </div>

        <div>
          {!mediaStream ? (
            <Button onClick={startCamera}>{t("food:scanner.startScan")}</Button>
          ) : (
            <Button onClick={stopWebcam} variant="destructive">
              {t("food:scanner.stopScan")}
            </Button>
          )}
          {error && <div className="mb-2 text-red-500">{error}</div>}
        </div>
      </div>
    </div>
  );
};
