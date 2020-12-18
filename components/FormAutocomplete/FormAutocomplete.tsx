import React from "react";
import Autocomplete, { Option } from "@components/Autocomplete";
import { FormikValues, useFormikContext } from "formik";
import { InputTextProps } from "@components/InputText/InputText";

export interface FormAutocompleteProps extends InputTextProps {
  name: string;
  options: Array<Option>;
  label: string;
}

const FormAutocomplete: React.FC<FormAutocompleteProps> = (props) => {
  const { name, options, label, ...restProps } = props;
  const {
    values,
    handleBlur,
    setFieldValue,
    touched,
    errors,
  } = useFormikContext<FormikValues>();

  const handleChange = (option: Option) => {
    setFieldValue(name, option.value);
  };
  const isError =
    touched.hasOwnProperty(name) && errors.hasOwnProperty(name) ? true : false;

  const defaultValue = options.find((o) => o.value === values[name]);

  return (
    <Autocomplete
      InputProps={{
        ...restProps,
        label,
        name,
        onBlur: handleBlur,
        error: isError,
        errorMessage: isError ? (errors[name] as string) : "",
      }}
      value={defaultValue}
      options={options}
      onChange={handleChange}
    />
  );
};

export default FormAutocomplete;
