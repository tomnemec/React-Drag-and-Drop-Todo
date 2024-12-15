import { Task } from "../models/Task";

interface Props {
  task: Task;
}

const TaskCard = ({ task }: Props) => {
  return (
    <div key={task.id} className="item-card">
      <span className="name">{task.name}</span>
      <span className="description">{task.description}</span>
      {task.priority === 1 && <span className="priority low">Low</span>}
      {task.priority === 2 && <span className="priority medium">Medium</span>}
      {task.priority === 3 && <span className="priority high">High</span>}
      <div className="row">
        <div className="img"></div>
        <span className="user-name">John Doe</span>
      </div>
    </div>
  );
};

export default TaskCard;
