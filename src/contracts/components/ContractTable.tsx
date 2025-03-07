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
import AssignmentIcon from '@material-ui/icons/Assignment';
import { ContractListItem, CONTRACT_FIELD_LABELS } from '../types/contract';

interface HeadCell {
  id: keyof ContractListItem;
  label: string;
  align?: 'center' | 'left' | 'right';
}

const headCells: HeadCell[] = [
  { id: 'pgCompanyName', label: CONTRACT_FIELD_LABELS.pgCompanyName, align: 'left' },
  { id: 'agencyName', label: CONTRACT_FIELD_LABELS.agencyName, align: 'left' },
  { id: 'merchantName', label: CONTRACT_FIELD_LABELS.merchantName, align: 'left' },
  { id: 'businessNumber', label: CONTRACT_FIELD_LABELS.businessNumber, align: 'left' },
  { id: 'contractMerchantName', label: CONTRACT_FIELD_LABELS.contractMerchantName, align: 'left' },
  { id: 'mid', label: CONTRACT_FIELD_LABELS.mid, align: 'left' },
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

type ContractRowProps = {
  contract: ContractListItem;
  processing: boolean;
};

const ContractRow: React.FC<ContractRowProps> = ({ contract, processing }) => {
  const py = '8px';
  return (
    <TableRow
      hover
      tabIndex={-1}
      key={contract.contractId}
      sx={{ '& td': { bgcolor: 'background.paper', border: 0 } }}
    >
      <TableCell
        sx={{ borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem', py: py }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link
            to={`/admin/contracts/${contract.contractId}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Avatar sx={{ mr: 3 }}>
              <AssignmentIcon />
            </Avatar>
          </Link>
          {contract.pgCompanyName}
        </Box>
      </TableCell>
      <TableCell sx={{ py: py }}>{contract.agencyName}</TableCell>
      <TableCell sx={{ py: py }}>{contract.merchantName}</TableCell>
      <TableCell sx={{ py: py }}>{contract.businessNumber}</TableCell>
      <TableCell sx={{ py: py }}>{contract.contractMerchantName}</TableCell>
      <TableCell
        sx={{ borderTopRightRadius: '1rem', borderBottomRightRadius: '1rem', py: py }}
      >
        {contract.mid}
      </TableCell>
    </TableRow>
  );
};

type ContractTableProps = {
  processing: boolean;
  contracts?: ContractListItem[];
};

const ContractTable: React.FC<ContractTableProps> = ({
  processing,
  contracts,
}) => {
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
          {contracts?.map((contract) => (
            <ContractRow
              key={contract.contractId}
              contract={contract}
              processing={processing}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContractTable;
