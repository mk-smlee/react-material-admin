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
import {
  PenaltyDevice,
  PENALTY_DEVICE_FIELD_LABELS,
} from '../types/penalty-device';
import DevicesIcon from '@material-ui/icons/Devices';

interface HeadCell {
  id: keyof PenaltyDevice | 'contractMerchantName' | 'mid';
  label: string;
  align?: 'center' | 'left' | 'right';
}

const headCells: HeadCell[] = [
  {
    id: 'contractMerchantName',
    label: PENALTY_DEVICE_FIELD_LABELS.contractMerchantName,
    align: 'left',
  },
  {
    id: 'mid',
    label: PENALTY_DEVICE_FIELD_LABELS.mid,
    align: 'left',
  },
  {
    id: 'windowCount',
    label: PENALTY_DEVICE_FIELD_LABELS.windowCount,
    align: 'left',
  },
  {
    id: 'androidCount',
    label: PENALTY_DEVICE_FIELD_LABELS.androidCount,
    align: 'left',
  },
  {
    id: 'posCount',
    label: PENALTY_DEVICE_FIELD_LABELS.posCount,
    align: 'left',
  },
  {
    id: 'contractAmount',
    label: PENALTY_DEVICE_FIELD_LABELS.contractAmount,
    align: 'left',
  },
  {
    id: 'monthlyPenaltyRate',
    label: PENALTY_DEVICE_FIELD_LABELS.monthlyPenaltyRate,
    align: 'left',
  },
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

type PenaltyDeviceTableProps = {
  penaltyDevices?: PenaltyDevice[];
  processing: boolean;
};

const PenaltyDeviceTable: React.FC<PenaltyDeviceTableProps> = ({
  penaltyDevices,
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
          {penaltyDevices?.map((row) => (
            <TableRow
              key={row.penaltyDeviceId}
              hover
              sx={{ '& td': { bgcolor: 'background.paper', border: 0 } }}
            >
              {/* 가맹점명 */}
              <TableCell
                sx={{
                  borderTopLeftRadius: '1rem',
                  borderBottomLeftRadius: '1rem',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Link
                    to={`/admin/penalty-device/${row.penaltyDeviceId}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Avatar sx={{ mr: 3 }}>
                      <DevicesIcon />
                    </Avatar>
                  </Link>
                  {row.contract.contractMerchantName}
                </Box>
              </TableCell>
              <TableCell>{row.contract.mid}</TableCell>
              <TableCell>{row.windowCount}</TableCell>
              <TableCell>{row.androidCount}</TableCell>
              <TableCell>{row.posCount}</TableCell>
              <TableCell>{row.contractAmount.toLocaleString()}</TableCell>
              <TableCell
                sx={{
                  borderTopRightRadius: '1rem',
                  borderBottomRightRadius: '1rem',
                }}
              >
                {row.monthlyPenaltyRate}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PenaltyDeviceTable;
