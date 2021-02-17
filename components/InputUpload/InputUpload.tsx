import BodyText from "@components/BodyText";
import ConfirmDialog from "@components/ConfirmDialog";
import {
  Box,
  FormHelperText,
  InputLabel,
  lighten,
  makeStyles,
  Theme,
  IconButton,
  useTheme,
  CircularProgress,
} from "@material-ui/core";
import React, { useEffect, useState, Fragment } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { FaUpload } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import clsx from "clsx";

export interface InputUploadProps {
  error?: boolean;
  label: string;
  maxFiles: number;
  DropzoneProps?: DropzoneOptions;
  errorMessage?: string;
  helper?: string;
  loading?: boolean;
}

interface Props extends InputUploadProps {
  onUpload(files: Array<File>): void;
  onDelete(file: string): void;
  files: Array<string>;
}

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    position: "relative",
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
    width: 60,
    height: 80,
    objectFit: "cover",
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
    width: 60,
    height: 80,
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
  inputLoaderState: {
    opacity: 0.5,
    position: "relative",
  },
  loader: {
    position: "absolute",
    margin: "auto",
    left: 0,
    right: 0,
    textAlign: "center",
  },
}));

const DeleteButton = ({ onClick }: { onClick(): void }) => {
  const classes = useStyles();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleConfirm = () => {
    setOpenConfirmDialog(false);
    onClick();
  };

  const handleCancel = () => {
    setOpenConfirmDialog(false);
  };

  const handleClick = () => {
    setOpenConfirmDialog(true);
  };

  return (
    <Fragment>
      <IconButton
        onClick={handleClick}
        size="small"
        classes={{ root: classes.deleteButtonRoot }}
      >
        <MdClear className={classes.deleteButtonIcon} />
      </IconButton>
      <ConfirmDialog
        open={openConfirmDialog}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="Confirmation"
        body="Are you sure to delete this file?"
      />
    </Fragment>
  );
};
const InputUpload: React.FC<Props> = (props) => {
  const {
    label,
    error,
    onUpload,
    loading,
    onDelete,
    maxFiles = 0,
    errorMessage,
    helper,
    files,
    DropzoneProps = {},
  } = props;

  const theme = useTheme();
  const classes = useStyles();

  const onDrop = (acceptedFiles: Array<File>) => {
    onUpload(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    disabled: loading || files.length >= maxFiles,
    ...DropzoneProps,
  });

  return (
    <div>
      <InputLabel error={error}>
        {label} ({files.length}/{maxFiles})
      </InputLabel>
      <div {...getRootProps()} className={clsx(classes.input)}>
        {loading && (
          <CircularProgress className={classes.loader}></CircularProgress>
        )}
        <div className={clsx({ [classes.inputLoaderState]: loading })}>
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
                  Drag&drop or click to select files
                </BodyText>
              </Box>
            </div>
          )}
          {files.length > 0 && (
            <Fragment>
              <Box
                display="flex"
                alignContent="center"
                alignItems="center"
                flexWrap="wrap"
              >
                {files.map((file: string, i: number) => (
                  <div
                    key={i}
                    className={classes.thumb}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <DeleteButton onClick={() => onDelete(file)} />
                    <ImgSrc file={file} className={classes.thumbImg} />
                  </div>
                ))}
                {files.length < maxFiles && (
                  <Box className={classes.uploadMore}>
                    <FaUpload size={30} color={theme.palette.text.secondary} />
                  </Box>
                )}
              </Box>
            </Fragment>
          )}
        </div>
      </div>
      {(errorMessage || helper) && (
        <FormHelperText error={error}>{errorMessage || helper}</FormHelperText>
      )}
    </div>
  );
};

const ImgSrc = ({
  file,
  className,
}: {
  file: string | File;
  className: string;
}) => {
  const src: string = file instanceof File ? URL.createObjectURL(file) : file;

  return <img src={src} className={className} />;
};

export default InputUpload;
