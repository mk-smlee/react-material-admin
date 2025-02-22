import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";
import AdminAppBar from "../../admin/components/AdminAppBar";
import AdminToolbar from "../../admin/components/AdminToolbar";
import ConfirmDialog from "../../core/components/ConfirmDialog";
import SelectToolbar from "../../core/components/SelectToolbar";
import { useSnackbar } from "../../core/contexts/SnackbarProvider";
import UserDialog from "../components/UserDialog";
import UserTable from "../components/UserTable";
import { useAddUser } from "../hooks/useAddUser";
import { useDeleteUsers } from "../hooks/useDeleteUsers";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useUsers } from "../hooks/useUsers";
import { User } from "../types/user";

const UserManagement = () => {
  const snackbar = useSnackbar();

  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [userDeleted, setUserDeleted] = useState<string[]>([]);
  const [userUpdated, setUserUpdated] = useState<User | undefined>(undefined);

  const { addUser, isAdding } = useAddUser();
  const { deleteUsers, isDeleting } = useDeleteUsers();
  const { isUpdating, updateUser } = useUpdateUser();
  const { data } = useUsers();

  const processing = isAdding || isDeleting || isUpdating;

  const handleAddUser = async (user: Partial<User>) => {
    addUser(user as User)
      .then(() => {
        snackbar.success(`${user.firstName} ${user.lastName}님이 추가되었습니다.`);
        setOpenUserDialog(false);
      })
      .catch(() => {
        snackbar.error("문제가 발생했습니다. 다시 시도해주세요.");
      });
  };

  const handleDeleteUsers = async () => {
    deleteUsers(userDeleted)
      .then(() => {
        snackbar.success("사용자가 삭제되었습니다.");
        setSelected([]);
        setUserDeleted([]);
        setOpenConfirmDeleteDialog(false);
      })
      .catch(() => {
        snackbar.error("문제가 발생했습니다. 다시 시도해주세요.");
      });
  };

  const handleUpdateUser = async (user: User) => {
    updateUser(user)
      .then(() => {
        snackbar.success(`${user.firstName} ${user.lastName}님의 정보가 업데이트되었습니다.`);
        setOpenUserDialog(false);
      })
      .catch(() => {
        snackbar.error("문제가 발생했습니다. 다시 시도해주세요.");
      });
  };

  const handleCancelSelected = () => {
    setSelected([]);
  };

  const handleCloseConfirmDeleteDialog = () => {
    setOpenConfirmDeleteDialog(false);
  };

  const handleCloseUserDialog = () => {
    setUserUpdated(undefined);
    setOpenUserDialog(false);
  };

  const handleOpenConfirmDeleteDialog = (userIds: string[]) => {
    setUserDeleted(userIds);
    setOpenConfirmDeleteDialog(true);
  };

  const handleOpenUserDialog = (user?: User) => {
    setUserUpdated(user);
    setOpenUserDialog(true);
  };

  const handleSelectedChange = (newSelected: string[]) => {
    setSelected(newSelected);
  };

  return (
    <React.Fragment>
      <AdminAppBar>
        {!selected.length ? (
          <AdminToolbar title="사용자 관리">
            <Fab
              aria-label="사용자 추가"
              color="primary"
              disabled={processing}
              onClick={() => handleOpenUserDialog()}
              size="small"
            >
              <AddIcon />
            </Fab>
          </AdminToolbar>
        ) : (
          <SelectToolbar
            processing={processing}
            onCancel={handleCancelSelected}
            onDelete={handleOpenConfirmDeleteDialog}
            selected={selected}
          />
        )}
      </AdminAppBar>
      <UserTable
        processing={processing}
        onDelete={handleOpenConfirmDeleteDialog}
        onEdit={handleOpenUserDialog}
        onSelectedChange={handleSelectedChange}
        selected={selected}
        users={data}
      />
      <ConfirmDialog
        description="정말 이 사용자를 삭제하시겠습니까?"
        pending={processing}
        onClose={handleCloseConfirmDeleteDialog}
        onConfirm={handleDeleteUsers}
        open={openConfirmDeleteDialog}
        title="확인"
      />
      {openUserDialog && (
        <UserDialog
          onAdd={handleAddUser}
          onClose={handleCloseUserDialog}
          onUpdate={handleUpdateUser}
          open={openUserDialog}
          processing={processing}
          user={userUpdated}
        />
      )}
    </React.Fragment>
  );
};

export default UserManagement;
