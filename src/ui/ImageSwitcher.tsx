import React, { useState } from "react";
import { MdArrowBack, MdArrowForward, MdClose } from "react-icons/md";
import Modal from "./Modal";
import AddProductImages from "../features/Product/AddProductImages";
import Spinner from "./Spinner";

type ImageSwitcher = {
  images: string[] | undefined | null;
  onClose?: () => void;
  isLoading?: boolean;
};

const ImageSwitcher = ({ images, onClose, isLoading }: ImageSwitcher) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showLargeImage, setShowLargeImage] = useState(false);

  const handlePreviousImage = () => {
    setSelectedImage((prevIndex) =>
      prevIndex === 0 ? (images?.length ?? 0) - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImage((prevIndex) =>
      prevIndex === (images?.length ?? 0) - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleLargeImage = () => {
    setShowLargeImage(!showLargeImage);
  };

  if (isLoading) return <Spinner />;
  return (
    <Modal>
      <div className="md:flex-1 p-4">
        <div className="relative h-64 md:h-80 bg-gray-100 mb-4">
          {images?.map((img, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full rounded-lg flex items-center justify-center ${
                selectedImage === index ? "block" : "hidden"
              }`}
              onClick={toggleLargeImage}
            >
              <img
                src={img}
                alt={`Product ${index + 1}`}
                className="h-full w-full object-contain"
              />
            </div>
          ))}

          <button
            onClick={handlePreviousImage}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2"
          >
            <MdArrowBack size={15} />
          </button>
          <button
            onClick={handleNextImage}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2"
          >
            <MdArrowForward size={15} />
          </button>
        </div>

        <div className="flex justify-left gap-2 mb-4">
          {images?.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`focus:outline-none w-10 h-10 md:w-14 md:h-14 border ${
                selectedImage === index ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full object-cover rounded"
              />
            </button>
          ))}

          <Modal.Open opens="add-images">
            <button className="bg-gray-200 w-14 h-14">
              <img
                className="h-full w-full object-cover rounded"
                src="https://t4.ftcdn.net/jpg/05/65/22/41/360_F_565224180_QNRiRQkf9Fw0dKRoZGwUknmmfk51SuSS.jpg"
                alt=""
              />
            </button>
          </Modal.Open>
          <Modal.Window name="add-images">
            <AddProductImages />
          </Modal.Window>
        </div>
      </div>

      {showLargeImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={toggleLargeImage}
        >
          <img
            src={images?.[selectedImage]}
            alt={`Large Product ${selectedImage + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
          <button
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
            onClick={(e) => {
              e.stopPropagation();
              toggleLargeImage();
            }}
          >
            <MdClose size={24} />
          </button>
        </div>
      )}
    </Modal>
  );
};

export default ImageSwitcher;
