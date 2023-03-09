import { useRef, useState } from "react";
import "../styles/Body.css";

function Body() {
  let allTodoRef = useRef(null);
  let allTodoRefmob = useRef(null);
  let activeTodoRef = useRef(null);
  let activeTodoRefmob = useRef(null);
  let completeTodoRef = useRef(null);
  let completeTodoRefmob = useRef(null);

  const [todoArray, setTodoArray] = useState([
    { todo: "Complete online JavaScript course", state: "completed" },
    { todo: "Jog around the park 3x", state: "active" },
    { todo: "10 minutes meditation", state: "active" },
    { todo: "Read for 1 hour", state: "active" },
    { todo: "Pick up groceries", state: "active" },
    { todo: "Complete todo app on Frontend Mentor", state: "active" },
  ]);

  const [newTodo, setNewTodo] = useState({ value: "", state: "active" });

  // remove a todo item
  function removeTodo(todo) {
    setTodoArray((todoArray) => todoArray.filter((item) => item.todo !== todo));
  }

  // cLear completed todo's
  function clearCompleted() {
    setTodoArray((todoArray) =>
      todoArray.filter((todo) => todo.state !== "completed")
    );
  }

  // current page
  function currentPage(page) {
    if (page === "all") {
      allTodoRef.current.classList.add("selected");
      allTodoRefmob.current.classList.add("selected");
      activeTodoRef.current.classList.remove("selected");
      activeTodoRefmob.current.classList.remove("selected");
      completeTodoRef.current.classList.remove("selected");
      completeTodoRefmob.current.classList.remove("selected");
    } else if (page === "active") {
      allTodoRef.current.classList.remove("selected");
      allTodoRefmob.current.classList.remove("selected");
      activeTodoRef.current.classList.add("selected");
      activeTodoRefmob.current.classList.add("selected");
      completeTodoRef.current.classList.remove("selected");
      completeTodoRefmob.current.classList.remove("selected");
    } else {
      allTodoRef.current.classList.remove("selected");
      allTodoRefmob.current.classList.remove("selected");
      activeTodoRef.current.classList.remove("selected");
      activeTodoRefmob.current.classList.remove("selected");
      completeTodoRef.current.classList.add("selected");
      completeTodoRefmob.current.classList.add("selected");
    }
  }

  // display all todo's
  function displayAllTodo() {
    currentPage("all");
    setTodoArray(todoArray);
  }

  // display active todo's
  function displayActiveTodo() {
    currentPage("active");
    setTodoArray((todoArray) =>
      todoArray.filter((todo) => todo.state === "active")
    );
  }

  // display completed todo's
  function displayCompletedTodo() {
    currentPage("complete");
    setTodoArray((todoArray) =>
      todoArray.filter((todo) => todo.state === "completed")
    );
  }

  // change todo state
  function changeTodoState(item) {
    const newArray = [...todoArray];
    newArray.forEach((data) => {
      if (data.todo === item.todo) {
        data.state = item.state === "active" ? "completed" : "active";
      }
    });
    setTodoArray(newArray);
  }

  return (
    <div className="body-wrapper">
      <div className="input-wrapper">
        <div className="icon-circle"></div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (newTodo.value.length === 0) return;
            setTodoArray((todoArray) => [
              { todo: newTodo.value, state: "active" },
              ...todoArray,
            ]);
            setNewTodo({ value: "" });
          }}
        >
          <input
            type={"text"}
            name="todo"
            placeholder="Create a new todo..."
            className="todo-input"
            value={newTodo.value}
            onChange={(e) => {
              setNewTodo({ value: e.target.value, state: "active" });
            }}
          />
        </form>
      </div>
      <div className="list-wrapper">
        <ul>
          {todoArray
            .slice(0, 6)
            .sort((a, b) => b.state.localeCompare(a.state))
            .map((item) => {
              if (item.state === "completed") {
                return (
                  <li className="list-item-wrapper">
                    <div
                      className="icon-check"
                      onClick={() => {
                        changeTodoState(item);
                      }}
                    >
                      <img
                        className="check-icon"
                        src={require("../images/icon-check.svg").default}
                        alt="check icon"
                      />
                    </div>
                    <div>
                      <p className="completed">{item.todo}</p>
                    </div>
                    <div
                      className="remove-todo"
                      onClick={() => {
                        removeTodo(item.todo);
                      }}
                    >
                      <img
                        src={require("../images/icon-cross.svg").default}
                        alt="cross icon"
                        width={14}
                      />
                    </div>
                  </li>
                );
              } else {
                return (
                  <li className="list-item-wrapper">
                    <div
                      className="icon-circle"
                      onClick={() => {
                        changeTodoState(item);
                      }}
                    ></div>
                    <div>
                      <p className="">{item.todo}</p>
                    </div>
                    <div
                      className="remove-todo"
                      onClick={() => {
                        removeTodo(item.todo);
                      }}
                    >
                      <img
                        src={require("../images/icon-cross.svg").default}
                        alt="cross icon"
                        width={14}
                      />
                    </div>
                  </li>
                );
              }
            })}

          <li className="list-item-wrapper list-item-footer">
            {todoArray.length - 6 > 0 ? (
              <p>{todoArray.length - 6} items left</p>
            ) : (
              <p>0 items left</p>
            )}
            <div className="bottom-nav-wrapper bottom-nav-wrapper-desktop">
              <p className="links " ref={allTodoRef} onClick={displayAllTodo}>
                All
              </p>
              <p
                className="links"
                ref={activeTodoRef}
                onClick={displayActiveTodo}
              >
                Active
              </p>
              <p
                className="links"
                ref={completeTodoRef}
                onClick={displayCompletedTodo}
              >
                Completed
              </p>
            </div>
            <p className="clear-completed" onClick={clearCompleted}>
              Clear Completed
            </p>
          </li>
        </ul>
      </div>
      <div className="bottom-nav-wrapper">
        <p className="links" ref={allTodoRefmob} onClick={displayAllTodo}>
          All
        </p>
        <p className="links" ref={activeTodoRefmob} onClick={displayActiveTodo}>
          Active
        </p>
        <p
          className="links"
          ref={completeTodoRefmob}
          onClick={displayCompletedTodo}
        >
          Completed
        </p>
      </div>
    </div>
  );
}

export default Body;

/* <li className="list-item-wrapper">
            <div className="icon-circle"></div>
            <div>
              <p className="">Jog around the park 3x</p>
            </div>
            <div>
              <img
                src={require("../images/icon-cross.svg").default}
                alt="cross icon"
                width={14}
              />
            </div>
          </li>
          <li className="list-item-wrapper">
            <div className="icon-circle"></div>
            <div>
              <p className="">10 minutes meditation</p>
            </div>
            <div>
              <img
                src={require("../images/icon-cross.svg").default}
                alt="cross icon"
                width={14}
              />
            </div>
          </li>
          <li className="list-item-wrapper">
            <div className="icon-circle"></div>
            <div>
              <p className="">Read for 1 hour</p>
            </div>
            <div>
              <img
                src={require("../images/icon-cross.svg").default}
                alt="cross icon"
                width={14}
              />
            </div>
          </li>
          <li className="list-item-wrapper">
            <div className="icon-circle"></div>
            <div>
              <p className="">Pick up groceries</p>
            </div>
            <div>
              <img
                src={require("../images/icon-cross.svg").default}
                alt="cross icon"
                width={14}
              />
            </div>
          </li>
          <li className="list-item-wrapper">
            <div className="icon-circle"></div>
            <div>
              <p className="">Complete todo app on Frontend Mentor</p>
            </div>
            <div>
              <img
                src={require("../images/icon-cross.svg").default}
                alt="cross icon"
                width={14}
              />
            </div>
          </li> */
