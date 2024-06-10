import ProductForm from "../features/Products/ProductForm";
import ProductTables from "../features/Products/ProductTables";
export default function Products() {
  return (
    <div className="">
      <div className="flex justify-between mb-8 ">
        <h1 className="text-[24px] font-semibold">Products</h1>
        <h1 className="text-[24px] font-semibold">buttons</h1>
      </div>
      <ProductTables />
    </div>
  );
}
