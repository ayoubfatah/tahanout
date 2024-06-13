import supabase from "./supabase";

export async function getSettings() {
  let { data, error } = await supabase.from("settings").select("*");
  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function updateSetting(newSetting = {}) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)

    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
