import React from "react";
import {AppBar, Toolbar, Typography, IconButton, Badge} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {useSelector} from "react-redux";
import {RootState} from "../app/store";
import {useNavigate} from "react-router-dom";

const Header: React.FC = () => {
    const cartCount = useSelector((s: RootState) =>
        s.cart.items.reduce((acc) => acc + 1, 0)
    );
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow: 1, cursor: "pointer"}} onClick={() => navigate("/")}>
                    Store Service
                </Typography>

                <IconButton color="inherit" onClick={() => navigate("/orders")}>
                    <Badge badgeContent={cartCount} color="secondary">
                        <ShoppingCartIcon/>
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
