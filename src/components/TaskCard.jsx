import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetTaskState, deleteTask, updateTask } from "../Redux/taskSlice";
import { MdDeleteOutline } from "react-icons/md";
import { GoArchive } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { FcOk } from "react-icons/fc";
import { RiTimer2Line } from "react-icons/ri";
import Modals from "./Modals";

const TaskCard = ({ task }) => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.user);
  const { theDelete, theUpdate } = useSelector((state) => state.task);
  const {
    deleteLoading = theDelete.loading,
    deleteSuccess = theDelete.success,
    deleteError = theDelete.error,
    deleteErrMessage = theDelete.errMessage,
  } = theDelete;

  const {
    updateLoading = theUpdate.loading,
    updateSuccess = theUpdate.success,
    updateError = theUpdate.error,
    updateErrMessage = theUpdate.errMessage,
  } = theUpdate;

  useEffect(() => {
    if (deleteSuccess || updateSuccess) {
      dispatch(resetTaskState());
      navigate("/");
    }
  }, [deleteSuccess, updateSuccess]);

  const {
    userId,
    id: taskId,
    name,
    description,
    type,
    date,
    complete,
    archive,
  } = task;

  const handleDeleteTask = async () => {
    if (userId && taskId) {
      await dispatch(deleteTask({ userId, taskId }));
    }
  };

  const handleComplete = async (boolean) => {
    if (userData.id && taskId) {
      await dispatch(
        updateTask({
          userId: userData.id,
          taskId: taskId,
          taskData: { ...task, complete: boolean },
        })
      );
    }
  };

  const handleArchive = async (boolean) => {
    if (userData.id && taskId) {
      await dispatch(
        updateTask({
          userId: userData.id,
          taskId: taskId,
          taskData: { ...task, archive: boolean },
        })
      );
    }
  };

  if (!task) {
    return <p>Task not found.</p>;
  }

  return (
    <div className="task_card">
      <div className="task_content">
        <h2>{name}</h2>
        <p>{description}</p>
        <p>{type}</p>
        <p>{date}</p>
        <p>{complete ? "Complete" : "Pending"}</p>
        <p>{archive ? "Archived" : "Not Archived"}</p>
      </div>
      <div className="task_buttons">
        <button className="button_action edit" onClick={() => setShow(true)}>
          <span className="text">Update</span>
          <span className="icon">
            <CiEdit size={25} />
          </span>
        </button>

        <button className="button_action delete" onClick={handleDeleteTask}>
          <span className="text">Delete</span>
          <span className="icon">
            <MdDeleteOutline size={25} />
          </span>
        </button>

        <button
          className="button_action complete"
          onClick={() => handleComplete(!complete)}
        >
          <span className="text">
            {complete ? "Set Pending" : "Set Complete"}
          </span>
          <span className="icon">
            {complete ? <RiTimer2Line size={25} /> : <FcOk size={25} />}
          </span>
        </button>

        <button
          className="button_action archive"
          onClick={() => handleArchive(!archive)}
        >
          <span className="text">{archive ? "Unarchive" : "Archive"}</span>
          <span className="icon">
            <GoArchive size={25} />
          </span>
        </button>
      </div>

      <Modals show={show} setShow={setShow} task={task} />
    </div>
  );
};

export default TaskCard;
