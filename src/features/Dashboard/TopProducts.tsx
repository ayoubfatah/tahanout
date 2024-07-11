import { OrderType, Product } from "../../Types/types";
import Spinner from "../../ui/Spinner";
import { useOrders } from "../Orders/useOrders";
import useProducts from "../Products/useProducts";
import TopProductsRow from "./TopProductsRow";

export default function TopProducts({ orders }: { orders: OrderType[] }) {
  const { products, isLoading } = useProducts();

  //
  //
  //
  const topProducts = products?.map((product: Product) => {
    const orderedProducts = orders?.filter((order) => {
      return order.productId === product.id;
    });
    const totalOrders = orderedProducts?.reduce((acc, order) => {
      return acc + order.quantity;
    }, 0);
    return {
      totalOrders,
      productId: product?.id,
      productName: product?.name,
      productQuantity: product?.quantity,
      productPrice: product?.price,
      productImage: product?.images && product?.images[0],
      warehouse: product?.warehouse,
      totalRevenues: product?.price * totalOrders,
    };
  });

  const sortedTopProducts = topProducts?.sort((a: any, b: any) => {
    return b.totalRevenues - a.totalRevenues;
  });
  if (isLoading) return <Spinner />;
  if (sortedTopProducts?.length === 0)
    return <div className=" p-2 text-gray-600">No products found</div>;
  return (
    <div className="bg-white p-5 col-span-2 flex flex-col gap-3 overflow-x-scroll rounded-md duration-300 transition-all">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        Top Products:
      </h2>
      <div className="overflow-y-scroll">
        {sortedTopProducts?.map((product: any, i: number) => (
          <TopProductsRow key={product.productId} i={i} product={product} />
        ))}
      </div>
    </div>
  );
}
