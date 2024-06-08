import Button from "../../ui/Button";
import Table from "../../ui/Tabel";
import ProductRow from "./ProductRow";

type ProductType = {
  image: string;
  sku: string;
  name: string;
  price: number;
  discount: number;
  quantity: number;
  warehouse: string;
};

const data: ProductType[] = [
  {
    image:
      "https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight-2/gallery-5-pro-x-superlight-2-gaming-mouse-black.png?v=1",
    sku: "342JDS",
    name: "Logitech G3432 ",
    price: 200,
    discount: 20,
    quantity: 22,
    warehouse: "Casablanca",
  },
  {
    image:
      "https://i5.walmartimages.com/seo/Razer-BlackShark-V2-SE-Wired-Gaming-Headset-for-PC-PS4-PS5-Xbox-X-S-Switch-262-g-Black_7ebd085a-d4f5-4273-b269-cbd2897f6f94.1f79972e65b11a80160fa9c61a9e88cf.png",
    sku: "3dfs2JDS",
    name: "Razer HeadPhones ",
    price: 100,
    discount: 0,
    quantity: 102,
    warehouse: "Marrakech",
  },
  {
    image:
      "https://www.ultrapc.ma/14983-large_default/razer-seiren-mini-noir.jpg",
    sku: "3d42JDS",
    name: "Razer Mic ",
    price: 500,
    discount: 100,
    quantity: 20,
    warehouse: "Ouarzazate",
  },
];

export default function ProductTables() {
  return (
    <>
      <div className="border border-gray-200 rounded-md text-gray-600">
        <Table col="1.3fr 1fr 1.5fr 1fr 1fr 1fr 1fr 1fr">
          <Table.Header>
            <span className=""></span>
            <span className="">sku</span>
            <span className="">Product</span>
            <span className="">Price</span>
            <span className="">Discount</span>
            <span className="">Quantity</span>
            <span className="">WareHouse </span>
          </Table.Header>

          {data.map((product) => (
            <>
              {" "}
              <ProductRow key={product.sku} data={product} />
            </>
          ))}
        </Table>
      </div>

      <Button text="Add Product" color="bg-sky-500" />
    </>
  );
}
