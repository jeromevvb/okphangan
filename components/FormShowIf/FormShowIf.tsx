import { FormikValues, useFormikContext } from "formik";
import { ImageFilter9 } from "material-ui/svg-icons";
import React from "react";

export interface FormShowIfProps {
  fieldName: string;
  is: string | boolean | number;
  children: any;
}

const FormShowIf: React.FC<FormShowIfProps> = ({ fieldName, is, children }) => {
  const { values } = useFormikContext<FormikValues>();

  if (values[fieldName] !== is) {
    return null;
  }

  return children;
};

export default FormShowIf;
