import {
  Avatar,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

interface HeadCell {
  id: string;
  label: string;
  align: 'center' | 'left' | 'right';
}

const headCells: HeadCell[] = [
  { id: 'name', align: 'left', label: '정산 날짜' },
];

const EnhancedTableHead = () => {
  return (
    <TableHead>
      <TableRow sx={{ '& th': { border: 0 } }}>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align} sx={{ py: 0 }}>
            {headCell.label}
          </TableCell>
        ))}
        <TableCell align="right" sx={{ py: 0, pr: '28px' }}>
          삭제
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

type distinctMonthProps = {
  isLoading: boolean;
  index: number;
  pgCompanyId: string;
  distinctMonth: string;
  onDeleteClick: (month: string) => void;
};

const DistinctMonthRow = (props: distinctMonthProps) => {
  return (
    <TableRow
      tabIndex={-1}
      key={props.index}
      sx={{ '& td': { bgcolor: 'background.paper', border: 0 } }}
    >
      <TableCell
        sx={{
          borderTopLeftRadius: '1rem',
          borderBottomLeftRadius: '1rem',
        }}
      >
        <Link
          to={`/admin/pg-companies/${props.pgCompanyId}/monthly-settlement/${props.distinctMonth}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ mr: 3 }}>
              <AccountBalanceWalletIcon />
            </Avatar>
            <Box>
              <Typography component="div" variant="h4">
                {props.distinctMonth}
              </Typography>
            </Box>
          </Box>
        </Link>
      </TableCell>
      <TableCell
        align="right"
        sx={{
          borderTopRightRadius: '1rem',
          borderBottomRightRadius: '1rem',
        }}
      >
        <IconButton
          aria-label="삭제"
          onClick={() => props.onDeleteClick(props.distinctMonth)}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

interface DistinctMonthTableProps {
  isLoading: boolean;
  pgCompanyId: string;
  distinctMonths?: string[];
  onDeleteClick: (month: string) => void;
}

const DistinctMonthTable: React.FC<DistinctMonthTableProps> = ({
  isLoading,
  pgCompanyId,
  distinctMonths,
  onDeleteClick,
}) => {
  if (!distinctMonths || distinctMonths.length === 0) {
    return <Typography variant="body1">정산 내역이 없습니다.</Typography>;
  }

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
          {distinctMonths?.map((distinctMonth, index) => (
            <DistinctMonthRow
              key={index}
              index={index}
              isLoading={isLoading}
              pgCompanyId={pgCompanyId}
              distinctMonth={distinctMonth}
              onDeleteClick={onDeleteClick}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DistinctMonthTable;
