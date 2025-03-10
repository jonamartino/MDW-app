import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Organization from "./pages/Organization";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./config/firebase";
import Organizations from "./pages/Organizations";
import Layout from "./components/Layout";

function App() {
  const [user, setUser] = useState<User | null>(null);
  console.log("User: ", user);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        auth.currentUser
          ?.getIdToken()
          .then((token) => localStorage.setItem("token", token));
        setUser(user);
        return;
      }
      setUser(null);
      localStorage.removeItem("token");
    });
    return () => unsubscribe();
  }, []);
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/organizations"
            element={
              <ProtectedRoute user={user}>
                <Organizations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organization"
            element={
              <ProtectedRoute user={user}>
                <Organization />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
