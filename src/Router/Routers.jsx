import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../Pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import Auth from "../Pages/Auth/Auth";

const Routers = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <PrivateRoute>
            <Header />
            <Home />
            <Footer />
          </PrivateRoute>
        }
      />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
};

export default Routers;
