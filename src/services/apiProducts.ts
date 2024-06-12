import supabase, { supabaseUrl } from "./supabase";
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

export async function createProduct(product: Product) {
  const imageName = `${Math.random()}-${product.image.name}`?.replaceAll(
    "/",
    ""
  ); // so supabase wont create folders cause if there is a / in the name it will create a folder
  const hasImagePath = product.image?.startsWith?.(supabaseUrl);

  const imagePath = hasImagePath
    ? product.image
    : `${supabaseUrl}/storage/v1/object/public/productImages/${imageName}`;

  // 1 creating a product
  let { data, error }: { data: any; error: any } = await supabase
    .from("products")
    .insert([{ ...product, image: imagePath }]);
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  // 2 uploading image
  if (product.image?.startsWith?.(supabaseUrl)) return;

  const { error: storageError } = await supabase.storage
    .from("productImages")
    .upload(imageName, product.image);
  //
  if (storageError) {
    await supabase.from("products").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "product image could't be uploaded and cabin wasn't created "
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

  return data;
}

export async function editProduct(product: Product, id: number) {
  const imageName = `${Math.random()}-${product.image.name}`?.replaceAll(
    "/",
    ""
  ); // so supabase wont create folders cause if there is a / in the name it will create a folder
  const hasImagePath = product.image?.startsWith?.(supabaseUrl);

  const imagePath = hasImagePath
    ? product.image
    : `${supabaseUrl}/storage/v1/object/public/productImages/${imageName}`;

  const { data, error } = await supabase
    .from("products")
    .update({ ...product, image: imagePath })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("product couldn't be added");
  }
  // 2 Upload the image

  if (hasImagePath) return;
  const { error: storageError } = await supabase.storage
    .from("productImages")
    .upload(imageName, product.image);

  // 3 delete cabin if there is was an error uploading the image
  if (storageError) {
    await supabase.from("products").delete().eq("id", product.id);
    console.error(storageError);
    throw new Error(
      "product image could't be uploaded and cabin wasn't created "
    );
  }

  return data;
}
