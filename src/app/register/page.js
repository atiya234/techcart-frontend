"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});

  const changeData = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let newError = {};

    // Name validation
    if (!register.name.trim()) {
      newError.name = "Name is required";
    }

    // Email validation
    if (!register.email) {
      newError.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(register.email)) {
      newError.email = "Enter a valid email";
    }

    // Password validation
    if (!register.password) {
      newError.password = "Password is required";
    } else if (register.password.length < 6) {
      newError.password = "Password must be at least 6 characters";
    }

    // Confirm password validation
    if (!register.confirmPassword) {
      newError.confirmPassword = "Please confirm your password";
    } else if (register.password !== register.confirmPassword) {
      newError.confirmPassword = "Passwords do not match";
    }

    // Show validation errors
    setError(newError);

    // Stop if there are errors
    if (Object.keys(newError).length > 0) {
      return;
    }

    // Read the existing users (or an empty list)
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Stop if this email is already registered
    const exists = users.some(
      (u) => u.email.toLowerCase() === register.email.toLowerCase()
    );

    if (exists) {
      setError({
        email: "An account with this email already exists. Please log in.",
      });
      return;
    }

    // Add the new user to the list and save it
    const newUser = {
      name: register.name.trim(),
      email: register.email.trim(),
      password: register.password,
    };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    // Go to login page
    router.push("/login");
  };

  return (
    <section className="mx-auto w-full max-w-md px-4 py-6 sm:px-6 sm:py-10">

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">

        <h1 className="text-2xl font-bold sm:text-3xl">
          Create an Account
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
          Register to continue shopping on TechCart.
        </p>

        <form
          onSubmit={submitHandler}
          className="mt-5 space-y-4 sm:mt-6"
        >

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium"
            >
              Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              value={register.name}
              onChange={changeData}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black sm:px-4 sm:py-3 sm:text-base"
            />

            {error.name && (
              <p className="mt-1 text-xs leading-5 text-red-500 sm:text-sm">
                {error.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={register.email}
              onChange={changeData}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black sm:px-4 sm:py-3 sm:text-base"
            />

            {error.email && (
              <p className="mt-1 text-xs leading-5 text-red-500 sm:text-sm">
                {error.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              value={register.password}
              onChange={changeData}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black sm:px-4 sm:py-3 sm:text-base"
            />

            {error.password && (
              <p className="mt-1 text-xs leading-5 text-red-500 sm:text-sm">
                {error.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm font-medium"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={register.confirmPassword}
              onChange={changeData}
              placeholder="Confirm your password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black sm:px-4 sm:py-3 sm:text-base"
            />

            {error.confirmPassword && (
              <p className="mt-1 text-xs leading-5 text-red-500 sm:text-sm">
                {error.confirmPassword}
              </p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 sm:py-3 sm:text-base"
          >
            Register
          </button>

        </form>

        <p className="mt-4 text-center text-xs leading-5 text-gray-600 sm:text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-black underline"
          >
            Login
          </Link>
        </p>

      </div>

    </section>
  );
}