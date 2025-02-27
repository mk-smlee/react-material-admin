// agency-commission/pages/AgencyCommissionPage.tsx
import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from '@material-ui/core';
import { headerCellType } from '../../core/types'; // 프로젝트 내 공통 type
import agencyCommissionRow from '../components/agencyCommissionRow';
import { useSettlementContext } from '../../settlements/contexts/SettlementContext';
import { useAgencyCommission } from '../hooks/useAgencyCommission';

/**
 * 대리점 수수료 정산 페이지
 */
const AgencyCommissionPage: React.FC = () => {
  const { selectedMonth } = useSettlementContext(); // "YYYY-MM"
  const { data: commissionData, isLoading } = useAgencyCommission(selectedMonth);

  // 테이블 컬럼: MID, 상점명, 등급, 대리점 수수료율, 월 결제액, 대리점 수수료, 대리점 수수료 VAT
  const headerCells: headerCellType[] = [
    { id: 'agencyName', label: '대리점', align: 'center' },
    { id: 'mid', label: 'MID', align: 'center' },
    { id: 'merchantName', label: '상점명', align: 'center' },
    { id: 'grade', label: '등급', align: 'center' },
    { id: 'agencyCommission', label: '대리점 수수료율', align: 'right' },
    { id: 'monthlySales', label: '월 결제액', align: 'right' },
    { id: 'commissionAmount', label: '대리점 수수료', align: 'right' },
    { id: 'commissionVAT', label: '대리점 수수료 VAT', align: 'right' },
  ];

  return (
    <React.Fragment>
      <Box>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: 'calc(100vh - 220px)', overflow: 'auto' }}
        >
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                {headerCells.map((cell) => (
                  <TableCell
                    key={cell.id}
                    align={cell.align || 'center'}
                    sx={{
                      backgroundColor: 'white',
                      fontWeight: 'bold',
                      width: '120px',
                    }}
                  >
                    {cell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={headerCells.length} align="center">
                    로딩 중...
                  </TableCell>
                </TableRow>
              ) : commissionData && commissionData.length > 0 ? (
                commissionData.map((agency) => agencyCommissionRow(agency))
              ) : (
                <TableRow>
                  <TableCell colSpan={headerCells.length} align="center">
                    데이터가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </React.Fragment>
  );
};

export default AgencyCommissionPage;
