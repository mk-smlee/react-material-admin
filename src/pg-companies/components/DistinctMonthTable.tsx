import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
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
        <TableCell align="right" sx={{ py: 0 }}>
          작업
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
};

const DistinctMonthRow = (props: distinctMonthProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openActions = Boolean(anchorEl);

  const handleOpenActions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseActions = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleCloseActions();
  };

  const handleEdit = () => {
    handleCloseActions();
  };

  return (
    <TableRow
      tabIndex={-1}
      key={props.index}
      sx={{ '& td': { bgcolor: 'background.paper', border: 0 } }}
    >
      <TableCell
        sx={{ borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem' }}
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
        sx={{ borderTopRightRadius: '1rem', borderBottomRightRadius: '1rem' }}
      >
        <IconButton
          id="user-row-menu-button"
          aria-label="사용자 작업"
          aria-controls="user-row-menu"
          aria-haspopup="true"
          aria-expanded={openActions ? 'true' : 'false'}
          disabled={props.isLoading}
          onClick={handleOpenActions}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="user-row-menu"
          anchorEl={anchorEl}
          aria-labelledby="user-row-menu-button"
          open={openActions}
          onClose={handleCloseActions}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>{' '}
            수정
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>{' '}
            삭제
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

interface distinctMonthTableProps {
  isLoading: boolean;
  pgCompanyId: string;
  distinctMonths?: string[];
}

const DistinctMonthTable = (props: distinctMonthTableProps) => {
  if (!props.distinctMonths || props.distinctMonths.length === 0) {
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
          {props.distinctMonths?.map((distinctMonth, index) => (
            <DistinctMonthRow
              key={index}
              index={index}
              isLoading={props.isLoading}
              pgCompanyId={props.pgCompanyId}
              distinctMonth={distinctMonth}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DistinctMonthTable;
