import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/providers/store';
import { addToCart } from '../cart/cartSlice';
import { closeItemModal } from './catalogSlice';

export const ItemDetailsDialog = () => {
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) => state.catalog.selectedItem);

  return (
    <Dialog open={Boolean(item)} onClose={() => dispatch(closeItemModal())} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontSize: { xs: 28, md: 34 }, fontWeight: 800, pr: 6 }}>
        Информация о товаре
        <IconButton
          aria-label="close"
          onClick={() => dispatch(closeItemModal())}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {item && (
        <DialogContent>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="flex-start">
            <img
              src={item.imageUrl ?? 'https://placehold.co/400x400?text=No+Image'}
              alt={item.name}
              width={400}
              height={400}
              style={{
                objectFit: 'contain',
                objectPosition: 'center',
                borderRadius: 10,
                maxWidth: '100%',
                background: '#f2f5f7'
              }}
            />
            <Stack spacing={1}>
              <Typography variant="h6">{item.name}</Typography>
              <Typography color="text.secondary">Производитель: {item.manufacturer ?? 'Не указан'}</Typography>
              <Typography>{item.description ?? 'Описание отсутствует'}</Typography>
            </Stack>
          </Stack>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={() => dispatch(closeItemModal())}>Закрыть</Button>
        {item && (
          <Button
            variant="contained"
            onClick={() => {
              dispatch(addToCart(item));
              dispatch(closeItemModal());
            }}
          >
            Добавить в корзину
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
