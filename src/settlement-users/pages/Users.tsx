import React from 'react';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';
import UserTable from '../components/UserTable';

const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: users, isLoading } = useUsers();

  const handleAddUser = () => {
    navigate('/admin/users/create');
  };

  return (
    <>
      <AdminAppBar>
        <AdminToolbar title="사용자 관리">
          <Fab
            aria-label="사용자 추가"
            color="primary"
            disabled={isLoading}
            size="small"
            onClick={handleAddUser}
          >
            <AddIcon />
          </Fab>
        </AdminToolbar>
      </AdminAppBar>
      <UserTable users={users} processing={isLoading}/>
    </>
  );
};

export default UsersPage;
