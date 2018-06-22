import { h, app } from "hyperapp";
import { Move } from "@hyperapp/transitions";

// Actions
import actions from "./actions";

import TodoItem from "./components/TodoItem";
import Wrapper from "./components/Layout/Wrapper";
import AddTodo from "./components/Form/AddTodo";
import Controls from "./components/Controls";

import "./index.css";
import createTodo from "./utils/createTodo";
import { save, retrieve } from "./utils/storage";
import Message from "./components/Message";
import Container from "./components/Layout/Container";

import TodoFolder from "./components/TodoFolder";

const state = {
  todos: retrieve(),
  lists: [
    {
      name: "A list",
      id: 1,
      todos: [createTodo("I am a todo")]
    },
    {
      name: "Another List",
      id: 2,
      todos: [createTodo("Make a cake")]
    }
  ],
  inputs: {
    newTodoInputValue: ""
  }
};

const view = (state, actions) => {
  console.log(state.lists);
  return (
    <div>
      <Wrapper>
        <Container>
          <AddTodo
            onFormSubmit={actions.startAddTodo}
            inputValue={state.inputs.newTodoInputValue}
            onInputChange={actions.inputs.onInputChange}
          />
        </Container>
        <Controls
          toggleAll={actions.startToggleAll}
          clearCompleted={actions.startClearCompleted}
        />
        <Container>
          {state.todos.length > 0 ? (
            <Move easing="ease-in-out" time={250}>
              {state.todos
                .sort((a, b) => a.completed - b.completed)
                .map(todo => (
                  <TodoItem
                    editTodo={actions.startEditTodo}
                    key={todo.id}
                    text={todo.text}
                    id={todo.id}
                    completed={todo.completed}
                    toggleComplete={actions.startToggleComplete}
                    deleteTodo={actions.startDeleteTodo}
                  />
                ))}
            </Move>
          ) : (
            <Message message="All done!" />
          )}
        </Container>
      </Wrapper>
    </div>
  );
};

window.app = app(state, actions, view, document.getElementById("app"));

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./service-worker.js")
    .then(function(registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function(error) {
      console.log("Service worker registration failed, error:", error);
    });
}
