import { h } from "hyperapp";
import { Enter, Exit } from "@hyperapp/transitions";

import classes from "./TodoItem.module.css";

export default ({ text, id, completed, toggleComplete, deleteTodo }) => (
  <Exit
    time={150}
    easing="ease-out"
    css={{
      opacity: "0",
      transform: "translateY(10px)"
    }}
  >
    <Enter
      time={200}
      easing="ease-in-out"
      css={{
        opacity: "0",
        transform: "translateY(10px)"
      }}
    >
      <div
        key={id}
        class={`${classes.TodoItem} ${completed ? classes.completed : ""}`}
      >
        <div onclick={() => toggleComplete(id)} class={classes.Toggle} />
        <span class={classes.text}>{text}</span>
        <div onclick={() => deleteTodo(id)} class={classes.Trash}>
          <span>&times;</span>
        </div>
      </div>
    </Enter>
  </Exit>
);
