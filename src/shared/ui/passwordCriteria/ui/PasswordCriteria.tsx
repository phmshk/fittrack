import { cn } from "@/shared/shadcn/lib/utils";
import { CheckCircle2, Circle } from "lucide-react";
import { useTranslation } from "react-i18next";

const criteria = [
  {
    label: "length",
    check: (password: string) => password.length >= 8,
  },
  {
    label: "digit",
    check: (password: string) => /\d/.test(password),
  },
  {
    label: "uppercase",
    check: (password: string) => /[A-Z]/.test(password),
  },
  {
    label: "lowercase",
    check: (password: string) => /[a-z]/.test(password),
  },
  {
    label: "special",
    check: (password: string) => /[!@#$%^&*]/.test(password),
  },
];

interface PasswordCriteriaProps {
  password: string;
}

export const PasswordCriteria = ({ password }: PasswordCriteriaProps) => {
  const { t } = useTranslation("forms");
  return (
    <div className="mt-4 space-y-2">
      {criteria.map((item, index) => {
        const isMet = item.check(password);

        return (
          <div
            key={index}
            className={cn(
              "flex items-center text-sm",
              isMet ? "text-accent-foreground" : "text-muted-foreground",
            )}
          >
            {isMet ? (
              <CheckCircle2 className="mr-2 h-4 w-4" />
            ) : (
              <Circle className="mr-2 h-4 w-4" />
            )}
            {t(`forms:password.criteria.${item.label}`)}
          </div>
        );
      })}
    </div>
  );
};
