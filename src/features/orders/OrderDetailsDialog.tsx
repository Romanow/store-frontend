import CloseIcon from '@mui/icons-material/Close';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/providers/store';
import { cancelOrder, closeOrderModal, fetchOrderDetails, requestOrderWarranty } from './ordersSlice';

export const OrderDetailsDialog = () => {
  const dispatch = useAppDispatch();
  const { selectedOrderUid, details, loadingDetails } = useAppSelector((state) => state.orders);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedOrderUid) {
      void dispatch(fetchOrderDetails(selectedOrderUid));
    }
  }, [dispatch, selectedOrderUid]);

  const warrantyItems = useMemo(
    () => details?.items.filter((item) => item.warranty?.status === 'ON_WARRANTY').map((item) => item.name) ?? [],
    [details]
  );

  const handleCancel = async () => {
    if (!selectedOrderUid) return;
    setError('');

    try {
      await dispatch(cancelOrder(selectedOrderUid)).unwrap();
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const handleRequestWarranty = async () => {
    if (!selectedOrderUid || warrantyItems.length === 0) return;

    setError('');
    try {
      await dispatch(requestOrderWarranty({ orderUid: selectedOrderUid, itemNames: warrantyItems })).unwrap();
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <Dialog open={Boolean(selectedOrderUid)} onClose={() => dispatch(closeOrderModal())} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ fontSize: { xs: 28, md: 34 }, fontWeight: 800, pr: 6 }}>
        Подробная информация о заказе {details?.orderUid.slice(0, 8)}
        <IconButton
          aria-label="close"
          onClick={() => dispatch(closeOrderModal())}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        {loadingDetails && <Typography>Загрузка...</Typography>}

        {details && (
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography sx={{ width: 140 }}>Дата заказа:</Typography>
              <Typography sx={{ color: 'info.main' }}>{new Date(details.orderDate).toLocaleString()}</Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography sx={{ width: 140 }}>Статус:</Typography>
              <Typography
                sx={{ color: details.status === 'CANCELED' ? 'error.main' : 'success.main', fontWeight: 500 }}
              >
                {details.status}
              </Typography>
            </Stack>

            {details.items.map((item, index) => (
              <Stack key={`${item.name}-${index}`} direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <img
                  src={item.imageUrl ?? 'https://placehold.co/150x150?text=No+Image'}
                  width={150}
                  height={150}
                  alt={item.name}
                  style={{ objectFit: 'contain', objectPosition: 'center', borderRadius: 8, background: '#f2f5f7' }}
                />
                <Stack>
                  <Typography fontWeight={700}>{item.name}</Typography>
                  <Typography color="text.secondary">{item.manufacturer ?? 'Не указан'}</Typography>
                  <Typography>{item.description ?? 'Описание отсутствует'}</Typography>
                  <Typography>Гарантия: {item.warranty?.status ?? 'N/A'}</Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleCancel} disabled={!selectedOrderUid}>
          Отменить заказ
        </Button>
        <Button variant="contained" onClick={handleRequestWarranty} disabled={warrantyItems.length === 0}>
          Запрос гарантии
        </Button>
      </DialogActions>
    </Dialog>
  );
};
