import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Fab, Paper, Box, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import Loader from '../../core/components/Loader';
import { useUserById } from '../hooks/useUserById';
import { SettlementUserRole, SettlementUserStatus } from '../types/user';

const UserDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: user, isLoading } = useUserById(id);

  if (isLoading) return <Loader />;
  if (!user) {
    return <Typography>사용자 정보를 불러올 수 없습니다.</Typography>;
  }

  const handleEdit = () => {
    navigate(`/admin/users/${user.settlementUserId}/edit`);
  };

  return (
    <>
      <AdminAppBar>
        <AdminToolbar title="사용자 상세">
          <Fab size="small" color="primary" onClick={handleEdit}>
            <EditIcon />
          </Fab>
        </AdminToolbar>
      </AdminAppBar>

      <Paper sx={{ p: 2 }}>
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          <Box>
            <Typography variant="h6">사용자명</Typography>
            <Typography variant="body1">{user.name}</Typography>
          </Box>
          <Box>
            <Typography variant="h6">이메일</Typography>
            <Typography variant="body1">{user.email}</Typography>
          </Box>

          <Box>
            <Typography variant="h6">역할</Typography>
            <Typography variant="body1">
              {user.role === SettlementUserRole.ADMIN
                ? '관리자'
                : '일반사용자'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6">상태</Typography>
            <Typography variant="body1">
              {user.status === SettlementUserStatus.ACTIVE
                ? '활성'
                : '비활성'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6">생성 일시</Typography>
            <Typography variant="body2">
              {new Date(user.createdAt).toLocaleString('ko-KR')}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default UserDetailPage;
