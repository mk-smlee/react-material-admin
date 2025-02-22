import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { User } from "../types/user";

const genders = [
  { label: "여성", value: "F" },
  { label: "남성", value: "M" },
];
const roles = ["관리자", "회원"];

type UserDialogProps = {
  onAdd: (user: Partial<User>) => void;
  onClose: () => void;
  onUpdate: (user: User) => void;
  open: boolean;
  processing: boolean;
  user?: User;
};

const UserDialog = ({
  onAdd,
  onClose,
  onUpdate,
  open,
  processing,
  user,
}: UserDialogProps) => {
  const editMode = Boolean(user && user.id);

  const handleSubmit = (values: Partial<User>) => {
    if (user && user.id) {
      onUpdate({ ...values, id: user.id } as User);
    } else {
      onAdd(values);
    }
  };

  const formik = useFormik({
    initialValues: {
      disabled: user ? user.disabled : false,
      email: user ? user.email : "",
      firstName: user ? user.firstName : "",
      gender: user ? user.gender : "F",
      lastName: user ? user.lastName : "",
      role: user ? user.role : "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("유효한 이메일 주소를 입력하세요.")
        .required("필수 입력 항목입니다."),
      firstName: Yup.string()
        .max(20, "최대 20자까지 입력 가능합니다.")
        .required("필수 입력 항목입니다."),
      lastName: Yup.string()
        .max(30, "최대 30자까지 입력 가능합니다.")
        .required("필수 입력 항목입니다."),
      role: Yup.string().required("필수 입력 항목입니다."),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="user-dialog-title">
      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle id="user-dialog-title">
          {editMode ? "사용자 수정" : "사용자 추가"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="성"
            name="lastName"
            autoComplete="family-name"
            autoFocus
            disabled={processing}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="이름"
            name="firstName"
            autoComplete="given-name"
            disabled={processing}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">성별</FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
            >
              {genders.map((gender) => (
                <FormControlLabel
                  key={gender.value}
                  disabled={processing}
                  value={gender.value}
                  control={<Radio />}
                  label={gender.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일 주소"
            name="email"
            autoComplete="email"
            disabled={processing}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            id="role"
            disabled={processing}
            fullWidth
            select
            label="역할"
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            error={formik.touched.role && Boolean(formik.errors.role)}
            helperText={formik.touched.role && formik.errors.role}
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
          <FormControl component="fieldset" margin="normal">
            <FormControlLabel
              name="disabled"
              disabled={processing}
              onChange={formik.handleChange}
              checked={formik.values.disabled}
              control={<Checkbox />}
              label="비활성화"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>취소</Button>
          <LoadingButton loading={processing} type="submit" variant="contained">
            {editMode ? "수정" : "추가"}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserDialog;
