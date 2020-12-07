import React, { Fragment } from "react";
import { useFormikContext } from "formik";
import Button from "../Button";
import { Box, ButtonProps } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

interface FormSubmitButton extends ButtonProps {
  children: string;
  disabledIfInvalid?: boolean;
}

const FormSubmitButton: React.FC<FormSubmitButton> = (props) => {
  const { children, disabledIfInvalid = true, ...restProps } = props;

  const { handleSubmit, isValid, dirty, status } = useFormikContext();
  const disabled = disabledIfInvalid ? !isValid || !dirty : false;

  return (
    <Fragment>
      {status?.error && (
        <Box marginBottom={2}>
          <Alert variant="filled" severity="error">
            {status.error}
          </Alert>
        </Box>
      )}

      <Button
        {...restProps}
        variant="contained"
        color="primary"
        disabled={disabled}
        onClick={() => handleSubmit()}
      >
        {children}
      </Button>
    </Fragment>
  );
};

export default FormSubmitButton;
