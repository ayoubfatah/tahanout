import { Product } from "../Types/types";
import supabase, { supabaseUrl } from "./supabase";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs

export async function getProducts() {
  let { data, error }: { data: any; error: any } = await supabase
    .from("products")
    .select("*");
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return { data };
}

// single product

export async function getProduct(id: number) {
  let { data, error }: { data: Product | null; error: any } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data;
}

export async function deleteProduct(id: any) {
  let { data, error }: { data: any; error: any } = await supabase
    .from("products")
    .delete()
    .eq("id", id);
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data;
}

export async function duplicateProduct(product: Product): Promise<Product> {
  let { data, error }: { data: any; error: any } = await supabase
    .from("products")
    .insert([{ ...product }]);
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data;
}

export async function editProduct(product: Product, id: number) {
  // const imageName = `${product.images.name}-${Math.random()}`?.replaceAll(
  //   "/",
  //   ""
  // ); // so supabase wont create folders cause if there is a / in the name it will create a folder
  // const hasImagePath = product.imageS?.startsWith?.(supabaseUrl);

  // const imagePath = hasImagePath
  //   ? product.imageS
  //   : `${supabaseUrl}/storage/v1/object/public/productImages/${imageName}`;

  const { data, error } = await supabase
    .from("products")
    .update({ ...product })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("product couldn't be added");
  }
  // 2 Upload the image

  // if (hasImagePath) return;
  // const { error: storageError } = await supabase.storage
  //   .from("productImages")
  //   .upload(imageName, product.image);

  // // 3 delete cabin if there is was an error uploading the image
  // if (storageError) {
  //   await supabase.from("products").delete().eq("id", product.id);
  //   console.error(storageError);
  //   throw new Error(
  //     "product image could't be uploaded and cabin wasn't created "
  //   );
  // }

  return data;
}

export async function updateQuantity(newQuantity: number, id: number) {
  const { data, error } = await supabase
    .from("products")
    .update({ quantity: newQuantity })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("product couldn't be added");
  }
  return data;
}

interface ImageData {
  originalName: any;
  newName: any;
}
export async function createProduct(product: any) {
  // Prepare images with unique names and paths
  const images: any = product.images.map((image: any) => {
    const imageName = `${uuidv4()}-${image.name.replace("/", "")}`; // Ensure unique image name
    const imagePath = `https://jmvbwhvpdounmufynkwd.supabase.co/storage/v1/object/public/productImages/${imageName}`;

    return {
      name: imageName,
      path: imagePath,
      file: image, // Assuming image here is the File object from input
    };
  });

  // Insert product entry in the database with image paths
  let { data, error }: any = await supabase.from("products").insert([
    {
      ...product,
      images: images.map((img: any) => img.path), // Store only paths in the database
    },
  ]);

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  // Upload images to Supabase storage
  for (const image of images) {
    const { error: storageError } = await supabase.storage
      .from("productImages")
      .upload(image.name, image.file);

    if (storageError) {
      // Clean up: delete product entry if image upload fails
      await supabase
        .from("products")
        .delete()
        .eq("id", data && data[0]?.id); // Assuming data is an array
      console.error(storageError);
      throw new Error(
        "One or more product images couldn't be uploaded, and the product was not created."
      );
    }
  }

  return data; // Return the created product data
}

export async function updateImages(imageUrls: string[], productId: number) {
  const { data, error } = await supabase
    .from("products")
    .update({ images: imageUrls })
    .eq("id", Number(productId))
    .select();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
