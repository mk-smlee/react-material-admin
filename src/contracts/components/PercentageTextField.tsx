import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';

interface PercentageTextFieldProps extends Omit<TextFieldProps, 'onChange'> {
  label: string;
  value?: number;
  onChange: (value: number | undefined) => void;
}

const PercentageTextField: React.FC<PercentageTextFieldProps> = ({
  label,
  value,
  onChange,
  ...textFieldProps
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // 정규식: 0-9 한 자리 정수, 선택적으로 소수점 이하 최대 2자리 허용
    const regex = /^(?:[0-9](?:\.[0-9]{0,2})?)?$/;
    if (regex.test(input)) {
      const num = input === '' ? undefined : parseFloat(input);
      onChange(num);
    }
  };

  return (
    <TextField
      {...textFieldProps}
      type="text"
      label={label}
      value={value !== undefined ? String(value) : ''}
      onChange={handleChange}
      inputProps={{
        inputMode: 'decimal',
        pattern: '\\d(?:\\.\\d{0,2})?',
      }}
    />
  );
};

export default PercentageTextField;
