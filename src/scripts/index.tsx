import React from "react";
import { render as DOMRender } from "react-dom";

DOMRender(
  <div>I stand here</div>,
  document.getElementById("entry"),
);