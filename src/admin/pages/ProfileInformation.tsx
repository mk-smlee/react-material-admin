import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUpdateProfileInfo } from "../../admin/hooks/useUpdateProfileInfo";
import { useSnackbar } from "../../core/contexts/SnackbarProvider";
import { useProfileInfo } from "../hooks/useProfileInfo";
import { ProfileInfo } from "../types/profileInfo";

const genders = [
  { label: "여성", value: "F" },
  { label: "남성", value: "M" },
];

const ProfileInformation = () => {
  const snackbar = useSnackbar();
  const { data } = useProfileInfo();
  const { isUpdating, updateProfileInfo } = useUpdateProfileInfo();

  const formik = useFormik({
    initialValues: {
      email: data ? data.email : "",
      firstName: data ? data.firstName : "",
      gender: data ? data.gender : undefined,
      job: data ? data.job : "",
      lastName: data ? data.lastName : "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("유효한 이메일 주소를 입력하세요.").required("이메일을 입력하세요."),
      firstName: Yup.string().max(20, "최대 20자까지 입력 가능합니다.").required("이름을 입력하세요."),
      lastName: Yup.string().max(30, "최대 30자까지 입력 가능합니다.").required("성을 입력하세요."),
    }),
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = async (values: Partial<ProfileInfo>) => {
    updateProfileInfo({ ...values, id: data?.id } as ProfileInfo)
      .then(() => {
        snackbar.success("프로필 정보가 성공적으로 업데이트되었습니다.");
      })
      .catch(() => {
        snackbar.error("예상치 못한 오류가 발생했습니다.");
      });
  };

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <Card>
        <CardHeader title="프로필 정보" />
        <CardContent>
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="성"
            name="lastName"
            autoComplete="family-name"
            autoFocus
            disabled={isUpdating}
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
            disabled={isUpdating}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">성별</FormLabel>
            <RadioGroup
              row
              aria-label="성별"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
            >
              {genders.map((gender) => (
                <FormControlLabel
                  key={gender.value}
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
            label="이메일"
            name="email"
            autoComplete="email"
            disabled={isUpdating}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </CardContent>
        <CardActions>
          <Button onClick={() => formik.resetForm()}>초기화</Button>
          <LoadingButton loading={isUpdating} type="submit" variant="contained">
            업데이트
          </LoadingButton>
        </CardActions>
      </Card>
    </form>
  );
};

export default ProfileInformation;
