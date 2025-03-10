import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import PenaltyDeviceForm from '../components/PenaltyDeviceForm';
import Loader from '../../core/components/Loader';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';
import { usePenaltyDeviceById } from '../hooks/usePenaltyDeviceById';
import { useUpdatePenaltyDevice } from '../hooks/useUpdatePenaltyDevice';
import { UpdatePenaltyDevicePayload } from '../types/penalty-device';

const PenaltyDeviceEditPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const { data: penaltyDevice, isLoading } = usePenaltyDeviceById(id ?? '');
  const updateMutation = useUpdatePenaltyDevice(id ?? '');

  const handleSubmit = (values: UpdatePenaltyDevicePayload) => {
    if (!id) return;
    updateMutation.mutate(values, {
      onSuccess: (data) => {
        snackbar.success('기기 약정이 성공적으로 수정되었습니다.');
        navigate(`/admin/penalty-device/${data.penaltyDeviceId}`);
      },
      onError: (err: any) => {
        snackbar.error(`기기 약정 수정 중 오류가 발생했습니다. ${err.message || ''}`);
      },
    });
  };

  if (isLoading) return <Loader />;
  if (!penaltyDevice) return <div>기기 약정 정보를 찾을 수 없습니다.</div>;

  return (
    <>
      <AdminAppBar>
        <AdminToolbar title="기기 약정 수정" />
      </AdminAppBar>
      {updateMutation.isLoading && <Loader />}
      <PenaltyDeviceForm
        mode="edit"
        initialValues={penaltyDevice}
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/admin/penalty-device/${penaltyDevice.penaltyDeviceId}`)}
      />
    </>
  );
};

export default PenaltyDeviceEditPage;
