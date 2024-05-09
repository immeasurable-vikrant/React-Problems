import React, { useState } from "react";
import "./styles.css";

interface Task {
  stage: number;
  name: string;
}

const KanbanBoard: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const stagesNames: string[] = ["Backlog", "To do", "Ongoing", "Done"];
  const [tasks, setTasks] = useState<Task[]>([
    { stage: 0, name: "Task 1" },
    { stage: 0, name: "Task 2" },
    { stage: 1, name: "Task 3" },
  ]);

  const stagesTasks: Task[][] = Array.from(
    { length: stagesNames.length },
    () => []
  );

  tasks.forEach((task) => {
    stagesTasks[task.stage].push(task);
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleForward = (task: any) => {
    const tasksCopy = [...tasks];
    const index = tasksCopy.findIndex((t) => t === task);
    tasksCopy[index] = { ...task, stage: task.stage + 1 };
    setTasks(tasksCopy);
  };
  const handleBackward = (task: any) => {
    const tasksCopy = [...tasks];
    let index = tasksCopy.findIndex((t) => t === task);
    tasksCopy[index] = { ...task, stage: task.stage - 1 };
    setTasks(tasksCopy);
  };

  const handleAddTasks = () => {
    if (value)
      setTasks((prev) => {
        return [...prev, { stage: 0, name: value }];
      });
    setValue("");
  };

  console.log("tasks", tasks);
  return (
    <div>
      <div>
        <h2>Kanban Board (Hackerrank Interview problem)</h2>
      </div>
      <div className="input__container">
        <input autoFocus type="text" value={value} onChange={handleInputChange} />
        <button onClick={handleAddTasks} className="btn">
          Add Tasks
        </button>
      </div>
      <div className="stages__container">
        {stagesTasks.map((stagesTask, i) => (
          <div className="stage__names" key={i}>
            {stagesNames[i]}
            <div>
              {stagesTask.map((task: Task, j) => (
                <div className="task" key={j}>
                  <button
                    disabled={task.stage === 0}
                    onClick={() => handleBackward(task)}
                  >
                    ⬅
                  </button>
                  <span className="task__item">{task.name}</span>
                  <button
                    disabled={task.stage === stagesNames.length - 1}
                    onClick={() => handleForward(task)}
                  >
                    ➡
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
