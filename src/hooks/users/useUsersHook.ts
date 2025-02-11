import { useCallback, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
import { useSettingStore } from "@/state/settingStore";
import { usersDetailsInterface, usersListInterface, userTravelLocationInterface } from "@/typeInterfaces/users.interface";



interface transactionPaymentsInterfcae {
    id: string;
    created_at: string;
    updated_at: string;
    payer_id: string;
    target_id: string;
    target_type: string;
    transaction_id: string;
    amount: string;
    currency: string;
    status: string;
    payment_url: string;
    payment_provider: string;
}
interface transactionWithrawalsInterfcae {
    id: string;
    created_at: string;
    updated_at: string;
    user_id: string;
    bank_id: string;
    paypal_id: string;
    amount: string;
    method: string;
    withdrawal_status: string;
}


export function useUsersHook() {
    const refreshToken = useUserStore((state) => state.refreshToken);
    const accessToken = useUserStore((state) => state.accessToken);
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

    const [users, setUsers] = useState<usersListInterface[]>();
    const [selectedUserDetails, setSelectedUserDetails] = useState<usersDetailsInterface>();
    const [userTravelLocations, setUserTravelLocations] = useState<userTravelLocationInterface[]>();
    const [transactionPayments, setTransactionPayments] = useState<transactionPaymentsInterfcae[]>();
    const [transactionWithrawals, setTransactionWithrawals] = useState<transactionWithrawalsInterfcae[]>();
    const [dytTransactions, setDytTransactions] = useState<any[]>();
    

    const getUsers = useCallback(async (pageNo: number, limitNo: number) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/user/all`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                },
                params: {
                    page: pageNo,
                    limit: limitNo,
                }
            })).data;
            console.log(response);

            if (response.statusCode == 200) {
                setUsers(response.data);

                // setCurrentPageNo(response.currentPage);
                // setTotalPages(response.totalPages);
                setTotalRecords(response.count);

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

    const getFreeUsers = useCallback(async (pageNo: number, limitNo: number) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/user/free`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    page: pageNo,
                    limit: limitNo,
                }
            })).data;
            // console.log(response);

            if (response.statusCode == 200) {
                setUsers(response.data);

                // setCurrentPageNo(response.currentPage);
                // setTotalPages(response.totalPages);
                setTotalRecords(response.count);

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

    const getPremiumUsers = useCallback(async (pageNo: number, limitNo: number) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/user/premium`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    page: pageNo,
                    limit: limitNo,
                }
            })).data;
            // console.log(response);

            if (response.statusCode == 200) {
                setUsers(response.data);

                // setCurrentPageNo(response.currentPage);
                // setTotalPages(response.totalPages);
                setTotalRecords(response.count);

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

    const getVerifiedUsers = useCallback(async (pageNo: number, limitNo: number) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/user/verified`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    page: pageNo,
                    limit: limitNo,
                }
            })).data;
            // console.log(response);

            if (response.statusCode == 200) {
                setUsers(response.data);

                // setCurrentPageNo(response.currentPage);
                // setTotalPages(response.totalPages);
                setTotalRecords(response.count);

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

    const getNotVerifiedUsers = useCallback(async (pageNo: number, limitNo: number) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/user/not-verified`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    page: pageNo,
                    limit: limitNo,
                }
            })).data;
            // console.log(response);

            if (response.statusCode == 200) {
                setUsers(response.data);

                // setCurrentPageNo(response.currentPage);
                // setTotalPages(response.totalPages);
                setTotalRecords(response.count);

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

    const getUserById = useCallback(async (id: string) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            console.log(response);

            if (response.statusCode == 200) {
                setSelectedUserDetails(response.data);
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

    const suspendUserById = useCallback(async (id: string, exfunc = () => {}) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/user/suspend/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            // console.log(response);

            if (response.statusCode == 200) {
                exfunc();
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
            console.log(err);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.length ? err[0].message : err.message || fixedErrorMsg
            });

            setIsSubmitting(false);
        }
    }, []);

    const getUserTravelLocations = useCallback(async (id: string) => {
        try {
            const response = (await axios.get(`${apiEndpoint}/admin/user/travel/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            console.log(response);

            if (response.statusCode == 200) {
                setUserTravelLocations(response.data);
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

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.length ? err[0].message : err.message || fixedErrorMsg
            });
        }
    }, []);

    const getUserTransactionHistory = useCallback(async (id: string, pageNo: number, limitNo: number) => {
        try {
            const response = (await axios.get(`${apiEndpoint}/admin/user/transaction-history/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    page: pageNo,
                    limit: limitNo,
                }
            })).data;
            console.log(response);

            if (response.statusCode == 200) {
                setTransactionPayments(response.data.payments);
                setTransactionWithrawals(response.data.withrawals);
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

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.length ? err[0].message : err.message || fixedErrorMsg
            });
        }
    }, []);

    const getUserDytTransactionHistory = useCallback(async (id: string, pageNo: number, limitNo: number) => {
        try {
            const response = (await axios.get(`${apiEndpoint}/admin/user/dyt-history/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    page: pageNo,
                    limit: limitNo,
                }
            })).data;
            console.log(response);

            if (response.statusCode == 200) {
                setDytTransactions(response.data);
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

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.length ? err[0].message : err.message || fixedErrorMsg
            });
        }
    }, []);


    const searchUsers = useCallback(async (searchWord: string, pageNo: number = 1, limitNo: number = 100) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/users/search`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    search: searchWord,
                    page: pageNo,
                    limit: limitNo,
                }
            })).data;
            // console.log(response);

            if (response.status) {
                setUsers(response.result.data);

                setCurrentPageNo(response.result.currentPage);
                setTotalPages(response.result.totalPages);
                setTotalRecords(response.result.totalRecords);

                setIsSubmitting(false);
            }
    
        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);
            // setUsers([]);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });

            setIsSubmitting(false);
        }
    }, []);



    return {
        apiResponse, setApiResponse,

        limitNo, setLimitNo,
        currentPageNo, setCurrentPageNo,
        totalRecords, setTotalRecords,
        totalPages, setTotalPages,

        isSubmitting,

        // singleUsers, albumUsers,
        users, 
        selectedUserDetails,
        transactionPayments,
        transactionWithrawals,
        dytTransactions,
        getUsers,
        getNotVerifiedUsers,
        getFreeUsers,
        getPremiumUsers,
        getVerifiedUsers,
        getUserById,
        userTravelLocations,
        getUserTravelLocations,
        suspendUserById,
        getUserTransactionHistory,
        getUserDytTransactionHistory,
        searchUsers,
    }
}
