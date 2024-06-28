import { useParams } from "react-router-dom";
import ImageSwitcher from "../../ui/ImageSwitcher";
import { formatCurrency } from "../../utils/helpers";
import useProduct from "./useProduct";
import Spinner from "../../ui/Spinner";
import ProductInfo from "./ProductInfo";
import EditDragDropImages from "../../ui/EditDragDropImages";

export default function ProductDetails() {
  const { id } = useParams();
  const { isLoading, product } = useProduct();
  const imageUrl = product?.images?.[0];
  // Fake data for demonstration
  const testing = {
    name: "Razer BlackWidow Elite",
    price: 150.0,
    discountPrice: 130.0,
    quantity: 25,
    description:
      "The Razer BlackWidow Elite is a top-tier mechanical gaming keyboard that offers superior performance and customizable features.",
    category: "Technology",
    brand: "Razer",
    specifications: {
      switchType: "Razer Green",
      backlight: "RGB",
      connectivity: "Wired",
      keyRollOver: "10-Key",
      weight: "1.5kg",
    },
    images: [
      imageUrl,
      "https://s.alicdn.com/@sc04/kf/Ae04591227db446fab2969a9cca38a104i.jpeg",
      "https://s.alicdn.com/@sc04/kf/A0f91cc77efdb44fbae4fd4586848183eP.jpeg",
      "https://s.alicdn.com/@sc04/kf/A98302d792312401cb1548669f652df4ec.jpeg",
      "https://s.alicdn.com/@sc04/kf/A621bfb21c7ca4185bc12aed7e2d397e6x.jpeg",
    ],
  };

  const handleEdit = () => {
    // Handle edit action, e.g., navigate to edit form
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className=" bg-white px-4 py-6 relative">
      <div className="grid grid-cols-2 gap-10 ">
        <ImageSwitcher images={product && product.images} />
        <ProductInfo
          product={product}
          testing={testing}
          handleEdit={handleEdit}
        />
      </div>
      <div>
        <EditDragDropImages images={product && product.images} />
      </div>
    </div>
  );
}
