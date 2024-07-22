import { useTranslation } from "react-i18next";
import useGetSettings from "./useGetSettings";
import { useUpdateSettings } from "./useUpdateSettings";
import Spinner from "../../ui/Spinner";

export default function SettingsForm() {
  const { t } = useTranslation();
  const { isLoading, data } = useGetSettings();
  const {
    shippingPrice,
    supportEmail,
    maintenanceMode,
    FreeShippingThreshold,
    returnPolicyDuration,
    numberOfWarehouses,
  } = data?.at(0) ?? {};
  const { isLoading: isUpdating, mutate } = useUpdateSettings();

  function handleUpdate(value: any) {
    mutate(value);
  }

  if (isLoading) return <Spinner />;
  return (
    <form className="flex flex-col   w-[800px] items-center justify-center">
      {/* Support Email */}
      <div className="w-full border-b border-dashed border-black   dark:border-gray-300  flex items-center py-3 px-6 gap-4">
        <label htmlFor="email" className="w-1/2">
          {t("support_email")}
        </label>
        <input
          disabled={isUpdating}
          type="email"
          id="email"
          defaultValue={supportEmail}
          onBlur={(e) => handleUpdate({ supportEmail: e.target.value })}
          className="bg-gray-200      dark:bg-gray-800 dark:text-gray-200     py-3 px-4 rounded-md w-1/2  outline-dashed        focus:outline-blue-500  "
        />
      </div>
      {/* Shipping Price */}
      <div className="w-full border-b border-dashed border-black   dark:border-gray-300 flex items-center py-3 px-6 gap-4">
        <label htmlFor="Shipping" className="w-1/2">
          {t("shipping_price")}
        </label>
        <input
          disabled={isUpdating}
          type="number"
          id="Shipping"
          defaultValue={shippingPrice}
          onBlur={(e) => handleUpdate({ shippingPrice: e.target.value })}
          className="bg-gray-200      dark:bg-gray-800 dark:text-gray-200    py-3 px-4 rounded-md w-1/2  outline-dashed        focus:outline-blue-500  "
        />
      </div>
      {/* Free Shipping Threshold */}

      <div className=" w-full border-b border-dashed border-black   dark:border-gray-300 flex items-center py-3 px-6 gap-4 ">
        <label htmlFor="FreeShippingThreshold" className="w-1/2">
          {t("free_shipping_threshold")}
        </label>
        <input
          disabled={isUpdating}
          type="number"
          id="FreeShippingThreshold"
          defaultValue={FreeShippingThreshold}
          onBlur={(e) =>
            handleUpdate({ FreeShippingThreshold: e.target.value })
          }
          className="bg-gray-200      dark:bg-gray-800 dark:text-gray-200    py-3 px-4 rounded-md w-1/2  outline-dashed        focus:outline-blue-500  "
        />
      </div>
      {/* number of warehouses */}
      <div className=" w-full border-b border-dashed border-black   dark:border-gray-300 flex items-center py-3 px-6 gap-4 ">
        <label htmlFor="numberOfWarehouses" className="w-1/2">
          {t("number_of_warehouses")}
        </label>
        <input
          disabled={isUpdating}
          type="number"
          id="numberOfWarehouses"
          defaultValue={numberOfWarehouses}
          onBlur={(e) => handleUpdate({ numberOfWarehouses: e.target.value })}
          className="bg-gray-200      dark:bg-gray-800 dark:text-gray-200    py-3 px-4 rounded-md w-1/2  outline-dashed        focus:outline-blue-500   "
        />
      </div>
      {/* return policy duration */}
      <div className=" w-full border-b border-dashed border-black   dark:border-gray-300 flex items-center py-3 px-6 gap-4 ">
        <label htmlFor="returnPolicyDuration" className="w-1/2">
          {t("return_policy_duration")}
        </label>
        <input
          disabled={isUpdating}
          type="number"
          id="returnPolicyDuration"
          defaultValue={returnPolicyDuration}
          onBlur={(e) => handleUpdate({ returnPolicyDuration: e.target.value })}
          className="bg-gray-200      dark:bg-gray-800 dark:text-gray-200    py-3 px-4 rounded-md w-1/2  outline-dashed        focus:outline-blue-500  "
        />
      </div>
      {/* maintenance mode */}
      <div className="w-full border-b border-dashed border-black   dark:border-gray-300 flex justify-between items-center py-6 px-6 gap-4">
        <label htmlFor="maintenanceMode" className="w-1/2">
          {t("maintenance_mode")}
        </label>
        <input
          disabled={isUpdating}
          type="checkbox"
          id="maintenanceMode"
          defaultChecked={maintenanceMode}
          onChange={(e) => handleUpdate({ maintenanceMode: e.target.checked })}
          className="bg-gray-200      dark:bg-gray-800 dark:text-gray-200    py-3 px-4 rounded-md h-[20px]  w-[20px] outline-dashed  accent-blue-500        focus:outline-blue-500   "
        />
      </div>
    </form>
  );
}
