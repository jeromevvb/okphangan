import InputUpload, { InputUploadProps } from "@components/InputUpload";
import { FormikValues, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { deleteFile, uploadFile } from "@models/storage";

import firebase from "firebase/app";
import "firebase/storage";

export interface FormInputUploadProps extends InputUploadProps {
  name: string;
  async?: boolean;
  storageUrl: string;
}

const FormInputUpload: React.FC<FormInputUploadProps> = ({
  name,
  label,
  storageUrl,
  DropzoneProps = {},
  maxFiles,
}) => {
  const { values, setFieldValue, touched, errors } = useFormikContext<
    FormikValues
  >();

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    firebase
      .storage()
      .ref()
      .child(storageUrl)
      .listAll()
      .then((res) => {
        const promises = res.items.map((itemRef) => itemRef.getDownloadURL());

        Promise.all(promises).then((result: string[]) => {
          setFieldValue(name, result);
          setLoading(false);
        });
      })
      .catch((error) => {
        setError(error);
        // Uh-oh, an error occurred!
      });
  }, []);

  const handleUploadFile = async (acceptedFiles: Array<File>) => {
    setLoading(true);

    const promises = acceptedFiles.map((file) => uploadFile(file, storageUrl));

    Promise.all(promises).then((result: string[]) => {
      setFieldValue(name, [...result, ...values[name]]);
      setLoading(false);
    });
  };

  const handleDeleteFile = async (fileUrl: string) => {
    // delete file
    setLoading(true);
    deleteFile(fileUrl)
      .then(() => {
        setFieldValue(
          name,
          values[name].filter((f: string) => f !== fileUrl)
        );
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  return (
    <Box marginBottom={2}>
      <InputUpload
        loading={loading}
        maxFiles={maxFiles}
        onUpload={handleUploadFile}
        onDelete={handleDeleteFile}
        error={error ? true : false}
        files={values[name]}
        label={label}
        errorMessage={error}
        DropzoneProps={DropzoneProps}
      />
    </Box>
  );
};

export default FormInputUpload;
