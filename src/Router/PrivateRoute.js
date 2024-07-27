import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      navigate("/SignUp", { replace: true });
    }
  }, [user, navigate]);

  return user ? children : null;
};

export default PrivateRoute;
