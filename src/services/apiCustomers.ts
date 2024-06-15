import supabase from "./supabase";

export async function getCustomers() {
  let { data, error }: { data: any; error: any } = await supabase
    .from("customers")
    .select("*");
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data;
}
