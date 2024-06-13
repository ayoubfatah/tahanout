import React from "react";
import { useParams } from "react-router-dom";
import useProduct from "../features/Products/useProduct";
import Spinner from "../ui/Spinner";
import ProductDetails from "../features/Products/ProductDetails";
export default function Product() {
  //   const { isLoading, product } = useProduct();

  //   if (isLoading) return <Spinner />;
  return <ProductDetails />;
}
