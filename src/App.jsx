import { useSelector } from "react-redux";
import "./index.css";
import Routers from "./Router/Routers";

function App() {
  const { userData } = useSelector((state) => state.user);
  console.log("userData", userData);

  return <Routers />;
}

export default App;
