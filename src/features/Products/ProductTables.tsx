import Products from "../../pages/Products";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Tabel";
import ProductForm from "./ProductForm";
import ProductRow from "./ProductRow";
import useProducts from "./useProducts";

type ProductType = {
  image: string;
  sku: string;
  name: string;
  price: number;
  discount: number;
  quantity: number;
  warehouse: string;
};

export default function ProductTables() {
  const { isLoading, products } = useProducts();

  if (isLoading) return <Spinner />;

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

          <div>
            {products.length > 0 ? (
              products?.map((product: any) => (
                <ProductRow key={product.id || product.sku} data={product} />
              ))
            ) : (
              <div className="px-3 py-4 border-b border-gray-200">
                No Products available...
              </div>
            )}
          </div>

          <Table.Footer></Table.Footer>
        </Table>
      </div>
      <Modal>
        <Modal.Open opens="Products">
          <button className=" text-white bg-sky-500 px-4 py-2 rounded-md mt-5">
            Add Product{" "}
          </button>
        </Modal.Open>
        <Modal.Window name="Products">
          <ProductForm />
        </Modal.Window>
      </Modal>
    </>
  );
}
