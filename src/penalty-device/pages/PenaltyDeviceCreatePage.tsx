import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import PenaltyDeviceForm from '../components/PenaltyDeviceForm';
import { useCreatePenaltyDevice } from '../hooks/useCreatePenaltyDevice';
import Loader from '../../core/components/Loader';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';

const PenaltyDeviceCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const createMutation = useCreatePenaltyDevice();

  const handleSubmit = (values: any) => {
    createMutation.mutate(values, {
      onSuccess: (data) => {
        snackbar.success('기기 약정이 성공적으로 생성되었습니다.');
        navigate(`/admin/penalty-device/${data.penaltyDeviceId}`);
      },
      onError: (err: any) => {
        snackbar.error(`기기 약정 생성 중 오류가 발생했습니다. ${err.message || ''}`);
      },
    });
  };

  return (
    <>
      <AdminAppBar>
        <AdminToolbar title="기기 약정 생성" />
      </AdminAppBar>
      {createMutation.isLoading && <Loader />}
      <PenaltyDeviceForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    </>
  );
};

export default PenaltyDeviceCreatePage;
