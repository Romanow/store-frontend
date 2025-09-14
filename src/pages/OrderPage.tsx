import React from "react";
import {Box, List, ListItem, Avatar, ListItemText, Typography, Button, Divider} from "@mui/material";
import {useAppSelector, useAppDispatch} from "../hooks";
import {clearCart} from "../features/cart/cartSlice";
import {usePurchaseOrderMutation} from "../features/api/apiSlice";

const OrdersPage: React.FC = () => {
    const cart = useAppSelector((s) => s.cart.items);
    const dispatch = useAppDispatch();
    const [purchaseOrder, {isLoading}] = usePurchaseOrderMutation();

    const handleCreateOrder = async () => {
        if (cart.length === 0) return;
        const payload = {items: cart.map((ci) => ({name: ci.item.name}))};

        try {
            await purchaseOrder(payload).unwrap();
            dispatch(clearCart());
            alert("Заказ успешно создан");
        } catch (err: any) {
            alert("Ошибка при создании заказа: " + (err.message ?? err));
        }
    };

    return (
        <Box>
            <Typography variant="h5" mb={2}>
                Корзина ({cart.reduce((acc) => acc + 1, 0)} товара)
            </Typography>

            {cart.length === 0 ? (
                <Typography>Корзина пуста.</Typography>
            ) : (
                <>
                    <List>
                        {cart.map((ci) => (
                            <React.Fragment key={ci.item.name}>
                                <ListItem alignItems="flex-start">
                                    <Avatar variant="square" src={ci.item.imageUrl}
                                            sx={{width: 75, height: 75, mr: 2}}/>
                                    <ListItemText primary={ci.item.name} secondary={ci.item.manufacturer}/>
                                </ListItem>
                                <Divider component="li"/>
                            </React.Fragment>
                        ))}
                    </List>

                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                        <Button variant="contained" onClick={handleCreateOrder} disabled={isLoading}>
                            Создать заказ
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default OrdersPage;
