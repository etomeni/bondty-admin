import { create } from "zustand";
import { SnackbarToastInterface } from "../components/ToastNotification";


const defaulToastNotification: SnackbarToastInterface = {
    status: "info",
    display: false,
    message: '',
}


type _typeInterface_ = {
    toastNotification: SnackbarToastInterface;

    _setToastNotification: (toast: SnackbarToastInterface) => void;


    // updatePlayerAsync: () => Promise<void>;
};

export const useSettingStore = create<_typeInterface_>((set) => ({
    toastNotification: defaulToastNotification,

    _setToastNotification: (toast) => {
        set((_state) => {
            return { toastNotification: toast };
        });
    },

  
}));
