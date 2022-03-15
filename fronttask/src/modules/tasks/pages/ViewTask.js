import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { CardContainer, DeleteButton } from "../styles/ViewTask";
import Navbar from "../../common/components/Navbar";

function ViewTask() {
  const [tasks, setTasks] = useState([]);
  const [selectIds, setSelectIds] = useState([]);

  useEffect(() => {
    let tasks = localStorage.getItem("tasks");
    if (tasks) {
      tasks = JSON.parse(tasks);
    }
    setTasks(tasks ? tasks : []);
  }, []);

  return (
    <div>
      <Navbar />
      <CardContainer>
        {tasks.map((taskData) => {
          return (
            <Card
              deleteOption={false}
              task={taskData}
              key={taskData.id}
              // handleCheckbox={selectTask}
              selectIds={selectIds}
            />
          );
        })}
      </CardContainer>
    </div>
  );
}

export default ViewTask;
