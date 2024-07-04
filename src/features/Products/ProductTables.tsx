import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Tabel";
import ProductForm from "./ProductForm";
import ProductRow from "./ProductRow";
import ProductTablesOperations from "./ProductTablesOperations";
import useProducts from "./useProducts";
import {
  ORDER_TABLE_PAGINATION,
  PRODUCT_TABLE_PAGINATION,
} from "../../utils/consts";

type ProductType = {
  id: string;
  image: string;
  sku: string;
  name: string;
  price: number;
  discount: number;
  quantity: number;
  warehouse: string;
  createdAt: string;
};

export default function ProductTables() {
  const { isLoading, products } = useProducts();
  const [searchParams] = useSearchParams();
  const filteredValue = searchParams.get("discount") || "all";
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

  // sort by
  const sortByValue = searchParams.get("sortBy") || "createdAt-asc";
  const [field, direction] = sortByValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedProducts = filteredProductsFromUrl?.sort((a: any, b: any) => {
    if (field === "price" || field === "quantity") {
      return (a[field] - b[field]) * modifier;
    } else if (field === "createdAt") {
      return (
        (new Date(a[field]).getTime() - new Date(b[field]).getTime()) * modifier
      );
    } else {
      return a[field].localeCompare(b[field]) * modifier;
    }
  });

  const [filteredProducts, setFilteredProducts] = useState(sortedProducts);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = PRODUCT_TABLE_PAGINATION; // You can adjust this number as needed

  // Get current orders
  const indexOfLastProduct = currentPage * productsPerPage; // 5
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage; // 0
  const currentProducts = filteredProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) return <Spinner />;
  return (
    <>
      <ProductTablesOperations
        setFilteredProducts={setFilteredProducts}
        products={filteredProductsFromUrl}
      />

      <div className="border border-gray-200 rounded-md text-gray-600">
        <Table col="1.3fr 1fr 1.9fr 1fr 1fr 1fr 1fr 40px">
          <Table.Header>
            <span></span>
            <span>SKU</span>
            <span>Product</span>
            <span>Price</span>
            <span>Discount</span>
            <span>Quantity</span>
            <span>Warehouse</span>
          </Table.Header>

          <div>
            {currentProducts?.length > 0 ? (
              currentProducts.map((product: any) => (
                <ProductRow key={product.id || product.sku} data={product} />
              ))
            ) : (
              <div className="px-3 py-4 border-b border-gray-200">
                No products available...
              </div>
            )}
          </div>

          <Table.Footer
            currentPage={currentPage}
            productsPerPage={productsPerPage}
            totalOrders={filteredProducts?.length || 0}
            paginate={paginate}
          />
        </Table>
      </div>
      <Modal>
        <Modal.Open opens="Products">
          <button className="text-white bg-sky-500 px-4 py-2 rounded-md mt-5">
            Add Product
          </button>
        </Modal.Open>
        <Modal.Window name="Products">
          <ProductForm />
        </Modal.Window>
      </Modal>
    </>
  );
}
