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

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "complete") return task.complete;
    if (filter === "pending") return !task.complete;
    if (filter === "personal") return task.type === "personal";
    if (filter === "work") return task.type === "work";
    if (filter === "archive") return task.archive;
    return true;
  });

  return (
    <Container>
      <div className="all_buttons">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("complete")}>Complete</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("personal")}>Personal</button>
        <button onClick={() => setFilter("work")}>Work</button>
        <button onClick={() => setFilter("archive")}>Archive</button>
      </div>

      <div>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </Container>
  );
};

export default Home;
