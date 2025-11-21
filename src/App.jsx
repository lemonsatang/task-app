import "./App.css";
import TaskColumn from "./components/TaskColumn";
import TaskForm from "./components/TaskForm";

import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";
import { useEffect, useState } from "react";

function App() {
  const saveTasks = localStorage.getItem("tasks");
  const [tasks, setTasks] = useState(JSON.parse(saveTasks) || []); // 저장된 할일이 있으면 불러오고 없으면 빈배열
  // 할일 삭제 함수(인덱스 번호 입력)
  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((task, index) => index !== taskIndex);
    setTasks(newTasks);
  };
  // 할일이 변경될 때마다 실행
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  return (
    <div className="app">
      <TaskForm setTasks={setTasks} />
      <main className="app_main">
        <TaskColumn
          handleDelete={handleDelete}
          title="할 일"
          icon={todoIcon}
          tasks={tasks}
          status="todo"
        />
        <TaskColumn
          handleDelete={handleDelete}
          title="진행중"
          icon={doingIcon}
          tasks={tasks}
          status="doing"
        />
        <TaskColumn
          handleDelete={handleDelete}
          title="완 료"
          icon={doneIcon}
          tasks={tasks}
          status="done"
        />
      </main>
    </div>
  );
}

export default App;
