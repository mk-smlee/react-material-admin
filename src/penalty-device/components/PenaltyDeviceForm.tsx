import React from 'react';
import { Box, TextField, Button, Paper, Autocomplete } from '@material-ui/core';
import {
  CreatePenaltyDevicePayload,
  PenaltyDevice,
  PENALTY_DEVICE_FIELD_LABELS,
} from '../types/penalty-device';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';
import { useContractsForDropdown } from '../../contracts/hooks/useContractsForDropdown';
import IntegerTextField from '../../core/components/IntegerTextField';
import PercentageTextField from '../../core/components/PercentageTextField';

export interface PenaltyDeviceFormProps {
  mode: 'create' | 'edit';
  initialValues?: Partial<PenaltyDevice>;
  onSubmit: (values: CreatePenaltyDevicePayload) => void;
  onCancel: () => void;
}

const PenaltyDeviceForm: React.FC<PenaltyDeviceFormProps> = ({
  mode,
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const snackbar = useSnackbar();
  const { data: contracts } = useContractsForDropdown();

  // mode가 'create'일 때는 contractId를 선택 가능, 'edit'면 잠금
  const [contractId, setContractId] = React.useState(
    initialValues?.contractId || '',
  );
  const [windowCount, setWindowCount] = React.useState<number | undefined>(
    initialValues?.windowCount,
  );
  const [androidCount, setAndroidCount] = React.useState<number | undefined>(
    initialValues?.androidCount,
  );
  const [posCount, setPosCount] = React.useState<number | undefined>(
    initialValues?.posCount,
  );
  const [contractAmount, setContractAmount] = React.useState<
    number | undefined
  >(initialValues?.contractAmount);
  const [monthlyPenaltyRate, setMonthlyPenaltyRate] = React.useState<
    number | undefined
  >(initialValues?.monthlyPenaltyRate);
  const [remarks, setRemarks] = React.useState(initialValues?.remarks || '');

  const selectedContract = React.useMemo(
    () => contracts?.find((c) => c.contractId === contractId) ?? null,
    [contracts, contractId],
  );

  const handleSubmit = () => {
    // 필수값 검증
    if (mode === 'create' && !contractId) {
      return snackbar.error('계약(가맹점)을 선택해주세요.');
    }
    if (
      windowCount === undefined ||
      androidCount === undefined ||
      posCount === undefined ||
      contractAmount === undefined ||
      monthlyPenaltyRate === undefined
    ) {
      return snackbar.error('필수 항목이 누락되었습니다.');
    }

    const payload: CreatePenaltyDevicePayload = {
      contractId,
      windowCount,
      androidCount,
      posCount,
      contractAmount,
      monthlyPenaltyRate,
      remarks,
    };

    onSubmit(payload);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
        {/* 계약(가맹점명) 선택 or 표시 */}
        {mode === 'edit' ? (
          // 수정 모드에서는 contractName만 출력하도록
          <TextField
            variant="outlined"
            value={initialValues?.contract?.contractMerchantName || ''}
            label={PENALTY_DEVICE_FIELD_LABELS.contractMerchantName}
            disabled
            fullWidth
          />
        ) : (
          <Autocomplete
            disablePortal
            autoHighlight
            options={contracts || []}
            getOptionLabel={(option) =>
              `${option.contractMerchantName} (${option.mid})`
            }
            value={selectedContract}
            onChange={(_, newValue) => {
              setContractId(newValue?.contractId ?? '');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder={PENALTY_DEVICE_FIELD_LABELS.contractMerchantName}
                label={PENALTY_DEVICE_FIELD_LABELS.contractMerchantName}
              />
            )}
            PaperComponent={(paperProps) => (
              <Paper
                {...paperProps}
                elevation={4}
                style={{
                  border: '1px solid #ccc',
                  boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                }}
              />
            )}
          />
        )}

        <TextField
          label={selectedContract?.mid ?? PENALTY_DEVICE_FIELD_LABELS.mid}
          variant="outlined"
          value={selectedContract?.mid}
          disabled
        />

        <IntegerTextField
          label={PENALTY_DEVICE_FIELD_LABELS.windowCount}
          value={windowCount}
          onChange={(val) => setWindowCount(val)}
          required
        />
        <IntegerTextField
          label={PENALTY_DEVICE_FIELD_LABELS.androidCount}
          value={androidCount}
          onChange={(val) => setAndroidCount(val)}
          required
        />
        <IntegerTextField
          label={PENALTY_DEVICE_FIELD_LABELS.posCount}
          value={posCount}
          onChange={(val) => setPosCount(val)}
          required
        />
        <IntegerTextField
          label={PENALTY_DEVICE_FIELD_LABELS.contractAmount}
          value={contractAmount}
          onChange={(val) => setContractAmount(val)}
          required
        />
        <PercentageTextField
          label={PENALTY_DEVICE_FIELD_LABELS.monthlyPenaltyRate}
          value={monthlyPenaltyRate}
          onChange={(val) => setMonthlyPenaltyRate(val)}
          decimalPlaces={4}
          required
        />
        <TextField
          label={PENALTY_DEVICE_FIELD_LABELS.remarks}
          multiline
          minRows={3}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
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

export default PenaltyDeviceForm;
