import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { register } from '../../../api/auth';

// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import CurrencyTextField from '@kylebeikirch/material-ui-currency-textfield'

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    userName: "",
    password: "",
    amount: ""
  })

  // const [firstName, setName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const methods = useForm({
     mode: 'onChange',
     reValidateMode: 'onSubmit',
     formState,    

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
    await register(formState) 
    navigate('/dashboard', { replace: true });
  };
   
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="name" label="First name" value={formState.name} onChange={handleChange} required/>
          <RHFTextField name="userName" label="Last name" value={formState.userName} onChange={handleChange} required />
        </Stack>

        <RHFTextField name="email" label="Email address"  />

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
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <CurrencyTextField
          name="amount"
          label="Amount"
          variant="standard"
          value={formState.amount}
          currencySymbol="₪"
          //minimumValue="0"
          // outputFormat="string"
          // decimalCharacter="."
          // digitGroupSeparator=","
          onChange={handleChange}
          required
              />
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}