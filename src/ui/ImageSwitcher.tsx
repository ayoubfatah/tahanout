import React, { useState } from "react";

const ImageSwitcher = ({ image: photo }: any) => {
  const [image, setImage] = useState(1);

  return (
    <div className="md:flex-1 px-4">
      <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
        {[1, 2, 3, 4].map((num) => (
          <div
            key={num}
            className={`h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center ${
              image === num ? "block" : "hidden"
            }`}
          >
            <span className="text-5xl">{num}</span>
          </div>
        ))}
      </div>

      <div className="flex -mx-2 mb-4">
        {[1, 2].map((num) => (
          <div key={num} className="flex-1 px-2">
            <button
              onClick={() => setImage(num)}
              className={`focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center ${
                image === num ? "ring-2 ring-indigo-300 ring-inset" : ""
              }`}
            >
              <span className="text-2xl">{num}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSwitcher;
