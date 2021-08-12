import logo from "./logo.svg";
import "./App.css";
import Button from "@material-ui/core/Button";
import Layout from "./components/Navigation/Layout";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Auth/Login/Login";
import Signup from "./components/Auth/Signup/Signup";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  const authToken = useSelector((state) => state.auth.authToken);
  let navigate = useNavigate();
  if (authToken) {
    return (
      <div className="App">
        <Routes>
          <Route path="/home" element={<Layout />} />
        </Routes>
        <Layout />
      </div>
    );
  } else {
    return (
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="*" render={() => navigate("/", { replace: true })} /> */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
