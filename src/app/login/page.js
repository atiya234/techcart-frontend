"use client";

import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/Context/AuthContext";

const Page = () => {
  const router = useRouter();
  const { login: loginUser } = useContext(AuthContext);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const changeData = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let newError = {};

    // Email validation
    if (!login.email) {
      newError.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(login.email)) {
      newError.email = "Enter a valid email";
    }

    // Password validation
    if (!login.password) {
      newError.password = "Password is required";
    } else if (login.password.length < 6) {
      newError.password = "Password must be at least 6 characters";
    }

    // If validation has errors, stop here
    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    // Check the email and password against the registered users
    const result = loginUser({
      email: login.email,
      password: login.password,
    });

    if (!result.success) {
      setError({ form: result.message });
      return;
    }

    setError({});
    router.push("/products");
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-black">Welcome Back</h1>

        <p className="mt-2 text-sm text-gray-500">
          Login to your TechCart account
        </p>

        <form onSubmit={submitHandler} className="mt-8 space-y-5">
          {error.form && (
            <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error.form}
            </p>
          )}

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={login.email}
              onChange={changeData}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />

            {error.email && (
              <p className="mt-1 text-sm text-red-600">{error.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={login.password}
              onChange={changeData}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />

            {error.password && (
              <p className="mt-1 text-sm text-red-600">{error.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-black px-4 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          New here?{" "}
          <Link href="/register" className="font-medium text-black underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;