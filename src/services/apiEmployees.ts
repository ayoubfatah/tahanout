import { EmployeesType } from "../Types/types";
import supabase from "./supabase";

export async function getEmployees() {
  let { data, error }: { data: any; error: any } = await supabase
    .from("employees")
    .select("*");
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data;
}

export async function createEmployee(employee: EmployeesType) {
  let { data, error }: { data: any; error: any } = await supabase
    .from("employees")
    .insert([{ ...employee }]);
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data;
}
