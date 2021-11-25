import { ReactNode } from "react";

interface ICompatClassName {
  className?: string;
}

export interface IWrapper extends ICompatClassName {
  children: ReactNode;
}
