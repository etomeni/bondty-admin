import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from './router';
import { useUserStore } from "./state/userStore";

function App() {
    const _handleRestoreUser = useUserStore((state) => state._handleRestoreUser);
        
    const handleRefreshNredirect = () => {
        _handleRestoreUser();
    }

    useEffect(() => {
        handleRefreshNredirect();
    }, []);

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App;