import { h } from "hyperapp";

import classNames from "./AddTodo.module.css";

export default ({ inputValue, onInputChange, onFormSubmit }) => (
  <form class={classNames.Form} onsubmit={onFormSubmit}>
    <input
      autofocus={true}
      placeholder="Add Todo..."
      class={classNames.Input}
      type="text"
      onchange={onInputChange}
      value={inputValue}
    />
    <button class={classNames.Button}>Add</button>
  </form>
);
