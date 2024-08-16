import { VscLoading } from "react-icons/vsc";

const Loading = () => {
  return (
    <div className="loading">
      <VscLoading size={150} className="spins" color="white" />
      <h3>Loading...</h3>
    </div>
  );
};

export default Loading;
