import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import MerchantForm from '../components/MerchantForm';
import { useCreateMerchant } from '../hooks/useCreateMerchant';
import Loader from '../../core/components/Loader';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';

const MerchantCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const createMutation = useCreateMerchant();

  const handleSubmit = (values: any) => {
    createMutation.mutate(values, {
      onSuccess: (data) => {
        snackbar.success('가맹점이 성공적으로 생성되었습니다.');
        navigate(`/admin/merchants/${data.merchantId}`);
      },
      onError: () => {
        snackbar.error('가맹점 생성 중 오류가 발생했습니다.');
      },
    });
  };

  return (
    <>
      <AdminAppBar>
        <AdminToolbar title="가맹점 생성" />
      </AdminAppBar>
      {createMutation.isLoading && <Loader />}

      <MerchantForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    </>
  );
};

export default MerchantCreatePage;
