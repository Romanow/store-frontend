import {
  Alert,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  Stack,
  Typography
} from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/providers/store';
import { openAuthModal } from '../auth/authSlice';
import { OrderDetailsDialog } from './OrderDetailsDialog';
import { fetchOrders, openOrderModal } from './ordersSlice';

export const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { list, loadingList, error } = useAppSelector((state) => state.orders);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(openAuthModal());
      navigate('/');
      return;
    }

    void dispatch(fetchOrders());
  }, [dispatch, isAuthenticated, navigate]);

  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={700}>
        Список заказов
      </Typography>

      {loadingList && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      <List sx={{ p: 0 }}>
        {list.map((order) => (
          <ListItem key={order.orderUid} disablePadding sx={{ mb: 2 }}>
            <Card sx={{ width: '100%' }}>
              <CardActionArea onClick={() => dispatch(openOrderModal(order.orderUid))}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Номер заказа: {order.orderUid.slice(0, 8)}
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography sx={{ width: 120 }}>Дата заказа:</Typography>
                    <Typography sx={{ color: 'info.main' }}>{new Date(order.orderDate).toLocaleString()}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography sx={{ width: 120 }}>Статус:</Typography>
                    <Typography
                      sx={{ color: order.status === 'CANCELED' ? 'error.main' : 'success.main', fontWeight: 500 }}
                    >
                      {order.status}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography sx={{ width: 120 }}>Товары:</Typography>
                    <Typography>{order.items.join(', ')}</Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </ListItem>
        ))}
      </List>

      <OrderDetailsDialog />
    </Stack>
  );
};
