import React from "react";
import Autocomplete, { Option } from "@components/Autocomplete";
import { FormikValues, useFormikContext } from "formik";
import { InputTextProps } from "@components/InputText/InputText";

export interface FormInputTagsProps extends InputTextProps {
  name: string;
  options: Array<Option>;
  label: string;
  handleChange?(): void;
}

const FormInputTags: React.FC<FormInputTagsProps> = (props) => {
  const { name, options, label, handleChange, ...restProps } = props;
  const {
    values,
    handleBlur,
    setFieldValue,
    touched,
    errors,
  } = useFormikContext<FormikValues>();

  const handleChangeAutocomplete = (option: Option) => {
    setFieldValue(name, option.value);
    if (handleChange) handleChange();
  };

  const isError =
    touched.hasOwnProperty(name) && errors.hasOwnProperty(name) ? true : false;

  const defaultValue = options.filter((o) => o.value === values[name]) || [];

  return (
    <Autocomplete
      multiple={true}
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
      onChange={handleChangeAutocomplete}
    />
  );
};

export default FormInputTags;
