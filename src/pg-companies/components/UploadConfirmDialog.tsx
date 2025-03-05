import React from 'react';
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import CustomDialog from '../../core/components/CustomDialog';

interface UploadConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  pgCompanyName?: string;
  selectedMonth: string;
  selectedFiles: FileList | null;
}

const UploadConfirmDialog: React.FC<UploadConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  pgCompanyName,
  selectedMonth,
  selectedFiles,
}) => {
  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title="업로드 확인"
      maxWidth="md"
    >
      <Typography variant="body1">
        <Box component="span" fontWeight="bold">
          {pgCompanyName}
        </Box>
        사의{' '}
        <Box component="span" fontWeight="bold">
          {selectedMonth}
        </Box>{' '}
        월 정산 데이터로 다음 파일들을 업로드하시겠습니까?
      </Typography>

      <Divider sx={{ my: 2 }} variant="middle" flexItem />
      <List dense sx={{ py: 0 }}>
        {selectedFiles &&
          Array.from(selectedFiles).map((file, index) => (
            <ListItem key={index} sx={{ py: 0 }}>
              <ListItemText
                primary={
                  <Typography>
                    {file.name}{' '}
                    <Typography component="span" color="textSecondary">
                      ({(file.size / 1024).toFixed(2)} KB)
                    </Typography>
                  </Typography>
                }
              />
            </ListItem>
          ))}
      </List>
      <Divider sx={{ my: 2 }} variant="middle" flexItem />
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
          ※ 해당 월의 첫 정산 데이터 업로드 시, 현재 시점의 계약정보와
          패널티정보가 '정산 기준 정보'로 저장됩니다. <br />
          이후 계약정보나 패널티정보가 변경되어도 이 월의 정산 계산에는 처음
          저장된 '정산 기준 정보'가 사용됩니다.
        </Typography>
        <Typography variant="body2" color="error">
          ※ 해당 PG사의 엑셀 포맷과 다를 경우 오류가 발생합니다.
        </Typography>
      </Box>
    </CustomDialog>
  );
};

export default UploadConfirmDialog; 