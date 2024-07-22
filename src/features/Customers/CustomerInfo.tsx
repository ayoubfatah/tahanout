import { useTranslation } from "react-i18next";
import { CustomersType as Customer } from "../../Types/types";

type CustomersType = {
  data: Customer;
};

export default function CustomerInfo({ data: customers }: CustomersType) {
  const { t } = useTranslation();
  return (
    <div className="py-5 w-[600px] overflow-x-hidden">
      <div className="py-2 px-3 flex items-center w-full gap-3">
        <span className="w-1/4">{t("fullName")}:</span>
        <span className="w-1/2">{customers?.fullName}</span>
      </div>
      <div className="p-3 flex items-center w-full gap-3">
        <span className="w-1/4">{t("email")}:</span>
        <span className="w-1/2">{customers?.email}</span>
      </div>
      <div className="p-3 flex items-center w-full gap-3">
        <span className="w-1/4">{t("nationalId")}:</span>
        <span className="w-1/2">{customers?.nationalId}</span>
      </div>
      <div className="p-3 flex items-center w-full gap-3">
        <span className="w-1/4">{t("phoneNumber")}:</span>
        <span className="w-1/2">{customers?.phoneNumber}</span>
      </div>
      <div className="p-3 flex items-center w-full gap-3">
        <span className="w-1/4">{t("country")}:</span>
        <span className="w-1/2">{customers?.country}</span>
      </div>
      <div className="p-3 flex items-center w-full gap-3">
        <span className="w-1/4">{t("region")}:</span>
        <span className="w-1/2">{customers?.region}</span>
      </div>
      <div className="p-3 flex items-center w-full gap-3">
        <span className="w-1/4">{t("city")}:</span>
        <span className="w-1/2">{customers?.city}</span>
      </div>
      <div className="p-3 flex items-center w-full gap-3">
        <span className="w-1/4">{t("zipCode")}:</span>
        <span className="w-1/2">{customers?.zipCode}</span>
      </div>
      <div className="p-3 flex items-start w-full gap-3">
        <span className="w-1/4">{t("address")}:</span>
        <span className="w-1/2  flex-grow break-words">
          {customers?.address}
        </span>
      </div>
    </div>
  );
}
