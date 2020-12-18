import {
  FormHelperText,
  FormControlLabel,
  Checkbox,
  CheckboxProps,
} from "@material-ui/core";
import React from "react";

export interface InputCheckboxProps extends CheckboxProps {
  helper?: string;
  label: string;
  errorMessage?: string;
  name: string;
  error?: boolean;
}

const InputText: React.FC<InputCheckboxProps> = (props) => {
  const {
    name,
    label,
    error = false,
    errorMessage,
    helper,
    checked,
    onChange,
    ...restProps
  } = props;

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            onChange={onChange}
            name={name}
            checked={checked}
            color="primary"
            {...restProps}
          />
        }
        label={label}
      />
      {(errorMessage || helper) && (
        <FormHelperText error={error}>{errorMessage || helper}</FormHelperText>
      )}
    </div>
  );
};

export default InputText;
