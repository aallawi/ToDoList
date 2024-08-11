import { useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData } from "../Redux/userSlice";
import { clearTaskData } from "../Redux/taskSlice";
import { IoMdAdd } from "react-icons/io";
import { RxExit } from "react-icons/rx";
import logo from "../assets/logo.png";
import Modals from "./Modals";

const Header = () => {
  const [show, setShow] = useState(false);

  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(clearUserData());
    dispatch(clearTaskData());
    console.log("logout");
  };

  return (
    <div className="header">
      <Container>
        <div className="header_content">
          <div className="logo">
            <Image
              src={logo}
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="Logo"
            />
            <div>
              <h6 className="title">TODO LIST</h6>
              <p className="description">Create your list</p>
            </div>
          </div>

          <h2 className="name">Hi {userData ? userData.name : "There!"} ✅</h2>

          <div className="buttons">
            <button className="btn_effect add" onClick={() => setShow(true)}>
              <div className="sign">
                <IoMdAdd />
              </div>
              <div className="text">Add Task</div>
            </button>
            <button className="btn_effect logout" onClick={() => logout()}>
              <div className="sign">
                <RxExit />
              </div>
              <div className="text">Logout</div>
            </button>
          </div>
        </div>
      </Container>
      <Modals show={show} setShow={setShow} />
    </div>
  );
};

export default Header;
