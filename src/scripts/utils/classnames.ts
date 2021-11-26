import { IObjectStringKeysAndValues } from "@my-types/loose";

export function generateCSSTransitionClassNamesForModule(
  cssModuleItem: IObjectStringKeysAndValues,
  baseClassName: string
): IObjectStringKeysAndValues {
  const be = `${baseClassName}_enter`;
  const bea = `${be}_active`;
  const bed = `${be}_done`;
  const bx = `${baseClassName}_exit`;
  const bxa = `${bx}_active`;
  const bxd = `${bx}_done`;

  return [be, bea, bed, bx, bxa, bxd].reduce((mapping, className) => {
    mapping[className] = cssModuleItem[className];
    return mapping;
  }, {} as IObjectStringKeysAndValues);
}
