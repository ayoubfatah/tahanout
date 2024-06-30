import React, { useState } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import Modal from "./Modal";
import AddProductImages from "../features/Product/AddProductImages";

type ImageSwitcher = {
  images: string[] | undefined | null;
  onClose?: () => void;
};
const ImageSwitcher = ({ images, onClose }: ImageSwitcher) => {
  const [selectedImage, setSelectedImage] = useState(0);

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

  return (
    <Modal>
      <div className="md:flex-1  p-4">
        <div className="relative h-64 md:h-80 bg-gray-100  mb-4">
          {images?.map((img, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full rounded-lg flex items-center justify-center ${
                selectedImage === index ? "block" : "hidden"
              }`}
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

        <div className="flex justify-left gap-2  mb-4">
          {images?.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`  focus:outline-none w-10 h-10 md:w-14 md:h-14  border ${
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
            <button className="bg-gray-200   w-14 h-14 ">
              <img
                className="h-full w-full object-cover rounded"
                src="https://t4.ftcdn.net/jpg/05/65/22/41/360_F_565224180_QNRiRQkf9Fw0dKRoZGwUknmmfk51SuSS.jpg"
                alt=""
              />
            </button>
          </Modal.Open>
          <Modal.Window name="add-images">
            {/* GETS a onClose function from the modal window cloned */}
            <AddProductImages />
          </Modal.Window>
        </div>
      </div>
    </Modal>
  );
};

export default ImageSwitcher;
