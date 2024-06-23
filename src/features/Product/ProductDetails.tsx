import { useParams } from "react-router-dom";
import ImageSwitcher from "../../ui/ImageSwitcher";
import { formatCurrency } from "../../utils/helpers";

export default function ProductDetails() {
  const { id } = useParams();

  // Fake data for demonstration
  const product = {
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
      "https://s.alicdn.com/@sc04/kf/H4b815a840aaf427997c1254bae379cb4u.png",
      "https://s.alicdn.com/@sc04/kf/Ae04591227db446fab2969a9cca38a104i.jpeg",
      "https://s.alicdn.com/@sc04/kf/A0f91cc77efdb44fbae4fd4586848183eP.jpeg",
      "https://s.alicdn.com/@sc04/kf/A98302d792312401cb1548669f652df4ec.jpeg",
      "https://s.alicdn.com/@sc04/kf/A621bfb21c7ca4185bc12aed7e2d397e6x.jpeg",
    ],
  };

  const handleEdit = () => {
    // Handle edit action, e.g., navigate to edit form
    console.log("Edit button clicked");
  };

  return (
    <div className=" bg-white px-4 py-6 relative">
      <div className="grid grid-cols-2 gap-10 ">
        <div>
          <ImageSwitcher images={product.images} />
        </div>

        <div className="space-y-2 w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">{product.name}</h2>

            <button
              onClick={handleEdit}
              className=" bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Edit
            </button>
          </div>
          <div className="text-xl text-gray-700">
            <span className="font-semibold ">SKU</span>: LKJL234
          </div>
          <div className="text-xl text-gray-700">
            <span className="font-semibold ">Price</span>:{" "}
            {formatCurrency(product.price)}
          </div>
          <div className="text-xl text-gray-700">
            <span className="font-semibold ">Discount Price</span>:{" "}
            {formatCurrency(product.discountPrice)}
          </div>
          <div className="text-lg">
            <span className="font-semibold ">Quantity</span>: {product.quantity}
          </div>
          <div className="text-lg">
            <span className="font-semibold ">Min Order</span>: 29
          </div>
          <div className="text-lg">
            {" "}
            <span className="font-semibold ">Description</span> :{" "}
            {product.description}
          </div>
          <div className="text-lg">
            <span className="font-semibold ">Category</span>: {product.category}
          </div>
          <div className="text-lg">
            <span className="font-semibold ">Brand</span>: {product.brand}
          </div>
          <div className="text-lg flex gap-2 items-center">
            <span className="font-semibold ">Colors:</span>
            <span className="block w-5 h-5 rounded-full bg-black"></span>
          </div>

          <div className="text-lg">
            <span className="font-semibold ">Specifications</span>:
          </div>
          <ul className="ml-4 list-disc">
            <li>Switch Type: {product.specifications.switchType}</li>
            <li>Backlight: {product.specifications.backlight}</li>
            <li>Connectivity: {product.specifications.connectivity}</li>
            <li>Key Rollover: {product.specifications.keyRollOver}</li>
            <li>Weight: {product.specifications.weight}</li>
          </ul>
          <div className="text-lg flex gap-2 items-center">
            <span className="font-semibold ">Warehouse:</span>
            <span>Ouarzazate</span>
          </div>
        </div>
      </div>
    </div>
  );
}
