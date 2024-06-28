import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { Reorder } from "framer-motion";
import toast from "react-hot-toast";
import { useUpdateImages } from "../features/Product/UseUpdateImages";
import { useParams } from "react-router-dom";

interface ImageItem {
  id: string;
  name: string;
  size: number;
  url: string;
}

interface EditDragDropImagesProps {
  images: string[];
}

const EditDragDropImages: React.FC<EditDragDropImagesProps> = ({ images }) => {
  const [items, setItems] = useState<ImageItem[]>([]);
  const { id: productId } = useParams();
  const { orderingImages, isLoading } = useUpdateImages();
  useEffect(() => {
    const initialItems = images.map((url) => {
      const name = url.split("/").pop() || "unknown";
      return {
        id: url, // use URL as ID for initial images
        url,
        name,
        size: 0, // initial size is unknown
      };
    });
    setItems(initialItems);
  }, [images]);

  const handleDelete = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleSave = () => {
    const imageUrls = items.map((item) => item.url);

    orderingImages({
      imageUrls,
      productId,
    });
    // You can use the `imageUrls` as needed
  };

  return (
    <main className="flex flex-col gap-4 p-4">
      <Reorder.Group
        as="div"
        values={items}
        onReorder={setItems}
        className="mb-4"
      >
        {items.map((item, i) => (
          <Reorder.Item
            className="list-none shadow-sm"
            key={item.id}
            value={item}
          >
            <div className="flex items-center justify-between border p-1 mb-2 bg-white">
              <img
                src={item.url}
                alt={item.name}
                className="w-20 h-20 object-cover"
              />
              <span className="flex-1 ml-4">{item.name}</span>
              <span className="flex-1 ml-4">
                {item.size
                  ? `${Math.round(item.size / 1024)} KB`
                  : "Unknown size"}
              </span>
              <div className="flex items-center">
                <span>Image {i + 1}</span>
                <button type="button" onClick={() => handleDelete(item.id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <button
        onClick={handleSave}
        className="text-white bg-sky-500 px-4 py-2 rounded-md"
      >
        Save
      </button>
    </main>
  );
};

export default EditDragDropImages;
