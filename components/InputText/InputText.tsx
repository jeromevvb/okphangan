import {
  FormControl,
  FormHelperText,
  InputBaseProps,
  InputBase,
  InputLabel,
  withStyles,
  Theme,
  lighten,
} from "@material-ui/core";
import React from "react";

export interface InputTextProps extends InputBaseProps {
  icon?: string;
  helper?: string;
  errorMessage?: string;
  label: string;
  name: string;
  error?: boolean;
}

const CustomInput = withStyles((theme: Theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(2.5),
    },
  },
  input: {
    borderRadius: theme.shape.borderRadius,
    position: "relative",
    backgroundColor: "#EBEBEB",
    border: "1px solid #EBEBEB",
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color"]),
    "&:focus": {
      borderColor: lighten(theme.palette.primary.main, 0.3),
    },
  },
}))(InputBase);

const InputText: React.FC<InputTextProps> = (props) => {
  const {
    name,
    label,
    icon,
    error = false,
    errorMessage,
    helper,
    ...restProps
  } = props;

  return (
    <FormControl error={error}>
      <InputLabel shrink htmlFor={name}>
        {label}
      </InputLabel>
      <CustomInput id={name} {...restProps} />
      {(errorMessage || helper) && (
        <FormHelperText>{errorMessage || helper}</FormHelperText>
      )}
    </FormControl>
  );
};

//aria-describedby="my-helper-text"

export default InputText;
