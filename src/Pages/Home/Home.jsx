import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTasks } from "../../Redux/taskSlice";
import TaskCard from "../../components/TaskCard";

const Home = () => {
  const { tasks } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const taskCounts = {
    all: tasks.filter((task) => !task.archive).length,
    complete: tasks.filter((task) => task.complete).length,
    pending: tasks.filter((task) => !task.complete && !task.archive).length,
    personal: tasks.filter((task) => task.type === "personal").length,
    work: tasks.filter((task) => task.type === "work").length,
    archive: tasks.filter((task) => task.archive).length,
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return !task.archive;
    if (filter === "complete") return task.complete;
    if (filter === "pending") return !task.complete;
    if (filter === "personal") return task.type === "personal";
    if (filter === "work") return task.type === "work";
    if (filter === "archive") return task.archive;
    return true;
  });

  return (
    <div className="home">
      <Container>
        <div className="all_buttons">
          {Object.keys(taskCounts).map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`btn_select ${filter === key ? "active" : ""}`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)} ({taskCounts[key]})
            </button>
          ))}
        </div>

        <div>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <p className="no_tasks">No tasks available.</p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Home;
