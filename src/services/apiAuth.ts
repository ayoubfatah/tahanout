import { loginType } from "../Types/types";
import supabase, { supabaseUrl } from "./supabase";
export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  // more secure to do this
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

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
}: {
  email: string;
  password: string;
  fullName: string;
  avatar: File;
  role: string;
  status: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,

    options: {
      data: {
        fullName,
        avatar: "",
        role,
        status,
      },
    },
  });
  if (error) {
    console.error("Error during sign up:", error);
  }
  return data;
}

export async function updateCurrentUser({ fullName, avatar, password }: any) {
  let updatedData: any;
  if (password) updatedData = { password };

  if (fullName) updatedData = { data: { fullName } };

  //1 -  update the password or full name
  const { data, error } = await supabase.auth.updateUser(updatedData);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  if (!avatar) return data;

  //2  - upload the avatar
  const fileName = ` ${Math.random()}-${data.user.id}`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (uploadError) {
    console.error(uploadError);
    throw new Error(uploadError.message);
  }

  // 3 - update the avatar
  const { data: updatedUser, error: error3 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error3) {
    console.error(error3);
    throw new Error(error3.message);
  }

  return updatedUser;
}
