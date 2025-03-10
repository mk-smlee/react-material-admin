import React from 'react';
import { Box, Paper, Typography, IconButton } from '@material-ui/core';
import { Logout as LogoutIcon } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';

import AdminAppBar from '../components/AdminAppBar';
import AdminToolbar from '../components/AdminToolbar';
import Loader from '../../core/components/Loader';
import { useFetchMe } from '../../auth/hooks/useFetchMe';
import { useAuth } from '../../auth/contexts/AuthContext';

const ProfileDetail: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { data: user, isLoading } = useFetchMe();

  if (isLoading) return <Loader />;
  if (!user) return <Typography>유저 정보를 불러올 수 없습니다.</Typography>;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <AdminAppBar>
        <AdminToolbar title="내 프로필">
          {/* 로그아웃 버튼 */}
          <IconButton color="primary" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </AdminToolbar>
      </AdminAppBar>

      <Paper sx={{ p: 2 }}>
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          <Box>
            <Typography variant="h6">이메일</Typography>
            <Typography variant="body1">{user.email}</Typography>
          </Box>
          <Box>
            <Typography variant="h6">이름</Typography>
            <Typography variant="body1">{user.name}</Typography>
          </Box>
          <Box>
            <Typography variant="h6">역할</Typography>
            <Typography variant="body1">
              {user.role === 1 ? '관리자' : '사용자'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">생성일</Typography>
            {user.createdAt ? (
              <Typography variant="body1">
                {new Date(user.createdAt).toLocaleString()}
              </Typography>
            ) : (
              <Typography variant="body1">-</Typography>
            )}
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default ProfileDetail;
