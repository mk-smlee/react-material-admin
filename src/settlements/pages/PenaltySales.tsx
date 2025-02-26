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
import { usePenaltySales } from '../hooks/usePenaltySales';
import { headerCellType } from '../../core/types';
import penaltySalesRow from '../components/penaltySalesRow';
import { useSettlementContext } from '../contexts/SettlementContext';

const PenaltySalesPage = () => {
  const settlementContext = useSettlementContext();
  const { selectedMonth } = settlementContext;
  const { data: penaltySalesData } = usePenaltySales(selectedMonth);

  const headerCells: headerCellType[] = [
    { id: 'agency', label: '대리점 (비고)', align: 'center' },
    { id: 'merchant', label: '가맹점명', align: 'center' },
    { id: 'mid', label: 'MID', align: 'center' },
    { id: 'pgCompanyName', label: 'PG사명', align: 'center' },
    { id: 'grade', label: '등급', align: 'center' },
    { id: 'monthlySales', label: '월매출', align: 'center' },
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
                      width: '100px',
                    }}
                  >
                    {cell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {penaltySalesData && penaltySalesData.length > 0 ? (
                penaltySalesData.map((agency) => penaltySalesRow(agency))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
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

export default PenaltySalesPage;
