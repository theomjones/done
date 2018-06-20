import createTodo from "./createTodo";

export const save = state => {
  window.localStorage.setItem("state", JSON.stringify(state));
};

export const retrieve = () => {
  const state = JSON.parse(window.localStorage.getItem("state"));
  if (state && state.length > 0) {
    return state;
  } else {
    return [
      createTodo("Welcome to Done! ✅"),
      createTodo("I work offline! 😮"),
      createTodo(
        "I keep your todos in the browser, if you clear your history they go away 😐"
      ),
      Object.assign(
        {},
        createTodo("Toggle your todo by tapping the circle... 👍"),
        { completed: true }
      ),
      createTodo("Delete your todo by tapping the cross... 🚫"),
      createTodo("Go do something! 🎉")
    ];
  }
};
