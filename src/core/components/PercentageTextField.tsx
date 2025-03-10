import React, { useState, useEffect } from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';

interface PercentageTextFieldProps extends Omit<TextFieldProps, 'onChange'> {
  label: string;
  value?: number;
  onChange: (value: number | undefined) => void;
  decimalPlaces?: number;
}

const PercentageTextField: React.FC<PercentageTextFieldProps> = ({
  label,
  value,
  onChange,
  decimalPlaces = 2,
  ...textFieldProps
}) => {
  // 내부 상태를 문자열로 관리
  const [inputValue, setInputValue] = useState<string>(
    value !== undefined ? String(value) : '',
  );

  // 부모 value 변경 시 내부 상태 동기화
  useEffect(() => {
    setInputValue(value !== undefined ? String(value) : '');
  }, [value]);

  // 정규식: 0-9 한 자리 정수, 선택적으로 소숫점 이하 최대 decimalPlaces 자리 허용 (trailing dot 허용)
  const regex = new RegExp(`^(?:[0-9](?:\\.[0-9]{0,${decimalPlaces}})?)?$`);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (regex.test(newValue)) {
      setInputValue(newValue);
    }
  };

  const handleBlur = () => {
    // onBlur 시 trailing dot 제거
    let normalized = inputValue;
    if (normalized.endsWith('.')) {
      normalized = normalized.slice(0, -1);
    }
    const num = normalized === '' ? undefined : parseFloat(normalized);
    setInputValue(normalized);
    onChange(num);
  };

  return (
    <TextField
      {...textFieldProps}
      type="text"
      label={label}
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      inputProps={{
        inputMode: 'decimal',
        pattern: `\\d(?:\\.\\d{0,${decimalPlaces}})?`,
      }}
    />
  );
};

export default PercentageTextField;
