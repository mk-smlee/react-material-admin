import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';

import ContractForm, { ContractFormValues } from '../components/ContractForm';
import { useUpdateContract } from '../hooks/useUpdateContract';
import { useContractById } from '../hooks/useContractById';
import Loader from '../../core/components/Loader';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';

const ContractEditPage: React.FC = () => {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { id } = useParams();
  const { data: contract, isLoading } = useContractById(id);
  const updateMutation = useUpdateContract(id ?? '');

  const computedInitialValues = React.useMemo(() => {
    if (!contract) return {};
    return {
      pgCompanyId: '',
      pgCompanyName: contract.pgCompanyName,
      agencyId: '',
      agencyName: contract.agencyName,
      merchantId: '',
      merchantName: contract.merchantName,
      businessNumber: contract.businessNumber,
      mid: contract.mid,
      contractMerchantName: contract.contractMerchantName,
      contractDate: contract.contractDate.split('T')[0],
      contractType: contract.contractType,
      specialNote: contract.specialNote,
      smeGrade: contract.smeGrade,
      salesCommissionRate: contract.salesCommissionRate,
      pgCommissionRate: contract.pgCommissionRate,
      agencyCommissionRate: contract.agencyCommissionRate,
      excludePgCommissionRate: contract.excludePgCommissionRate,
    };
  }, [contract]);

  const handleSubmit = (values: ContractFormValues) => {
    updateMutation.mutate(
      {
        // UpdateContractPayload
        contractDate: values.contractDate,
        contractMerchantName: values.contractMerchantName,
        contractType: values.contractType,
        specialNote: values.specialNote,
        smeGrade: values.smeGrade,
        salesCommissionRate: values.salesCommissionRate,
        pgCommissionRate: values.pgCommissionRate,
        agencyCommissionRate: values.agencyCommissionRate,
        excludePgCommissionRate: values.excludePgCommissionRate,
      },
      {
        onSuccess: (data) => {
          snackbar.success('계약이 성공적으로 수정되었습니다.');
          navigate(`/admin/contracts/${id}`);
        },
        onError: (err: any) => {
          console.error(err);
          snackbar.error('계약 수정 중 오류가 발생했습니다.');
        },
      },
    );
  };

  const handleCancel = () => {
    navigate(`/admin/contracts/${id}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!contract) {
    return <div>계약 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <>
      <AdminAppBar>
        <AdminToolbar title="계약 수정" />
      </AdminAppBar>

      {updateMutation.isLoading && <Loader />}

      {/* mode="edit" 전달, initialValues 전달 */}
      <ContractForm
        mode="edit"
        initialValues={computedInitialValues}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </>
  );
};

export default ContractEditPage;
