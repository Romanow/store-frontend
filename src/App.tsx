import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import OrderPage from "./pages/OrderPage";
import AuthModal from "./components/AuthModal";
import ProtectedRoute from "./utils/ProtectedRoute";
import {useAppSelector} from "./hooks";
import {Container} from "@mui/material";

function App() {
    const authModalOpen = useAppSelector((s) => s.ui.authModalOpen);
    return (
        <BrowserRouter>
            <Header/>
            <Container sx={{mt: 4}}>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/orders" element={<ProtectedRoute><OrderPage/></ProtectedRoute>}/>
                </Routes>
                <AuthModal open={authModalOpen}/>
            </Container>
        </BrowserRouter>
    );
}

export default App;
