import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCheck,
  faMinus as minus,
} from "@fortawesome/free-solid-svg-icons";
import TaskInputForm from "./TaskInputForm";

const Todo = (props) => {
  const [tasks, setTasks] = useState([]);
  const [enteredInput, setEnteredInput] = useState("");
  const [blankInput, setBlankInput] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://dashboard-7611d-default-rtdb.firebaseio.com/users/" + localStorage.getItem('token') +"/tasks.json"
      );

      const responseData = await response.json();

      const list = [];

      for (const key in responseData) {
        list.push({
          id: key,
          name: responseData[key].name,
          status: responseData[key].status,
        });
      }
      setTasks(list);
    };

    getData();
  }, []);

  const inputChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };

  const taskSubmitHandler = async (event) => {
    event.preventDefault();
    if(enteredInput === ''){
      setBlankInput(true);
      return;
    }

    const dataSent = {
      name: enteredInput,
      status: false,
    };

    const response = await fetch(
      "https://dashboard-7611d-default-rtdb.firebaseio.com/users/" + localStorage.getItem('token') +"/tasks.json",
      {
        method: "POST",
        body: JSON.stringify(dataSent),
      }
    );

    const responseData = await response.json();

    const newList = tasks;

    const savedData = {
      id: responseData.name,
      name: dataSent.name,
      status: dataSent.status,
    };

    newList.push(savedData);

    setTasks(newList);

    setEnteredInput("");
  };

  const updateRequestHandler = async (task) => {
    const sentObj = {
      name: task.name,
      status: task.status
    }

    await fetch(
      "https://dashboard-7611d-default-rtdb.firebaseio.com/users/"+ localStorage.getItem('token') + "/tasks/" +
        task.id +
        ".json",
      {
        method: "PATCH",
        body: JSON.stringify(sentObj),
      }
    );
  };

  const updateStatusHandler = async (id) => {
    const cont = tasks.map((task) => {
      if (task.id === id) {
        const newObj = {...task, status: true};
        updateRequestHandler(newObj);
        return { ...task, status: true };
      }
      return task;
    });
    setTasks(cont);
  };

  const deleteHandler = async (id) => {
    const newList = tasks.filter((task) => {
      return task.id !== id;
    });

    setTasks(newList);
    await fetch(
      "https://dashboard-7611d-default-rtdb.firebaseio.com/users/" + localStorage.getItem('token') + "/tasks/" +
        id +
        ".json",
      {
        method: "DELETE",
      }
    );
  };

  const content = tasks.map((task) => {
    return (
      <div className={`row mb-3`} key={task.id}>
        <div className={`col-8 task-col`}>
          <div className={`task-el `}>
            {task.status ? (
              <FontAwesomeIcon icon={faCheck} color={"#4e91c8f5"} />
            ) : (
              <FontAwesomeIcon icon={faClock} />
            )}
            <span className={`mx-2`}>{task.status ? <strike>{task.name}</strike>:task.name}</span>
          </div>
        </div>
        <div className={`col`}>
          <div
            className={`task-edit d-flex justify-content-around align-items-center`}
          >
            <FontAwesomeIcon
              data-toggle="tooltip"
              data-placement="right"
              title="Mark Completed"
              icon={faCheck}
              onClick={() => updateStatusHandler(task.id)}
              className={`edit-icon`}
              style={{
                fontSize: "30px",
                borderRadius: "50%",
                border: "2px solid #fff",
                padding: "5px",
              }}
              color={"#fff"}
            />
            <FontAwesomeIcon
              data-toggle="tooltip"
              onClick={() => deleteHandler(task.id)}
              data-placement="right"
              title="Delete"
              className={`edit-icon`}
              icon={minus}
              style={{
                fontSize: "30px",
                borderRadius: "50%",
                border: "2px solid #ff0000",
                padding: "5px",
              }}
              color={"#ff0000"}
            />
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={`container-fluid`}>
      <div className={`row h2`}>Task List</div>
      <TaskInputForm
        value={enteredInput}
        blank={blankInput}
        changeHandler={inputChangeHandler}
        onSubmit={taskSubmitHandler}
      />
      <div className={`row`}>
        <div className={`col`}>{content}</div>
      </div>
    </div>
  );
};

export default Todo;
