
import React from 'react';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useNavigate } from 'react-router-dom';
import AgencyTable from '../components/AgencyTable';
import { useAgencies } from '../hooks/useAgencies';

const AgenciesPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: agencies, isLoading } = useAgencies();

  const handleAddAgency = () => {
    navigate('/admin/agencies/create');
  };

  return (
    <>
      <AdminAppBar>
        <AdminToolbar title="대리점 관리">
          <Fab
            aria-label="대리점 추가"
            color="primary"
            disabled={isLoading}
            size="small"
            onClick={handleAddAgency}
          >
            <AddIcon />
          </Fab>
        </AdminToolbar>
      </AdminAppBar>
      <AgencyTable agencies={agencies} processing={isLoading} />
    </>
  );
};

export default AgenciesPage;
