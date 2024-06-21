import supabase from "./supabase";

export async function getOrders() {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*, customers(*) , products(*)");

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error("No data returned");
    }

    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

export async function createOrder(order: any) {
  let { data, error }: { data: any; error: any } = await supabase
    .from("orders")
    .insert([{ ...order }]);
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data;
}

export async function deleteOrder(id: number) {
  let { data, error }: { data: any; error: any } = await supabase
    .from("orders")
    .delete()
    .eq("id", id);
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data;
}
