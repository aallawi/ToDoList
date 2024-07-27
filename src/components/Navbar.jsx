import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to="/">Logo</Link>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">SignUp</Link>
      </div>
    </div>
  );
};

export default Navbar;
