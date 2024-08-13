import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userData) {
      navigate("/auth", { replace: true });
    }
  }, [userData, navigate]);

  return userData ? children : null;
};

export default PrivateRoute;
