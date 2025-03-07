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
import { Agency } from '../../agencies/types/agencies';
import { Merchant } from '../../merchants/types/merchants';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';

import { usePgCompanies } from '../../pg-companies/hooks/usePgCompanies';
import { useAgencies } from '../../agencies/hooks/useAgencies';
import { useMerchants } from '../../merchants/hooks/useMerchants';
import PercentageTextField from './PercentageTextField';

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
 *
 * 상세 페이지 UI처럼 2열 그리드를 사용하고,
 * 구분할 필요가 있는 지점에서 <Divider>로 구획을 나눠 좀 더 시원하게 배치
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
  const { data: agencies } = useAgencies();
  const { data: merchants } = useMerchants();

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
            PG사
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
            대리점
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
              getOptionLabel={(option: Agency) => option.agencyName}
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
            가맹점
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
              getOptionLabel={(option: Merchant) => option.merchantName}
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
            사업자번호
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
            계약 가맹점 상호
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
            MID
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
            계약일
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
            영중소 등급
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
            계약 유형
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
            특이사항
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
            판매 수수료율(%)
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
            PG 원가(%)
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
            대리점 수수료(%)
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
            PG 제외 정산값(%)
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
