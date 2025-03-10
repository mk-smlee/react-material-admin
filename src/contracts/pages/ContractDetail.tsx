import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import {
  Box,
  Divider,
  Fab,
  Paper,
  TableCell,
  Table,
  TableHead,
  TableRow,
  Typography,
  TableBody,
} from '@material-ui/core';
import Loader from '../../core/components/Loader';
import { useContractById } from '../hooks/useContractById';
import EditIcon from '@material-ui/icons/Edit';
import { useContractLogs } from '../hooks/useContractLogs';
import { CONTRACT_FIELD_LABELS } from '../types/contract';
const ContractDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: contract, isLoading: contractLoading } = useContractById(id);
  const { data: auditLogs, isLoading: logsLoading } = useContractLogs(id);

  if (contractLoading || logsLoading) {
    return <Loader />;
  }

  if (!contract) {
    return <Typography>계약 정보를 불러올 수 없습니다.</Typography>;
  }

  const handleEditContract = () => {
    navigate(`/admin/contracts/${id}/edit`);
  };

  return (
    <React.Fragment>
      <AdminAppBar>
        <AdminToolbar title={`계약 상세`}>
          <Fab
            aria-label="계약 수정"
            color="primary"
            disabled={contractLoading}
            size="small"
            onClick={handleEditContract}
          >
            <EditIcon />
          </Fab>
        </AdminToolbar>
      </AdminAppBar>

      <Paper sx={{ p: 2 }}>
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mt={1}>
          <Box>
            <Typography variant="h6">
              {CONTRACT_FIELD_LABELS.pgCompanyName}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {contract.pgCompanyName}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">
              {CONTRACT_FIELD_LABELS.agencyName}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {contract.agencyName}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">
              {CONTRACT_FIELD_LABELS.merchantName}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {contract.merchantName}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">
              {CONTRACT_FIELD_LABELS.businessNumber}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {contract.businessNumber}
            </Typography>
          </Box>

          <Divider sx={{ my: 2, gridColumn: '1 / -1' }} />

          <Box>
            <Typography variant="h6">
              {CONTRACT_FIELD_LABELS.contractMerchantName}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {contract.contractMerchantName}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6">{CONTRACT_FIELD_LABELS.mid}</Typography>
            <Typography variant="body1" color="textSecondary">
              {contract.mid}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6">
              {CONTRACT_FIELD_LABELS.contractDate}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {new Date(contract.contractDate).toLocaleDateString('ko-KR')}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6">
              {CONTRACT_FIELD_LABELS.smeGrade}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {contract.smeGrade || '-'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6">
              {CONTRACT_FIELD_LABELS.contractType}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {contract.contractType || '-'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6">
              {CONTRACT_FIELD_LABELS.specialNote}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {contract.specialNote || '-'}
            </Typography>
          </Box>

          <Divider sx={{ my: 2, gridColumn: '1 / -1' }} />

          <Box>
            <Typography variant="h6">
              {CONTRACT_FIELD_LABELS.salesCommissionRate}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {contract.salesCommissionRate !== undefined &&
              contract.salesCommissionRate !== null
                ? `${contract.salesCommissionRate?.toFixed(2)}%`
                : '-'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">
              {CONTRACT_FIELD_LABELS.pgCommissionRate}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {contract.pgCommissionRate !== undefined &&
              contract.pgCommissionRate !== null
                ? `${contract.pgCommissionRate?.toFixed(2)}%`
                : '-'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">
              {CONTRACT_FIELD_LABELS.agencyCommissionRate}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {contract.agencyCommissionRate !== undefined &&
              contract.agencyCommissionRate !== null
                ? `${contract.agencyCommissionRate?.toFixed(2)}%`
                : '-'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">
              {CONTRACT_FIELD_LABELS.excludePgCommissionRate}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {contract.excludePgCommissionRate !== undefined &&
              contract.excludePgCommissionRate !== null
                ? `${contract.excludePgCommissionRate?.toFixed(2)}%`
                : '-'}
            </Typography>
          </Box>

          <Divider sx={{ my: 2, gridColumn: '1 / -1' }} />

          <Box>
            <Typography variant="h6">
              {CONTRACT_FIELD_LABELS.createdAt}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {new Date(contract.createdAt).toLocaleString('ko-KR')}
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
                  CONTRACT_FIELD_LABELS[log.fieldName] || log.fieldName;
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
    </React.Fragment>
  );
};

export default ContractDetail;
