import React from "react";
import { FormikValues, useFormikContext } from "formik";
import InputText, { InputTextProps } from "../InputText/InputText";
import { Box } from "@material-ui/core";

interface FormInputTextProps extends InputTextProps {
  name: string;
}

const FormInputText: React.FC<FormInputTextProps> = ({
  name,
  ...restProps
}) => {
  const {
    handleChange,
    values,
    handleBlur,
    touched,
    errors,
  } = useFormikContext<FormikValues>();

  const isError =
    touched.hasOwnProperty(name) && errors.hasOwnProperty(name) ? true : false;

  return (
    <Box marginBottom={2}>
      <InputText
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[name]}
        error={isError}
        errorMessage={isError ? (errors[name] as string) : ""}
        name={name}
        {...restProps}
      />
    </Box>
  );
};

FormInputText.defaultProps = {};

export default FormInputText;
