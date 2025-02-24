import { useCallback, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
import { useSettingStore } from "@/state/settingStore";
import { 
    bookMerchantInterface,
} from "@/typeInterfaces/merchants.interface";


interface analyticsInterface {
    totalSales: {
        totalSales: any
    },
    paidBooksCount: number,
    freeBooksCount: number
}


export function useBookHook() {
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

    const [bookMerchant, setBookMerchant] = useState<bookMerchantInterface[]>();
    const [bookMerchantAnalytics, setBookMerchantAnalytics] = useState<analyticsInterface>();


    const getBookMerchant = useCallback(async (
        merchant_id: string,
        filter: "recently_added" | "paid" | "free",
        page = currentPageNo,
        limit = limitNo,
    ) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/book/merchant/${merchant_id}`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                },
                params: { filter, page, limit }
            })).data;
            // console.log(response);

            if (response.statusCode == 200) {
                setBookMerchant(response.data);
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

    const getBookMerchantCategory = useCallback(async (
        merchant_id: string,
        category: string,
        filter: "recently_added" | "paid" | "free",
        page = currentPageNo,
        limit = limitNo,
    ) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/book/merchant/category/${merchant_id}`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                },
                params: { category, filter, page, limit }
            })).data;
            // console.log(response);

            if (response.statusCode == 200) {
                setBookMerchant(response.data);
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

    const getBookMerchantAnalytics = useCallback(async (merchant_id: string) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/book/merchant/analytics/${merchant_id}`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            })).data;
            // console.log(response);

            // if (response.statusCode == 200) {
            //     setBookMerchantAnalytics(response.data);
            // }
            setBookMerchantAnalytics({
                freeBooksCount: response.freeBooksCount,
                paidBooksCount: response.paidBooksCount,
                totalSales: response.totalSales,
            });
    
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

    const searchBookMerchant = useCallback(async (merchant_id: string, searchWord: string) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/book/merchant/search/${merchant_id}`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
                params: {
                    search: searchWord
                }
            })).data;
            console.log(response);

            if (response.statusCode == 200) {
                // setBookMerchant(response.data);
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

    const deleteBook = useCallback(async (id: string, successFn = () => {}) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.delete(`${apiEndpoint}/admin/book/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                }
            })).data;
            // console.log(response);

            if (response.statusCode == 200) {
                // setBookMerchant(response.data);
            }
    
            successFn();
            
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

        bookMerchant,
        bookMerchantAnalytics,

        getBookMerchant,
        getBookMerchantCategory,
        getBookMerchantAnalytics,
        searchBookMerchant,
        deleteBook,
        // uploadProgress,
    }
}
