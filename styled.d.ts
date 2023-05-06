// import original module declarations
import "solid-styled-components";

import { themesContext } from "./src/Theme";
type theme = typeof themesContext;
// and extend them!
declare module "solid-styled-components" {
  export interface DefaultTheme extends theme {}
}
