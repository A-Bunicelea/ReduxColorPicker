import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AppButton from './AppButton/AppButton';
import { Box } from '../types';

interface Props {
  open: boolean;
  handleClickOpen: () => void;
  handleClickClose: () => void;
  index?: number | undefined;
  box: Partial<Box>;
}

const BoxDialog: React.FC<Props> = ({
  open,
  handleClickOpen,
  handleClickClose,
  index,
  box,
}) => {
  return (
    <div>
      <AppButton
        label="Info"
        isDisabled={false}
        onClick={handleClickOpen}
        type="button"
      />
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>Box Info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>Box Id: {box.id}</p>
            <p>Box Number: {index}</p>
            <p>Creation Time: {box.creationTime}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClickClose}
            variant="text"
            style={{ color: 'black' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BoxDialog;
