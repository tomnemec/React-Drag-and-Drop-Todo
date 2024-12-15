import { useEffect, useRef, useState } from "react";
import "./App.css";
import Sortable from "sortablejs";
import { Status, Task } from "./models/Task";
import TaskCard from "./component/taskCard";

function App() {
  const newTasks = useRef<HTMLDivElement>(null);
  const activeTasks = useRef<HTMLDivElement>(null);
  const closedTasks = useRef<HTMLDivElement>(null);

  const [tasks, setTasks] = useState([] as Task[]);
  useEffect(() => {
    setTasks([
      {
        id: 1,
        name: "Task 1",
        description: "Description 1",
        priority: 1,
        status: Status.New,
      },
      {
        id: 2,
        name: "Task 2",
        description: "Description 2",
        priority: 2,
        status: Status.Active,
      },
      {
        id: 3,
        name: "Task 3",
        description: "Description 3",
        priority: 3,
        status: Status.Closed,
      },
      {
        id: 4,
        name: "Task 4",
        description: "Description 4",
        priority: 3,
        status: Status.New,
      },
    ]);
    const handleUpdateStatus = (evt: any, newStatus: Status) => {
      const taskId = parseInt(evt.item.getAttribute("data-id"), 10);
      console.log(taskId)
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
      console.log("Task ID: ", taskId, "New Status: ", newStatus,evt);

    };
    if (newTasks.current && activeTasks.current && closedTasks.current) {
      new Sortable(newTasks.current, {
        group: "shared",
        animation: 150,
        chosenClass: "item-chosen",
        dragClass: "item-drag",
        onEnd: (evt) => handleUpdateStatus(evt, Status.New),
      });
      new Sortable(activeTasks.current, {
        group: "shared",
        animation: 150,
        chosenClass: "item-chosen",
        dragClass: "item-drag",
        onEnd: (evt) => handleUpdateStatus(evt, Status.Active),
      });
      new Sortable(closedTasks.current, {
        group: "shared",
        animation: 150,
        chosenClass: "item-chosen",
        dragClass: "item-drag",
        onEnd: (evt) => handleUpdateStatus(evt, Status.Closed),
      });
    }
  }, []);

  return (
    <div className="App">
      <div className="card">
        <h2>Products</h2>
        <div className="container">
          <div className="group">
            <h3>Opened:</h3>
            <div className="item-group " id="items" ref={newTasks}>
              {tasks.map(
                (task) => task.status === Status.New && <TaskCard task={task} />
              )}
            </div>
          </div>
          <div className="group">
            <h3>In Progress:</h3>
            <div className="item-group " id="my-items" ref={activeTasks}>
              {tasks.map(
                (task) =>
                  task.status === Status.Active && <TaskCard task={task} />
              )}
            </div>
          </div>
          <div className="group">
            <h3>Closed:</h3>
            <div className="item-group " id="my-items" ref={closedTasks}>
              {tasks.map(
                (task) =>
                  task.status === Status.Closed && <TaskCard task={task} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
