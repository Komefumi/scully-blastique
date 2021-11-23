import React from "react";
import { render as DOMRender } from "react-dom";

import HelloWorld from "@src/scripts/components/HelloWorld";

import "../../styling/index.less";

DOMRender(
  <HelloWorld />,
  document.getElementById("entry"),
);