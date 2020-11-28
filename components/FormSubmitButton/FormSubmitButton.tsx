import React from "react";
import { useFormikContext } from "formik";
import Button from "../Button";

const FormSubmitButton: React.FC<{
  children: string;
  disabledIfInvalid?: boolean;
}> = ({ children, disabledIfInvalid = true }) => {
  const { handleSubmit, isValid, dirty } = useFormikContext();

  const disabled = disabledIfInvalid ? !isValid || !dirty : false;

  return (
    <Button
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
