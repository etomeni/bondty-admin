import { create } from "zustand";
import { getLocalStorage, removeLocalStorageItem, setLocalStorage } from "../util/storage";
import { userInterface } from "@/typeInterfaces/users.interface";
import { useCheckAuth } from "@/hooks/useCheckAuth";

/*
This is a sample of state management with zustand data
*/

const defaultUserEmpty: userInterface = {
    id: "",
    role_id: "",
    email: "",
    first_name: "",
    last_name: "",
    email_verified: false,
    is_suspended: false,
    idempotency_key: "",
    last_login: "",
    created_at: "",
    updated_at: ""
};

type _typeInterface_ = {
    accessToken: string;
    refreshToken: string;
    userData: userInterface;
    isLoggedIn: boolean;
    _loginUser: (user: userInterface, token: string, refreshToken: string) => void;
    _handleRefreshToken: (accessToken: string, refreshToken: string) => void;
    _autoLogin: (user: userInterface) => void;
    _logOutUser: () => void;
    _handleRestoreUser: () => void;
    // _handleRefresh: (user?: userInterface, token?: string) => void;
    _signUpUser: (user: userInterface) => void;
    _verifyUser: (user: userInterface) => void;
    _updateUser: (user: userInterface) => void;
    // updatePlayerAsync: () => Promise<void>;
};
  


export const useUserStore = create<_typeInterface_>((set) => ({
    accessToken: "",
    refreshToken: "",
    userData: defaultUserEmpty,
    isLoggedIn: false,
    _loginUser: (user, token, refreshToken) => {
        setLocalStorage("refreshToken", refreshToken);
        setLocalStorage("access_token", token);
        setLocalStorage("user", user || defaultUserEmpty);
    
        set((_state) => {
            return {
                userData: user || defaultUserEmpty,
                accessToken: token,
                refreshToken: refreshToken,
                isLoggedIn: true,
            };
        });
    },
    _handleRefreshToken: (accessToken, refreshToken) => {
        setLocalStorage("refreshToken", refreshToken);
        setLocalStorage("access_token", accessToken);
    
        set((_state) => {
            return {
                accessToken: accessToken,
                refreshToken: refreshToken,
            };
        });
    },
    _autoLogin: (user) => {
        setLocalStorage("user", user);
    
        set((_state) => {
            return {
                userData: user || defaultUserEmpty,
                isLoggedIn: true,
            };
        });
    },
    _updateUser: (user) => {
        set((state) => {
            const newUserData = { ...state.userData, ...user };
            setLocalStorage("user", newUserData);
    
            return {
                userData: newUserData,
            };
        });
    },
    _logOutUser: () => {
        removeLocalStorageItem("user");
        removeLocalStorageItem("access_token");
        removeLocalStorageItem("refreshToken");

        const { logOutBackendFn } = useCheckAuth();
        
        set((state) => {
            logOutBackendFn(state.accessToken);

            return {
                userData: defaultUserEmpty,
                isLoggedIn: false,
                accessToken: "",
                refreshToken: "",
            };
        });
    },
  
    _handleRestoreUser: () => {
        const user = getLocalStorage("user");
        const accessToken = getLocalStorage("access_token");
        const refreshToken = getLocalStorage("refreshToken");

        set((state) => {
            return {
                userData: user || state.userData,
                accessToken: accessToken || state.accessToken,
                refreshToken: refreshToken || state.refreshToken
            }
        });
    },
  
    _signUpUser: (user) => {
        setLocalStorage("user", user);

        set((_state) => {
            return {
                userData: user,
            };
        });
    },
    _verifyUser: () => {},
}));
