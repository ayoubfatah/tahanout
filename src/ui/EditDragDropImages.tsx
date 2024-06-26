import React, { useState, ChangeEvent, DragEvent } from "react";
import { MdDelete } from "react-icons/md";
import { Reorder } from "framer-motion";
import toast from "react-hot-toast";

interface ImageItem {
  id: string;
  file: File | null; // Allow for File or null (for existing images)
  name: string;
  size: number;
}

interface EditDragDropImagesProps {
  images: ImageItem[];
}

const EditDragDropImages: React.FC<EditDragDropImagesProps> = ({ images }) => {
  const [items, setItems] = useState<ImageItem[]>(images);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const files = Array.from(event.target.files);
    const newItems = files.map((file) => ({
      id: URL.createObjectURL(file),
      file,
      name: file.name,
      size: file.size,
    }));
    setItems((prevItems) => [...prevItems, ...newItems]);
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
    setItems((prevItems) => [...prevItems, ...newItems]);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDelete = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleSave = () => {
    const data = items.map((item) => ({
      name: item.name,
      size: item.size,
      file: item.file,
    }));

    const files = data
      .map((item) => item.file)
      .filter((file) => file !== null) as File[];
    console.log(files);
    toast.success("Images uploaded successfully");
  };

  return (
    <main className="flex flex-col gap-4 p-4">
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
                src={item.id}
                alt={item.name}
                className="w-20 h-20 object-cover"
              />
              <span className="flex-1 ml-4">{item.name}</span>
              <span className="flex-1 ml-4">
                {item.file
                  ? Math.round(item.size / 1024) + " KB"
                  : "Existing Image"}
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
