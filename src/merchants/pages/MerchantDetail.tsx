import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import {
  Box,
  Paper,
  Typography,
  Fab,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from '@material-ui/core';
import { useMerchantById } from '../hooks/useMerchantById';
import Loader from '../../core/components/Loader';
import EditIcon from '@material-ui/icons/Edit';
import { useMerchantLogs } from '../hooks/useMerchantLogs';
import { MERCHANT_FIELD_LABELS } from '../types/merchant';

const MerchantDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: merchant, isLoading } = useMerchantById(id);
  const { data: auditLogs, isLoading: logsLoading } = useMerchantLogs(id);

  if (isLoading || logsLoading) return <Loader />;

  if (!merchant)
    return <Typography>가맹점 정보를 불러올 수 없습니다.</Typography>;

  const handleEdit = () => {
    navigate(`/admin/merchants/${id}/edit`);
  };

  return (
    <>
      <AdminAppBar>
        <AdminToolbar title="가맹점 상세">
          <Fab size="small" color="primary" onClick={handleEdit}>
            <EditIcon />
          </Fab>
        </AdminToolbar>
      </AdminAppBar>

      <Paper sx={{ p: 2 }}>
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          <Box>
            <Typography variant="h6">
              {MERCHANT_FIELD_LABELS.merchantName}
            </Typography>
            <Typography variant="body1">{merchant.merchantName}</Typography>
          </Box>
          <Box>
            <Typography variant="h6">
              {MERCHANT_FIELD_LABELS.businessNumber}
            </Typography>
            <Typography variant="body1">{merchant.businessNumber}</Typography>
          </Box>

          <Box>
            <Typography variant="h6">
              {MERCHANT_FIELD_LABELS.representativeName}
            </Typography>
            <Typography variant="body1">
              {merchant.representativeName || '-'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">
              {MERCHANT_FIELD_LABELS.settlementCycle}
            </Typography>
            <Typography variant="body1">
              +{merchant.settlementCycle || '-'}일
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">
              {MERCHANT_FIELD_LABELS.intakeChannel}
            </Typography>
            <Typography variant="body1">
              {merchant.intakeChannel || '-'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">
              {MERCHANT_FIELD_LABELS.createdAt}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {new Date(merchant.createdAt).toLocaleString('ko-KR')}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* 수정 이력 (Audit logs) */}
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h5" gutterBottom>
          수정 이력
        </Typography>
        {auditLogs && auditLogs.length > 0 ? (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>필드명</TableCell>
                <TableCell>이전 값</TableCell>
                <TableCell>새 값</TableCell>
                <TableCell>변경한 사람</TableCell>
                <TableCell>변경 일시</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {auditLogs.map((log) => {
                const label =
                  MERCHANT_FIELD_LABELS[log.fieldName] || log.fieldName;
                return (
                  <TableRow key={log.auditLogId}>
                    <TableCell>{label}</TableCell>
                    <TableCell>{log.oldValue}</TableCell>
                    <TableCell>{log.newValue}</TableCell>
                    <TableCell>{log.changedByUser.name}</TableCell>
                    <TableCell>
                      {new Date(log.changedAt).toLocaleString('ko-KR')}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <Typography variant="body2">수정 이력이 없습니다.</Typography>
        )}
      </Paper>
    </>
  );
};

export default MerchantDetail;
