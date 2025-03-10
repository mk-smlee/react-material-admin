import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import PenaltySalesForm from '../components/PenaltySalesForm';
import Loader from '../../core/components/Loader';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';
import { usePenaltySalesById } from '../hooks/usePenaltySalesById';
import { useUpdatePenaltySales } from '../hooks/useUpdatePenaltySales';
import { UpdatePenaltySalesPayload } from '../types/penalty-sales';

const PenaltySalesEditPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { data: penaltySales, isLoading } = usePenaltySalesById(id);
  const updateMutation = useUpdatePenaltySales(id ?? '');

  const handleSubmit = (values: UpdatePenaltySalesPayload) => {
    updateMutation.mutate(values, {
      onSuccess: (data) => {
        snackbar.success('매출 약정이 성공적으로 수정되었습니다.');
        navigate(`/admin/penalty-sales/${data.penaltySalesId}`);
      },
      onError: () => {
        snackbar.error('매출 약정 수정 중 오류가 발생했습니다.');
      },
    });
  };

  if (isLoading) return <Loader />;
  if (!penaltySales) return <div>매출 약정 정보를 찾을 수 없습니다.</div>;

  return (
    <>
      <AdminAppBar>
        <AdminToolbar title="매출 약정 수정" />
      </AdminAppBar>
      {updateMutation.isLoading && <Loader />}
      <PenaltySalesForm
        mode="edit"
        initialValues={penaltySales}
        onSubmit={handleSubmit}
        onCancel={() =>
          navigate(`/admin/penalty-sales/${penaltySales.penaltySalesId}`)
        }
      />
    </>
  );
};

export default PenaltySalesEditPage;
