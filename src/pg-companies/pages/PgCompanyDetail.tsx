import React, { useState, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Typography, TextField, Divider } from '@material-ui/core';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import { useUploadMonthlySettlement } from '../hooks/useUploadMonthlySettlement';
import { usePgCompanyById } from '../hooks/usePgCompanyById';
import {
  IsDirectAgencyPayoutLabels,
  MonthlyExcelFormatLabels,
} from '../types/pgCompany';
import { convertEnumToLabel } from '../../core/utils/enumUtils';
import { useDistinctMonths } from '../hooks/useDistinctMonths';
import DistinctMonthTable from '../components/DistinctMonthTable';
import Loader from '../../core/components/Loader';

const PgCompanyDetail: React.FC = () => {
  const { id } = useParams();
  const { data: pgCompany, isLoading: pgCompanyByIdIsLoading } =
    usePgCompanyById(id);
  const {
    data: distinctMonths,
    isLoading: distinctMonthsIsLoading,
    refetch: distinctMonthsRefetch,
  } = useDistinctMonths(id);
  const uploadMutation = useUploadMonthlySettlement(id);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7),
  );

  const isLoading = pgCompanyByIdIsLoading || distinctMonthsIsLoading;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
  };

  const handleMonthChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedMonth(e.target.value);
  };

  const handleUpload = () => {
    if (!selectedFiles) return;

    const formData = new FormData();

    Array.from(selectedFiles).forEach((file) => {
      formData.append('files', file);
    });
    formData.append('settlementMonth', selectedMonth);

    uploadMutation.mutate(formData, {
      onSuccess: () => {
        distinctMonthsRefetch();
        setSelectedFiles(null);
      },
    });
  };

  return (
    <React.Fragment>
      <AdminAppBar>
        <AdminToolbar title={pgCompany?.pgCompanyName} />
      </AdminAppBar>

      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
        <Box>
          <Typography variant="h6">ID:</Typography>
          <Typography variant="body1" color="textSecondary">
            {pgCompany?.pgCompanyId}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6">이름:</Typography>
          <Typography variant="body1" color="textSecondary">
            {pgCompany?.pgCompanyName}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6">대리점 정산 방식:</Typography>
          <Typography variant="body1" color="textSecondary">
            {convertEnumToLabel(
              IsDirectAgencyPayoutLabels,
              Number(pgCompany?.isDirectAgencyPayout),
            )}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6">월간 정산 포맷:</Typography>
          <Typography variant="body1" color="textSecondary">
            {convertEnumToLabel(
              MonthlyExcelFormatLabels,
              pgCompany?.monthlyExcelFormat || 0,
            )}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} variant="middle" flexItem />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h4">월간 정산 내역</Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            type="month"
            label="정산 월 선택"
            value={selectedMonth}
            onChange={handleMonthChange}
            InputLabelProps={{ shrink: true }}
            className="input input-bordered w-40"
          />

          <input
            type="file"
            accept=".xlsx,.xls"
            multiple
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="upload-excel-file"
          />
          <label htmlFor="upload-excel-file">
            <Button variant="contained" component="span">
              월간정산 엑셀 업로드
            </Button>
          </label>

          {selectedFiles && (
            <Button variant="contained" color="primary" onClick={handleUpload}>
              업로드 시작
            </Button>
          )}
        </Box>
      </Box>

      {uploadMutation.isLoading ? (
        <Loader />
      ) : (
        <DistinctMonthTable
          isLoading={isLoading}
          pgCompanyId={id}
          distinctMonths={distinctMonths}
        />
      )}
    </React.Fragment>
  );
};

export default PgCompanyDetail;
