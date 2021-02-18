import InputUpload, { InputUploadProps } from "@components/InputUpload";
import { FormikValues, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { deleteFile, uploadFiles } from "@models/storage";

import firebase from "firebase/app";
import "firebase/storage";

export interface FormInputUploadProps extends InputUploadProps {
  name: string;
  async?: boolean;
  firestoreUrl: string;
}

const FormInputUpload: React.FC<FormInputUploadProps> = ({
  name,
  label,
  firestoreUrl,
  DropzoneProps = {},
  maxFiles,
}) => {
  const [error, setError] = useState<string>("");
  const [files, setFiles] = useState<Array<string>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const storageUrl = `${firestoreUrl}/${name}`;

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
          setFiles(result);
          setLoading(false);
        });
      })
      .catch((error) => {
        setError(error);
        // Uh-oh, an error occurred!
      });
  }, []);

  /**
   *
   * @param acceptedFiles
   */
  const handleUploadFile = async (acceptedFiles: Array<File>) => {
    setLoading(true);
    uploadFiles(acceptedFiles, firestoreUrl, name)
      .then((fileUrls) => {
        setFiles([...fileUrls, ...files]);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  /**
   *
   * @param fileUrl
   */
  const handleDeleteFile = async (fileUrl: string) => {
    // delete file
    setLoading(true);
    deleteFile(fileUrl, firestoreUrl, name)
      .then(() => {
        setFiles(files.filter((f: string) => f !== fileUrl));
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
        files={files}
        label={label}
        errorMessage={error}
        DropzoneProps={DropzoneProps}
      />
    </Box>
  );
};

export default FormInputUpload;
