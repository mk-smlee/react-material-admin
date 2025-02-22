import React from 'react';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import { Fab } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";

const PgCompanies = () => {
  return (
    <React.Fragment>
      <AdminAppBar>
        <AdminToolbar title="PG 관리">
          <Fab
            aria-label="PG 추가"
            color="primary"
            // disabled={processing}
            // onClick={() => handleOpenUserDialog()}
            size="small"
          >
            <AddIcon />
          </Fab>
        </AdminToolbar>
      </AdminAppBar>
      PG List
    </React.Fragment>
  );
};

export default PgCompanies;
