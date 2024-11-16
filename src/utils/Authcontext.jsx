import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Authentication status
  const [userRole, setUserRole] = useState(localStorage.getItem("UserRole")); // Initialize from localStorage
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("authToken");

      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      setLoading(false); // Stop loading
    };

    checkToken();
  }, []);

  const login = (token, userRole) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("UserRole", userRole);
    setUserRole(userRole); // Update state
    setIsAuthenticated(true);
    console.log(userRole);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("UserRole");
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userRole, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
