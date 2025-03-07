import React from 'react';
import { Box, TextField, Button, Paper } from '@material-ui/core';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';
import { AGENCY_FIELD_LABELS } from '../types/agency';

export interface AgencyFormProps {
  mode: 'create' | 'edit';
  initialValues?: Partial<{ agencyName: string }>;
  onSubmit: (values: { agencyName: string }) => void;
  onCancel: () => void;
}

const AgencyForm: React.FC<AgencyFormProps> = ({
  mode,
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const snackbar = useSnackbar();
  const [agencyName, setAgencyName] = React.useState(
    initialValues?.agencyName || '',
  );

  const handleSubmit = () => {
    if (!agencyName) {
      return snackbar.error(
        `${AGENCY_FIELD_LABELS.agencyName}을 입력해주세요.`,
      );
    }
    onSubmit({ agencyName });
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box display="grid" gridTemplateColumns="1fr" gap={2}>
        <TextField
          label={AGENCY_FIELD_LABELS.agencyName}
          value={agencyName}
          onChange={(e) => setAgencyName(e.target.value)}
          required
        />
      </Box>
      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button onClick={onCancel}>취소</Button>
        <Button variant="contained" sx={{ ml: 2 }} onClick={handleSubmit}>
          {mode === 'create' ? '생성' : '수정'}
        </Button>
      </Box>
    </Paper>
  );
};

export default AgencyForm;
