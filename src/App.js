import logo from "./logo.svg";
import "./App.css";
import Button from "@material-ui/core/Button";
import Layout from "./components/Navigation/Layout";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Auth/Login/Login";
import Signup from "./components/Auth/Signup/Signup";
import LandingPage from "./components/LandingPage/LandingPage";
import { useEffect } from "react";
import { checkAuthState } from "./features/auth/authSlice";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  const authToken = useSelector((state) => state.auth.authToken);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthState());
  }, [authToken]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <PrivateRoute
          isAuth={authToken !== null}
          path="/home"
          component={Layout}
          redirectTo="/login"
        >
          <PrivateRoute
            isAuth={authToken !== null}
            path="/"
            component={HomePage}
            redirectTo="/login"
          />
        </PrivateRoute>
        <PrivateRoute
          isAuth={authToken === null}
          path="/login"
          component={Login}
          redirectTo="/home"
        />
        <PrivateRoute
          isAuth={authToken === null}
          path="/signup"
          component={Signup}
          redirectTo="/home"
        />
        <Route path="*" replace element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
