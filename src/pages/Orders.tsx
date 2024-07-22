import { useTranslation } from "react-i18next";
import OrdersDetails from "../features/Orders/OrdersDetails";
import Filter from "../ui/Filter";

export default function Orders() {
  const { t } = useTranslation();
  return (
    <div className="">
      <div className="flex justify-between mb-8 ">
        <h1 className="text-[24px] font-semibold">{t("Orders")}</h1>
      </div>
      <OrdersDetails t={t} />
    </div>
  );
}
