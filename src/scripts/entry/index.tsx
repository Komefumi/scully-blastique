import React from "react";
import { render as DOMRender } from "react-dom";

import "../../styling/index.less";

DOMRender(
  <div>I stand here now</div>,
  document.getElementById("entry"),
);