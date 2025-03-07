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
import BusinessIcon from '@material-ui/icons/Business';
import { Link } from 'react-router-dom';
import { AgencyListItem, AGENCY_FIELD_LABELS } from '../types/agency';

interface HeadCell {
  id: keyof AgencyListItem;
  label: string;
  align?: 'center' | 'left' | 'right';
}

const headCells: HeadCell[] = [
  { id: 'agencyName', label: AGENCY_FIELD_LABELS.agencyName, align: 'left' },
  { id: 'createdAt', label: AGENCY_FIELD_LABELS.createdAt, align: 'left' },
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



type AgencyTableProps = {
  agencies?: AgencyListItem[];
  processing: boolean;
};

const AgencyTable: React.FC<AgencyTableProps> = ({ agencies, processing }) => {
  const py = '8px';

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
          {agencies?.map((agency) => (
            <TableRow
              key={agency.agencyId}
              hover
              sx={{ '& td': { bgcolor: 'background.paper', border: 0 } }}
            >
              <TableCell
                sx={{
                  borderTopLeftRadius: '1rem',
                  borderBottomLeftRadius: '1rem',
                  py: py,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Link
                    to={`/admin/agencies/${agency.agencyId}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Avatar sx={{ mr: 3 }}>
                      <BusinessIcon />
                    </Avatar>
                  </Link>
                  {agency.agencyName}
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  borderTopRightRadius: '1rem',
                  borderBottomRightRadius: '1rem',
                  py: py,
                }}
              >
                {new Date(agency.createdAt).toLocaleString('ko-KR')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AgencyTable;
