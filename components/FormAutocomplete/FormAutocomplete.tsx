import React from "react";
import Autocomplete, { Option } from "@components/Autocomplete";
import { Box } from "@material-ui/core";
import { FormikValues, useFormikContext } from "formik";

interface FormAutocompleteProps {
  name: string;
  handleChange?(): void;
  label: string;
  options: Array<Option>;
  multiple?: boolean;
}

const FormAutocomplete: React.FC<FormAutocompleteProps> = (props) => {
  const { name, options, label, handleChange, multiple = false } = props;
  const {
    values,
    handleBlur,
    setFieldValue,
    touched,
    errors,
  } = useFormikContext<FormikValues>();

  const handleChangeAutocomplete = (value: Array<string> | string) => {
    if (!value) {
      return setFieldValue(name, null);
    }

    if (value instanceof Array && value.length > 5) {
      return false;
    }

    setFieldValue(name, value);
    if (handleChange) handleChange();
  };

  const isError =
    touched.hasOwnProperty(name) && errors.hasOwnProperty(name) ? true : false;

  return (
    <Box marginBottom={2}>
      <Autocomplete
        multiple={multiple}
        label={label}
        name={name}
        onBlur={handleBlur}
        error={isError}
        errorMessage={isError ? (errors[name] as string) : ""}
        value={values[name]}
        options={options}
        onChange={handleChangeAutocomplete}
      />
    </Box>
  );
};

export default FormAutocomplete;
