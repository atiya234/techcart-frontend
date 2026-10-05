"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL = "admin@techcart.com";
const ADMIN_PASSWORD = "admin@tech";

export default function AdminLoginPage() {
  const router = useRouter();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const changeData = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (login.email === "" || login.password === "") {
      setError("Please enter email and password");
      return;
    }

    if (
      login.email.trim().toLowerCase() === ADMIN_EMAIL &&
      login.password === ADMIN_PASSWORD
    ) {
      sessionStorage.setItem("isAdmin", "true");
      router.push("/admin");
      return;
    }

    setError("Invalid credentials");
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Admin Login</h1>

        <p className="mt-1 text-sm text-gray-500">
          Login to access the admin dashboard
        </p>

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={submitHandler} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={login.email}
              onChange={changeData}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
              placeholder="Enter admin email"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              value={login.password}
              onChange={changeData}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
              placeholder="Enter admin password"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-black px-4 py-2 font-medium text-white transition hover:bg-gray-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}