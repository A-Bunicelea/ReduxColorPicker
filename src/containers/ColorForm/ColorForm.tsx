import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addBox, editBox } from '../../redux/actions/boxActions';
import { v4 as uuidv4 } from 'uuid';
import { Box, BoxColors } from '../../types';
import { useDispatch } from 'react-redux';
import AppButton from '../../components/AppButton/AppButton';
import styles from './ColorForm.module.css';

interface Props {
  initialColorValues: Partial<BoxColors>;
  isEdit?: boolean;
  box?: Partial<Box>;
  btnLabel: string;
  onClick?: () => void;
  label: string;
  boxListLength?: number;
}

const ColorForm: React.FC<Props> = ({
  initialColorValues,
  isEdit,
  box,
  btnLabel,
  onClick,
  label,
  boxListLength,
}) => {
  // const colorsList = useSelector((state: RootState) => state.boxList.boxes);
  const dispatch = useDispatch();
  const [inputColor, setInputColor] = useState(initialColorValues);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BoxColors>();

  useEffect(() => {
    reset();
    setInputColor(initialColorValues);
  }, [initialColorValues]);

  const onSubmit = (data: BoxColors) => {
    const currentDate = new Date();
    // const currentTime = currentDate.toJSON().slice(11, 16);
    // const currentTime = currentDate.getHours() + ':' + currentDate.getMinutes();
    const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

    if (isEdit) {
      if (box) {
        box.red = Number(data.red);
        box.blue = Number(data.blue);
        box.green = Number(data.green);

        if (box.id) {
          dispatch(editBox(box as Box));
        }
      }
    } else {
      dispatch(
        addBox({
          id: uuidv4(),
          red: Number(data.red),
          green: Number(data.green),
          blue: Number(data.blue),
          creationTime: currentTime,
        })
      );
      setInputColor({ red: 0, green: 0, blue: 0 });
    }

    setInputColor(data);

    // reset();
  };

  return (
    <div className={styles.formContainer}>
      {isEdit ? (
        <div
          className={styles.box}
          style={{
            background: `rgb(${inputColor.red},${inputColor.green},${inputColor.blue})`,
          }}
        ></div>
      ) : null}
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className={styles.form}
      >
        <div className={styles.formInputs}>
          <label htmlFor="red" className={styles.label}>
            R:
            <input
              className={styles.input}
              id="red"
              {...register('red', {
                valueAsNumber: true,
                min: 0,
                max: 255,
                value: inputColor.red,
                onChange: (e) =>
                  setInputColor({ ...inputColor, red: e.target.value }),
              })}
            />
          </label>
          {errors.red && (
            <p className={styles.errorMessage}>
              This number should be between 0 and 255
            </p>
          )}

          <label className={styles.label} htmlFor="green">
            G:
            <input
              className={styles.input}
              id="green"
              {...register('green', {
                valueAsNumber: true,
                min: 0,
                max: 255,
                value: inputColor.green,
                onChange: (e) =>
                  setInputColor({ ...inputColor, green: e.target.value }),
              })}
            />
          </label>
          {errors.green && (
            <p className={styles.errorMessage}>
              This number should be between 0 and 255
            </p>
          )}

          <label className={styles.label} htmlFor="blue">
            B:
            <input
              className={styles.input}
              id="blue"
              {...register('blue', {
                valueAsNumber: true,
                min: 0,
                max: 255,
                value: inputColor.blue,
                onChange: (e) =>
                  setInputColor({ ...inputColor, blue: e.target.value }),
              })}
            />
          </label>
          {errors.blue && (
            <p className={styles.errorMessage}>
              This number should be between 0 and 255
            </p>
          )}
        </div>
        {/* <button
          className={styles.btn}
          type="submit"
          disabled={colorsList.length >= 9 || !isValid}
        >
          {btnLabel}
        </button> */}
        <div className={styles.btn}>
          <AppButton
            label={btnLabel}
            boxListLength={boxListLength}
            type="submit"
          />
        </div>
      </form>
      {!isEdit ? (
        <div className={styles.btn}>
          <AppButton
            onClick={onClick}
            label={label}
            boxListLength={boxListLength}
            type="button"
          />
        </div>
      ) : null}
    </div>
  );
};

export default ColorForm;
