import React from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";

export default function TopProductsRow({ product, i }: any) {
  const navigate = useNavigate();
  return (
    <div
      className=" cursor-pointer flex items-center justify-between hover:bg-gray-100 p-2 border-b-[1px] border-gray-300 border-dashed"
      onClick={() => navigate(`/products/${product.productId}`)}
    >
      <div className="w-10 h-10   flex items-center justify-center">
        <span className="text-gray-600 text-[12px]">{i + 1}#</span>
        <img
          className="w-full h-full object-cover bg-center bg-no-repeat"
          src={product.productImage}
          alt={product.productName}
        />
      </div>
      <div className="flex justify-center flex-col text-[12px]">
        <span className="text-gray-500">{product.productName}</span>
        <span className="text-gray-600">${product.productPrice}</span>
      </div>
      <div className="flex justify-center flex-col text-[12px]">
        <span className="text-gray-400">Quantity</span>
        <span className="text-gray-500">{product.productQuantity}</span>
      </div>
      <div className="flex justify-center flex-col text-[12px]">
        <span className="text-gray-400">Orders</span>
        <span className="text-gray-500">{product.totalOrders}</span>
      </div>
      <div className="flex justify-center flex-col text-[12px]">
        <span className="text-gray-400">total revenues</span>
        <span className="text-blue-500">
          {formatCurrency(product.totalRevenues)}
        </span>
      </div>
    </div>
  );
}
