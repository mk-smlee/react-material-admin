import React from 'react';
import { Box, Typography } from '@material-ui/core';
import CustomDialog from '../../core/components/CustomDialog';

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  pgCompanyName?: string;
  monthToDelete: string;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  pgCompanyName,
  monthToDelete,
}) => {
  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title="삭제 확인"
      confirmButtonText="삭제"
      maxWidth="sm"
    >
      <Typography variant="body1">
        <Box component="span" fontWeight="bold">
          {pgCompanyName}
        </Box>
        사의{' '}
        <Box component="span" fontWeight="bold">
          {monthToDelete}
        </Box>{' '}
        월 정산 데이터를 삭제하시겠습니까?
      </Typography>
      <Box
        sx={{
          mt: 2,
          p: 2,
          bgcolor: '#f8f9fa',
          borderRadius: 1,
          border: '1px solid #e0e0e0',
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, color: '#1976d2', mb: 1 }}
        >
          ※ 이 월의 모든 PG사 정산 데이터가 삭제될 경우, 해당 월의 '정산 기준
          정보'도 함께 삭제됩니다. <br /> 이후 같은 월의 정산 데이터를 다시
          업로드하면 현재 시점의 계약정보와 패널티정보가 새로운 '정산 기준
          정보'로 저장됩니다.
        </Typography>
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          * 삭제 후에는 복구할 수 없습니다.
        </Typography>
      </Box>
    </CustomDialog>
  );
};

export default DeleteConfirmDialog; 