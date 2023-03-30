import * as Yup from 'yup';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
// api
import {updateUser} from '../../../api/user';
import {getAllInfo, acceptUser} from '../../../api/auth';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

export default function AcceptUserForm() {
  const navigate = useNavigate();

  // const getAllIdentityInfo = async () => {
  //   return await getIdentityInfo({"field": Object.keys(formState)})
  // };

  const { id } = useParams();
  
  const [showPassword, setShowPassword] = useState(()=> {return 4});

  const [formState, setFormState] = useState ({});
  const isMounted = useRef(false);

  useEffect (()=>{
    if (isMounted.current === false)
      getAllInfo({id:id})
      .then((data)=>setFormState(data))
      isMounted.current = true
  },[])
  
  const methods = useForm({
    mode: onchange,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (e) => {
    await acceptUser({
      id: id,
      accept: e.target.textContent
    })
    navigate('/dashboard/app', { replace: true });
  };
  const accept = async (e) => {
    await acceptUser({
      id: id,
      accept: e.target.value
    })
    navigate('/dashboard/app', { replace: true });
  }

  const handleChange = (e) =>
  {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
      })
  }
  return (
    <FormProvider methods={methods} onSubmit={(e) => handleSubmit(onSubmit(e))}>
      <Stack spacing={3}>
        <RootStyle>
          <Typography>
            First Name:
          </Typography>
          <RHFTextField name="name"  value={formState.name} onChange={handleChange} disabled required/>
        </RootStyle>
        <RootStyle>
          <Typography>
            First sold in Shekel:
          </Typography>
        <RHFTextField name="userName"  value={formState.firstSoldAccountShekel + '₪'} disabled onChange={handleChange} required/>
        </RootStyle>
        
        <RootStyle>
          <LoadingButton fullWidth size="large" onClick={accept} value={true} variant="contained">Accept</LoadingButton>
          {/* type="submit"  loading={isSubmitting} */}
          <LoadingButton fullWidth size="large" onClick={accept} value={false} variant="contained">Decline</LoadingButton>
        </RootStyle>
        
      </Stack>

      
    </FormProvider>
  );
}