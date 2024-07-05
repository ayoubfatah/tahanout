import { loginType } from "../Types/types";
import supabase from "./supabase";
export async function login({ email, password }: loginType) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error during sign in:", error);
      return { success: false, message: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Unexpected error during sign in:", err);
    return { success: false, message: "An unexpected error occurred." };
  }
}

export async function getCurrentUser() {
  const { data: session, error } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.error(userError);
    throw new Error(userError.message);
  }
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function signUp({
  email,
  password,
  fullName,
  avatar,
  role,
  status,
}: any) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,

      options: {
        data: {
          fullName,
          avatar,
          role,
          status,
        },
      },
    });
    if (error) {
      console.error("Error during sign up:", error);
      return { success: false, message: error.message };
    }
    return { success: true, data };
  } catch (err) {
    console.error("Unexpected error during sign up:", err);
    return { success: false, message: "An unexpected error occurred." };
  }
}
