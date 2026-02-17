import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  List,
  ListItem,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/providers/store';
import { apiClient } from '../../shared/api/client';
import { openAuthModal } from '../auth/authSlice';
import { clearCart, removeCartItem } from './cartSlice';
import { ItemDetailsDialog } from '../catalog/ItemDetailsDialog';
import { openItemModal } from '../catalog/catalogSlice';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  const handleCreateOrder = async () => {
    if (!isAuthenticated) {
      dispatch(openAuthModal());
      return;
    }

    if (items.length === 0) {
      return;
    }

    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      await apiClient.createOrder(items.map((item) => item.name));
      dispatch(clearCart());
      setSuccess('Заказ успешно создан');
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={700}>
        Корзина
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <List sx={{ p: 0 }}>
        {items.map((item, index) => (
          <ListItem key={`${item.name}-${index}`} disablePadding sx={{ mb: 2 }}>
            <Card sx={{ width: '100%', cursor: 'pointer' }} onClick={() => dispatch(openItemModal(item))}>
              <CardContent sx={{ position: 'relative', pr: 6 }}>
                <Tooltip title="Удалить">
                  <IconButton
                    color="error"
                    size="small"
                    onClick={(event) => {
                      event.stopPropagation();
                      dispatch(removeCartItem(index));
                    }}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Tooltip>
                <Stack direction="row" spacing={2} alignItems="center">
                  <CardMedia
                    component="img"
                    image={item.imageUrl ?? 'https://placehold.co/150x150?text=No+Image'}
                    sx={{
                      width: 150,
                      height: 150,
                      objectFit: 'contain',
                      objectPosition: 'center',
                      borderRadius: 1,
                      bgcolor: '#f2f5f7'
                    }}
                  />
                  <Box>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography color="text.secondary">{item.manufacturer ?? 'Не указан'}</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>

      {items.length === 0 && <Typography color="text.secondary">Корзина пуста</Typography>}

      <Button
        variant="contained"
        sx={{ alignSelf: 'flex-end' }}
        onClick={handleCreateOrder}
        disabled={submitting || items.length === 0}
      >
        Создать заказ
      </Button>
      <ItemDetailsDialog />
    </Stack>
  );
};
