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
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useAgencyById } from '../hooks/useAgencyById';
import { useAgencyLogs } from '../hooks/useAgencyLogs';
import { AGENCY_FIELD_LABELS } from '../types/agency';
import Loader from '../../core/components/Loader';
const AgencyDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: agency, isLoading } = useAgencyById(id);
  const { data: auditLogs, isLoading: logsLoading } = useAgencyLogs(id);

  const handleEdit = () => {
    navigate(`/admin/agencies/${id}/edit`);
  };

  if (isLoading || logsLoading) return <Loader />;
  if (!agency) return <div>대리점 정보를 찾을 수 없습니다.</div>;

  return (
    <>
      <AdminAppBar>
        <AdminToolbar title="대리점 상세">
          <Fab size="small" color="primary" onClick={handleEdit}>
            <EditIcon />
          </Fab>
        </AdminToolbar>
      </AdminAppBar>

      <Paper sx={{ p: 2 }}>
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          <Box>
            <Typography variant="h6">
              {AGENCY_FIELD_LABELS.agencyName}
            </Typography>
            <Typography variant="body1">{agency.agencyName}</Typography>
          </Box>
          <Box>
            <Typography variant="h6">
              {AGENCY_FIELD_LABELS.createdAt}
            </Typography>
            <Typography variant="body1">
              {new Date(agency.createdAt).toLocaleString('ko-KR')}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* 변경 이력 */}
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h5" gutterBottom>
          변경 이력
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
                  AGENCY_FIELD_LABELS[log.fieldName] || log.fieldName;
                return (
                  <TableRow key={log.auditLogId}>
                    <TableCell>{label}</TableCell>
                    <TableCell>{log.oldValue}</TableCell>
                    <TableCell>{log.newValue}</TableCell>
                    <TableCell>{log.changedBy}</TableCell>
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

export default AgencyDetail;
