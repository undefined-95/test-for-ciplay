import React from "react";
import { Route, Routes } from "react-router-dom";

import { ChangePage } from "../pages/ChangePage";

export const UserRouter = () => (
  <Routes>
    <Route path="/" element={<ChangePage />} exact />
  </Routes>
);
