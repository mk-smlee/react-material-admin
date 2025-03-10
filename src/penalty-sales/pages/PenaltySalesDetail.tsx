import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Fab, TableBody, TableCell, Table, TableHead, TableRow } from '@material-ui/core';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import Loader from '../../core/components/Loader';
import EditIcon from '@material-ui/icons/Edit';
import { usePenaltySalesById } from '../hooks/usePenaltySalesById';
import { usePenaltySalesLogs } from '../hooks/usePenaltySalesLogs';
import { PENALTY_SALES_FIELD_LABELS } from '../types/penalty-sales';
const PenaltySalesDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: penaltySales, isLoading } = usePenaltySalesById(id);
  const { data: auditLogs, isLoading: logsLoading } = usePenaltySalesLogs(id);

  if (isLoading) return <Loader />;
  if (!penaltySales)
    return <Typography>매출 약정 정보를 불러올 수 없습니다.</Typography>;

  const handleEdit = () => {
    navigate(`/admin/penalty-sales/${id}/edit`);
  };

  return (
    <>
      <AdminAppBar>
        <AdminToolbar title="매출 약정 상세">
          <Fab size="small" color="primary" onClick={handleEdit}>
            <EditIcon />
          </Fab>
        </AdminToolbar>
      </AdminAppBar>

      <Paper sx={{ p: 2 }}>
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          <Box>
            <Typography variant="h6">{PENALTY_SALES_FIELD_LABELS.agencyName}</Typography>
            <Typography variant="body1">
              {penaltySales.agency.agencyName}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">{PENALTY_SALES_FIELD_LABELS.monthlyCommittedSales}</Typography>
            <Typography variant="body1">
              {penaltySales.monthlyCommittedSales.toLocaleString()}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">{PENALTY_SALES_FIELD_LABELS.monthlyPenaltyRate}</Typography>
            <Typography variant="body1">
              {penaltySales.monthlyPenaltyRate}%
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">{PENALTY_SALES_FIELD_LABELS.remarks}</Typography>
            <Typography variant="body1">
              {penaltySales.remarks || '-'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">{PENALTY_SALES_FIELD_LABELS.createdAt}</Typography>
            <Typography variant="body1" color="textSecondary">
              {new Date(penaltySales.createdAt).toLocaleString('ko-KR')}
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
                const label =
                  PENALTY_SALES_FIELD_LABELS[log.fieldName] || log.fieldName;
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

export default PenaltySalesDetail;
