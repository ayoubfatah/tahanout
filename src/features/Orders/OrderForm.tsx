import { useTahanout } from "../../contextApi/useTahanoutCA";
import Button from "../../ui/Button";
import Dropdown from "../../ui/Dropdown";
import PaymentMethodDropDown from "../../ui/PaymentMethodDropDown";
import { useCustomers } from "../Customers/useCutomers";
import useProducts from "../Products/useProducts";
import useGetSettings from "../Settings/useGetSettings";
import CustomerOptions from "./OrderCustomerOptions";
import ProductOptions from "./OrderProductOptions";
import useAddOrder from "../Orders/useAddOrders";
import toast from "react-hot-toast";
import useUpdateProductQuantity from "../Products/useUpdateProductQuantity";
import ProductOptionsRow from "./OrderProductOptionsRow";
import { useEffect } from "react";
import CustomerOptionsRow from "./OrderCustomerOptionsRow";
import { useNavigate } from "react-router-dom";
export default function OrderForm({
  onClose: onclose,
  type,
  dataFromProductActions,
  dataFromCustomerActions,
}: any) {
  const navigate = useNavigate();

  const { isLoading, customers } = useCustomers();
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
        created_at: new Date(),
      };

      mutate(orderData, {
        onSuccess: () => {
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

    upQuantity(
      {
        newQuantity: Number(productOptions.quantity) - Number(OrderQuantity),
        id: productOptions?.id,
      },
      {
        onSuccess: () => {
          setProductOptions(null);
        },
        onError: (err: any) => toast.error(err.message),
      }
    );
  }

  return (
    <form
      onClick={(e) => e.preventDefault()}
      className="flex gap-4 flex-col m-[50px]"
    >
      <div className="delete flex-col  ">
        <div>Customer : </div>
        {type !== "customerTable" ? (
          <Dropdown type="customer" data={customers} isLoading={isLoading}>
            <CustomerOptions />
          </Dropdown>
        ) : (
          <CustomerOptionsRow
            fromCustomerTable={true}
            item={dataFromCustomerActions}
          />
        )}
      </div>
      <div className="flex  flex-col ">
        <div>Product : </div>
        {type !== "productTable" ? (
          <Dropdown type="product" data={products} isLoading={isLoading2}>
            <ProductOptions />
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
        <label>Quantity : </label>
        <input
          onChange={(e) => {
            setOrderQuantity(parseInt(e.target.value));
          }}
          className="rounded-md border w-[80px] border-[#e0e0e0] bg-white py-2 text-base font-medium text-gray-900 outline-none focus:border-[#6A64F1] focus:shadow-md  p-1 px-2"
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
          // disabled={
          //   OrderQuantity < (productOptions?.minOrder ?? 1) ||
          //   !productOptions ||
          //   !customerOptions ||
          //   !paymentMethod ||
          //   productOptions.quantity < OrderQuantity
          // }
          text="Submit "
          onClick={handleOnClick}
          textColor="text-white"
          bgColor="bg-sky-500"
          borderColor="border-sky-500"
        />
        <Button
          text="Cancel "
          onClick={() =>
            onclose() || setCustomerOptions(null) || setProductOptions(null)
          }
          textColor="text-black"
          bgColor="bg-white"
          borderColor="border-gray-300"
          border="border"
        />
      </div>
    </form>
  );
}
