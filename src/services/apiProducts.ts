import supabase from "./supabase";

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

export async function createProduct(product: any) {
  let { data, error }: { data: any; error: any } = await supabase
    .from("products")
    .insert([product]);
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
