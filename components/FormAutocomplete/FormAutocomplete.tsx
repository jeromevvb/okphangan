import React from "react";
import Autocomplete, {
  AutocompleteProps,
  Option,
} from "@components/Autocomplete";
import { FormikValues, useFormikContext } from "formik";

export interface FormAutocompleteProps {
  name: string;
  options: Array<Option>;
  label: string;
}

const FormAutocomplete: React.FC<FormAutocompleteProps> = (props) => {
  const { name, options, label } = props;
  const { values, setFieldValue, touched, errors } = useFormikContext<
    FormikValues
  >();

  const handleChange = (option: Option) => {
    setFieldValue(name, option?.value);
  };

  const defaultValue = options.find((o) => o.value === values[name]);

  return (
    <Autocomplete
      label={label}
      value={defaultValue}
      options={options}
      onChange={handleChange}
    ></Autocomplete>
  );
};

export default FormAutocomplete;
