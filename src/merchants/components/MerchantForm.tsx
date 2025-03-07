import React from 'react';
import { Box, TextField, Button, Paper } from '@material-ui/core';
import { CreateMerchantPayload, MERCHANT_FIELD_LABELS } from '../types/merchant';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';
import IntegerTextField from '../../core/components/IntegerTextField';

// mode="create" | "edit"
export interface MerchantFormProps {
  mode: 'create' | 'edit';
  initialValues?: Partial<CreateMerchantPayload>;
  onSubmit: (values: CreateMerchantPayload) => void;
  onCancel: () => void;
}

const MerchantForm: React.FC<MerchantFormProps> = ({
  mode,
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const snackbar = useSnackbar();
  const [merchantName, setMerchantName] = React.useState(
    initialValues?.merchantName || '',
  );
  const [businessNumber, setBusinessNumber] = React.useState(
    initialValues?.businessNumber || '',
  );
  const [representativeName, setRepresentativeName] = React.useState(
    initialValues?.representativeName || '',
  );
  const [settlementCycle, setSettlementCycle] = React.useState<
    number | undefined
  >(initialValues?.settlementCycle);
  const [intakeChannel, setIntakeChannel] = React.useState<string | undefined>(
    initialValues?.intakeChannel || '',
  );

  const handleSubmit = () => {
    if (
      !merchantName ||
      !businessNumber ||
      !settlementCycle ||
      !intakeChannel ||
      !representativeName
    ) {
      return snackbar.error('모든 필수 항목을 입력해주세요.');
    }
    onSubmit({
      merchantName,
      businessNumber,
      representativeName,
      settlementCycle: settlementCycle ?? 0,
      intakeChannel: intakeChannel ?? '',
    });
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
        <TextField
          label={MERCHANT_FIELD_LABELS.merchantName}
          value={merchantName}
          onChange={(e) => setMerchantName(e.target.value)}
          required
        />
        <TextField
          label={MERCHANT_FIELD_LABELS.businessNumber}
          value={businessNumber}
          onChange={(e) => setBusinessNumber(e.target.value)}
          required
        />
        <TextField
          label={MERCHANT_FIELD_LABELS.representativeName}
          value={representativeName}
          onChange={(e) => setRepresentativeName(e.target.value)}
          required
        />
        <IntegerTextField
          label={MERCHANT_FIELD_LABELS.settlementCycle}
          value={settlementCycle}
          onChange={(value) => setSettlementCycle(value)}
          required
        />
        <TextField
          label={MERCHANT_FIELD_LABELS.intakeChannel}
          value={intakeChannel}
          onChange={(e) => setIntakeChannel(e.target.value)}
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

export default MerchantForm;
