import React from "react";
import Dropdown from "../../ui/Dropdown";
import CustomerOptions from "./CustomerOptions";
import ProductOptions from "./ProductOptions";
import { useCustomers } from "../Customers/useCutomers";
import useProducts from "../Products/useProducts";
import Button from "../../ui/Button";
import PaymentMethodDropDown from "../../ui/PaymentMethodDropDown";

export default function OrderForm({ onClose: onclose }: any) {
  const { isLoading, customers } = useCustomers();
  const { isLoading: isLoading2, products } = useProducts();
  return (
    <form
      onClick={(e) => e.preventDefault()}
      className="flex gap-4 flex-col m-[50px]"
    >
      <div className="delete flex-col  ">
        <div>Customer : </div>
        <Dropdown type="customer" data={customers} isLoading={isLoading}>
          <CustomerOptions />
        </Dropdown>
      </div>
      <div className="flex  flex-col ">
        <div>Product : </div>
        <Dropdown type="product" data={products} isLoading={isLoading2}>
          <ProductOptions />
        </Dropdown>
      </div>

      <PaymentMethodDropDown />
      <div className="flex gap-4">
        <Button
          text="Submit "
          onClick={() => {}}
          textColor="text-white"
          bgColor="bg-sky-500"
          borderColor="border-sky-500"
        />
        <Button
          text="Cancel "
          onClick={onclose}
          textColor="text-black"
          bgColor="bg-white"
          borderColor="border-gray-300"
          border="border"
        />
      </div>
    </form>
  );
}
