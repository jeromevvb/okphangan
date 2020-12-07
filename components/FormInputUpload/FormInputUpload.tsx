import InputUpload, { InputUploadProps } from "@components/InputUpload";
import { FormikValues, useFormikContext } from "formik";
import React from "react";
import { FileWithPreview } from "@components/InputUpload";
import { Box } from "@material-ui/core";

export interface FormInputUploadProps extends InputUploadProps {
  name: string;
}

const FormInputUpload: React.FC<FormInputUploadProps> = ({
  name,
  label,
  DropzoneProps = {},
}) => {
  const { values, setFieldValue, touched, errors } = useFormikContext<
    FormikValues
  >();

  const isError =
    touched.hasOwnProperty(name) && errors.hasOwnProperty(name) ? true : false;

  const handleChange = (files: Array<FileWithPreview>) => {
    console.log(files);

    setFieldValue(name, files);
  };

  return (
    <Box marginBottom={2}>
      <InputUpload
        onChange={handleChange}
        error={isError}
        label={label}
        errorMessage={isError ? (errors[name] as string) : ""}
        DropzoneProps={DropzoneProps}
      />
    </Box>
  );
};

export default FormInputUpload;
