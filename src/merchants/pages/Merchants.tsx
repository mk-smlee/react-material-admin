import React from 'react';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useMerchants } from '../hooks/useMerchants';
import MerchantTable from '../components/MerchantTable';
import { useNavigate } from 'react-router-dom';

const MerchantsPage: React.FC = () => {
  const { data: merchants, isLoading } = useMerchants();
  const navigate = useNavigate();

  const handleAddMerchant = () => {
    navigate('/admin/merchants/create');
  };

  return (
    <>
      <AdminAppBar>
        <AdminToolbar title="가맹점 관리">
          <Fab
            aria-label="가맹점 추가"
            color="primary"
            disabled={isLoading}
            size="small"
            onClick={handleAddMerchant}
          >
            <AddIcon />
          </Fab>
        </AdminToolbar>
      </AdminAppBar>
      <MerchantTable merchants={merchants} processing={isLoading} />
    </>
  );
};

export default MerchantsPage;
