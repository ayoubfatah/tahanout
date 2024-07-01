import { useState } from "react";
import Products from "../../pages/Products";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import SearchInput from "../../ui/SearchInput";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Tabel";
import ProductForm from "./ProductForm";
import ProductRow from "./ProductRow";
import useProducts from "./useProducts";
import Filter from "../../ui/Filter";
import ProductTablesOperations from "./ProductTablesOperations";
import { useSearchParams } from "react-router-dom";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const filteredValue = searchParams.get("filter") || "all";
  let filteredProductsFromUrl;

  if (filteredValue === "all") {
    filteredProductsFromUrl = products;
  }
  if (filteredValue === "with-discount") {
    filteredProductsFromUrl = products.filter(
      (product: ProductType) => product.discount > 0
    );
  }
  if (filteredValue === "no-discount") {
    filteredProductsFromUrl = products.filter(
      (product: ProductType) => product.discount === 0
    );
  }
  console.log(products, filteredProductsFromUrl, filteredValue);

  const [filteredProducts, setFilteredProducts] = useState(
    filteredProductsFromUrl
  );
  if (isLoading) return <Spinner />;
  return (
    <>
      <ProductTablesOperations
        setFilteredProducts={setFilteredProducts}
        products={filteredProductsFromUrl}
      />

      <div className="border  border-gray-200 rounded-md text-gray-600">
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
            {filteredProducts?.length > 0 ? (
              filteredProducts?.map((product: any) => (
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
