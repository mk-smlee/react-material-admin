import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Box,
  Typography,
  TableContainer,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import {
  SettlementUser,
  SettlementUserStatus,
  SettlementUserRole,
} from '../types/user';
import { Link } from 'react-router-dom';

type Props = {
  users?: SettlementUser[];
  processing: boolean;
};

function UserTable({ users, processing }: Props) {
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
        <TableHead>
          <TableRow sx={{ '& th': { border: 0 } }}>
            <TableCell sx={{ py: 0, pl: '32px' }}>사용자</TableCell>
            <TableCell sx={{ py: 0 }}>이메일</TableCell>
            <TableCell sx={{ py: 0 }}>상태</TableCell>
            <TableCell sx={{ py: 0 }}>역할</TableCell>
            <TableCell sx={{ py: 0 }}>생성일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user) => {
            return (
              <TableRow
                key={user.settlementUserId}
                hover
                tabIndex={-1}
                sx={{ '& td': { bgcolor: 'background.paper', border: 0 } }}
              >
                <TableCell
                  sx={{
                    borderTopLeftRadius: '1rem',
                    borderBottomLeftRadius: '1rem',
                  }}
                >
                  <Link
                    to={`/admin/users/${user.settlementUserId}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Box display="flex" alignItems="center">
                      <Avatar sx={{ mr: 3 }}>
                        <PersonIcon />
                      </Avatar>
                      <Box>
                        <Typography component="div" variant="h4">
                          {user.name}
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.status === SettlementUserStatus.ACTIVE
                    ? '활성'
                    : '비활성'}
                </TableCell>
                <TableCell>
                  {user.role === SettlementUserRole.ADMIN ? '관리자' : '사용자'}
                </TableCell>
                <TableCell
                  sx={{
                    borderTopRightRadius: '1rem',
                    borderBottomRightRadius: '1rem',
                  }}
                >
                  {new Date(user.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserTable;
