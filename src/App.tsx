import React from "react";
import {Routes, Route} from "react-router-dom";
import {Container} from "@mui/material";
import Header from "./components/Header";
import MainPage from "./pages/MainPage.tsx";
import OrdersPage from "./pages/OrderPage.tsx";

const App: React.FC = () => {
    return (
        <>
            <Header/>
            <Container sx={{mt: 4}}>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/orders" element={<OrdersPage/>}/>
                </Routes>
            </Container>
        </>
    );
};

export default App;
