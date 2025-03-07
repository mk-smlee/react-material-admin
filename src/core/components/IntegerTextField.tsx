import React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

interface IntegerTextFieldProps extends Omit<TextFieldProps, 'onChange'> {
  /** 숫자(정수) 값; 값이 없으면 undefined */
  value?: number;
  /** 값이 변경될 때 호출됩니다. 빈 문자열이나 '-'는 undefined로 전달됩니다. */
  onChange: (value: number | undefined) => void;
}

const IntegerTextField: React.FC<IntegerTextFieldProps> = ({
  value,
  onChange,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // 정수 (음수 포함)만 허용하는 정규식: 빈 문자열도 허용
    if (/^-?\d*$/.test(newValue)) {
      // 빈 문자열이나 "-"인 경우는 값이 없다고 간주
      if (newValue === '' || newValue === '-') {
        onChange(undefined);
      } else {
        onChange(parseInt(newValue, 10));
      }
    }
  };

  return (
    <TextField
      {...props}
      value={value !== undefined ? String(value) : ''}
      onChange={handleChange}
      inputProps={{
        inputMode: 'numeric',
        pattern: '-?\\d*',
        ...props.inputProps,
      }}
    />
  );
};

export default IntegerTextField;
