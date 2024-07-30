import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Container,
  Image,
} from "react-bootstrap";
import logo from "../assets/logo.png";
import { useDispatch } from "react-redux";
import { clearUserData } from "../Redux/userSlice";

const Header = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(clearUserData());
  };
  return (
    <Navbar className="header p-0 m-auto" expand="lg">
      <Container>
        <Navbar.Brand href="/" className="logo">
          <Image
            src={logo}
            width="60"
            height="60"
            className="d-inline-block align-top"
            alt="Logo"
          />
          <div>
            <h6 className="title mb-2">TODO LIST</h6>
            <p className="description">Create your list</p>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <NavDropdown title="Allawi" id="basic-nav-dropdown">
              <NavDropdown.Item href="/setting">Setting</NavDropdown.Item>
              <NavDropdown.Item href="/login" onClick={() => logout()}>
                Log out
              </NavDropdown.Item>
            </NavDropdown>
            <Button
              href="/login"
              variant="outline-primary"
              className="m-2 pt-1 pb-1"
            >
              Login
            </Button>
            <Button
              href="/signup"
              variant="outline-secondary"
              className="m-2 pt-1 pb-1"
            >
              SignUp
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
