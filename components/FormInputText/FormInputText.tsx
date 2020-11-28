import React, { Fragment } from "react";
import { FormikValues, useFormikContext } from "formik";

// import FormErrorMessage from "./FormErrorMessage";
import InputText, { InputTextProps } from "../InputText/InputText";

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

  const isError = touched[name] && errors[name] ? true : false;

  return (
    <Fragment>
      <InputText
        onChange={handleChange(name)}
        onBlur={handleBlur(name)}
        value={values[name]}
        error={isError}
        errorMessage={errors[name] as string}
        name={name}
        {...restProps}
      />
    </Fragment>
  );
};

FormInputText.defaultProps = {};

export default FormInputText;
