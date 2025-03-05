import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogProps,
} from '@material-ui/core';

interface CustomDialogProps extends DialogProps {
  /** 다이얼로그 열림 여부 */
  open: boolean;
  /** 닫기 버튼 핸들러 */
  onClose: () => void;
  /** 확인(주로 '확인' 또는 '삭제') 버튼 핸들러 */
  onConfirm: () => void;
  /** 다이얼로그 상단 제목 */
  title: string;
  /** 다이얼로그 본문에 들어갈 내용 (ReactNode) */
  children: React.ReactNode;
  /** 확인 버튼에 표시될 텍스트 (기본: '확인') */
  confirmButtonText?: string;
  /** 취소 버튼에 표시될 텍스트 (기본: '취소') */
  cancelButtonText?: string;
  /** 확인 버튼 색상 (기본: 'primary') */
  confirmButtonColor?: 'primary' | 'secondary' | 'inherit';
  /** 취소 버튼 색상 (기본: 'primary') */
  cancelButtonColor?: 'primary' | 'secondary' | 'inherit';
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  children,
  confirmButtonText = '확인',
  cancelButtonText = '취소',
  confirmButtonColor = 'primary',
  cancelButtonColor = 'primary',
  ...dialogProps
}) => {
  return (
    <Dialog open={open} onClose={onClose} {...dialogProps}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color={cancelButtonColor}>
          {cancelButtonText}
        </Button>
        <Button onClick={onConfirm} color={confirmButtonColor} variant="contained">
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;