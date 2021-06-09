import React from "react";

const TaskInputForm = (props) => {
  return (
    <form className={`mb-3`} onSubmit={props.onSubmit}>
      <div className={`row`}>
        <div className={`col-8 `}>
          <div className={`todo-input d-flex justify-content-end`}>
            <div style={{ display: "flex", flexDirection: "column", width:'100%', alignItems: 'flex-end' }} >
              <input
                value={props.value}
                placeholder="Add Task"
                style={{width: '80%'}}
                onChange={props.changeHandler}
              />
              {props.blank && <p style={{width: '80%', padding: '12px'}}>Please fill the input field</p>}
            </div>
          </div>
        </div>
        <div className={`col`}>
          <div className={`task-button d-flex justify-content-start`}>
            <button type="submit">Add Task</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TaskInputForm;
