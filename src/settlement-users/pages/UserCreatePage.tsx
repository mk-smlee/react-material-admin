import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import Loader from '../../core/components/Loader';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';
import UserForm from '../components/UserForm';
import { useCreateUser } from '../hooks/useCreateUser';

const UserCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const createMutation = useCreateUser();

  const handleSubmit = (values: any) => {
    createMutation.mutate(values, {
      onSuccess: (data) => {
        snackbar.success('사용자가 성공적으로 생성되었습니다.');
        navigate(`/admin/users`); // 생성 후 목록 or 상세로 이동
      },
      onError: () => {
        snackbar.error('사용자 생성 중 오류가 발생했습니다.');
      },
    });
  };

  return (
    <>
      <AdminAppBar>
        <AdminToolbar title="사용자 생성" />
      </AdminAppBar>

      {createMutation.isLoading && <Loader />}

      <UserForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    </>
  );
};

export default UserCreatePage;
