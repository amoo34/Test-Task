import React, { useEffect, useState } from "react";
import { CreateButton, TaskName } from "../styles/CreateTask";
import { withRouter } from "react-router-dom";
import Navbar from "../../common/components/Navbar";

function CreateTask(props) {
  const [taskName, setTaskName] = useState();

  // function to create Task
  const createTask = async () => {
    let tasks = localStorage.getItem("tasks");
    if (tasks) {
      tasks = JSON.parse(tasks);
      tasks.push({ name: taskName, id: Date.now() });
    } else {
      tasks = [{ name: taskName, id: Date.now() }];
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    props.history.push("/list-tasks");
  };

  const handleChange = (e) => {
    setTaskName(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <CreateButton disabled={!taskName} onClick={createTask}>
        Create Task{" "}
      </CreateButton>
      <TaskName onChange={handleChange} />
    </div>
  );
}

export default withRouter(CreateTask);
