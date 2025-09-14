import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid2,
    Typography,
    Box,
} from "@mui/material";
import {Item} from "../types";
import {useAppDispatch} from "../hooks";
import {addToCart} from "../features/cart/cartSlice";

const ItemModal: React.FC<{ open: boolean | string; item: Item; onClose: () => void }> =
    ({open, item, onClose}) => {
        const dispatch = useAppDispatch();

        const handleAdd = () => {
            dispatch(addToCart({item}));
            onClose();
        };

        return (
            <Dialog open={!!open} onClose={onClose} maxWidth="md" fullWidth>
                <DialogTitle>{item.name}</DialogTitle>
                <DialogContent>
                    <Grid2 container spacing={2}>
                        <Grid2 size={{xs: 12, md: 5}}>
                            <Box component="img" src={item.imageUrl} alt={item.name}
                                 sx={{width: "100%", height: 400, objectFit: "contain", background: "#f5f5f5"}}/>
                        </Grid2>
                        <Grid2 size={{xs: 12, md: 7}}>
                            <Typography variant="subtitle1">Производитель:</Typography>
                            <Typography component="p">{item.manufacturer ?? "-"}</Typography>

                            <Typography variant="subtitle1">Описание:</Typography>
                            <Typography component="p">{item.description ?? "-"}</Typography>

                            {typeof item.price !== "undefined" && (
                                <>
                                    <Typography variant="subtitle1">Цена:</Typography>
                                    <Typography component="p">{item.price} ₽</Typography>
                                </>
                            )}
                        </Grid2>
                    </Grid2>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Закрыть</Button>
                    <Button variant="contained" onClick={handleAdd}>
                        Добавить в корзину
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

export default ItemModal;
