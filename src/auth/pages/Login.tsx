import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';
import { useAuth } from '../contexts/AuthProvider';
import { Container } from '@material-ui/core';
import Logo from '../../core/components/Logo';

const Login = () => {
  const { isLoggingIn, login } = useAuth();
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const handleLogin = (email: string, password: string) => {
    login(email, password)
      .then(() => navigate(`/admin`, { replace: true }))
      .catch(() => snackbar.error('예상치 못한 오류가 발생했습니다.'));
  };

  const formik = useFormik({
    initialValues: {
      email: 'demo@example.com',
      password: "guWEK<'r/-47-XG3",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('유효한 이메일 주소를 입력하세요.')
        .required('이메일을 입력하세요.'),
      password: Yup.string()
        .min(8, '최소 8자 이상 입력해야 합니다.')
        .required('비밀번호를 입력하세요.'),
    }),
    onSubmit: (values) => handleLogin(values.email, values.password),
  });

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(./img/startup.svg)',
          backgroundRepeat: 'no-repeat',
          bgcolor: 'background.default',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} square>
        <Container component="main" maxWidth="xs" sx={{ mt: 6 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Logo sx={{ mb: 2 }} />
            <Typography component="h1" variant="h5">
              로그인
            </Typography>
            <Box
              component="form"
              marginTop={3}
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <TextField
                margin="normal"
                variant="filled"
                required
                fullWidth
                id="email"
                label="이메일"
                name="email"
                autoComplete="email"
                autoFocus
                disabled={isLoggingIn}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                margin="normal"
                variant="filled"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="current-password"
                disabled={isLoggingIn}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <LoadingButton
                type="submit"
                fullWidth
                loading={isLoggingIn}
                variant="contained"
                sx={{ mt: 3 }}
              >
                로그인
              </LoadingButton>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Login;
