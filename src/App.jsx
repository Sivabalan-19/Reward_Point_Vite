import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Error404 from "./components/Error/Error404";
import Admin_layout from "./components/Layout/AdminLayout";
import Faculty_Layout from "./components/Layout/FacultyLayout";
import StudentLayout from "./components/Layout/StudentLayout";
import Login from "./components/Login/Login";
import "./Styles/Responsive.css";
import { AuthProvider } from "./utils/Authcontext";
import ProtectedRoute from "./utils/ProtectedRoute";
import { ToastContainer } from "react-toastify";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  localStorage.setItem("index", 0);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", JSON.stringify(!darkMode));
  };

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />

            {/* Faculty Routes */}
            <Route
              path="/faculty/*"
              element={
                <ProtectedRoute requiredRole={2}>
                  <Faculty_Layout
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                  />
                </ProtectedRoute>
              }
            />

            {/* Student Routes */}
            <Route
              path="/student/*"
              element={
                <ProtectedRoute requiredRole={1}>
                  <StudentLayout
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                  />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute requiredRole={3}>
                  <Admin_layout
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                  />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Error404 />} />
          </Routes>
        </Router>
      </AuthProvider>
      <ToastContainer
        position="top-center"
        autoClose={5000} // Auto-close after 5 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="colored"
        draggable
      />
    </div>
  );
}

export default App;
