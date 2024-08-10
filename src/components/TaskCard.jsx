import { useState } from "react";
import Modals from "./Modals";
import { useDispatch } from "react-redux";
import { deleteTask, fetchTasks } from "../Redux/taskSlice";

const TaskCard = ({ task }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const { userId, id: taskId, name, description, type, date } = task;

  const handleDeleteTask = async () => {
    await dispatch(deleteTask({ userId, taskId }));
    await dispatch(fetchTasks());
  };

  return (
    <div>
      <div className="task_card">
        <div className="task_content">
          <h2>{name}</h2>
          <p>{type}</p>
          <p>{date}</p>
          <p>{description}</p>
        </div>
        <div className="task_buttons">
          <button onClick={handleDeleteTask}>Delete</button>
          <button onClick={() => setShow(true)}>Edit</button>
          <button>Complete</button>
          <button>Archive</button>
        </div>
      </div>

      <Modals show={show} setShow={setShow} task={task} />
    </div>
  );
};

export default TaskCard;

// import { useState } from "react";
// import Modals from "./Modals";
// import { useDispatch } from "react-redux";
// import { deleteTask, fetchTasks } from "../Redux/taskSlice";

// const TaskCard = ({ task }) => {
//   const [show, setShow] = useState(false);
//   const dispatch = useDispatch();

//   const {
//     userId,
//     id: taskId,
//     name,
//     description,
//     type,
//     date,
//     complete,
//     archive,
//   } = task;

//   const handleDeleteTask = async (userId, taskId) => {
//     await dispatch(deleteTask({ userId, taskId }));
//     await dispatch(fetchTasks());
//   };

//   return (
//     <div>
//       <div className="task_card">
//         <div className="task_content">
//           <h2>{name}</h2>
//           <p>{type}</p>
//           <p>{date}</p>
//           <p>{description}</p>
//         </div>
//         <div className="task_buttons">
//           <button onClick={() => handleDeleteTask(userId, taskId)}>
//             Delete
//           </button>
//           <button onClick={() => setShow(true)}>Edit</button>
//           <button>Complete</button>
//           <button>Archive</button>
//         </div>
//       </div>

//       <Modals show={show} setShow={setShow} task={task} />
//     </div>
//   );
// };

// export default TaskCard;
