import React from 'react';
import {
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { PenaltySales, PENALTY_SALES_FIELD_LABELS } from '../types/penalty-sales';
import MoneyOff from '@material-ui/icons/MoneyOff';

interface HeadCell {
  id: keyof PenaltySales;
  label: string;
  align?: 'center' | 'left' | 'right';
}

const headCells: HeadCell[] = [
  { id: 'agency', label: PENALTY_SALES_FIELD_LABELS.agencyName, align: 'left' },
  { id: 'monthlyCommittedSales', label: PENALTY_SALES_FIELD_LABELS.monthlyCommittedSales, align: 'left' },
  { id: 'monthlyPenaltyRate', label: PENALTY_SALES_FIELD_LABELS.monthlyPenaltyRate, align: 'left' },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow sx={{ '& th': { border: 0 } }}>
        {headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sx={{ py: 0, pl: index === 0 ? '32px' : '' }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

type PenaltySalesTableProps = {
  penaltySales?: PenaltySales[];
  processing: boolean;
};

const PenaltySalesTable: React.FC<PenaltySalesTableProps> = ({
  penaltySales,
  processing,
}) => {
  return (
    <TableContainer>
      <Table
        aria-labelledby="tableTitle"
        sx={{
          minWidth: 600,
          borderCollapse: 'separate',
          borderSpacing: '0 1rem',
        }}
      >
        <EnhancedTableHead />
        <TableBody>
          {penaltySales?.map((penaltySales) => (
            <TableRow
              key={penaltySales.penaltySalesId}
              hover
              sx={{ '& td': { bgcolor: 'background.paper', border: 0 } }}
            >
              <TableCell
                sx={{
                  borderTopLeftRadius: '1rem',
                  borderBottomLeftRadius: '1rem',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Link
                    to={`/admin/penalty-sales/${penaltySales.penaltySalesId}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Avatar sx={{ mr: 3 }}>
                      <MoneyOff />
                    </Avatar>
                  </Link>
                  {penaltySales.agency.agencyName}
                </Box>
              </TableCell>
              <TableCell>{penaltySales.monthlyCommittedSales.toLocaleString()}</TableCell>
              <TableCell
                sx={{
                  borderTopRightRadius: '1rem',
                  borderBottomRightRadius: '1rem',
                }}
              >
                {penaltySales.monthlyPenaltyRate}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PenaltySalesTable;
