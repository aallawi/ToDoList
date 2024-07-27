import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../Pages/Home";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";
import PrivateRoute from "./PrivateRoute";

const Routers = () => {
  return (
    <div className="body">
      <Navbar />
      <Routes>
        <Route
          index
          element={
            // <PrivateRoute>
            <Home />
            // </PrivateRoute>
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Routers;
