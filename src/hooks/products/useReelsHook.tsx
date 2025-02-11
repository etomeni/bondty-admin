import { useCallback, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
import { useSettingStore } from "@/state/settingStore";
import { reelInterface } from "@/typeInterfaces/reels.interface";


export function useReelsHook() {
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

    const [reels, setReels] = useState<reelInterface[]>();
    const [selectedReel, setSelectedReel] = useState<reelInterface>();
    

    const getAllReels = useCallback(async (
        pageNo: number = currentPageNo, limit: number = limitNo
    ) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/reel/all`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                },
                params: {
                    page: pageNo,
                    limit: limit,
                }
            })).data;
            console.log(response);

            if (response.statusCode == 200) {
                setReels(response.data);

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

    const addNewReel = useCallback(async (
        caption: string, reel_image: any,
        exFunc = () => {}
    ) => {
        setIsSubmitting(true);

        try {
            const data2db = new FormData();
            data2db.append('caption', caption );
            data2db.append('reel_image', reel_image );

            const response = (await axios.post(`${apiEndpoint}/admin/reel/new`, 
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

    const editReel = useCallback(async (
        id: string, caption: string, reel_image: any,
        exFunc = () => {}
    ) => {
        setIsSubmitting(true);

        try {
            const data2db = new FormData();
            data2db.append('id', id );
            data2db.append('caption', caption );
            data2db.append('reel_image', reel_image );

            const response = (await axios.patch(`${apiEndpoint}/admin/reel/edit`, 
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

    const deleteReel = useCallback(async (
        id: string, exFunc = () => {}
    ) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.delete(`${apiEndpoint}/admin/reel/delete/${id}`, 
                {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`
                    }
                }
        )).data;
            console.log(response);

            if (response.statusCode == 200) {
                // setReels(response.data);

                // setTotalRecords(response.count);
                setIsSubmitting(false);
                exFunc()
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

    const getReelById = useCallback(async (id: string) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/reel/${id}`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            })).data;
            // console.log(response);

            if (response.statusCode == 200) {
                setSelectedReel(response.data);
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

        reels,
        selectedReel, setSelectedReel,

        getAllReels,
        getReelById,
        addNewReel,
        editReel,
        deleteReel,
        uploadProgress,
    }
}
