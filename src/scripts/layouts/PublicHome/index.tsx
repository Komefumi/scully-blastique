import React from "react";

import { IWrapper } from "@my-types/components";

export default ({ className, children }: IWrapper) => {
  return (
    <div className={className}>{children}</div>
  );
}
