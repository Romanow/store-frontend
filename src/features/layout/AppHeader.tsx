import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StoreIcon from '@mui/icons-material/Store';
import { AppBar, Avatar, Badge, Box, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/providers/store';
import { openAuthModal } from '../auth/authSlice';
import { useNavigate } from 'react-router-dom';

export const AppHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartSize = useAppSelector((state) => state.cart.items.length);
  const { isAuthenticated, name, picture } = useAppSelector((state) => state.auth);

  return (
    <AppBar position="sticky" color="inherit" sx={{ borderBottom: '1px solid #d9e1e6' }}>
      <Toolbar>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <StoreIcon color="primary" />
          <Typography variant="h6" fontWeight={700}>
            Store Service
          </Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        {isAuthenticated && (
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mr: 2, cursor: 'pointer' }}
            onClick={() => navigate('/orders')}
          >
            <Typography variant="h6" fontWeight={700}>
              {name}
            </Typography>
            <Avatar src={picture} sx={{ width: 36, height: 36 }}>
              {name.slice(0, 1).toUpperCase()}
            </Avatar>
          </Stack>
        )}
        {!isAuthenticated && (
          <Button variant="outlined" sx={{ mr: 2 }} onClick={() => dispatch(openAuthModal())}>
            Авторизация
          </Button>
        )}
        <IconButton color="primary" onClick={() => navigate('/cart')}>
          <Badge badgeContent={cartSize} color="secondary">
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
