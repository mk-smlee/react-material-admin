import React from 'react';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useNavigate } from 'react-router-dom';
import { usePenaltyDevices } from '../hooks/usePenaltyDevices';
import PenaltyDeviceTable from '../components/PenaltyDeviceTable';

const PenaltyDevicePage: React.FC = () => {
  const navigate = useNavigate();
  const { data: penaltyDevices, isLoading } = usePenaltyDevices();

  const handleAddPenaltyDevice = () => {
    navigate('/admin/penalty-device/create');
  };

  return (
    <>
      <AdminAppBar>
        <AdminToolbar title="기기 약정 관리">
          <Fab
            aria-label="기기 약정 추가"
            color="primary"
            disabled={isLoading}
            size="small"
            onClick={handleAddPenaltyDevice}
          >
            <AddIcon />
          </Fab>
        </AdminToolbar>
      </AdminAppBar>
      <PenaltyDeviceTable penaltyDevices={penaltyDevices} processing={isLoading} />
    </>
  );
};

export default PenaltyDevicePage;
