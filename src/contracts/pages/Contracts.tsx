import React from 'react';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useContracts } from '../hooks/useContracts';
import ContractTable from '../components/ContractTable';
import { useNavigate } from 'react-router-dom';

const ContractsPage: React.FC = () => {
  const { isLoading, data } = useContracts();
  const navigate = useNavigate();

  // 계약 추가 버튼
  const handleAddContract = () => {
    navigate('/admin/contracts/create');
  };

  return (
    <React.Fragment>
      <AdminAppBar>
        <AdminToolbar title="계약 관리">
          <Fab
            aria-label="계약 추가"
            color="primary"
            disabled={isLoading}
            size="small"
            onClick={handleAddContract}
          >
            <AddIcon />
          </Fab>
        </AdminToolbar>
      </AdminAppBar>
      <ContractTable processing={isLoading} contracts={data} />
    </React.Fragment>
  );
};

export default ContractsPage;
