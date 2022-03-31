import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ChangePage } from "./pages/ChangePage";
import { UserRouter } from "./router/userRouter";
import { AuthRouter } from "./router/authRouter";
import { userSliceActions } from "./redux/slices/userSlice";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const dispatch = useDispatch()
  const { user } = useSelector((store) => store.userSlice);
  const { setUser } = userSliceActions

  useEffect(() => {
    const checkUser = () => {
      const savedUser = localStorage.getItem("user");
      const parsed = savedUser ? JSON.parse(savedUser) : {}

      if (!savedUser || parsed.isExpired) {
        setLoading(false);
        setAuthenticated(false);
        return;
      }

      setLoading(false);
      setAuthenticated(true);
      if (!user) {
        dispatch(setUser(JSON.parse(savedUser)))
      }
    };

    checkUser();
  }, [user]);

  if (loading) {
    return <span>Загрузка...</span>;
  }

  console.log(authenticated)

  return authenticated ? <UserRouter /> : <AuthRouter />;
}

export default App;
