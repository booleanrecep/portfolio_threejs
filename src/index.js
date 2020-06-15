import React from "react";
import ReactDOM from "react-dom";
// import App from "./App"
import "./styles.css";
import DraggableList from "./DraggableList";

ReactDOM.render(
  <DraggableList items={"Me linkedin github".split(" ")} />,
  // <p>Aa</p>,
  document.getElementById("root")
);
