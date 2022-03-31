import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";

export const AuthRouter = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} exact />
  </Routes>
);
