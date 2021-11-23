import React, { FC } from "react";

import HomePage from "@pages/Home";
import AboutPage from "@pages/About";

export const ROOT_PATH = "";
export const ABOUT_PATH = "about";

export const pathToRouteMap: Map<string, FC> = new Map();

pathToRouteMap.set(ROOT_PATH, HomePage);
pathToRouteMap.set(ABOUT_PATH, AboutPage);
