import React from "react";
import ProductDetails from "../features/Product/ProductDetails";
import ProfileDataFrom from "../features/profile/ProfileDataForm";
import ProfilePasswordForm from "../features/profile/ProfilePasswordForm";

export default function Profile() {
  return (
    <div className="flex flex-col gap-10 ">
      <div className="text-[34px] font-bold ">Update your account</div>
      <ProfileDataFrom />
      <ProfilePasswordForm />
    </div>
  );
}
