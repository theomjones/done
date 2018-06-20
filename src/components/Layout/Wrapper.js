import { h } from "hyperapp";

import classes from "./Wrapper.module.css";

export default ({}, children) => <div class={classes.wrapper}>{children}</div>;
