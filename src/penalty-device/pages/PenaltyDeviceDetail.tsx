import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Fab, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import Loader from '../../core/components/Loader';
import EditIcon from '@material-ui/icons/Edit';
import { usePenaltyDeviceById } from '../hooks/usePenaltyDeviceById';
import { usePenaltyDeviceLogs } from '../hooks/usePenaltyDeviceLogs';
import { PENALTY_DEVICE_FIELD_LABELS } from '../types/penalty-device';

const PenaltyDeviceDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: penaltyDevice, isLoading } = usePenaltyDeviceById(id ?? '');
  const { data: auditLogs, isLoading: logsLoading } = usePenaltyDeviceLogs(id);

  const handleEdit = () => {
    if (!id) return;
    navigate(`/admin/penalty-device/${id}/edit`);
  };

  if (isLoading) return <Loader />;
  if (!penaltyDevice)
    return <Typography>기기 약정 정보를 불러올 수 없습니다.</Typography>;

  return (
    <>
      <AdminAppBar>
        <AdminToolbar title="기기 약정 상세">
          <Fab size="small" color="primary" onClick={handleEdit}>
            <EditIcon />
          </Fab>
        </AdminToolbar>
      </AdminAppBar>

      <Paper sx={{ p: 2 }}>
        {/* 상세 정보 */}
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          <Box>
            <Typography variant="h6">{PENALTY_DEVICE_FIELD_LABELS.contractMerchantName}</Typography>
            <Typography variant="body1">
              {penaltyDevice.contract?.contractMerchantName}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">{PENALTY_DEVICE_FIELD_LABELS.mid}</Typography>
            <Typography variant="body1">
              {penaltyDevice.contract?.mid}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">{PENALTY_DEVICE_FIELD_LABELS.windowCount}</Typography>
            <Typography variant="body1">
              {penaltyDevice.windowCount}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">{PENALTY_DEVICE_FIELD_LABELS.androidCount}</Typography>
            <Typography variant="body1">
              {penaltyDevice.androidCount}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">{PENALTY_DEVICE_FIELD_LABELS.posCount}</Typography>
            <Typography variant="body1">
              {penaltyDevice.posCount}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">{PENALTY_DEVICE_FIELD_LABELS.contractAmount}</Typography>
            <Typography variant="body1">
              {penaltyDevice.contractAmount.toLocaleString()}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">{PENALTY_DEVICE_FIELD_LABELS.monthlyPenaltyRate}</Typography>
            <Typography variant="body1">
              {penaltyDevice.monthlyPenaltyRate}%
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">{PENALTY_DEVICE_FIELD_LABELS.remarks}</Typography>
            <Typography variant="body1">
              {penaltyDevice.remarks || '-'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">{PENALTY_DEVICE_FIELD_LABELS.createdAt}</Typography>
            <Typography variant="body1" color="textSecondary">
              {new Date(penaltyDevice.createdAt).toLocaleString('ko-KR')}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* 수정 이력 표시 */}
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h5" gutterBottom>
          수정 이력
        </Typography>
        {logsLoading ? (
          <Loader />
        ) : auditLogs && auditLogs.length > 0 ? (
          <Table size="small" sx={{ mt: 2 }}>
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
                // 백엔드 AuditLogResponse에서 fieldName이 어떤 문자열인지에 따라 매칭
                const label = PENALTY_DEVICE_FIELD_LABELS[log.fieldName] || log.fieldName;
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

export default PenaltyDeviceDetail;
