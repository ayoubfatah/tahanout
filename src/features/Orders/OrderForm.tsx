import { useEffect, useTransition } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTahanout } from "../../contextApi/useTahanoutCA";
import { useNotificationSound } from "../../hooks/useNotificationSound";
import Button from "../../ui/Button";
import Dropdown from "../../ui/Dropdown";
import PaymentMethodDropDown from "../../ui/PaymentMethodDropDown";
import { useCustomers } from "../Customers/useCutomers";
import useAddOrder from "../Orders/useAddOrders";
import useProducts from "../Products/useProducts";
import useUpdateProductQuantity from "../Products/useUpdateProductQuantity";
import useGetSettings from "../Settings/useGetSettings";
import OrderCustomerOptions from "./OrderCustomerOptions";
import CustomerOptionsRow from "./OrderCustomerOptionsRow";
import OrderProductOptions from "./OrderProductOptions";
import ProductOptionsRow from "./OrderProductOptionsRow";
import { id } from "date-fns/locale";
import { useTranslation } from "react-i18next";
export default function OrderForm({
  onClose: onclose,
  type,
  dataFromProductActions,
  dataFromCustomerActions,
}: any) {
  const navigate = useNavigate();

  const { isLoading, customers } = useCustomers();
  const { t } = useTranslation();
  const { isLoading: isLoading2, products } = useProducts();
  const {
    customerOptions,
    productOptions,
    paymentMethod,
    setProductOptions,
    setCustomerOptions,
    setPaymentMethod,
    OrderQuantity,
    setOrderQuantity,
  } = useTahanout();

  const { data: settings } = useGetSettings();
  // CREATING ORDER FROM THE PRODUCT TABLE

  useEffect(() => {
    if (dataFromProductActions) {
      setProductOptions(dataFromProductActions);
    }
  }, [dataFromProductActions]);

  useEffect(() => {
    if (dataFromCustomerActions) {
      setProductOptions(dataFromCustomerActions);
    }
  }, [dataFromCustomerActions]);

  // api
  const { isLoading: isLoading3, mutate } = useAddOrder();
  const { upQuantity } = useUpdateProductQuantity();
  const playNotificationSound = useNotificationSound();
  function handleOnClick() {
    if (productOptions && productOptions.price !== undefined) {
      const orderData = {
        id: Math.floor(Math.random() * 1000),
        customerId: dataFromCustomerActions?.id || customerOptions?.id,
        productId: productOptions?.id,
        productPrice: productOptions.price - productOptions.discount,
        shippingCost: settings[0].shippingPrice,
        totalPrice:
          (productOptions.price - productOptions.discount) *
            Number(OrderQuantity) +
          Number(settings[0].shippingPrice),
        quantity: Number(OrderQuantity),
        paymentMethod: paymentMethod,
        status: "pending",
        createdAt: new Date(),
      };

      mutate(orderData, {
        onSuccess: () => {
          upQuantity({
            id: productOptions?.id,
            newQuantity: productOptions?.quantity - OrderQuantity,
          });
          playNotificationSound();
          toast.success("Order created successfully");
          onclose();
          setPaymentMethod(null);
          setCustomerOptions(null);
          navigate("/orders");
        },
      });
    } else {
      onclose();
      setPaymentMethod(null);
      setCustomerOptions(null);
      return null;
    }
  }

  return (
    <form
      onClick={(e) => e.preventDefault()}
      className="flex gap-4 flex-col m-[50px]"
    >
      <div className="delete flex-col  ">
        <div>{t("customer")}:</div>
        {type !== "customerTable" ? (
          <Dropdown type="customer" data={customers} isLoading={isLoading}>
            <OrderCustomerOptions />
          </Dropdown>
        ) : (
          <CustomerOptionsRow
            fromCustomerTable={true}
            item={dataFromCustomerActions}
          />
        )}
      </div>
      <div className="flex  flex-col ">
        <div>{t("Product")}: </div>
        {type !== "productTable" ? (
          <Dropdown type="product" data={products} isLoading={isLoading2}>
            <OrderProductOptions />
          </Dropdown>
        ) : (
          <ProductOptionsRow
            fromProductTable={true}
            key={productOptions?.id}
            item={dataFromProductActions}
          />
        )}
      </div>

      <div className="flex  flex-col ">
        <label>{t("Quantity")} : </label>
        <input
          onChange={(e) => {
            setOrderQuantity(parseInt(e.target.value));
          }}
          className="  rounded-md border w-[80px] border-[#e0e0e0] bg-white  dark:bg-gray-800  py-2 text-base font-medium   text-gray-800  dark:text-gray-200    outline-none focus:border-[#6A64F1] focus:shadow-md  p-1 px-2"
          type="number"
        />
        {productOptions && productOptions.minOrder > OrderQuantity && (
          <span className="text-red-500 text-[12px] w-full">
            min order is {productOptions.minOrder}
          </span>
        )}
        {productOptions && productOptions.quantity < OrderQuantity && (
          <span className="text-red-500 text-[12px] w-full  ">
            {" "}
            Max quantity is {productOptions.quantity}{" "}
          </span>
        )}
      </div>

      <PaymentMethodDropDown />
      <div className="flex gap-4">
        <Button
          disabled={
            isLoading3 ||
            isLoading ||
            isLoading2 ||
            OrderQuantity < (productOptions?.minOrder ?? 1) ||
            !productOptions ||
            !customerOptions ||
            !paymentMethod ||
            productOptions.quantity < OrderQuantity
          }
          text="Submit"
          onClick={handleOnClick}
          textColor="text-white"
          bgColor="bg-sky-500"
          borderColor="border-sky-500"
        />
        <Button
          disabled={isLoading3 || isLoading || isLoading2}
          text="Cancel "
          onClick={() => {
            onclose(), setCustomerOptions(null), setProductOptions(null);
          }}
          textColor="text-black"
          bgColor="bg-white"
          borderColor="border-gray-300"
          border="border"
          // ayoubfatah XD
        />
      </div>
    </form>
  );
}
