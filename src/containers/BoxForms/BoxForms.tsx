import React from 'react';
import BoxInserter from '../BoxInserter/BoxInserter';
import BoxEditor from '../../components/BoxEditor/BoxEditor';
import { RootState } from '../../redux';
import { useSelector } from 'react-redux';
import { Box } from '../../types';
import styles from './BoxForms.module.css';

const defaultBox: Box = {
  id: '-',
  red: '-',
  green: '-',
  blue: '-',
  creationTime: '-',
};

const BoxForms: React.FC = () => {
  const box = useSelector((state: RootState) =>
    state.boxList.boxes.find((item) => item.id === state.boxList.selectedBoxId)
  );
  const boxList = useSelector((state: RootState) => state.boxList.boxes);
  const index = boxList.findIndex((boxElement: Box) => boxElement === box);
  const position = index === -1 ? 0 : index + 1;

  return (
    <div className={styles.container}>
      <BoxInserter />
      {/* {box ? <BoxEditor box={box} index={index} /> : null} */}
      <BoxEditor box={box ? box : defaultBox} index={position} />
    </div>
  );
};

export default BoxForms;
