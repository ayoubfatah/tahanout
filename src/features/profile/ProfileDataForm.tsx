import React, { ChangeEvent } from "react";
import Button from "../../ui/Button";
import { useUser } from "../authentication/useUser";
import { useUpdateUserData } from "../authentication/useUpdateUserData";

export default function ProfileDataFrom() {
  const { mutate: updateUser, isLoading } = useUpdateUserData();
  const { user } = useUser();
  const { email, fullName: name } = user?.user_metadata || {};

  const [fullName, setFullName] = React.useState<string>("");
  const [avatar, setAvatar] = React.useState<string>("");
  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    updateUser({ fullName, avatar });
    setFullName("");
    setAvatar("");
  }
  function handleReset(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setFullName("");
    setAvatar("");
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="text-[20px] font-bold">Update user data:</div>
      <form className="flex flex-col gap-3 bg-white py-5 px-6 rounded-md">
        <div className="flex gap-[100px] items-center  border-gray-200 border-b border-dashed py-6">
          <label className="w-1/6" htmlFor="email">
            Email
          </label>

          <input
            disabled={true}
            defaultValue={email}
            className="border text-gray-400 cursor-not-allowed  w-[300px] rounded-md border-gray-500 py-1.5 px-3"
            type="email"
            id="email"
          />
        </div>
        <div className="flex gap-[100px] items-center  border-gray-200 border-b border-dashed py-6">
          <label htmlFor="name" className="w-1/6">
            Full name :
          </label>
          <input
            onChange={(e) => setFullName(e.target.value)}
            defaultValue={name}
            className="border  w-[300px] rounded-md border-gray-500 py-1.5 px-3"
            type="text"
            id="name"
          />
        </div>
        <div className="flex gap-[100px] items-center  border-gray-200 border-b border-dashed py-6">
          <label htmlFor="name" className="w-1/6">
            Avatar Image:
          </label>
          <input
            onChange={(e: any) => setAvatar(e.target.files?.[0])}
            className="    file:py-2 file:px-3 file:rounded-md  file:font-medium file:border-[0px]   file:text-white file:bg-sky-500   py-1 "
            type="file"
            accept="image/*"
            id="name"
          />
        </div>
        <div className="flex justify-end gap-4 my-2">
          <Button
            text="cancel"
            onClick={() => handleReset}
            textColor="text-black"
            bgColor="bg-white "
            border="border"
            borderColor="border-gray-300 "
          />
          <Button
            text="Update Account"
            onClick={(e: any) => handleSubmit(e)}
            textColor="text-white"
            bgColor="bg-sky-500"
          />
        </div>
      </form>
    </div>
  );
}
