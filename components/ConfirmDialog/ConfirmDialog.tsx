import React, { Fragment } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Theme,
} from "@material-ui/core";
import BodyText from "@components/BodyText";

interface ConfirmDialogProps {
  onConfirm(): void;
  onCancel(): void;
  title: string;
  body: string;
  open: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({}));

const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
  const { onConfirm, title, body, open, onCancel } = props;

  const handleCancel = () => {
    onCancel();
  };

  const handleOk = () => {
    onConfirm();
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent dividers>
        <BodyText>{body}</BodyText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
