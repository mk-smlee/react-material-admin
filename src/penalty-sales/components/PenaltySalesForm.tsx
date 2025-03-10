import React from 'react';
import { Box, TextField, Button, Paper, Autocomplete } from '@material-ui/core';
import {
  CreatePenaltySalesPayload,
  PenaltySales,
  PENALTY_SALES_FIELD_LABELS,
} from '../types/penalty-sales';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';
import { useAgenciesForDropdown } from '../../agencies/hooks/useAgenciesForDropdown';
import { AgencyDropdownItem } from '../../agencies/types/agency';
import IntegerTextField from '../../core/components/IntegerTextField';
import PercentageTextField from '../../core/components/PercentageTextField';

export interface PenaltySalesFormProps {
  mode: 'create' | 'edit';
  initialValues?: Partial<PenaltySales>;
  onSubmit: (values: CreatePenaltySalesPayload) => void;
  onCancel: () => void;
}

const PenaltySalesForm: React.FC<PenaltySalesFormProps> = ({
  mode,
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const { data: agencies } = useAgenciesForDropdown();
  const snackbar = useSnackbar();

  // create 모드일 때는 agencyId 필드를 입력받고, edit 모드일 때는 제외합니다.
  const [agencyId, setAgencyId] = React.useState(initialValues?.agencyId || '');
  const [monthlyCommittedSales, setMonthlyCommittedSales] = React.useState<
    number | undefined
  >(initialValues?.monthlyCommittedSales);
  const [monthlyPenaltyRate, setMonthlyPenaltyRate] = React.useState<
    number | undefined
  >(initialValues?.monthlyPenaltyRate);
  const [remarks, setRemarks] = React.useState(initialValues?.remarks || '');

  const selectedAgency = React.useMemo(
    () => agencies?.find((ag) => ag.agencyId === agencyId) ?? null,
    [agencies, agencyId],
  );

  const handleSubmit = () => {
    if (mode === 'create' && !agencyId) {
      return snackbar.error('모든 필수 항목을 입력해주세요.');
    }
    if (
      monthlyCommittedSales === undefined ||
      monthlyPenaltyRate === undefined
    ) {
      return snackbar.error('모든 필수 항목을 입력해주세요.');
    }

    // create 모드: agencyId 포함, edit 모드: agencyId 제외
    const payload = {
      agencyId,
      monthlyCommittedSales,
      monthlyPenaltyRate,
      remarks,
    };

    onSubmit(payload);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
        {mode === 'edit' ? (
          <TextField
            variant="outlined"
            value={initialValues?.agency?.agencyName}
            disabled
            fullWidth
          />
        ) : (
          <Autocomplete
            disablePortal
            autoHighlight
            freeSolo={false}
            options={agencies || []}
            placeholder={PENALTY_SALES_FIELD_LABELS.agencyName}
            getOptionLabel={(option: AgencyDropdownItem) => option.agencyName}
            value={selectedAgency}
            onChange={(_, newValue) => {
              setAgencyId(newValue?.agencyId ?? '');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder={PENALTY_SALES_FIELD_LABELS.agencyName}
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

        <IntegerTextField
          label={PENALTY_SALES_FIELD_LABELS.monthlyCommittedSales}
          value={monthlyCommittedSales}
          onChange={(value) => setMonthlyCommittedSales(value)}
          required
        />
        <PercentageTextField
          label={PENALTY_SALES_FIELD_LABELS.monthlyPenaltyRate}
          value={monthlyPenaltyRate}
          onChange={(value) => setMonthlyPenaltyRate(value)}
          decimalPlaces={4}
          required
        />
        <TextField
          label={PENALTY_SALES_FIELD_LABELS.remarks}
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

export default PenaltySalesForm;
