import React from "react";
import {Box, Button, Modal, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyIcon from "@mui/icons-material/VpnKey";
import SecurityIcon from "@mui/icons-material/Security";
import {useAppDispatch} from "../hooks";
import {closeAuthModal} from "../features/ui/uiSlice";

const AuthModal: React.FC<{ open: boolean }> = ({open}) => {
    const dispatch = useAppDispatch();
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    return (
        <Modal open={open} onClose={() => dispatch(closeAuthModal())}>
            <Box
                sx={{
                    height: "100vh",
                    width: "100vw",
                    bgcolor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <IconButton onClick={() => dispatch(closeAuthModal())}
                            sx={{position: "absolute", top: 16, right: 16, color: "white"}}>
                    <CloseIcon/>
                </IconButton>
                <Box>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<SecurityIcon/>}
                        onClick={() => (window.location.href = `${baseUrl}/oauth2/authorization/auth0?redirect_uri=${window.location.href}`)}>
                        Войти через Auth0
                    </Button>
                    <Button
                        fullWidth
                        sx={{mt: 2}}
                        variant="contained"
                        startIcon={<KeyIcon/>}
                        onClick={() => (window.location.href = `${baseUrl}/oauth2/authorization/keycloak?redirect_uri=${window.location.href}`)}>
                        Войти через Keycloak
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AuthModal;
