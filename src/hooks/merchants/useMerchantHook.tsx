import { useCallback, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
import { useSettingStore } from "@/state/settingStore";
import { merchantDetailsInterface, pendingMerchantInterface } from "@/typeInterfaces/merchants.interface";



interface updateDataInterface {
    id: string,
    service: string,
    firstName: string,
    lastName: string,
    businessEmail: string,
}


export function useMerchantHook() {
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
    const [uploadProgress, setUploadProgress] = useState(0);

    const [merchants, setMerchants] = useState<merchantDetailsInterface[]>();
    const [pendingMerchants, setPendingMerchants] = useState<pendingMerchantInterface[]>();
    const [selectedMerchant, setSelectedMerchant] = useState<merchantDetailsInterface>();
    

    const getAllPendingMerchants = useCallback(async (
        pageNo: number = currentPageNo, limit: number = limitNo
    ) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/api/v1/merchants/pending`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                },
                params: {
                    page: pageNo,
                    limit: limit,
                }
            })).data;
            // console.log(response);

            if (response.statusCode == 200) {
                setPendingMerchants(response.data);

                // setTotalRecords(response.count);
                setIsSubmitting(false);
            }

            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });
    
        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);
            // setUsers([]);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.length ? err[0].message : err.message || fixedErrorMsg
            });

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.length ? err[0].message : err.message || fixedErrorMsg
            });

            setIsSubmitting(false);
        }
    }, []);

    const getMerchantById = useCallback(async (id: string) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/api/v1/merchants/${id}`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            })).data;
            // console.log(response);

            if (response.statusCode == 200) {
                setSelectedMerchant(response.data);
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

    const reviewPendingMerchant = useCallback(async (
        id: string, feedbackStatus: boolean,
        exFunc = () => {}
    ) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.patch(`${apiEndpoint}/api/v1/merchants/review`, 
                {
                    id,
                    status: feedbackStatus ? "approved" : "rejected"                  
                },
                {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            })).data;
            // console.log(response);

            // if (response.statusCode == 200) {
            //     setSelectedMerchant(response.data);
            // }

            exFunc();

            setApiResponse({
                display: true,
                status: true,
                message: response.message
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

            setApiResponse({
                display: true,
                status: false,
                message: err.message
            });

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.length ? err[0].message : err.message || fixedErrorMsg
            });

            setIsSubmitting(false);
        }
    }, []);

    const getMerchantsByCategory = useCallback(async (category: string) => {
        setIsSubmitting(true);
        setMerchants(undefined);

        try {
            const response = (await axios.get(`${apiEndpoint}/api/v1/merchants/category/${category}`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            })).data;
            console.log(response);

            if (response.statusCode == 200) {
                setMerchants(response.data);
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


    const deleteMerchant = useCallback(async (
        id: string, exFunc = () => {}
    ) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.delete(`${apiEndpoint}/api/v1/merchants/delete/${id}`, 
                {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`
                    }
                }
        )).data;
            console.log(response);

            setIsSubmitting(false);

            // if (response.statusCode == 200) {
            //     // setReels(response.data);
            //     // setTotalRecords(response.count);
            // }
            exFunc();

            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });
    
        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);
            // setUsers([]);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.length ? err[0].message : err.message || fixedErrorMsg
            });

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.length ? err[0].message : err.message || fixedErrorMsg
            });

            setIsSubmitting(false);
        }
    }, []);

    const blockMerchant = useCallback(async (
        id: string, exFunc = () => {}
    ) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.patch(`${apiEndpoint}/api/v1/merchants/block/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`
                    }
                }
        )).data;
            console.log(response);

            setIsSubmitting(false);

            // if (response.statusCode == 200) {
            //     // setReels(response.data);
            //     // setTotalRecords(response.count);
            // }
            exFunc();

            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });
    
        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);
            // setUsers([]);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.length ? err[0].message : err.message || fixedErrorMsg
            });

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.length ? err[0].message : err.message || fixedErrorMsg
            });

            setIsSubmitting(false);
        }
    }, []);


    const updateMerchant = useCallback(async (
        newData: updateDataInterface,
        exFunc = () => {}
    ) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.put(`${apiEndpoint}/api/v1/merchants`, 
                newData,
                {
                    headers: {
                        // 'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${refreshToken}`
                    },
                    onUploadProgress: (progressEvent) => {
                        const loaded = progressEvent.loaded;
                        const total = progressEvent.total || 0;
                        const percentage = Math.floor((loaded * 100) / total );

                        if (percentage < 100) {
                            setUploadProgress(percentage);
                        }
                    },
                }
            )).data;
            // console.log(response);

            if (response.statusCode == 200) {
                // setReels(response.data);

                // setTotalRecords(response.count);
            }
            setIsSubmitting(false);
            exFunc()
            setUploadProgress(0);

            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });
    
        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);
            // setUsers([]);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.length ? err[0].message : err.message || fixedErrorMsg
            });

            setApiResponse({
                display: true,
                status: false,
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

        merchants,
        pendingMerchants,
        selectedMerchant, setSelectedMerchant,

        getAllPendingMerchants,
        getMerchantById,
        updateMerchant,
        deleteMerchant,
        blockMerchant,
        reviewPendingMerchant,
        getMerchantsByCategory,
        uploadProgress,
    }
}
