import BodyText from "@components/BodyText";
import {
  Box,
  FormHelperText,
  InputLabel,
  lighten,
  makeStyles,
  Theme,
  IconButton,
  useTheme,
} from "@material-ui/core";
import React, { useEffect, useState, Fragment } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { FaUpload } from "react-icons/fa";
import { MdClear } from "react-icons/md";

export interface FileWithPreview extends File {
  preview: string;
}

export interface InputUploadProps {
  error?: boolean;
  label: string;
  DropzoneProps?: DropzoneOptions;
  errorMessage?: string;
  helper?: string;
}

interface Props extends InputUploadProps {
  onChange(files: Array<FileWithPreview>): void;
}

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#EBEBEB",
    border: "1px solid #EBEBEB",
    padding: "20px 12px",
    transition: theme.transitions.create(["border-color"]),
    "&:hover": {
      borderColor: lighten(theme.palette.primary.main, 0.3),
      cursor: "pointer",
    },
  },
  emptyUploader: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  thumbImg: {
    display: "inline-block",
    borderRadius: theme.shape.borderRadius,
    width: 80,
    height: 100,
  },
  thumb: {
    position: "relative",
    display: "inline-block",
    marginRight: theme.spacing(1.5),
    boxSizing: "border-box",
  },
  uploadMore: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: theme.shape.borderRadius,
    border: `1.5px dashed ${theme.palette.text.secondary}`,
    width: 80,
    height: 100,
  },
  deleteButtonIcon: {
    color: theme.palette.error.contrastText,
    borderRadius: "50%",
    background: theme.palette.error.main,
    border: "2px solid white",
    padding: "3px",
  },
  deleteButtonRoot: {
    position: "absolute",
    top: "-10px",
    right: "-10px",
  },
}));

const DeleteButton = ({
  onClick,
}: {
  onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}) => {
  const classes = useStyles();
  return (
    <IconButton
      onClick={onClick}
      size="small"
      classes={{ root: classes.deleteButtonRoot }}
    >
      <MdClear className={classes.deleteButtonIcon} />
    </IconButton>
  );
};

const InputUpload: React.FC<Props> = (props) => {
  const {
    label,
    error,
    onChange,
    errorMessage,
    helper,
    DropzoneProps = {},
  } = props;

  const theme = useTheme();
  const [files, setFiles] = useState<Array<FileWithPreview>>([]);
  const classes = useStyles();

  const maxFiles = DropzoneProps.hasOwnProperty("maxFiles")
    ? DropzoneProps.maxFiles
    : null;

  useEffect(() => {
    return () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: Array<File>) => {
      const extendedFiles = acceptedFiles.map((file: File) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      const finalFiles = [...files, ...extendedFiles];
      //set files
      setFiles(finalFiles);
      // fire on change
      onChange(finalFiles);
    },
    ...DropzoneProps,
  });

  // handle delete file
  const handleDeleteFile = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    event.stopPropagation();
    event.preventDefault();

    const hydratedFiles = files.filter((f, i) => i !== index);
    setFiles(hydratedFiles);
    onChange(hydratedFiles);
  };

  return (
    <div>
      <InputLabel error={error}>{label}</InputLabel>
      <div {...getRootProps()} className={classes.input}>
        <input {...getInputProps()} />
        {files.length === 0 && (
          <div className={classes.emptyUploader}>
            <Box
              display="flex"
              alignContent="center"
              alignItems="center"
              marginRight={2}
            >
              <FaUpload size={30} color={theme.palette.text.secondary} />
            </Box>
            <Box>
              <BodyText
                variant="body2"
                color="textSecondary"
                fontWeight="extraLight"
              >
                Drag 'n' drop or click to select files
              </BodyText>
            </Box>
          </div>
        )}
        {files.length > 0 && (
          <Fragment>
            <Box display="flex" alignContent="center" alignItems="center">
              {files.map((file, i) => (
                <div key={file.name} className={classes.thumb}>
                  <DeleteButton
                    onClick={(event) => handleDeleteFile(event, i)}
                  />
                  <img src={file.preview} className={classes.thumbImg} />
                </div>
              ))}
              {maxFiles && files.length < maxFiles && (
                <Box className={classes.uploadMore}>
                  <FaUpload size={30} color={theme.palette.text.secondary} />
                </Box>
              )}
            </Box>
          </Fragment>
        )}
      </div>
      {(errorMessage || helper) && (
        <FormHelperText error={error}>{errorMessage || helper}</FormHelperText>
      )}
    </div>
  );
};

export default InputUpload;
