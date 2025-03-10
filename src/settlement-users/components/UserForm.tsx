import React from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Switch,
} from '@material-ui/core';
import {
  SettlementUser,
  SettlementUserRole,
  SettlementUserStatus,
  CreateUserPayload,
} from '../types/user';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';

interface UserFormProps {
  mode: 'create' | 'edit';
  initialValues?: Partial<SettlementUser>;
  onSubmit: (values: CreateUserPayload) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({
  mode,
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const snackbar = useSnackbar();

  const [email, setEmail] = React.useState(initialValues?.email || '');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState(initialValues?.name || '');
  const [role, setRole] = React.useState<SettlementUserRole>(
    initialValues?.role !== undefined
      ? initialValues.role
      : SettlementUserRole.USER,
  );
  const [status, setStatus] = React.useState<SettlementUserStatus>(
    initialValues?.status !== undefined
      ? initialValues.status
      : SettlementUserStatus.ACTIVE,
  );

  const handleSubmit = () => {
    if (mode === 'create') {
      if (!email || !password || !name) {
        return snackbar.error('이메일, 비밀번호, 이름은 필수입니다.');
      }
    } else {
      // edit
      if (!email || !name) {
        return snackbar.error('이메일, 이름은 필수입니다.');
      }
    }

    onSubmit({
      email,
      password: password || '', // 비어있으면 undefined
      name,
      role,
      status,
    });
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
        <TextField
          label="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={mode === 'edit'} // 수정 시 이메일 고정
        />
        <TextField
          label="비밀번호"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required={mode === 'create'} // 생성 시 필수
          placeholder={mode === 'edit' ? '변경 시에만 입력하세요' : ''}
        />

        <TextField
          label="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <FormControl>
          <FormLabel>역할</FormLabel>
          <RadioGroup
            row
            value={role}
            onChange={(e) => setRole(Number(e.target.value))}
          >
            <FormControlLabel
              value={SettlementUserRole.ADMIN}
              control={<Radio />}
              label="관리자"
            />
            <FormControlLabel
              value={SettlementUserRole.USER}
              control={<Radio />}
              label="일반사용자"
            />
          </RadioGroup>
        </FormControl>

        <FormControlLabel
          label="활성 여부"
          control={
            <Switch
              checked={status === SettlementUserStatus.ACTIVE}
              onChange={(e) => setStatus(e.target.checked ? 1 : 0)}
            />
          }
        />
      </Box>

      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button onClick={onCancel} sx={{ mr: 2 }}>
          취소
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {mode === 'create' ? '생성' : '수정'}
        </Button>
      </Box>
    </Paper>
  );
};

export default UserForm;
