import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

import kolors from '@/constants/kolors';
import { themeBtnStyle } from '@/util/mui';
import { convertToBase64 } from '@/util/resources';
import { useStickersHook } from '@/hooks/products/useStickersHook';


interface _Props {
    openUploadStickerModal: boolean,
    closeUploadStickerModal: (state: boolean) => void,
}

export const UploadStickerModal: React.FC<_Props> = ({
    openUploadStickerModal, closeUploadStickerModal,
}) => {
    const [priceInputValue, setPriceInputValue] = useState('');
    const [nameInputValue, setNameInputValue] = useState('');
    const [iconInputValue, setIconInputValue] = useState('');
    const [inputIconImage, setInputIconImage] = useState<any>();

    const {
        apiResponse, setApiResponse,
        isSubmitting,
        addNewSticker,
        getAllSticker,
    } = useStickersHook();

    useEffect(() => {
        if (!openUploadStickerModal) {
            setPriceInputValue('');
            setNameInputValue('');
            setIconInputValue('');
            setInputIconImage(undefined);
        }
    }, [openUploadStickerModal]);
    
    
    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0]; 
        setInputIconImage(file);

        const base64 = await convertToBase64(file);
        console.log(base64.result);
        setIconInputValue(base64.result);
    
        e.target.value = "";
    }

    const handleSubmit = () => {
        setApiResponse({
            display: false,
            status: false,
            message: ""
        });

        if (!priceInputValue) {
            setApiResponse({
                display: true,
                status: false,
                message: "Price for the new sticker is required."
            });
            return;
        }

        if (!nameInputValue) {
            setApiResponse({
                display: true,
                status: false,
                message: "Sticker name is required."
            });
            return;
        }

        if (!iconInputValue || !inputIconImage) {
            setApiResponse({
                display: true,
                status: false,
                message: "Sticker icon is required."
            });
            return;
        }

        addNewSticker(
            nameInputValue, Number(priceInputValue), 
            inputIconImage, 
            () => {
                getAllSticker();

                setTimeout(() => {
                    closeUploadStickerModal(false);
                }, 3000);
            }
        );
    }
    

    return (
        <Modal
            open={openUploadStickerModal}
            onClose={() => closeUploadStickerModal(false) }
            aria-labelledby="payout-modal-title"
            aria-describedby="payout-modal-description"
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    outline: "none",
                }}
            >
                <Box p={2}
                    sx={{
                        bgcolor: "#fff",
                        width: "100%",
                        maxWidth: {xs: "92%", sm: "496px"},
                        // maxHeight: "605px",
                        maxHeight: "95%",
                        borderRadius: "12px",
                        // p: "25px",
                        color: kolors.dark,
                        overflow: "scroll"
                    }}
                >
                    <Box id='payout-modal-title'>
                        <Stack direction="row" spacing="20px"
                            alignItems="center" justifyContent="space-between"
                        >
                            <Box></Box>

                            <IconButton onClick={() => closeUploadStickerModal(false)}>
                                <CloseIcon sx={{color: kolors.primary, fontSize: "20px"}} />
                            </IconButton>
                        </Stack>
                    </Box>

                    <Box id='payout-modal-description'>
                        <Box
                            sx={{
                                width: "150px",
                                height: "120px",
                                border: `1px solid ${kolors.border}`,
                                borderRadius: "8px",
                                bgcolor: "#EFEFEF66", // "0A000066"
                                textAlign: "center",
                                mx: "auto",
                                my: 2, py: 1,
                                // position: "relative",
                            }}
                            onClick={() => {
                                document.getElementById("stickerImage")?.click();
                            }}
                        >
                            {
                                iconInputValue ? 
                                    <img 
                                        src={iconInputValue} alt='stickers image'
                                        style={{
                                            // width: "100%",
                                            maxWidth: "100px",
                                            maxHeight: "100px",
                                            // borderRadius: "8px",
                                            // height: "100%",
                                            marginTop: "15px",
                                            margin: "auto",

                                            objectFit: "contain",
                                        }}
                                    />
                                :
                                <IconButton size='small' sx={{ mt: 2.5 }}>
                                    <CloudUploadOutlinedIcon 
                                        sx={{ 
                                            color: kolors.border, 
                                            fontSize: "70px",
                                        }} 
                                    />
                                </IconButton>
                            }
                        </Box>

                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "14px",
                                color: kolors.dark,
                                textAlign: "center",
                            }}
                        >Upload sticker image</Typography>

                        <Box my={2}>
                            <Typography
                                sx={{
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    color: "#595757",
                                }}
                            >Sticker name </Typography>

                            <TextField variant="outlined" 
                                fullWidth
                                type='text'
                                placeholder=''
                                inputMode='text'
                                size='small'
                                sx={{
                                    // ...authMuiTextFieldStyle
                                }}

                                value={nameInputValue}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    // console.log(value);
                                    setNameInputValue(value);
                                }}
                            />
                        </Box>

                        <Box my={2}>
                            <Typography
                                sx={{
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    color: "#595757",
                                }}
                            >Price </Typography>

                            <TextField variant="outlined"
                                fullWidth 
                                type='number'
                                placeholder='0.00'
                                inputMode='numeric'
                                size='small'
                                sx={{
                                    // ...authMuiTextFieldStyle
                                }}
                                slotProps={{
                                    input: {
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    },
                                }}

                                value={priceInputValue}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    // console.log(value);
                                    setPriceInputValue(value);
                                }}
                            />
                        </Box>

                        {
                            apiResponse.display && (
                                <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                                    <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                </Stack>
                            )
                        }

                        <Stack direction="row" alignItems="center" justifyContent="center" mt={3}>
                            <Button variant="contained" size='small'
                                type="button"
                                onClick={() => handleSubmit()}
                                disabled={isSubmitting}
                                sx={{
                                    ...themeBtnStyle,
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    // lineHeight: 14.52px;
                                }}
                            >Save</Button>
                        </Stack>

                    </Box>
                </Box>

                <input 
                    type="file" 
                    id='stickerImage' 
                    name="stickerImage" 
                    accept='image/*' 
                    onChange={handleFileUpload}
                    style={{display: "none"}}
                />
            </Box>
        </Modal>
    )
}
