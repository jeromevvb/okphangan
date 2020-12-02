import React from "react";
import { useFormikContext } from "formik";
import Button from "../Button";
import { ButtonProps } from "@material-ui/core";

interface FormSubmitButton extends ButtonProps {
  children: string;
  disabledIfInvalid?: boolean;
}

const FormSubmitButton: React.FC<FormSubmitButton> = (props) => {
  const { children, disabledIfInvalid = true, ...restProps } = props;

  const { handleSubmit, isValid, dirty } = useFormikContext();

  const disabled = disabledIfInvalid ? !isValid || !dirty : false;

  return (
    <Button
      {...restProps}
      variant="contained"
      color="primary"
      disabled={disabled}
      onClick={() => handleSubmit()}
    >
      {children}
    </Button>
  );
};

export default FormSubmitButton;
