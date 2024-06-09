import supabase from "./supabase";

export default async function getProducts() {
  let { data: Products, error }: { data: any; error: any  } = await supabase
    .from("Products")
    .select("*");
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return { Products, error };
}
