import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import PenaltySalesForm from '../components/PenaltySalesForm';
import { useCreatePenaltySales } from '../hooks/useCreatePenaltySales';
import Loader from '../../core/components/Loader';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';

const PenaltySalesCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const createMutation = useCreatePenaltySales();

  const handleSubmit = (values: any) => {
    createMutation.mutate(values, {
      onSuccess: (data) => {
        snackbar.success('매출 약정이 성공적으로 생성되었습니다.');
        navigate(`/admin/penalty-sales/${data.penaltySalesId}`);
      },
      onError: () => {
        snackbar.error('매출 약정 생성 중 오류가 발생했습니다.');
      },
    });
  };

  return (
    <>
      <AdminAppBar>
        <AdminToolbar title="매출 약정 생성" />
      </AdminAppBar>
      {createMutation.isLoading && <Loader />}
      <PenaltySalesForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    </>
  );
};

export default PenaltySalesCreatePage;
