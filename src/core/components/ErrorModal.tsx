import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
} from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

interface ErrorModalProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export const ErrorModal = ({ open, message, onClose }: ErrorModalProps) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="xs"
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <ErrorOutlineIcon color="error" />
          <Typography variant="subtitle1">
            오류
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2">
          {message}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="caption" color="textSecondary">
          지속적으로 오류가 발생하는 경우 아래 방법을 시도해보세요:
        </Typography>
        <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2 }}>  {/* mb: 0 추가 */}
          <Typography variant="caption" color="textSecondary" component="li">
            페이지 새로고침
          </Typography>
          <Typography variant="caption" color="textSecondary" component="li">
            브라우저 캐시 삭제
          </Typography>
          <Typography variant="caption" color="textSecondary" component="li">
            관리자 문의 (admin@example.com)
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ pt: 0, pb: 2, px: 3 }}>  {/* 패딩 조정 */}
        <Button
          onClick={onClose}
          color="primary"
          size="small"
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};