import { h, app } from "hyperapp";
import { Move } from "@hyperapp/transitions";

import TodoItem from "./components/TodoItem";
import Wrapper from "./components/Layout/Wrapper";
import AddTodo from "./components/Form/AddTodo";
import Controls from "./components/Controls";

import "./index.css";
import createTodo from "./utils/createTodo";
import { save, retrieve } from "./utils/storage";
import Message from "./components/Message";
import Container from "./components/Layout/Container";

const state = {
  todos: retrieve(),
  inputValue: ""
};

const actions = {
  getTodos: state => state => state.todos,

  startClearCompleted: () => (state, actions) => {
    actions.clearCompleted();
    save(actions.getTodos());
  },

  clearCompleted: () => state => ({
    todos: state.todos.filter(todo => !todo.completed)
  }),

  startToggleAll: () => (state, actions) => {
    actions.toggleAll();
    save(actions.getTodos());
  },

  toggleAll: () => state => ({
    todos: state.todos.map(todo => Object.assign({}, todo, { completed: true }))
  }),

  startToggleComplete: id => (state, actions) => {
    actions.toggleComplete(id);
    save(actions.getTodos());
  },

  toggleComplete: id => state => ({
    todos: state.todos.map(
      todo =>
        todo.id === id
          ? Object.assign({}, todo, { completed: !todo.completed })
          : todo
    )
  }),

  startDeleteTodo: id => (state, actions) => {
    actions.deleteTodo(id);
    const todos = actions.getTodos();
    save(todos);
  },

  deleteTodo: id => state => ({
    todos: state.todos.filter(todo => todo.id !== id)
  }),

  startAddTodo: event => (state, actions) => {
    event.preventDefault();
    actions.addTodo();
    save(actions.getTodos());
  },

  addTodo: () => state => {
    if (state.inputValue === "" || state.inputValue === " ") return;
    return {
      todos: [...state.todos, createTodo(state.inputValue.trim())],
      inputValue: ""
    };
  },

  onInputChange: event => state => {
    const inputValue = event.target.value;
    return {
      inputValue
    };
  }
};

const view = (state, actions) => (
  <div>
    <Wrapper>
      <Container>
        <AddTodo
          onFormSubmit={actions.startAddTodo}
          inputValue={state.inputValue}
          onInputChange={actions.onInputChange}
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
