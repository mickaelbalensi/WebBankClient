import * as Yup from 'yup';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
// api
import {updateUser, getinfo} from '../../../api/user';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

export default function UpdateUserForm() {
  const navigate = useNavigate();

  // const getAllIdentityInfo = async () => {
  //   return await getIdentityInfo({"field": Object.keys(formState)})
  // };

  

  const [showPassword, setShowPassword] = useState(()=> {return 4});

  const [formState, setFormState] = useState ({});
  const isMounted = useRef(false);

  useEffect (()=>{
    if (isMounted.current === false)
      getinfo({"field": ['name', 'userName']})
      .then((data)=>setFormState(data))
      isMounted.current = true
})
  
  const methods = useForm({
    mode: onchange,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  
  const onSubmit = async () => {
    await updateUser(formState)
    navigate('/dashboard/app', { replace: true });
  };

  const handleChange = (e) =>
  {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
      })
  }
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RootStyle>
          <Typography>
                  First Name:
          </Typography>
          <RHFTextField name="name"  value={formState.name} onChange={handleChange} required/>
        </RootStyle>

        <RHFTextField name="userName"  value={formState.userName} onChange={handleChange} required/>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Update
        </LoadingButton>
        
      </Stack>

      
    </FormProvider>
  );
}