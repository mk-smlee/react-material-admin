import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/core';

import { PgCompany } from '../../pg-companies/types/pgCompany';
import { AgencyDropdownItem } from '../../agencies/types/agency';
import { MerchantsForDropdownItem } from '../../merchants/types/merchant';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';

import { usePgCompanies } from '../../pg-companies/hooks/usePgCompanies';
import { useAgenciesForDropdown } from '../../agencies/hooks/useAgenciesForDropdown';
import { useMerchantsForDropdown } from '../../merchants/hooks/useMerchantsForDropdown';
import PercentageTextField from '../../core/components/PercentageTextField';
import { CONTRACT_FIELD_LABELS } from '../types/contract';
export interface ContractFormValues {
  // 생성/수정 공통
  pgCompanyId: string;
  agencyId: string;
  merchantId: string;

  // 수정 시 읽기 전용 텍스트 표시용
  pgCompanyName?: string;
  agencyName?: string;
  merchantName?: string;

  // 생성/수정 공통
  businessNumber: string;
  mid: string;
  contractMerchantName: string;
  contractDate: string; // YYYY-MM-DD
  contractType?: string;
  specialNote?: string;
  smeGrade?: string;
  salesCommissionRate?: number;
  pgCommissionRate?: number;
  agencyCommissionRate?: number;
  excludePgCommissionRate?: number;
}

export interface ContractFormProps {
  mode: 'create' | 'edit';
  initialValues?: Partial<ContractFormValues>;
  onSubmit: (values: ContractFormValues) => void;
  onCancel: () => void;
}

/**
 * 하나의 폼을 생성/수정 양쪽에서 재사용
 * - create : PG사/대리점/가맹점/사업자번호/MID 등 모두 수정 가능
 * - edit   : PG사/대리점/가맹점/사업자번호/MID는 읽기 전용 텍스트로 표시
 */
const ContractForm: React.FC<ContractFormProps> = ({
  mode,
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const snackbar = useSnackbar();

  // 1) Autocomplete 목록 API
  const { data: pgCompanies } = usePgCompanies();
  const { data: agencies } = useAgenciesForDropdown();
  const { data: merchants } = useMerchantsForDropdown();

  // 2) 폼 state
  const [pgCompanyId, setPgCompanyId] = useState(
    initialValues?.pgCompanyId ?? '',
  );
  const [agencyId, setAgencyId] = useState(initialValues?.agencyId ?? '');
  const [merchantId, setMerchantId] = useState(initialValues?.merchantId ?? '');

  const [pgCompanyName] = useState(initialValues?.pgCompanyName ?? '');
  const [agencyName] = useState(initialValues?.agencyName ?? '');
  const [merchantName] = useState(initialValues?.merchantName ?? '');

  const [businessNumber, setBusinessNumber] = useState(
    initialValues?.businessNumber ?? '',
  );
  const [mid, setMid] = useState(initialValues?.mid ?? '');
  const [contractMerchantName, setContractMerchantName] = useState(
    initialValues?.contractMerchantName ?? '',
  );
  const [contractDate, setContractDate] = useState(
    initialValues?.contractDate ?? '',
  );
  const [contractType, setContractType] = useState(
    initialValues?.contractType ?? '',
  );
  const [specialNote, setSpecialNote] = useState(
    initialValues?.specialNote ?? '',
  );
  const [smeGrade, setSmeGrade] = useState(initialValues?.smeGrade ?? '');
  const [salesCommissionRate, setSalesCommissionRate] = useState<
    number | undefined
  >(initialValues?.salesCommissionRate);
  const [pgCommissionRate, setPgCommissionRate] = useState<number | undefined>(
    initialValues?.pgCommissionRate,
  );
  const [agencyCommissionRate, setAgencyCommissionRate] = useState<
    number | undefined
  >(initialValues?.agencyCommissionRate);
  const [excludePgCommissionRate, setExcludePgCommissionRate] = useState<
    number | undefined
  >(initialValues?.excludePgCommissionRate);

  // 3) 생성 모드에서 가맹점 선택 시, 사업자번호 자동 세팅
  useEffect(() => {
    if (mode === 'edit') return; // 수정 모드에서는 미사용
    if (!merchantId) {
      setBusinessNumber('');
      return;
    }
    const found = merchants?.find((m) => m.merchantId === merchantId);
    if (found) {
      setBusinessNumber(found.businessNumber);
    }
  }, [merchantId, merchants, mode]);

  // 4) Autocomplete로 사용될 현재 선택값(생성 모드에서만 의미)
  const selectedPgCompany = React.useMemo(
    () => pgCompanies?.find((pg) => pg.pgCompanyId === pgCompanyId) ?? null,
    [pgCompanies, pgCompanyId],
  );
  const selectedAgency = React.useMemo(
    () => agencies?.find((ag) => ag.agencyId === agencyId) ?? null,
    [agencies, agencyId],
  );
  const selectedMerchant = React.useMemo(
    () => merchants?.find((mer) => mer.merchantId === merchantId) ?? null,
    [merchants, merchantId],
  );

  // 5) 폼 제출 함수
  const handleSubmit = () => {
    // 필수값 체크
    if (!contractMerchantName || !mid || !contractDate) {
      snackbar.error('필수값을 입력하세요.');
      return;
    }

    // mode가 create일 때 pgCompanyId/agencyId/merchantId가 필수
    if (mode === 'create' && (!pgCompanyId || !agencyId || !merchantId)) {
      snackbar.error('PG사, 대리점, 가맹점은 필수입니다.');
      return;
    }

    onSubmit({
      pgCompanyId,
      pgCompanyName, // edit 모드에서는 백엔드 DTO에 안 쓰여도, 값은 보관
      agencyId,
      agencyName,
      merchantId,
      merchantName,
      businessNumber,
      mid,
      contractMerchantName,
      contractDate,
      contractType,
      specialNote,
      smeGrade,
      salesCommissionRate,
      pgCommissionRate,
      agencyCommissionRate,
      excludePgCommissionRate,
    });
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} sx={{ mt: 1 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {CONTRACT_FIELD_LABELS.pgCompanyName}
          </Typography>
          {mode === 'edit' ? (
            <TextField
              variant="outlined"
              value={pgCompanyName}
              disabled
              fullWidth
            />
          ) : (
            <Autocomplete
              disablePortal
              autoHighlight
              freeSolo={false}
              options={pgCompanies || []}
              getOptionLabel={(option: PgCompany) => option.pgCompanyName}
              value={selectedPgCompany}
              onChange={(_, newValue) => {
                setPgCompanyId(newValue?.pgCompanyId ?? '');
              }}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" />
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
        </Box>

        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {CONTRACT_FIELD_LABELS.agencyName}
          </Typography>
          {mode === 'edit' ? (
            <TextField
              variant="outlined"
              value={agencyName}
              disabled
              fullWidth
            />
          ) : (
            <Autocomplete
              disablePortal
              autoHighlight
              freeSolo={false}
              options={agencies || []}
              getOptionLabel={(option: AgencyDropdownItem) => option.agencyName}
              value={selectedAgency}
              onChange={(_, newValue) => {
                setAgencyId(newValue?.agencyId ?? '');
              }}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" />
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
        </Box>

        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {CONTRACT_FIELD_LABELS.merchantName}
          </Typography>
          {mode === 'edit' ? (
            <TextField
              variant="outlined"
              value={merchantName}
              disabled
              fullWidth
            />
          ) : (
            <Autocomplete
              disablePortal
              autoHighlight
              freeSolo={false}
              options={merchants || []}
              getOptionLabel={(option: MerchantsForDropdownItem) =>
                option.merchantName
              }
              value={selectedMerchant}
              onChange={(_, newValue) => {
                setMerchantId(newValue?.merchantId ?? '');
              }}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" />
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
        </Box>

        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {CONTRACT_FIELD_LABELS.businessNumber}
          </Typography>
          <TextField
            variant="outlined"
            value={businessNumber}
            disabled
            fullWidth
          />
        </Box>

        <Divider sx={{ gridColumn: '1 / -1', my: 2 }} />

        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {CONTRACT_FIELD_LABELS.contractMerchantName}
          </Typography>
          <TextField
            variant="outlined"
            value={contractMerchantName}
            onChange={(e) => setContractMerchantName(e.target.value)}
            fullWidth
          />
        </Box>

        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {CONTRACT_FIELD_LABELS.mid}
          </Typography>
          {mode === 'edit' ? (
            <TextField variant="outlined" value={mid} disabled fullWidth />
          ) : (
            <TextField
              variant="outlined"
              value={mid}
              onChange={(e) => setMid(e.target.value)}
              fullWidth
            />
          )}
        </Box>

        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {CONTRACT_FIELD_LABELS.contractDate}
          </Typography>
          <TextField
            variant="outlined"
            type="date"
            value={contractDate}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setContractDate(e.target.value)}
            fullWidth
          />
        </Box>

        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {CONTRACT_FIELD_LABELS.smeGrade}
          </Typography>
          <TextField
            variant="outlined"
            value={smeGrade}
            onChange={(e) => setSmeGrade(e.target.value)}
            fullWidth
          />
        </Box>

        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {CONTRACT_FIELD_LABELS.contractType}
          </Typography>
          <TextField
            variant="outlined"
            value={contractType}
            onChange={(e) => setContractType(e.target.value)}
            fullWidth
          />
        </Box>

        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {CONTRACT_FIELD_LABELS.specialNote}
          </Typography>
          <TextField
            variant="outlined"
            value={specialNote}
            onChange={(e) => setSpecialNote(e.target.value)}
            multiline
            minRows={3}
            fullWidth
          />
        </Box>

        <Divider sx={{ gridColumn: '1 / -1', my: 2 }} />

        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {CONTRACT_FIELD_LABELS.salesCommissionRate}
          </Typography>
          <PercentageTextField
            label=""
            value={salesCommissionRate}
            onChange={setSalesCommissionRate}
            fullWidth
          />
        </Box>

        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {CONTRACT_FIELD_LABELS.pgCommissionRate}
          </Typography>
          <PercentageTextField
            label=""
            value={pgCommissionRate}
            onChange={setPgCommissionRate}
            fullWidth
          />
        </Box>

        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {CONTRACT_FIELD_LABELS.agencyCommissionRate}
          </Typography>
          <PercentageTextField
            label=""
            value={agencyCommissionRate}
            onChange={setAgencyCommissionRate}
            fullWidth
          />
        </Box>

        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {CONTRACT_FIELD_LABELS.excludePgCommissionRate}
          </Typography>
          <PercentageTextField
            label=""
            value={excludePgCommissionRate}
            onChange={setExcludePgCommissionRate}
            fullWidth
          />
        </Box>
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

export default ContractForm;
