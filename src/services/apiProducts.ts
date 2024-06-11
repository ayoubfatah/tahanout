import supabase from "./supabase";
import { Product } from "../Types/types";
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

export async function createProduct(product: Product) {
  const imageName = `${Math.random()}-${product.image.name}`?.replace("/", ""); // so supabase wont create folders cause if there is a / in the name it will create a folder
  const imagePath = product.image?.startsWith?.(
    "https://abpbmrevqhrumbygedav.supabase.co/storage/v1/object/public/productImages/"
  )
    ? product.image
    : ` https://jmvbwhvpdounmufynkwd.supabase.co/storage/v1/object/public/productImages/${imageName}`;
  // 1 creating a product
  let { data, error }: { data: any; error: any } = await supabase
    .from("products")
    .insert([{ ...product, image: imagePath }]);
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  // 2 uploading image
  if (
    product.image?.startsWith?.(
      "https://abpbmrevqhrumbygedav.supabase.co/storage/v1/object/public/productImages/"
    )
  )
    return;
  const { error: storageError } = await supabase.storage
    .from("productImages")
    .upload(imageName, product.image);
  //
  if (storageError) {
    await supabase.from("cabins").delete().eq("cabinId", data.cabinId);
    console.error(storageError);
    throw new Error(
      "cabins image could't be uploaded and cabin wasn't created "
    );
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
  // 2 uploading image

  return data;
}
