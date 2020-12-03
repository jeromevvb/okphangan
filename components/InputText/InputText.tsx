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
  input: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#EBEBEB",
    border: "1px solid #EBEBEB",
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
    <div>
      <InputLabel htmlFor={name} error={error}>
        {label}
      </InputLabel>
      <CustomInput id={name} name={name} {...restProps} />
      {(errorMessage || helper) && (
        <FormHelperText error={error}>{errorMessage || helper}</FormHelperText>
      )}
    </div>
  );
};

//aria-describedby="my-helper-text"

export default InputText;
