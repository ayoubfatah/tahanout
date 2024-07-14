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

// export async function createProduct(product: any) {
//   // Prepare images with unique names and paths
//   const images: any = product.images.map((image: any) => {
//     const imageName = `${uuidv4()}-${image.name.replace("/", "")}`; // Ensure unique image name
//     const imagePath = `https://jmvbwhvpdounmufynkwd.supabase.co/storage/v1/object/public/productImages/${imageName}`;

//     return {
//       name: imageName,
//       path: imagePath,
//       file: image, // Assuming image here is the File object from input
//     };
//   });

//   // Insert product entry in the database with image paths
//   let { data, error }: any = await supabase.from("products").insert([
//     {
//       ...product,
//       images: images.map((img: any) => img.path), // Store only paths in the database
//     },
//   ]);

//   if (error) {
//     console.log(error);
//     throw new Error(error.message);
//   }

//   // Upload images to Supabase storage
//   for (const image of images) {
//     const { error: storageError } = await supabase.storage
//       .from("productImages")
//       .upload(image.name, image.file);

//     if (storageError) {
//       // Clean up: delete product entry if image upload fails
//       await supabase
//         .from("products")
//         .delete()
//         .eq("id", data && data[0]?.id); // Assuming data is an array
//       console.error(storageError);
//       throw new Error(
//         "One or more product images couldn't be uploaded, and the product was not created."
//       );
//     }
//   }

//   return data; // Return the created product data
// }

export async function createProduct(product: any) {
  // Prepare images with unique names and paths
  const images: any = product.images.map((image: any) => {
    const imageName = `${uuidv4()}-${image.name.replace("/", "")}`;
    const imagePath = `https://jmvbwhvpdounmufynkwd.supabase.co/storage/v1/object/public/productImages/${imageName}`;

    return {
      name: imageName,
      path: imagePath,
      file: image,
    };
  });

  // Insert product entry in the database with image paths
  let { data, error }: any = await supabase.from("products").insert([
    {
      ...product,
      images: images.map((img: any) => img.path),
    },
  ]);

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  // Upload images to Supabase storage in parallel
  const uploadPromises = images.map((image: any) =>
    supabase.storage
      .from("productImages")
      .upload(image.name, image.file)
      .then(({ error }) => ({ imagePath: image.path, error }))
  );

  const uploadResults = await Promise.all(uploadPromises);

  // Filter out failed uploads and get successful image paths
  const successfulUploads = uploadResults
    .filter((result) => !result.error)
    .map((result) => result.imagePath);

  // If some uploads failed, update the product with only successful uploads
  if (successfulUploads.length !== images.length) {
    const { error: updateError } = await supabase
      .from("products")
      .update({ images: successfulUploads })
      .eq("id", data[0].id);

    if (updateError) {
      console.error(
        "Failed to update product with successful uploads:",
        updateError
      );
    }

    console.warn(
      `Some images failed to upload. Product created with ${successfulUploads.length} out of ${images.length} images.`
    );
  }

  return data;
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

export async function addImages(images: File[], productId: number) {
  // Prepare images with unique names and paths
  const preparedImages = images.map((image: File) => {
    const imageName = `${uuidv4()}-${image.name.replace("/", "")}`;
    const imagePath = `https://jmvbwhvpdounmufynkwd.supabase.co/storage/v1/object/public/productImages/${imageName}`;
    return { name: imageName, path: imagePath, file: image };
  });

  try {
    // Fetch existing product data to get current images
    const { data: existingData, error: fetchError } = await supabase
      .from("products")
      .select("images")
      .eq("id", productId)
      .single();

    if (fetchError) throw new Error("Failed to fetch existing product data.");

    const existingImages = existingData.images || [];
    const newImagesPaths = preparedImages.map((img) => img.path);

    // Update product entry in the database with new image paths
    const { data, error: updateError } = await supabase
      .from("products")
      .update({ images: [...existingImages, ...newImagesPaths] })
      .eq("id", productId)
      .select();

    if (updateError) throw new Error("Failed to update product data.");

    // Upload images to Supabase storage in parallel
    const uploadPromises = preparedImages.map((image) =>
      supabase.storage.from("productImages").upload(image.name, image.file)
    );

    const uploadResults = await Promise.allSettled(uploadPromises);

    // Check for any failed uploads
    const failedUploads = uploadResults.filter(
      (result) => result.status === "rejected"
    );

    if (failedUploads.length > 0) {
      // Some uploads failed, update the product with only successful uploads
      const successfulUploads = uploadResults
        .filter((result) => result.status === "fulfilled")
        .map((_, index) => newImagesPaths[index]);

      await supabase
        .from("products")
        .update({ images: [...existingImages, ...successfulUploads] })
        .eq("id", productId);

      console.warn(
        `${failedUploads.length} out of ${images.length} images failed to upload.`
      );
    }

    return data;
  } catch (error) {
    console.error("Error in addImages:", error);
    throw error;
  }
}
