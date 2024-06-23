import React, { useState } from "react";

const ImageSwitcher = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="md:flex-1 ">
      <div className="h-64 md:h-80 rounded-lg  mb-4">
        {images.map((img, index) => (
          <div
            key={index}
            className={`h-64 md:h-80 rounded-lg  mb-4 flex items-center justify-center ${
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
      </div>

      <div className="flex -mx-2 mb-4">
        {images.map((img, index) => (
          <div key={index} className="bg-gray-100">
            <div className=" px-2">
              <button
                onClick={() => setSelectedImage(index)}
                className={`focus:outline-none w-full  h-24 md:h-32 flex items-center justify-center ${
                  selectedImage === index ? "border-b-[2px] border-black " : ""
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-full w-full object-contain"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSwitcher;
