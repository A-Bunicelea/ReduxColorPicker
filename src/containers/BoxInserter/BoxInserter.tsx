import React, { useCallback, useState } from 'react';
import ColorForm from '../ColorForm/ColorForm';
import { RandomColor } from '../../models/color';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addBox } from '../../redux/actions/boxActions';
import { BoxColors } from '../../types';
import { RootState } from '../../redux';
import { Color, ColorPicker, createColor } from 'material-ui-color';
import styles from './BoxInserter.module.css';

let initialValues: BoxColors = { red: 0, green: 0, blue: 0 };

const BoxInserter: React.FC = () => {
  const boxListLength = useSelector(
    (state: RootState) => state.boxList.boxes.length
  );
  const dispatch = useDispatch();
  const [color, setColor] = useState(createColor('black'));

  const handleChange = useCallback(
    (newValue: Color) => {
      setColor(newValue);
    },
    [color]
  );

  initialValues = {
    red: color.rgb[0],
    green: color.rgb[1],
    blue: color.rgb[2],
  };

  const randomColor = useCallback(() => {
    const newColor = new RandomColor();

    dispatch(
      addBox({
        id: uuidv4(),
        red: newColor.red,
        green: newColor.green,
        blue: newColor.blue,
        creationTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
      })
    );
  }, []);

  return (
    <div className={styles.container}>
      <h1>Box Inserter</h1>
      <div className={styles.colorInserters}>
        <ColorForm
          initialColorValues={initialValues}
          btnLabel="Insert"
          onClick={randomColor}
          label="Insert random"
          boxListLength={boxListLength}
        />

        <div className={styles.colorPickerComp}>
          <ColorPicker value={color} onChange={handleChange} hideTextfield />
        </div>
      </div>
    </div>
  );
};

export default BoxInserter;
