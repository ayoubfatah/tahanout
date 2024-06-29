import React, { useState, ChangeEvent, DragEvent } from "react";
import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";
import Button from "../../ui/Button";
import { useAddProductImages } from "./useAddProductImages";

interface ImageItem {
  id: string;
  file: File;
  name: string;
  size: number;
}

const AddProductImages: React.FC = ({ onClose }: any) => {
  const [items, setItems] = useState<ImageItem[]>([]);
  const { id }: any = useParams();
  const { mutate, isLoading } = useAddProductImages();

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const files = Array.from(event.target.files);
    const newItems = files.map((file) => ({
      id: URL.createObjectURL(file),
      file,
      name: file.name,
      size: file.size,
    }));
    setItems((prevItems) => {
      const updatedItems = [...prevItems, ...newItems];
      return updatedItems;
    });
  };

  const handleImageDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const newItems = files.map((file) => ({
      id: URL.createObjectURL(file),
      file,
      name: file.name,
      size: file.size,
    }));
    setItems((prevItems) => {
      const updatedItems = [...prevItems, ...newItems];
      return updatedItems;
    });
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDelete = (id: string) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      return updatedItems;
    });
  };

  const handleSave = () => {
    if (!items.length || !id) return;
    mutate(
      { images: items.map((item) => item.file), id },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <main className="flex flex-col gap-4 p-10 w-[600px]">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="mb-4"
      />
      <div
        onDrop={handleImageDrop}
        onDragOver={handleDragOver}
        className="border-dashed border-2 border-gray-300 p-4 mb-4"
      >
        Drop your images here
      </div>
      <div className="mb-4">
        {items.map((item, i) => (
          <div className="list-none shadow-sm" key={item.id}>
            <div className="flex items-center justify-between border p-1 mb-2 bg-white">
              <img
                src={item.id}
                alt={item.name}
                className="w-20 h-20 object-cover"
              />
              <span className="flex-1 ml-4">{item.name}</span>
              <span className="flex-1 ml-4">
                {Math.round(item.size / 1024)} KB
              </span>
              <div className="flex items-center">
                <span>Image {i + 1}</span>
                <button type="button" onClick={() => handleDelete(item.id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={handleSave}
        borderColor="border-blue-500"
        bgColor="bg-sky-500"
        textColor="text-white"
        text="Save"
        disabled={isLoading}
      />
    </main>
  );
};

export default AddProductImages;
