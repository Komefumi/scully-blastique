import { IObjectStringKeysAndValues } from "@my-types/loose";

export function generateCSSTransitionClassNamesForModule(
  cssModuleItem: IObjectStringKeysAndValues,
  baseClassName: string
): IObjectStringKeysAndValues {
  const classes = cssModuleItem;
  const be = `${baseClassName}_enter`;
  const bea = `${be}_active`;
  const bed = `${be}_done`;
  const bx = `${baseClassName}_exit`;
  const bxa = `${bx}_active`;
  const bxd = `${bx}_done`;
  const cssAsModule: IObjectStringKeysAndValues = {
    enter: classes[be],
    enterActive: classes[bea],
    enterDone: classes[bed],
    exit: classes[bx],
    exitActive: classes[bxa],
    exitDone: classes[bxd],
  };

  return cssAsModule;
}
