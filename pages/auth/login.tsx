import React, { useContext, useState } from 'react';
import Nextlink from 'next/link';
import {
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Input,
  Chip,
} from '@mui/material';
import { Box } from '@mui/system';
import { AuthLayout } from '../../components/layout';

import { useForm } from 'react-hook-form';
import { validations } from '../../utils';
import { tesloApi } from '../../api';
import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from '../../context';
import { useRouter } from 'next/router';
type formData = { email: string; password: string };

export const LoginPage = () => {
  const [showError, setShowError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();
  const { loginUser, user } = useContext(AuthContext)
  const router = useRouter();
  const previousPage = router.query?.p?.toString() ?? '/';
  const onLoginUser = async ({ email, password }: formData) => {
    setShowError(false);
    const isValidLogin = await loginUser(email, password);
    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => { setShowError(false);}, 3000);
      return 
    }
     router.replace(previousPage)
  };


  return (
    <AuthLayout title='Login'>
      <form onSubmit={handleSubmit(onLoginUser)}>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>
                Login
              </Typography>
              <Chip
                label='user / password incorrect'
                color='error'
                icon={<ErrorOutline />}
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='email'
                variant='filled'
                fullWidth
                type='email'
                {...register('email', {
                  required: 'This field is required',
                  validate: (val) => validations.isEmail(val),
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='password'
                variant='filled'
                fullWidth
                type='password'
                {...register('password', {
                  required: 'This field is required',
                  minLength: { value: 6, message: 'at least 6 characters' },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type='submit'
                fullWidth
                color='secondary'
                className='circular-btn'
                size='large'
              >
                Sumbit
              </Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='end'>
              <Nextlink href={`/auth/register?p=${previousPage}`} passHref>
                <Link underline='always'>create a new account</Link>
              </Nextlink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
