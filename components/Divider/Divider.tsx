import React from "react";
import MuiDivider from "@material-ui/core/Divider";
import { Box, withStyles } from "@material-ui/core";
import Spacing from "material-ui/styles/spacing";

interface DividerProps {
  spacing?: number;
}

const CustomDivider = withStyles({
  root: {
    height: 2,
  },
})(MuiDivider);

const Divider: React.FC<DividerProps> = ({ spacing = 0 }) => {
  return (
    <Box marginBottom={spacing} marginTop={spacing}>
      <CustomDivider />
    </Box>
  );
};

export default Divider;
