import { useCallback, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
import { useSettingStore } from "@/state/settingStore";
import { 
    advertiseInterface, createNewBannerInterface, 
    createNewInprofileInterface, reviewRequestInterface 
} from "@/typeInterfaces/advertise.interface";


export function useAdvertiseHook() {
    const refreshToken = useUserStore((state) => state.refreshToken);
    // const accessToken = useUserStore((state) => state.accessToken);
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
    
    const [pendingAdvertisement, setPendingAdvertisement] = useState<advertiseInterface[]>();
    const [liveAdvertisement, setLiveAdvertisement] = useState<advertiseInterface[]>();
    const [selectedAdvertisement, setSelectedAdvertisement] = useState<advertiseInterface>();
    

    const getPendingAdvertisements = useCallback(async (pageNo = currentPageNo, limit = limitNo) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/advertise/pending`, {
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
                setPendingAdvertisement(response.data);

                // setCurrentPageNo(response.currentPage);
                // setTotalPages(response.totalPages);
                // setTotalRecords(response.count);

            }

            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });

            setApiResponse({
                display: true,
                status: true,
                message: response.message
            });

            setIsSubmitting(false);

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

    const getLiveAdvertisements = useCallback(async (pageNo = currentPageNo, limit = limitNo) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/advertise/live`, {
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
                setLiveAdvertisement(response.data);

                // setCurrentPageNo(response.currentPage);
                // setTotalPages(response.totalPages);
                // setTotalRecords(response.count);
            }

            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });

            setApiResponse({
                display: true,
                status: true,
                message: response.message
            });

            setIsSubmitting(false);

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

    const getAdvertisementsById = useCallback(async (id: string) => {
        setIsSubmitting(true);

        setApiResponse({
            display: false,
            status: false,
            message: ''
        });

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/advertise/${id}`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                },
                // params: {
                //     page: pageNo,
                //     limit: limit,
                // }
            })).data;
            console.log(response);

            if (response.statusCode == 200) {
                setSelectedAdvertisement(response.data);

                // setCurrentPageNo(response.currentPage);
                // setTotalPages(response.totalPages);
                // setTotalRecords(response.count);
            }

            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });

            // setApiResponse({
            //     display: true,
            //     status: true,
            //     message: response.message
            // });

            setIsSubmitting(false);

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

            // setApiResponse({
            //     display: true,
            //     status: false,
            //     message: err.errors && err.length ? err[0].message : err.message || fixedErrorMsg
            // });

            setIsSubmitting(false);
        }
    }, []);


    const createNewAdvertisementBanner = useCallback(async (
        newBanner: createNewBannerInterface,
        exFunc = () => {}
    ) => {
        setIsSubmitting(true);

        try {
            const data2db = new FormData();
            data2db.append('action_url', newBanner.action_url );
            data2db.append('location', JSON.stringify(newBanner.location));
            data2db.append('placement', newBanner.placement );
            data2db.append('duration', newBanner.duration );
            data2db.append('banner_image', newBanner.banner_image );


            const response = (await axios.post(`${apiEndpoint}/admin/advertise/new-banner`, 
                data2db,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${refreshToken}`
                    },
                    onUploadProgress: (progressEvent) => {
                        const loaded = progressEvent.loaded;
                        const total = progressEvent.total || 0;
                        const percentage = Math.floor((loaded * 100) / total );

                        if (percentage < 100) {
                            // setSongUploadProgress(percentage);
                        }
                    },
                }
            )).data;

            console.log(response);

            if (response.statusCode == 200) {
                // setSelectedAdvertisement(response.data);

                // setTotalRecords(response.count);
            }
            setIsSubmitting(false);
            exFunc()

            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });

            setApiResponse({
                display: true,
                status: true,
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

    const createNewInprofileAdvertisement = useCallback(async (
        newBanner: createNewInprofileInterface,
        exFunc = () => {}
    ) => {
        setIsSubmitting(true);

        try {
            const data2db = new FormData();
            data2db.append('action_url', newBanner.action_url );
            data2db.append('title', newBanner.title );
            data2db.append('location', JSON.stringify(newBanner.location));
            data2db.append('description', newBanner.description );
            data2db.append('duration', newBanner.duration );
            data2db.append('profile_image', newBanner.profile_image );


            const response = (await axios.post(`${apiEndpoint}/admin/advertise/new-inprofile`, 
                data2db,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${refreshToken}`
                    },
                    onUploadProgress: (progressEvent) => {
                        const loaded = progressEvent.loaded;
                        const total = progressEvent.total || 0;
                        const percentage = Math.floor((loaded * 100) / total );

                        if (percentage < 100) {
                            // setSongUploadProgress(percentage);
                        }
                    },
                }
            )).data;

            console.log(response);

            if (response.statusCode == 200) {
                // setSelectedAdvertisement(response.data);

                // setTotalRecords(response.count);
            }
            setIsSubmitting(false);
            exFunc()

            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });

            setApiResponse({
                display: true,
                status: true,
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

    const reviewAdvertisementRequest = useCallback(async (
        data2db: reviewRequestInterface,
        exFunc = () => {}
    ) => {
        setIsSubmitting(true);

        try {

            const response = (await axios.post(`${apiEndpoint}/admin/advertise/review`, 
                data2db,
                {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`
                    },
                    onUploadProgress: (progressEvent) => {
                        const loaded = progressEvent.loaded;
                        const total = progressEvent.total || 0;
                        const percentage = Math.floor((loaded * 100) / total );

                        if (percentage < 100) {
                            // setSongUploadProgress(percentage);
                        }
                    },
                }
            )).data;

            console.log(response);

            if (response.statusCode == 200) {
                // setSelectedAdvertisement(response.data);

                // setTotalRecords(response.count);
            }
            setIsSubmitting(false);
            exFunc()

            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });

            setApiResponse({
                display: true,
                status: true,
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

        limitNo, setLimitNo,
        currentPageNo, setCurrentPageNo,
        totalRecords, setTotalRecords,
        totalPages, setTotalPages,

        isSubmitting,

        liveAdvertisement,
        pendingAdvertisement,
        selectedAdvertisement,
        getLiveAdvertisements,
        getPendingAdvertisements,
        getAdvertisementsById,
        reviewAdvertisementRequest,
        createNewAdvertisementBanner,
        createNewInprofileAdvertisement,
    }
}
