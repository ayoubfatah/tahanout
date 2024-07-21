import React, { useState } from "react";
import { login } from "../../services/apiAuth";
import { useLogin } from "./useLogin";

export default function LoginFrom() {
  const [email, setEmail] = useState("ayoubfatah222@gmail.com");
  const [password, setPassword] = useState("ayoubfatah222");
  const { login, isLoading } = useLogin();
  const handleLogin = (e: any) => {
    e.preventDefault();
    if (!email || !password) return;
    login({ email, password });
  };
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-gray-100  flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5 tracking-widest">
          TAHANOUT
        </h1>
        <div className="bg-white dark:bg-gray-800 dark:text-black  shadow w-full rounded-lg divide-y divide-gray-200">
          <form onSubmit={handleLogin} className="px-5 py-7">
            <label
              className="font-semibold text-sm text-gray-600 dark:text-gray-200 pb-1 block"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              disabled={isLoading}
              defaultValue={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              required
            />
            <label
              className="font-semibold text-sm text-gray-600  dark:text-gray-200 pb-1 block"
              htmlFor="password"
            >
              Password
            </label>
            <input
              disabled={isLoading}
              defaultValue={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              required
            />
            <button
              disabled={isLoading}
              type="submit"
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            >
              <span className="inline-block mr-2">Login</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </form>
          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <button
                  disabled={isLoading}
                  className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg  dark:text-gray-200  text-gray-500 dark:hover:bg-gray-700 hover:bg-gray-100 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block align-text-top"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="inline-block ml-1">Forgot Password</span>
                </button>
              </div>
              <div className="text-center sm:text-right whitespace-nowrap">
                <button
                  disabled={isLoading}
                  className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg  dark:text-gray-200 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block align-text-bottom"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span className="inline-block ml-1">Help</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="py-5">
          <div className="grid grid-cols-2 gap-1">
            <div className="text-center sm:text-left whitespace-nowrap"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
