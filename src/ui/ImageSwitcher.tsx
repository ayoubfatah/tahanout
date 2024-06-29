import React, { useState } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const ImageSwitcher = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const handlePreviousImage = () => {
    setSelectedImage((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImage((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="md:flex-1  p-4">
      <div className="relative h-64 md:h-80 rounded-lg mb-4">
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
          <MdArrowBack size={24} />
        </button>
        <button
          onClick={handleNextImage}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2"
        >
          <MdArrowForward size={24} />
        </button>
      </div>

      <div className="flex justify-center gap-2 mb-4">
        {images?.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`focus:outline-none w-20 h-20 md:w-24 md:h-24 p-1 border ${
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
      </div>
    </div>
  );
};

export default ImageSwitcher;
