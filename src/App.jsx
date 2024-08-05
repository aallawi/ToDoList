import { useSelector } from "react-redux";
import "./index.css";
import Routers from "./Router/Routers";

function App() {
  // const { userData } = useSelector((state) => state.user);
  // console.log("userData", userData);

  return (
    <div className="app">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <Routers />
    </div>
  );
}

export default App;
