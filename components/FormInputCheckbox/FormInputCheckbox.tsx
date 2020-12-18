import React from "react";
import { FormikValues, useFormikContext } from "formik";
import InputCheckbox, { InputCheckboxProps } from "../InputCheckbox";
import { Box } from "@material-ui/core";

interface FormInputCheckboxProps extends InputCheckboxProps {
  name: string;
}

const FormInputCheckbox: React.FC<FormInputCheckboxProps> = ({
  name,
  ...restProps
}) => {
  const { setFieldValue, values, touched, errors } = useFormikContext<
    FormikValues
  >();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, event.target.checked);
  };

  const isError =
    touched.hasOwnProperty(name) && errors.hasOwnProperty(name) ? true : false;

  return (
    <Box marginBottom={2}>
      <InputCheckbox
        onChange={handleChange}
        checked={values[name]}
        error={isError}
        errorMessage={isError ? (errors[name] as string) : ""}
        name={name}
        {...restProps}
      />
    </Box>
  );
};

FormInputCheckbox.defaultProps = {};

export default FormInputCheckbox;
