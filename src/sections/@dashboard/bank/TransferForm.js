import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Alert from '@material-ui/lab/Alert';
// api
import {transfer} from '../../../api/bank';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
// ----------------------------------------------------------------------

export default function TransferForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const [formState, setFormState] = useState({
    dest: "",
    amount: "",
  })

  const methods = useForm({
    mode: onchange,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  const onSubmit = async () => {
    const response = await transfer(formState);
    if (response.code === 200){
      setError(false);
      setSuccess(true);
    } else {
      setError(true);
      setSuccess(false);
    }
    setMessage(response.message);
    
    // navigate('/dashboard/app', { replace: true });
  };

  const handleChange = (e) =>
  setFormState({
    ...formState,
    [e.target.name]: e.target.value,
  })

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        { error &&
          <Alert variant="filled" severity={"error"}>
            {message}
          </Alert> 
        }
        { success &&
          <Alert variant="filled" severity={"success"}>
            {message}
          </Alert> 
        }
        <RHFTextField name="dest" label="Destination" value={success && '' || formState.lenderNumAccount} onChange={handleChange} required/>
        <RHFTextField name="amount" label="Amount to transfer" value={success && '' || formState.amount} onChange={handleChange} required/>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Transfer
        </LoadingButton>
        
      </Stack>

      
    </FormProvider>
  );
}