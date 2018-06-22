import { h } from "hyperapp";
import TodoItem from "./TodoItem";

export default ({ state }) => (
  <div>
    {state.lists.map(list => (
      <div>
        <span>{list.name}</span>
        <div>{list.todos.map(todo => <TodoItem text={todo.text} />)}</div>
      </div>
    ))}
  </div>
);
