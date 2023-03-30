import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// api
import {login} from '../../../api/auth';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
// import {NOTIFICATIONS} from '../../../layouts/dashboard/index'
// let modulename = import('../../../layouts/dashboard/index');
// ----------------------------------------------------------------------
export let NOTIFICATIONS = {
  val:[],
  set newval(v){this.val = v}
}
export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState({
    userName: "",
    password: "",
  })

  const methods = useForm({
    mode: onchange,
  });

  const handleChange = (e) =>
  setFormState({
    ...formState,
    [e.target.name]: e.target.value,
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  const onSubmit = async () => {
    const { 
      id,
      token,
      name,
      manager,
      numAccount,
      soldAccount,
      loanList,
      transactionList,
      notificationList } = await login(formState)
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("id", id);
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("manager", manager);
    sessionStorage.setItem("numAccount", numAccount);
    sessionStorage.setItem("soldAccount", soldAccount);
    sessionStorage.setItem("loanList", loanList);
    sessionStorage.setItem("transactionList", transactionList);
    sessionStorage.setItem("loged", true);
    NOTIFICATIONS.newval = notificationList;
    if (manager)
      navigate('/dashboard/app', { replace: true });
    else
    navigate('/dashboard/myaccount', { replace: true });

  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="userName" label="userName" value={formState.userName} onChange={handleChange} required/>

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={formState.password}
          onChange={handleChange}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}