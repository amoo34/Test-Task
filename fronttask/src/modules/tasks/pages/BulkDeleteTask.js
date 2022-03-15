import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { CardContainer, DeleteButton } from "../styles/ViewTask";
import axios from "axios";
import { configuration } from "../../../config";
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

  const selectTask = (id) => {
    let copySelectIds = [...selectIds];

    if (copySelectIds.includes(id)) {
      copySelectIds = copySelectIds.filter((selectId) => {
        return selectId != id;
      });
    } else {
      copySelectIds.push(id);
    }
    setSelectIds(copySelectIds);
  };

  const deleteCards = async () => {
    console.log(selectIds);
    let tasksLocal = localStorage.getItem("tasks");
    if (tasksLocal) {
      tasksLocal = JSON.parse(tasksLocal);
    }
    tasksLocal = tasksLocal.filter(function (el) {
      return selectIds.indexOf(el.id) < 0;
    });

    localStorage.setItem("tasks", JSON.stringify(tasksLocal));
    setTasks(tasksLocal);
  };

  return (
    <div>
      <Navbar />
      <DeleteButton disabled={selectIds.length === 0} onClick={deleteCards}>
        Delete Selected Cards{" "}
      </DeleteButton>
      <CardContainer>
        {tasks.map((taskData) => {
          return (
            <Card
              deleteOption={true}
              task={taskData}
              key={taskData.id}
              handleCheckbox={selectTask}
              selectIds={selectIds}
            />
          );
        })}
      </CardContainer>
    </div>
  );
}

export default ViewTask;
