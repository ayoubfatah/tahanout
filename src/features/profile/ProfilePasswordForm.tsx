import React, { useState, ChangeEvent, FormEvent } from "react";
import Button from "../../ui/Button";
import { useUser } from "../authentication/useUser";
import { useUpdateUserData } from "../authentication/useUpdateUserData";

export default function ProfilePasswordForm() {
  const { mutate: updateUser, isLoading } = useUpdateUserData();
  const { user } = useUser();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    updateUser({ password });
    // Call your updateUser mutation here
    // updateUser({ password });
  }

  function handleReset() {
    setPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setConfirmPasswordError("");
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setPassword(value);

    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } else {
      setPasswordError("");
    }

    if (confirmPassword && value !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  }

  function handleConfirmPasswordChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setConfirmPassword(value);

    if (password && value !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-[20px] font-bold">Update user's password:</div>
      <form
        className="flex flex-col gap-3 bg-white  dark:bg-gray-900 py-5 px-6 rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-[100px] items-center border-gray-200 border-b border-dashed py-6">
          <label className="w-1/6" htmlFor="password">
            Password
          </label>
          <input
            disabled={isLoading}
            className="border focus:outline-sky-500 w-[300px] dark:bg-gray-800 rounded-md border-gray-500 py-1.5 px-3"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {passwordError && <span className="text-red-500">{passwordError}</span>}
        <div className="flex gap-[100px] items-center border-gray-200 border-b border-dashed py-6">
          <label className="w-1/6" htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            disabled={isLoading}
            className="border focus:outline-sky-500 w-[300px] dark:bg-gray-800 rounded-md border-gray-500 py-1.5 px-3"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        {confirmPasswordError && (
          <span className="text-red-500">{confirmPasswordError}</span>
        )}
        <div className="flex justify-end gap-4 my-2">
          <Button
            text="cancel"
            onClick={handleReset}
            textColor="  text-gray-800"
            bgColor="bg-white"
            border="border"
            borderColor="border-gray-300"
          />
          <Button
            disabled={isLoading}
            onClick={handleSubmit}
            text="Update password"
            type="submit"
            textColor="text-white"
            bgColor="bg-sky-500"
          />
        </div>
      </form>
    </div>
  );
}
