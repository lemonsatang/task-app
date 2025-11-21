import { useState } from "react";
import Tag from "./Tag";
import "./TaskForm.css";

export default function TaskForm({ setTasks }) {
  const [taskData, setTaskData] = useState({
    task: "",
    status: "todo",
    tags: [],
  });
  //태그 선택함수
  function selectTag(tag) {
    //이미 같은 태그가 배열에 있다면 제거, 없다면 추가
    if (taskData.tags.some((item) => item === tag)) {
      const filterTags = taskData.tags.filter((item) => item !== tag); //같은 태그 제거
      setTaskData((prev) => {
        return { ...prev, tags: filterTags };
      });
    } else {
      setTaskData((prev) => {
        return { ...prev, tags: [...prev.tags, tag] };
      });
    }
  }
  console.log(taskData.tags); //태그 선택을 확인
  //선택된 태그아이템중 tag가 있으면 true 없으면 false
  const checkTag = (tag) => {
    return taskData.tags.some((item) => item === tag);
  };
  //입력이 바뀔때마다 실행 함수
  function handleChange(e) {
    const { name, value } = e.target;
    setTaskData((prev) => {
      return { ...prev, [name]: value };
    });
  }
  //제출버튼 클릭시 실행함수
  function handleSubmit(e) {
    e.preventDefault();
    console.log(taskData);
    setTasks((prev) => [...prev, taskData]); // 새 task 추가
    setTaskData({
      task: "",
      status: "todo",
      tags: [],
    }); // 입력폼 처음처럼 초기화
  }
  return (
    <header className="app_header">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          value={taskData.task}
          name="task"
          className="task_input"
          placeholder="할일을 입력해주세요"
        />

        <div className="task_form_bottom_line">
          <div>
            <Tag
              selected={checkTag("HTML")}
              selectTag={selectTag}
              tagName="HTML"
            />
            <Tag
              selected={checkTag("CSS")}
              selectTag={selectTag}
              tagName="CSS"
            />
            <Tag
              selected={checkTag("JavaScript")}
              selectTag={selectTag}
              tagName="JavaScript"
            />
            <Tag
              selected={checkTag("REACT")}
              selectTag={selectTag}
              tagName="REACT"
            />
          </div>
          <div>
            <select
              className="task_status"
              name="status"
              value={taskData.status}
              onChange={handleChange}
            >
              <option value="todo">할일</option>
              <option value="doing">진행중</option>
              <option value="done">완료</option>
            </select>
            <button type="submit" className="task_submit">
              + 추가
            </button>
          </div>
        </div>
      </form>
    </header>
  );
}
