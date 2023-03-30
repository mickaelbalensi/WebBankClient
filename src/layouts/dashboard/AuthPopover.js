import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';

// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const authOption = [
    {
      label: 'SignIn',
      icon: getIcon('eva:person-add-fill'),
      linkTo: '/register',
    },
    {
      label: 'Login',
      icon: getIcon('eva:lock-fill'),
      linkTo: '/login',
    },
  ];


  export default function AccountPopover() {
    const anchorRef = useRef(null);
  
    const [open, setOpen] = useState(null);
  
    const handleOpen = (event) => {
      setOpen(event.currentTarget);
    };
  
    const handleClose = () => {
      setOpen(null);
    };
  
    const logout = () => {
      sessionStorage.clear();
      navigate("/");
      handleClose();
    };
    return (
      <>
        <IconButton
          ref={anchorRef}
          onClick={handleOpen}
          sx={{
            p: 0,
            ...(open && {
              '&:before': {
                zIndex: 1,
                content: "''",
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
              },
            }),
          }}
        >
       
          <Iconify icon="eva:person-add-fill" width={20} height={20} />
        
      </IconButton>

          
        
  
        <MenuPopover
          open={Boolean(open)}
          anchorEl={open}
          onClose={handleClose}
          sx={{
            p: 0,
            mt: 1.5,
            ml: 0.75,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          }}>
        
       
  
          <Divider sx={{ borderStyle: 'dashed' }} />
  
          <Stack sx={{ p: 1 }}>
            {authOption.map((option) => (
              <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
                {option.label}
              </MenuItem>
            ))}
          </Stack>
  
          <Divider sx={{ borderStyle: 'dashed' }} />
  
          {/* <MenuItem onClick={logout} sx={{ m: 1 }}>
            Logout
          </MenuItem> */}
        </MenuPopover>
      </>
    );
  } 