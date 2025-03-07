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
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import StorefrontIcon from '@material-ui/icons/StorefrontTwoTone';
import { MerchantListItem, MERCHANT_FIELD_LABELS } from '../types/merchant';

interface HeadCell {
  id: keyof MerchantListItem;
  label: string;
  align?: 'center' | 'left' | 'right';
}

const headCells: HeadCell[] = [
  { id: 'merchantName', label: MERCHANT_FIELD_LABELS.merchantName, align: 'left' },
  { id: 'businessNumber', label: MERCHANT_FIELD_LABELS.businessNumber, align: 'left' },
  { id: 'createdAt', label: MERCHANT_FIELD_LABELS.createdAt, align: 'left' },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow sx={{ '& th': { border: 0 } }}>
        {headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id as string}
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

type MerchantRowProps = {
  merchant: MerchantListItem;
  processing: boolean;
};

const MerchantRow: React.FC<MerchantRowProps> = ({ merchant, processing }) => {
  const py = '8px';
  return (
    <TableRow
      hover
      tabIndex={-1}
      key={merchant.merchantId}
      sx={{ '& td': { bgcolor: 'background.paper', border: 0 } }}
    >
      <TableCell
        sx={{
          borderTopLeftRadius: '1rem',
          borderBottomLeftRadius: '1rem',
          py,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link
            to={`/admin/merchants/${merchant.merchantId}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Avatar sx={{ mr: 3 }}>
              <StorefrontIcon />
            </Avatar>
          </Link>
          <Typography>{merchant.merchantName}</Typography>
        </Box>
      </TableCell>
      <TableCell sx={{ py }}>{merchant.businessNumber}</TableCell>
      <TableCell
        sx={{
          borderTopRightRadius: '1rem',
          borderBottomRightRadius: '1rem',
          py,
        }}
      >
        {new Date(merchant.createdAt).toLocaleString('ko-KR')}
      </TableCell>
    </TableRow>
  );
};

type MerchantTableProps = {
  merchants?: MerchantListItem[];
  processing: boolean;
};

const MerchantTable: React.FC<MerchantTableProps> = ({ merchants, processing }) => {
  return (
    <TableContainer>
      <Table
        size="small"
        aria-labelledby="tableTitle"
        sx={{
          minWidth: 600,
          borderCollapse: 'separate',
          borderSpacing: '0 0.5rem',
        }}
      >
        <EnhancedTableHead />
        <TableBody>
          {merchants?.map((merchant) => (
            <MerchantRow
              key={merchant.merchantId}
              merchant={merchant}
              processing={processing}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MerchantTable;
