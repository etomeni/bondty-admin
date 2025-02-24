import { useCallback, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
import { useSettingStore } from "@/state/settingStore";
import { 
    activePlaceAnalyticsInterface,
    placeMerchantInterface,
} from "@/typeInterfaces/merchants.interface";


interface analyticsInterface {
    totalSales: string,
    totalReservations: number,
    totalDeclined: number
}

export function usePlaceHook() {
    // const accessToken = useUserStore((state) => state.accessToken);
    const refreshToken = useUserStore((state) => state.refreshToken);
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    const [limitNo, setLimitNo] = useState(25);
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [uploadProgress, setUploadProgress] = useState(0);

    const [placeMerchant, setPlaceMerchant] = useState<placeMerchantInterface[]>();
    const [selectedPlace, setSelectedPlace] = useState<activePlaceAnalyticsInterface>();
    const [placeMerchantAnalytics, setPlaceMerchantAnalytics] = useState<analyticsInterface>();


    const getPlaceMerchant = useCallback(async (
        merchant_id: string,
    ) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/place/merchant/all/${merchant_id}`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                },
                // params: { filter, page, limit }
            })).data;
            // console.log(response);

            setPlaceMerchant(response.places);
    
            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });
    
            setIsSubmitting(false);
        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            // console.log(err);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.length ? err[0].message : err.message || fixedErrorMsg
            });

            setIsSubmitting(false);
        }
    }, []);

    const getPlaceById = useCallback(async (
        id: string,
    ) => {
        setIsSubmitting(true);
        setSelectedPlace(undefined);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/place/${id}`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                },
                // params: { filter, page, limit }
            })).data;
            // console.log(response);

            setSelectedPlace(response);
    
            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });
    
            setIsSubmitting(false);
        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            // console.log(err);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.length ? err[0].message : err.message || fixedErrorMsg
            });

            setIsSubmitting(false);
        }
    }, []);

    const getPlaceMerchantAnalytics = useCallback(async (merchant_id: string) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/place/analytics/${merchant_id}`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            })).data;
            // console.log(response);

            if (response.statusCode == 200) {
                setPlaceMerchantAnalytics({
                    totalDeclined: response.totalDeclined,
                    totalReservations: response.totalReservations,
                    totalSales: response.totalSales,
                });
            }
    
            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });
    
            setIsSubmitting(false);
        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            // console.log(err);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.length ? err[0].message : err.message || fixedErrorMsg
            });

            setIsSubmitting(false);
        }
    }, []);

    const searchPlaceMerchant = useCallback(async (merchant_id: string, searchWord: string) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/place/merchant/search/${merchant_id}`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
                params: {
                    search: searchWord
                }
            })).data;
            console.log(response);

            if (response.statusCode == 200) {
                // setPlaceMerchant(response.data);
            }
    
            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });
    
            setIsSubmitting(false);
        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            // console.log(err);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.length ? err[0].message : err.message || fixedErrorMsg
            });

            setIsSubmitting(false);
        }
    }, []);

    const deletePlace = useCallback(async (id: string, successFn = () => {}) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.delete(`${apiEndpoint}/admin/place/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                }
            })).data;
            // console.log(response);

            if (response.statusCode == 200) {
                // setPlaceMerchant(response.data);
            }

            successFn()
    
            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });
    
            setIsSubmitting(false);
        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            // console.log(err);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.length ? err[0].message : err.message || fixedErrorMsg
            });

            setIsSubmitting(false);
        }
    }, []);



    return {
        apiResponse, setApiResponse,
        _setToastNotification,
        
        limitNo, setLimitNo,
        currentPageNo, setCurrentPageNo,
        totalRecords, setTotalRecords,
        totalPages, setTotalPages,

        isSubmitting,

        placeMerchant,
        selectedPlace, setSelectedPlace,
        placeMerchantAnalytics,

        getPlaceMerchant,
        getPlaceById,
        getPlaceMerchantAnalytics,
        searchPlaceMerchant,
        deletePlace,
        // uploadProgress,
    }
}
