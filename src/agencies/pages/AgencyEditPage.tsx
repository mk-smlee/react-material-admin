// src/agencies/pages/AgencyEditPage.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import Loader from '../../core/components/Loader';
import AgencyForm from '../components/AgencyForm';
import { useAgencyById } from '../hooks/useAgencyById';
import { useUpdateAgency } from '../hooks/useUpdateAgency';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';

const AgencyEditPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { data: agency, isLoading } = useAgencyById(id);
  const updateMutation = useUpdateAgency(id ?? '');

  const handleSubmit = (values: any) => {
    updateMutation.mutate(values, {
      onSuccess: (data) => {
        snackbar.success('대리점이 성공적으로 수정되었습니다.');
        navigate(`/admin/agencies/${data.agencyId}`);
      },
      onError: () => {
        snackbar.error('대리점 수정 중 오류가 발생했습니다.');
      },
    });
  };

  if (isLoading) return <Loader />;
  if (!agency) return <div>대리점 정보를 찾을 수 없습니다.</div>;

  return (
    <>
      <AdminAppBar>
        <AdminToolbar title="대리점 수정" />
      </AdminAppBar>
      {updateMutation.isLoading && <Loader />}
      <AgencyForm
        mode="edit"
        initialValues={agency}
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/admin/agencies/${agency.agencyId}`)}
      />
    </>
  );
};

export default AgencyEditPage;
