import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import Loader from '../../core/components/Loader';
import AgencyForm from '../components/AgencyForm';
import { useCreateAgency } from '../hooks/useCreateAgency';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';

const AgencyCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const createMutation = useCreateAgency();

  const handleSubmit = (values: any) => {
    createMutation.mutate(values, {
      onSuccess: (data) => {
        snackbar.success('대리점이 성공적으로 생성되었습니다.');
        navigate(`/admin/agencies/${data.agencyId}`);
      },
      onError: () => {
        snackbar.error('대리점 생성 중 오류가 발생했습니다.');
      },
    });
  };

  return (
    <>
      <AdminAppBar>
        <AdminToolbar title="대리점 생성" />
      </AdminAppBar>
      {createMutation.isLoading && <Loader />}
      <AgencyForm mode="create" onSubmit={handleSubmit} onCancel={() => navigate(-1)} />
    </>
  );
};

export default AgencyCreatePage;
