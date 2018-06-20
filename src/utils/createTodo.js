import uuid from "./uuid";

export default text => ({
  text,
  id: uuid(),
  completed: false,
  created: new Date().getTime()
});
