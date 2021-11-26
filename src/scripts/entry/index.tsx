import React from "react";
import { render as DOMRender } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import IndexApp from "@apps/IndexApp";

import "@styling/index.scss";

DOMRender(
  <BrowserRouter>
    <IndexApp />
  </BrowserRouter>,
  document.getElementById("entry"),
);
