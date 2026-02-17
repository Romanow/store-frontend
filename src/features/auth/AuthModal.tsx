import { Backdrop, Box, Button, Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/providers/store';
import { buildGatewayUrl } from '../../shared/config';
import { closeAuthModal } from './authSlice';

export const AuthModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.auth.isAuthModalOpen);

  return (
    <Backdrop open={isOpen} sx={{ zIndex: 1400, backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <Box
        sx={{
          minWidth: 320,
          p: 4,
          borderRadius: 2,
          bgcolor: 'white',
          boxShadow: 24
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6">Авторизация</Typography>
          <Typography variant="body2" color="text.secondary">
            Для создания заказа выполните вход через провайдера.
          </Typography>
          <Button variant="contained" href={buildGatewayUrl('/oauth2/authorization/auth0')}>
            Auth0
          </Button>
          <Button variant="outlined" href={buildGatewayUrl('/oauth2/authorization/keycloak')}>
            KeyCloak
          </Button>
          <Button onClick={() => dispatch(closeAuthModal())}>Закрыть</Button>
        </Stack>
      </Box>
    </Backdrop>
  );
};
