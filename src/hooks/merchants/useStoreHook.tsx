import { useCallback, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
import { useSettingStore } from "@/state/settingStore";
import { 
    completedNdeclinedStoreMerchantInterface,
    pendingStoreMerchantInterface,
    storeMerchantInterface,
} from "@/typeInterfaces/merchants.interface";


interface analyticsInterface {
    totalSales: number,
    completedCount: number,
    pendingCount: number,
    rejectedCount: number,
    totalAvailableItems: number,
}

interface allCategoriesInterface {
    id: string,
    created_at: string,
    updated_at: string,
    name: string,
}


export function useStoreHook() {
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

    const [allCategories, setAllCategories] = useState<allCategoriesInterface[]>([]);

    const [storeMerchant, setStoreMerchant] = useState<storeMerchantInterface[]>();
    const [storeMerchantAnalytics, setStoreMerchantAnalytics] = useState<analyticsInterface>();
    const [storeProductDetails, setStoreProductDetails] = useState<completedNdeclinedStoreMerchantInterface[]>();
    // const [completedStoreProduct, setCompletedStoreProduct] = useState<completedNdeclinedStoreMerchantInterface[]>();

    const [pendingStoreProduct, setPendingStoreProduct] = useState<pendingStoreMerchantInterface>();


    const getAllCategories = useCallback(async (
    ) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/product/all-categories`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            })).data;
            // console.log(response);

            if (response.statusCode == 200) {
                setAllCategories(response.data);
            }
    
            // _setToastNotification({
            //     display: true,
            //     status: "info",
            //     message: response.message
            // });
    
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

    const getMerchantStore = useCallback(async (
        merchant_id: string,
        category: string,
        page = currentPageNo,
        limit = limitNo,
    ) => {
        setIsSubmitting(true);
        setStoreMerchant(undefined);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/product/merchant/all/${merchant_id}`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                },
                params: { category, page, limit }
            })).data;
            // console.log(response);

            if (response.statusCode == 200) {
                setStoreMerchant(response.data);
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

    const getMerchantCompletedStoreProduct = useCallback(async (
        merchant_id: string,
        category: string,
        page = currentPageNo,
        limit = limitNo,
    ) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/product/merchant/order/completed/${merchant_id}`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                },
                params: { category, page, limit }
            })).data;
            // console.log(response);

            if (response.statusCode == 200) {
                setStoreProductDetails(response.data);
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

    const getMerchantPendingStoreProduct = useCallback(async (
        merchant_id: string,
        category: string,
        page = currentPageNo,
        limit = limitNo,
    ) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/product/merchant/order/pending/${merchant_id}`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                },
                params: { category, page, limit }
            })).data;
            // console.log(response);

            if (response.statusCode == 200) {
                setPendingStoreProduct(response.data);
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

    const getMerchantDeclinedStoreProduct = useCallback(async (
        merchant_id: string,
        category: string,
        page = currentPageNo,
        limit = limitNo,
    ) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/product/merchant/order/declined/${merchant_id}`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                },
                params: { category, page, limit }
            })).data;
            // console.log(response);

            if (response.statusCode == 200) {
                setStoreProductDetails(response.data);
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

    const getMerchantStoreAnalytics = useCallback(async (id: string) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/product/merchant/order/analytics/${id}`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            })).data;
            // console.log(response);

            if (response.statusCode == 200) {
                setStoreMerchantAnalytics(response.data);
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

    const searchStoreMerchant = useCallback(async (merchant_id: string, searchWord: string) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/product/merchant/search/${merchant_id}`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
                params: {
                    search: searchWord
                }
            })).data;
            console.log(response);

            if (response.statusCode == 200) {
                // setStoreMerchant(response.data);
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


    return {
        apiResponse, setApiResponse,
        _setToastNotification,
        
        limitNo, setLimitNo,
        currentPageNo, setCurrentPageNo,
        totalRecords, setTotalRecords,
        totalPages, setTotalPages,

        isSubmitting,

        storeMerchant,
        allCategories,
        storeMerchantAnalytics,
        storeProductDetails,
        // completedStoreProduct,
        // declinedStoreProduct,
        pendingStoreProduct,

        getMerchantStore,
        getAllCategories,
        getMerchantDeclinedStoreProduct,
        getMerchantPendingStoreProduct,
        getMerchantCompletedStoreProduct,
        getMerchantStoreAnalytics,
        searchStoreMerchant,
        // uploadProgress,
    }
}
