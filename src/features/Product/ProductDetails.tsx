import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MdEditNote } from "react-icons/md";
import ImageSwitcher from "../../ui/ImageSwitcher";
import useProduct from "./useProduct";
import Spinner from "../../ui/Spinner";
import ProductInfo from "./ProductInfo";
import EditDragDropImages from "../../ui/EditDragDropImages";
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
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <Modal>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl bg-gray-50 dark:bg-gray-900 mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative">
            <motion.span
              whileHover={{ scale: 1.1 }}
              className="absolute z-10 text-sky-500 cursor-pointer top-4 right-4"
            >
              <Modal.Open opens="editProduct">
                <MdEditNote size={35} />
              </Modal.Open>
            </motion.span>
            <ImageSwitcher isLoading={isLoading} images={product?.images} />
          </div>
          <ProductInfo
            product={product}
            testing={testing}
            handleEdit={handleEdit}
          />
        </div>
        <Modal.Window name="editProduct">
          <EditDragDropImages onClose={() => {}} images={product?.images} />
        </Modal.Window>
      </motion.div>
    </Modal>
  );
}
