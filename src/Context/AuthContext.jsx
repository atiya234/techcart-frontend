"use client";

import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // Load the logged-in user once, when the app starts
  useEffect(() => {
    const saved = localStorage.getItem("currentUser");
    if (saved) setUser(JSON.parse(saved));
    setLoaded(true);
  }, []);

  // Save the logged-in user whenever it changes
  useEffect(() => {
    if (!loaded) return;
    if (user) localStorage.setItem("currentUser", JSON.stringify(user));
    else localStorage.removeItem("currentUser");
  }, [user, loaded]);

  // Read the list of registered users
  const getUsers = () => {
    try {
      return JSON.parse(localStorage.getItem("users")) || [];
    } catch (error) {
      return [];
    }
  };

  const register = ({ name, email, password }) => {
    const users = getUsers();
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      return { success: false, message: "Email already registered. Please log in." };
    }

    const newUser = { name: name, email: email, password: password };
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    return { success: true };
  };

  const login = ({ email, password }) => {
    const users = getUsers();
    const match = users.find((u) => u.email === email && u.password === password);

    if (!match) {
      return { success: false, message: "Invalid email or password." };
    }

    setUser({ name: match.name, email: match.email });
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loaded, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
export default AuthProvider;