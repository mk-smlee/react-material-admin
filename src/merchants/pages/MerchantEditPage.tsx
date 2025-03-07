import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import MerchantForm from '../components/MerchantForm';
import Loader from '../../core/components/Loader';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';
import { useMerchantById } from '../hooks/useMerchantById';
import { useUpdateMerchant } from '../hooks/useUpdateMerchant';
import { UpdateMerchantPayload } from '../types/merchant';
const MerchantEditPage: React.FC = () => {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { id } = useParams();
  const { data: merchant, isLoading } = useMerchantById(id);
  const updateMutation = useUpdateMerchant(id ?? '');

  const handleSubmit = (values: UpdateMerchantPayload) => {
    updateMutation.mutate(values, {
      onSuccess: (data) => {
        snackbar.success('가맹점이 성공적으로 수정되었습니다.');
        navigate(`/admin/merchants/${data.merchantId}`);
      },
      onError: () => {
        snackbar.error('가맹점 수정 중 오류가 발생했습니다.');
      },
    });
  };

  if (isLoading) return <Loader />;
  if (!merchant) return <div>가맹점 정보를 찾을 수 없습니다.</div>;

  return (
    <>
      <AdminAppBar>
        <AdminToolbar title="가맹점 수정" />
      </AdminAppBar>
      {updateMutation.isLoading && <Loader />}

      <MerchantForm
        mode="edit"
        initialValues={merchant}
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/admin/merchants/${merchant.merchantId}`)}
      />
    </>
  );
};

export default MerchantEditPage;
