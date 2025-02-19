import { useCallback, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
import { useSettingStore } from "@/state/settingStore";
import { 
    securityDetailsInterface, securityMerchantFeedbackInterface, 
    securityMerchantJobHandledInterface, securityMerchantStatsInterface 
} from "@/typeInterfaces/merchants.interface";



export function useSecurityHook() {
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

    const [securityDetails, setSecurityDetails] = useState<securityDetailsInterface[]>();
    const [securityMerchantStats, setSecurityMerchantStats] = useState<securityMerchantStatsInterface[]>();
    const [securityMerchantJobHandled, setSecurityMerchantJobHandled] = useState<securityMerchantJobHandledInterface[]>();
    const [securityMerchantFeedback, setSecurityMerchantFeedback] = useState<securityMerchantFeedbackInterface[]>();


    const getSecurityDetailsById = useCallback(async (id: string) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/security/${id}`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            })).data;
            // console.log(response);

            if (response.statusCode == 200) {
                setSecurityDetails(response.data);
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


    const getSecurityMerchantFeedback = useCallback(async (merchant_id: string) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/security/merchant/feedback/${merchant_id}`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            })).data;
            console.log(response);

            if (response.statusCode == 200) {
                setSecurityMerchantFeedback(response.data);
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

    const getSecurityMerchantJobHandled = useCallback(async (id: string) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/security/merchant/job-handled/${id}`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            })).data;
            console.log(response);

            if (response.statusCode == 200) {
                setSecurityMerchantJobHandled(response.data);
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

    const getSecurityMerchantStats = useCallback(async (id: string) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/security/merchant-stats/${id}`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            })).data;
            console.log(response);

            if (response.statusCode == 200) {
                setSecurityMerchantStats(response.data);
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

    const searchSecurityMerchantFeedback = useCallback(async (merchant_id: string, searchWord: string) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/security/merchant/search/${merchant_id}`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                },
                params: {
                    search: searchWord
                }
            })).data;
            console.log(response);

            if (response.statusCode == 200) {
                setSecurityMerchantFeedback(response.data);
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

        securityDetails,
        securityMerchantStats,
        securityMerchantJobHandled,
        securityMerchantFeedback,

        getSecurityDetailsById,
        getSecurityMerchantStats,
        getSecurityMerchantJobHandled,
        getSecurityMerchantFeedback,
        searchSecurityMerchantFeedback,
        // uploadProgress,
    }
}
