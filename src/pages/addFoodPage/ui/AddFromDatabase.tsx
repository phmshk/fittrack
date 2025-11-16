import { useBreakpoint } from "@/shared/lib";
import { Button } from "@/shared/shadcn/components/ui/button";
import { Container } from "@/shared/ui/container";
import { ArrowLeft } from "lucide-react";
import { router } from "@/app/main";
import { useTranslation } from "react-i18next";
import { ProductSearch } from "@/widgets/productsSearch";

export const AddFromDatabase = () => {
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
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("food:addFood.backToMeal")}
          </div>
        </Button>
      )}

      <ProductSearch />
    </Container>
  );
};
