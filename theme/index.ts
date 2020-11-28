import { createMuiTheme, responsiveFontSizes} from "@material-ui/core";

import palette from "./palette";
import typography from "./typography";
import overrides from "./overrides"

const theme = createMuiTheme({
  palette,
  typography,
  overrides, 
  shape:{
    borderRadius:10
  }
});

export default responsiveFontSizes(theme);
