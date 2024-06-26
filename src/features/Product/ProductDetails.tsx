import { useParams } from "react-router-dom";
import ImageSwitcher from "../../ui/ImageSwitcher";
import { formatCurrency } from "../../utils/helpers";
import useProduct from "./useProduct";
import Spinner from "../../ui/Spinner";
import ProductInfo from "./ProductInfo";
import EditDragDropImages from "../../ui/EditDragDropImages";
import { MdEditNote } from "react-icons/md";
import Modal from "../../ui/Modal";

export default function ProductDetails() {
  const { id } = useParams();
  const { isLoading, product } = useProduct();

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
    images: product?.images,
  };

  const handleEdit = () => {
    // Handle edit action, e.g., navigate to edit form
  };

  if (isLoading) {
    return <Spinner />;
  }

  const handleUpload = (file: File) => {};
  return (
    <Modal>
      <div className="  px-4 py-6 relative">
        <div className="grid grid-cols-2 gap-10 ">
          <div className="relative">
            <span className="absolute z-[10]  text-sky-500 cursor-pointer top-[15px] right-[15px]">
              <Modal.Open opens="editProduct">
                <MdEditNote size={35} />
              </Modal.Open>
            </span>
            <ImageSwitcher images={product && product.images} />
          </div>
          <ProductInfo
            product={product}
            testing={testing}
            handleEdit={handleEdit}
          />
        </div>
        <Modal.Window name="editProduct">
          <EditDragDropImages
            onClose={() => {}}
            images={product && product.images}
          />
        </Modal.Window>
      </div>
    </Modal>
  );
}
