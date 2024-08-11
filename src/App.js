import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import { API, getUserId } from "./api/API";
import Map from "./components/Kmap";
import Main_BeforeLogin from "./pages/Main_BeforeLogin";
import Main_AfterLogin from "./pages/Main_AfterLogin";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Modal from "./components/Modal";
import ChecklistState from "./pages/ChecklistState";
import Guide from "./pages/Guide";
import PlanMain from "./pages/PlanMain";
import SharedPost from "./components/SharedPost";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const apiInstance = API();
          const userId = getUserId();
          const response = await apiInstance.post(`/guide/sidebar/${userId}`, {
            month: 5,
            week: 1,
          });
          if (response) {
            setIsLoggedIn(true);
          } else {
            console.log("토큰 유효하지 않음");
          }
        } catch (error) {
          console.error("뭔 에러:", error);
        }
      }
    };

    checkToken();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Main_AfterLogin /> : <Main_BeforeLogin />}
        />
        <Route path="/map" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/modal" element={<Modal />} />
        <Route path="/checkliststate" element={<ChecklistState />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/plan" element={<PlanMain />} />
        <Route path="/sharedpost" element={<SharedPost />} />
      </Routes>
    </Router>
  );
}

export default App;
