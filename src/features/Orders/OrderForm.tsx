import { useTahanout } from "../../contextApi/useTahanoutCA";
import Button from "../../ui/Button";
import Dropdown from "../../ui/Dropdown";
import PaymentMethodDropDown from "../../ui/PaymentMethodDropDown";
import { useCustomers } from "../Customers/useCutomers";
import useProducts from "../Products/useProducts";
import useGetSettings from "../Settings/useGetSettings";
import CustomerOptions from "./CustomerOptions";
import ProductOptions from "./ProductOptions";
import useAddOrder from "../Orders/useAddOrders";
import toast from "react-hot-toast";

export default function OrderForm({ onClose: onclose }: any) {
  const { isLoading, customers } = useCustomers();
  const { isLoading: isLoading2, products } = useProducts();
  const {
    customerOptions,
    productOptions,
    paymentMethod,
    setProductOptions,
    setCustomerOptions,
    setPaymentMethod,
  } = useTahanout();
  const { data: settings } = useGetSettings();
  const { isLoading: isLoading3, mutate } = useAddOrder();

  function handleOnClick() {
    if (productOptions && productOptions.price !== undefined) {
      const orderData = {
        id: Math.floor(Math.random() * 1000),
        customerId: customerOptions?.id,
        productId: productOptions?.id,
        productPrice: productOptions.price - productOptions.discount,
        shippingCost: settings[0].shippingPrice,
        totalPrice:
          productOptions.price -
          productOptions.discount +
          settings[0].shippingPrice,
        paymentMethod: paymentMethod,
        status: "pending",
        created_at: new Date(),
      };
      mutate(orderData, {
        onSuccess: () => {
          toast.success("Order created successfully");
          onclose();
          setCustomerOptions(null);
          setProductOptions(null);
          setPaymentMethod(null);
        },
      });
    } else {
      onclose();
      return null;
      setCustomerOptions(null);
      setProductOptions(null);
      setPaymentMethod(null);
    }
  }
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
          onClick={handleOnClick}
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
