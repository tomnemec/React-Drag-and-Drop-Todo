import { useEffect, useRef, useState } from "react";
import "./App.css";
import Sortable from "sortablejs";
import { Task } from "./models/Task";
import TaskCard from "./component/taskCard";

function App() {
  const productsRef = useRef<HTMLDivElement>(null);
  const myProductsRef = useRef<HTMLDivElement>(null);

  const [tasks, setTasks] = useState([] as Task[]);
  useEffect(() => {
    setTasks([
      {
        id: 1,
        name: "Task 1",
        description: "Description 1",
        priority: 1,
      },
      {
        id: 2,
        name: "Task 2",
        description: "Description 2",
        priority: 2,
      },
      {
        id: 3,
        name: "Task 3",
        description: "Description 3",
        priority: 3,
      },
    ]);
    if (productsRef.current && myProductsRef.current) {
      new Sortable(productsRef.current, {
        group: "shared",
        animation: 150,
        chosenClass: "item-chosen",
        dragClass: "item-drag",
      });

      new Sortable(myProductsRef.current, {
        group: "shared",
        animation: 150,
        chosenClass: "item-chosen",
        dragClass: "item-drag",
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
            <div id="items" ref={productsRef}>
              {tasks.map((task) => (
               <TaskCard task={task} />
              ))}
            </div>
          </div>
          <div className="group">
            <h3>In Progress:</h3>
            <div id="my-items" ref={myProductsRef}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
