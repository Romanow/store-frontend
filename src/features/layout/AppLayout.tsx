import { Container } from '@mui/material';
import { PropsWithChildren, useEffect } from 'react';
import { useAppDispatch } from '../../app/providers/store';
import { AuthModal } from '../auth/AuthModal';
import { refreshAuthFromToken } from '../auth/authSlice';
import { AppHeader } from './AppHeader';

export const AppLayout = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshAuthFromToken());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Container sx={{ py: 4 }}>{children}</Container>
      <AuthModal />
    </>
  );
};
