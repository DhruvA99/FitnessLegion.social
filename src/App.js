import logo from "./logo.svg";
import "./App.css";
import Button from "@material-ui/core/Button";
import Login from "./components/Auth/Login/Login";
import { Route, Routes } from "react-router";
import Signup from "./components/Auth/Signup/Signup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
