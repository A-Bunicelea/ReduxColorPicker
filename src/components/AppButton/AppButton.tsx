import React from 'react';
import styles from './AppButton.module.css';

interface Props {
  onClick?: () => void;
  boxListLength?: number;
  label: string;
  isDisabled?: boolean;
  type: 'button' | 'submit' | 'reset' | undefined;
}

const AppButton: React.FC<Props> = ({
  onClick,
  boxListLength,
  label,
  isDisabled,
  type,
}) => {
  return (
    <button
      className={styles.btn}
      type={type}
      onClick={onClick}
      disabled={boxListLength ? boxListLength >= 9 || isDisabled : isDisabled}
    >
      {label}
    </button>
  );
};

export default AppButton;
