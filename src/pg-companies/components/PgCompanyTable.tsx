import {
  Avatar,
  Box,
  Checkbox,
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
import { PgCompany } from '../types/pgCompany';
import { useState } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { selectAll, selectOne } from '../../core/utils/selectUtils';
import { Link } from 'react-router-dom';
import CreditCard from '@material-ui/icons/CreditCard';

interface HeadCell {
  id: string;
  label: string;
  align: 'center' | 'left' | 'right';
}

const headCells: HeadCell[] = [
  { id: 'name', align: 'left', label: 'PG사 이름' },
];

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  return (
    <TableHead>
      <TableRow sx={{ '& th': { border: 0 } }}>
        {/* <TableCell sx={{ py: 0 }}>
          <Checkbox
            color="primary"
            indeterminate={
              props.numSelected > 0 && props.numSelected < props.rowCount
            }
            checked={props.rowCount > 0 && props.numSelected === props.rowCount}
            onChange={props.onSelectAllClick}
            inputProps={{ 'aria-label': '모든 사용자 선택' }}
          />
        </TableCell> */}
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
}

type PgCompanyRowProps = {
  index: number;
  onCheck: (id: string) => void;
  processing: boolean;
  selected: boolean;
  pgCompany: PgCompany;
};

const PgCompanyRow = (props: PgCompanyRowProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const labelId = `enhanced-table-checkbox-${props.index}`;
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
      aria-checked={props.selected}
      tabIndex={-1}
      key={props.pgCompany.id}
      selected={props.selected}
      sx={{ '& td': { bgcolor: 'background.paper', border: 0 } }}
    >
      {/* <TableCell
        padding="checkbox"
        sx={{ borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem' }}
      >
        <Checkbox
          color="primary"
          checked={props.selected}
          inputProps={{ 'aria-labelledby': labelId }}
          onClick={() => props.onCheck(props.pgCompany.id)}
        />
      </TableCell> */}

      <TableCell
        sx={{ borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem' }}
      >
        <Link
          to={`/admin/pg-companies/${props.pgCompany.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ mr: 3 }}>
              <CreditCard />
            </Avatar>
            <Box>
              <Typography component="div" variant="h4">
                {props.pgCompany.name}
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
          disabled={props.processing}
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

type PgCompanyTableProps = {
  processing: boolean;
  pgCompanies?: PgCompany[];
  selected: string[];
  onSelectedChange: (selected: string[]) => void;
};

const PgCompanyTable = (props: PgCompanyTableProps) => {
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = selectAll(props.pgCompanies);
      props.onSelectedChange(newSelecteds);
      return;
    }
    props.onSelectedChange([]);
  };

  const handleClick = (id: string) => {
    let newSelected: string[] = selectOne(props.selected, id);
    props.onSelectedChange(newSelected);
  };

  const isSelected = (id: string) => props.selected.indexOf(id) !== -1;

  return (
    <>
      <TableContainer>
        <Table
          aria-labelledby="tableTitle"
          sx={{
            minWidth: 600,
            borderCollapse: 'separate',
            borderSpacing: '0 1rem',
          }}
        >
          <EnhancedTableHead
            numSelected={props.selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={props.pgCompanies?.length || 0}
          />
          <TableBody>
            {props.pgCompanies?.map((pgCompany, index) => (
              <PgCompanyRow
                index={index}
                onCheck={handleClick}
                selected={isSelected(pgCompany.id)}
                key={pgCompany.id}
                processing={props.processing}
                pgCompany={pgCompany}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PgCompanyTable;
