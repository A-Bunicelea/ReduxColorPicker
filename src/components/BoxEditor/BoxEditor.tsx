import React, { useCallback, useEffect, useState } from 'react';
import ColorForm from '../../containers/ColorForm/ColorForm';
import { Box } from '../../types';
import BoxDialog from '../BoxDialog';
import { StyledEngineProvider } from '@mui/material/styles';
import styles from './BoxEditor.module.css';

interface Props {
  box?: Box;
  index: number | undefined;
}

const defaultBox: Partial<Box> = {
  id: undefined,
  red: undefined,
  green: undefined,
  blue: undefined,
  creationTime: undefined,
};

const BoxEditor: React.FC<Props> = ({ box = defaultBox, index }) => {
  const [editorBox, setEditorBox] = useState(box);
  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, [open]);

  const handleClickClose = useCallback(() => {
    setOpen(false);
  }, [open]);

  useEffect(() => {
    setEditorBox(box);
  }, [box]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Box editor</h1>
        <StyledEngineProvider injectFirst>
          <BoxDialog
            handleClickOpen={handleClickOpen}
            handleClickClose={handleClickClose}
            open={open}
            box={box}
            index={index}
          />
        </StyledEngineProvider>
      </div>
      <ColorForm
        initialColorValues={editorBox}
        isEdit={true}
        box={box}
        btnLabel="Apply color"
        label="Insert random"
      />

      <p>Box number: {index}</p>
    </div>
  );
};

export default BoxEditor;
