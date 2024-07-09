import { Product } from "../../Types/types";
import { useOrders } from "../Orders/useOrders";
import useProducts from "../Products/useProducts";
import TopProductsRow from "./TopProductsRow";

export default function TopProducts() {
  const { products } = useProducts();
  const { orders } = useOrders();

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

  return (
    <div className="overflow-y-scroll">
      {sortedTopProducts?.map((product: any) => (
        <TopProductsRow key={product.productId} product={product} />
      ))}
    </div>
  );
}
