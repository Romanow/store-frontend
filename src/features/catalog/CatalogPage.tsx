import { Alert, Box, Card, CardContent, CardMedia, CircularProgress, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/providers/store';
import { ItemDetailsDialog } from './ItemDetailsDialog';
import { fetchItems, openItemModal } from './catalogSlice';

export const CatalogPage = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.catalog);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={700}>
        Каталог товаров
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
          gap: 3
        }}
      >
        {items.map((item) => (
          <Box key={`${item.name}-${item.manufacturer}`}>
            <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => dispatch(openItemModal(item))}>
              <CardMedia
                component="img"
                image={item.imageUrl ?? 'https://placehold.co/320x200?text=No+Image'}
                height={220}
                sx={{ objectFit: 'contain', objectPosition: 'center', bgcolor: '#f2f5f7' }}
              />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <ItemDetailsDialog />
    </Stack>
  );
};
