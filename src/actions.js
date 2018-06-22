import createTodo from "./utils/createTodo";
import { save, retrieve } from "./utils/storage";

export default {
  getTodos: state => state => state.todos,

  startEditTodo: update => (state, actions) => {
    if (update.text.length < 1) return;
    actions.editTodo(update);
    save(actions.getTodos());
  },

  editTodo: ({ id, text }) => state => ({
    todos: state.todos.map(
      todo => (todo.id === id ? Object.assign({}, todo, { text }) : todo)
    )
  }),

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
    console.log("state: ", actions.getTodos());
  },

  addTodo: () => state => {
    if (
      state.inputs.newTodoInputValue === "" ||
      state.inputs.newTodoInputValue === " "
    )
      return;
    return {
      todos: [
        ...state.todos,
        createTodo(state.inputs.newTodoInputValue.trim())
      ],
      inputs: { newTodoInputValue: "" }
    };
  },

  inputs: {
    onInputChange: event => state => {
      const newTodoInputValue = event.target.value;
      return {
        newTodoInputValue
      };
    }
  }
};
