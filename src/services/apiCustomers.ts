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

export async function deleteCustomer(id: number) {
  let { data, error }: { data: any; error: any } = await supabase
    .from("customers")
    .delete()
    .eq("id", id);
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data;
}

export async function createCustomer(customer: any) {
  let { data, error }: { data: any; error: any } = await supabase
    .from("customers")
    .insert([{ ...customer }]);
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data;
}
