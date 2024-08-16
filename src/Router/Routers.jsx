import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PrivateRoute from "./PrivateRoute";
import Loading from "../Pages/Loading/Loading";

const HomePage = lazy(() => import("../Pages/Home/Home"));
const AuthPage = lazy(() => import("../Pages/Auth/Auth"));

const Routers = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <Header />
              <HomePage />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route index element={<AuthPage />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
