import React, { useState } from 'react';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PgCompanyTable from '../components/PgCompanyTable';
import { usePgCompanies } from '../hooks/usePgCompanies';

const PgCompany = () => {
  // const snackbar = useSnackbar();
  const { isLoading, data } = usePgCompanies();

  const [selected, setSelected] = useState<string[]>([]);
  const handleSelectedChange = (newSelected: string[]) => {
    setSelected(newSelected);
  };

  const processing = isLoading;

  return (
    <React.Fragment>
      <AdminAppBar>
        <AdminToolbar title="PG 관리">
          <Fab
            aria-label="PG 추가"
            color="primary"
            disabled={processing}
            size="small"
          >
            <AddIcon />
          </Fab>
        </AdminToolbar>
      </AdminAppBar>
      <PgCompanyTable
        processing={processing}
        pgCompanies={data}
        selected={selected}
        onSelectedChange={handleSelectedChange}
      />
    </React.Fragment>
  );
};

export default PgCompany;
