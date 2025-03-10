import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';
import { Container } from '@material-ui/core';
import Logo from '../../core/components/Logo';
import { useLogin } from '../hooks/useLogin';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { mutate: loginMutate, isLoading } = useLogin();
  const snackbar = useSnackbar();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      return snackbar.error('이메일과 비밀번호를 입력해주세요.');
    }

    loginMutate(
      { email, password },
      {
        onSuccess: () => {
          navigate('/admin', { replace: true });
        },
        onError: () => {
          snackbar.error('로그인에 실패했습니다. 다시 시도해주세요.');
        },
      },
    );
  };

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
            {/* form 태그로 감싸고 onSubmit 핸들러 등록 */}
            <Box
              component="form"
              marginTop={3}
              noValidate
              onSubmit={handleSubmit}
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
                placeholder="abc@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                loading={isLoading}
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
