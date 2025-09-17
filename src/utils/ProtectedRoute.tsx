import React, {JSX, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {openAuthModal} from "../features/ui/uiSlice";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({children}) => {
    const token = useAppSelector((state) => state.auth.accessToken);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!token) {
            dispatch(openAuthModal());
        }
    }, [token, dispatch]);

    if (!token) {
        return null;
    }

    return children;
};

export default ProtectedRoute;

