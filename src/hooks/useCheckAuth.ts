import { useCallback, useState } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
// import { localApiEndpoint } from "@/util/resources";
import { getLocalStorage } from "@/util/storage";

export function useCheckAuth() {
    const cookies = new Cookies();
    const _autoLogin = useUserStore((state) => state._autoLogin);
    const _logOutUser = useUserStore((state) => state._logOutUser);
    const _handleRefreshToken = useUserStore((state) => state._handleRefreshToken);
    const [isLoading, setIsLoading] = useState(true);

    const reAuthUser = useCallback(() => {
        checkUserAuthState()
    }, []);
    
    const checkUserAuthState = async () => {
        const access_token = getLocalStorage("access_token")
        // const refresh_token = getLocalStorage("refreshToken");
        const refresh_token = cookies.get("refresh_token") || getLocalStorage("refreshToken");
        const user_data = getLocalStorage("user");
        // console.log("hello");

        if (!access_token || !refresh_token || !user_data ) {
            setIsLoading(false);
            return;
        }
        
        try {
            const response = (await axios.post(`${apiEndpoint}/admin/auth/refresh`,
                {refresh_token},
                {
                    headers: {
                        Authorization: `Bearer ${refresh_token}`,
                        // refresh: `Bearer ${refresh_token}`
                    }
                }
        )).data;
            // console.log(response);

            // if (response.access_token && response.refresh_token) {
            //     // _handleRefreshToken(response.accessToken, response.refreshToken)
            //     _handleRefreshToken(response.token.access_token, response.token.refresh_token)
            // }
            _handleRefreshToken(response.access_token, response.refresh_token)
    
            setIsLoading(false);
            if (user_data && access_token) _autoLogin(user_data);
    
            return true;
        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            // const fixedErrorMsg = "Oooops, login failed. please try again.";
            console.log(err);
            setIsLoading(false);
            _logOutUser();
    
            return false;
        }
    }

    const logOutBackendFn = useCallback(async (access_token: string) => {
        try {
            const response = (await axios.get(`${apiEndpoint}/admin/auth/logout`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    // refresh: `Bearer ${refresh_token}`
                }
            })).data;
            console.log(response);
            
        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            // const fixedErrorMsg = "Oooops, login failed. please try again.";
            console.log(err);
            // _logOutUser();
        }
    }, []);



    return {
        isLoading,
        setIsLoading,
        reAuthUser,
        logOutBackendFn
    }
}



