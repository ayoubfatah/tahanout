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
