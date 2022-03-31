import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { userSliceActions } from "../redux/slices/userSlice";

export const useLogout = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { resetUser } = userSliceActions;
  const { user } = useSelector((store) => store.userSlice);

  const logout = () => {
    localStorage.setItem("user", JSON.stringify({ ...user, isExpired: true }));
    dispatch(resetUser());
    onSuccess?.();
  };

  return { logout };
};
