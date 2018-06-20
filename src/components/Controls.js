import { h } from "hyperapp";
import classes from "./Controls.module.css";
import clearIcon from "../img/clear.svg";
import toggleIcon from "../img/toggle.svg";

export default ({ toggleAll, clearCompleted }) => (
  <div class={classes.container}>
    <div onclick={toggleAll} title="Toggle All" class={classes.toggle}>
      <img src={toggleIcon} alt="toggle icon" />
    </div>
    <div onclick={clearCompleted} title="Clear Completed" class={classes.clear}>
      <img src={clearIcon} alt="clear icon" />
    </div>
  </div>
);
