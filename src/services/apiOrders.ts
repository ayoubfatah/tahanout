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

export async function editOrder(newOrderData: any, id: number) {
  let { data, error }: { data: any; error: any } = await supabase
    .from("orders")
    .update(newOrderData)
    .eq("id", id);
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data;
}

export async function getOrder(id: number) {
  let { data, error }: { data: any; error: any } = await supabase
    .from("orders")
    .select("*, customers(*) , products(*)")
    .eq("id", id)
    .single();
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data;
}

export async function changeStatus(id: number, status: string) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status: status })
    .eq("id", id)
    .select();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data;
}

export async function updateOrderDate(id: number | string, status: string) {
  let updateData: any = {};
  const now = new Date().toISOString();

  switch (status) {
    case "cancelled":
      updateData = { cancelledAt: now };
      break;
    case "confirmed":
      updateData = { confirmedAt: now };
      break;
    case "delivered":
      updateData = { deliveredAt: now };
      break;
    default:
      throw new Error("Invalid status");
  }

  const { data, error } = await supabase
    .from("orders")
    .update(updateData)
    .eq("id", id)
    .select();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data;
}
