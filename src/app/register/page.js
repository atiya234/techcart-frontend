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
    <section className="mx-auto max-w-md py-10">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Create an Account</h1>

        <p className="mt-2 text-sm text-gray-600">
          Register to continue shopping on TechCart.
        </p>

        <form onSubmit={submitHandler} className="mt-6 space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              value={register.name}
              onChange={changeData}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
            />

            {error.name && (
              <p className="mt-1 text-sm text-red-500">{error.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={register.email}
              onChange={changeData}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
            />

            {error.email && (
              <p className="mt-1 text-sm text-red-500">{error.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              value={register.password}
              onChange={changeData}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
            />

            {error.password && (
              <p className="mt-1 text-sm text-red-500">{error.password}</p>
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
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
            />

            {error.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {error.confirmPassword}
              </p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-black underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}