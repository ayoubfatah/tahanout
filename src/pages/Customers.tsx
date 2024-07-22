import { useTranslation } from "react-i18next";
import CustomersDetails from "../features/Customers/CustomersTable";
import Button from "../ui/Button";

export default function Customers() {
  const { t } = useTranslation();
  return (
    <div className="">
      <div className="flex justify-between mb-8 ">
        <h1 className="text-[24px] font-semibold">{t("customers")}</h1>
      </div>
      <CustomersDetails />
    </div>
  );
}
