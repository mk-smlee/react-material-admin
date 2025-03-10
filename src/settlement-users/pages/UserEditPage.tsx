import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import Loader from '../../core/components/Loader';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';
import UserForm from '../components/UserForm';
import { useUserById } from '../hooks/useUserById';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { UpdateUserPayload } from '../types/user';

const UserEditPage: React.FC = () => {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { id } = useParams();
  const { data: user, isLoading } = useUserById(id);
  const updateMutation = useUpdateUser(id ?? '');

  const handleSubmit = (values: UpdateUserPayload) => {
    const payload = {
      password: values.password,
      name: values.name,
      role: values.role,
      status: values.status,
    };
    updateMutation.mutate(payload, {
      onSuccess: () => {
        snackbar.success('사용자 정보가 성공적으로 수정되었습니다.');
        navigate('/admin/users');
      },
      onError: () => {
        snackbar.error('사용자 수정 중 오류가 발생했습니다.');
      },
    });
  };

  if (isLoading) return <Loader />;
  if (!user) return <div>사용자 정보를 찾을 수 없습니다.</div>;

  return (
    <>
      <AdminAppBar>
        <AdminToolbar title="사용자 수정" />
      </AdminAppBar>

      {updateMutation.isLoading && <Loader />}

      <UserForm
        mode="edit"
        initialValues={user}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/admin/users')}
      />
    </>
  );
};

export default UserEditPage;
