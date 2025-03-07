import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import { Box, Divider, Fab, Paper, TableCell, Table, TableHead, TableRow, Typography, TableBody } from '@material-ui/core';
import Loader from '../../core/components/Loader';
import { useContractById } from '../hooks/useContractById';
import EditIcon from '@material-ui/icons/Edit';
import { useContractLogs } from '../hooks/useContractLogs';

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
            <Typography variant="h6">PG사</Typography>
            <Typography variant="body1" color="textSecondary">
              {contract.pgCompanyName}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">대리점</Typography>
            <Typography variant="body1" color="textSecondary">
              {contract.agencyName}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">가맹점</Typography>
            <Typography variant="body1" color="textSecondary">
              {contract.merchantName}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">사업자번호:</Typography>
            <Typography variant="body1" color="textSecondary">
              {contract.businessNumber}
            </Typography>
          </Box>

          <Divider sx={{ my: 2, gridColumn: '1 / -1' }} />

          <Box>
            <Typography variant="h6">계약 가맹점 상호:</Typography>
            <Typography variant="body1" color="textSecondary">
              {contract.contractMerchantName}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6">MID:</Typography>
            <Typography variant="body1" color="textSecondary">
              {contract.mid}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6">계약일(체결일):</Typography>
            <Typography variant="body1" color="textSecondary">
              {new Date(contract.contractDate).toLocaleDateString('ko-KR')}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6">영중소 등급:</Typography>
            <Typography variant="body1" color="textSecondary">
              {contract.smeGrade || '-'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6">계약 유형:</Typography>
            <Typography variant="body1" color="textSecondary">
              {contract.contractType || '-'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6">특이사항:</Typography>
            <Typography variant="body1" color="textSecondary">
              {contract.specialNote || '-'}
            </Typography>
          </Box>

          <Divider sx={{ my: 2, gridColumn: '1 / -1' }} />

          <Box>
            <Typography variant="h6">판매 수수료율:</Typography>
            <Typography variant="body1" color="textSecondary">
              {contract.salesCommissionRate !== undefined
                ? `${contract.salesCommissionRate.toFixed(2)}%`
                : '-'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">PG 원가:</Typography>
            <Typography variant="body1" color="textSecondary">
              {contract.pgCommissionRate !== undefined
                ? `${contract.pgCommissionRate.toFixed(2)}%`
                : '-'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">대리점 수수료:</Typography>
            <Typography variant="body1" color="textSecondary">
              {contract.agencyCommissionRate !== undefined
                ? `${contract.agencyCommissionRate.toFixed(2)}%`
                : '-'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">PG 제외 정산 값:</Typography>
            <Typography variant="body1" color="textSecondary">
              {contract.excludePgCommissionRate !== undefined
                ? `${contract.excludePgCommissionRate.toFixed(2)}%`
                : '-'}
            </Typography>
          </Box>

          <Divider sx={{ my: 2, gridColumn: '1 / -1' }} />

          <Box>
            <Typography variant="h6">생성 일시:</Typography>
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
              {auditLogs.map((log) => (
                <TableRow key={log.auditLogId}>
                  <TableCell>{log.fieldName}</TableCell>
                  <TableCell>{log.oldValue}</TableCell>
                  <TableCell>{log.newValue}</TableCell>
                  <TableCell>{log.changedBy}</TableCell>
                  <TableCell>
                    {new Date(log.changedAt).toLocaleString('ko-KR')}
                  </TableCell>
                </TableRow>
              ))}
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
