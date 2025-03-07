import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';

import ContractForm, { ContractFormValues } from '../components/ContractForm';
import { useCreateContract } from '../hooks/useCreateContract';
import Loader from '../../core/components/Loader';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';

const ContractCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const createMutation = useCreateContract();

  const handleSubmit = (values: ContractFormValues) => {
    createMutation.mutate(values, {
      onSuccess: (data) => {
        snackbar.success('계약이 성공적으로 생성되었습니다.');
        navigate(`/admin/contracts/${data.contractId}`);
      },
      onError: (err: any) => {
        console.error(err);
        snackbar.error('계약 생성 중 오류가 발생했습니다.');
      },
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <AdminAppBar>
        <AdminToolbar title="계약 생성" />
      </AdminAppBar>

      {createMutation.isLoading && <Loader />}

      <ContractForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </>
  );
};

export default ContractCreatePage;
