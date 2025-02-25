// settlements/pages/PenaltySales.tsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  Stack,
  TableContainer,
} from '@material-ui/core';
import { usePenaltySales } from '../hooks/usePenaltySales';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import { headerCellType } from '../../core/types';
import penaltySalesRow from '../components/penaltySalesRow';

const PenaltySalesPage: React.FC = () => {
  const [yearMonth, setYearMonth] = useState(
    new Date().toISOString().slice(0, 7),
  );
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7),
  );
  const { data: penaltySalesData, isLoading } = usePenaltySales(selectedMonth);

  const handleSearch = () => {
    setSelectedMonth(yearMonth);
  };

  const headerCells: headerCellType[] = [
    { id: 'agency', label: '대리점 (약정)', align: 'center' },
    { id: 'merchant', label: '가맹점명', align: 'center' },
    { id: 'mid', label: 'MID', align: 'center' },
    { id: 'pgCompanyName', label: 'PG사명', align: 'center' },
    { id: 'grade', label: '등급', align: 'center' },
    { id: 'monthlySales', label: '월매출', align: 'center' },
  ];

  return (
    <React.Fragment>
      <AdminAppBar>
        <AdminToolbar title="매출 약정 패널티">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              type="month"
              label="정산 월 선택"
              value={yearMonth}
              onChange={(e) => setYearMonth(e.target.value)}
              InputLabelProps={{ shrink: true }}
              className="input input-bordered w-40"
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
              조회
            </Button>
          </Box>
        </AdminToolbar>
      </AdminAppBar>

      <Box>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: 'calc(100vh - 220px)', overflow: 'auto' }}
        >
          <Table stickyHeader>
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
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    로딩 중...
                  </TableCell>
                </TableRow>
              ) : penaltySalesData && penaltySalesData.length > 0 ? (
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
