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
import { usePenaltyDevice } from '../hooks/usePenaltyDevice';
import { headerCellType } from '../../core/types';
import penaltyDeviceRow from '../components/penaltyDeviceRow';
import { useSettlementContext } from '../../settlements/contexts/SettlementContext';

/**
 * 기기약정 패널티 페이지
 * - 대리점 기준, 10개 컬럼
 */
const PenaltyDevicePage = () => {
  // SettlementContext에서 selectedMonth 가져오기
  const { selectedMonth } = useSettlementContext();
  const { data: devicePenaltyData } = usePenaltyDevice(selectedMonth);

  // 요구사항에 따른 10개 헤더
  const headerCells: headerCellType[] = [
    { id: 'agency', label: '대리점', align: 'center' },
    { id: 'merchant', label: '가맹점', align: 'center' },
    { id: 'mid', label: 'MID', align: 'center' },
    { id: 'grade', label: '영중소', align: 'center' },
    { id: 'windowCount', label: '윈도우', align: 'center' },
    { id: 'androidCount', label: '안드로이드', align: 'center' },
    { id: 'posCount', label: 'POS', align: 'center' },
    { id: 'contractAmount', label: '약정금액', align: 'center' },
    { id: 'monthlySales', label: '월매출', align: 'center' },
    { id: 'remarks', label: '비고', align: 'center' },
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
                    }}
                  >
                    {cell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {devicePenaltyData && devicePenaltyData.length > 0 ? (
                devicePenaltyData.map((agency) => penaltyDeviceRow(agency))
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

export default PenaltyDevicePage;
