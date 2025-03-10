import React from 'react';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useNavigate } from 'react-router-dom';
import PenaltySalesTable from '../components/PenaltySalesTable';
import { usePenaltySales } from '../hooks/usePenaltySales';

const PenaltySalesPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: penaltySales, isLoading } = usePenaltySales();

  const handleAddPenaltySales = () => {
    navigate('/admin/penalty-sales/create');
  };

  return (
    <>
      <AdminAppBar>
        <AdminToolbar title="매출 약정 관리">
          <Fab
            aria-label="매출 약정 추가"
            color="primary"
            disabled={isLoading}
            size="small"
            onClick={handleAddPenaltySales}
          >
            <AddIcon />
          </Fab>
        </AdminToolbar>
      </AdminAppBar>
      <PenaltySalesTable penaltySales={penaltySales} processing={isLoading} />
    </>
  );
};

export default PenaltySalesPage;
