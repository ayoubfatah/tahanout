import React from "react";
import useGetSettings from "./useGetSettings";
import Table from "../../ui/Tabel";
import Modal from "../../ui/Modal";
import ProductTables from "../Products/ProductTables";
import { useUpdateSettings } from "./useUpdateSettings";

export default function SettingsForm() {
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

  return (
    <form className="flex flex-col  w-[800px] items-center justify-center">
      <div className="w-full border-b border-dashed border-black flex items-center py-3 px-6 gap-4">
        <label htmlFor="Shipping" className="w-1/2">
          Shipping Price:
        </label>
        <input
          disabled={isUpdating}
          type="number"
          id="Shipping"
          defaultValue={shippingPrice}
          onBlur={(e) => handleUpdate({ shippingPrice: e.target.value })}
          className="bg-gray-50 py-3 px-4 rounded-md w-full outline outline-dashed"
        />
      </div>
      <div className="w-full border-b border-dashed border-black flex items-center py-3 px-6 gap-4">
        <label htmlFor="email" className="w-1/2">
          Support Email:
        </label>
        <input
          disabled={isUpdating}
          type="email"
          id="email"
          defaultValue={supportEmail}
          onBlur={(e) => handleUpdate({ supportEmail: e.target.value })}
          className="bg-gray-50 py-3 px-4 rounded-md w-full outline outline-dashed"
        />
      </div>
      <div className=" w-full border-b border-dashed border-black flex items-center py-3 px-6 gap-4 ">
        <label htmlFor="FreeShippingThreshold" className="w-1/2">
          Free Shipping Threshold:
        </label>
        <input
          disabled={isUpdating}
          type="number"
          id="FreeShippingThreshold"
          defaultValue={FreeShippingThreshold}
          onBlur={(e) =>
            handleUpdate({ FreeShippingThreshold: e.target.value })
          }
          className="bg-gray-50 py-3 px-4 rounded-md w-full outline outline-dashed"
        />
      </div>
      <div className=" w-full border-b border-dashed border-black flex items-center py-3 px-6 gap-4 ">
        <label htmlFor="numberOfWarehouses" className="w-1/2">
          Number of warehouses :
        </label>
        <input
          disabled={isUpdating}
          type="number"
          id="numberOfWarehouses"
          defaultValue={numberOfWarehouses}
          onBlur={(e) => handleUpdate({ numberOfWarehouses: e.target.value })}
          className="bg-gray-50 py-3 px-4 rounded-md w-full outline outline-dashed"
        />
      </div>
      <div className=" w-full border-b border-dashed border-black flex items-center py-3 px-6 gap-4 ">
        <label htmlFor="returnPolicyDuration" className="w-1/2">
          Return policy duration:
        </label>
        <input
          disabled={isUpdating}
          type="number"
          id="returnPolicyDuration"
          defaultValue={returnPolicyDuration}
          onBlur={(e) => handleUpdate({ returnPolicyDuration: e.target.value })}
          className="bg-gray-50 py-3 px-4 rounded-md w-full outline outline-dashed"
        />
      </div>
      <div className="w-full border-b border-dashed border-black flex justify-between items-center py-6 px-6 gap-4">
        <label htmlFor="maintenanceMode" className="w-1/2">
          Maintenance Mode:
        </label>
        <input
          disabled={isUpdating}
          type="checkbox"
          id="maintenanceMode"
          defaultChecked={maintenanceMode}
          onChange={(e) => handleUpdate({ maintenanceMode: e.target.checked })}
          className="bg-gray-50 py-3 px-4 rounded-md h-[20px]  w-[20px] outline-dashed "
        />
      </div>
    </form>
  );
}
