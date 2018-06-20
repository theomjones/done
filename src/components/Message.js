import { h } from "hyperapp";
import { Enter } from "@hyperapp/transitions";

export default ({ message }) => (
  <Enter
    easing="ease-in-out"
    time={500}
    css={{
      transform: "scale(.9)"
    }}
  >
    <div
      style={{
        margin: "0 auto",
        textAlign: "center",
        opacity: 0.4,
        fontSize: "80%"
      }}
    >
      <span>{message}</span>
    </div>
  </Enter>
);
