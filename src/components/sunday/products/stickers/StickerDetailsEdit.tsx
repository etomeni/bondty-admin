import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

import kolors from '@/constants/kolors';
import { themeBtnStyle } from '@/util/mui';
import { convertToBase64 } from '@/util/resources';
import { stickerInterface } from '@/typeInterfaces/stickers.interface';


interface _Props {
    isSubmitting: boolean,
    selectedSticker: stickerInterface,
    deleteStickerBtn: (sticker: stickerInterface) => void
    saveStickerBtn: (oldSticker: stickerInterface, newSticker: any) => void
};

const StickerDetailsEditComponent: React.FC<_Props> = ({
    selectedSticker, deleteStickerBtn, saveStickerBtn, isSubmitting
}) => {
    const [priceInputValue, setPriceInputValue] = useState('');
    const [nameInputValue, setNameInputValue] = useState('');
    const [iconInputValue, setIconInputValue] = useState('');
    const [inputIconImage, setInputIconImage] = useState<any>();

    useEffect(() => {
        setPriceInputValue(selectedSticker.price);
        setNameInputValue(selectedSticker.name);
        setIconInputValue(selectedSticker.url);

        setInputIconImage(undefined);
    }, [selectedSticker])
    
    
    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0]; 
        setInputIconImage(file);

        const base64 = await convertToBase64(file);
        // console.log(base64.result);
        setIconInputValue(base64.result);
    
        e.target.value = "";
    }

    
    return (
        <Box
            sx={{
                border: `1px solid ${kolors.border}`,
                // bgcolor: "#fff",
                borderRadius: 2,
                p: 1.5,
                my: 3,
                width: "220px"
            }}
        >
            <Stack direction="row" spacing="10px" alignItems="center" justifyContent="space-between">
                <Box></Box>

                <Button variant="contained" size='small'
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => saveStickerBtn(
                        selectedSticker,
                        {
                            name: nameInputValue,
                            icon: iconInputValue,
                            price: priceInputValue,
                            image: inputIconImage,
                            imagePreview: iconInputValue
                        }
                    )}
                        
                    sx={{
                        ...themeBtnStyle,
                        fontSize: "12px",
                        fontWeight: "600",
                        // lineHeight: 14.52px;
                    }}
                >Save</Button>
            </Stack>
            
            <Box
                sx={{
                    width: "100px",
                    height: "70px",
                    borderRadius: "8px",
                    bgcolor: "#EFEFEF",
                    textAlign: "center",
                    mx: "auto",
                    my: 2, py: 1,
                    position: "relative",
                }}
                onClick={() => {
                    document.getElementById("stickerImage")?.click();
                }}
            >
                <img 
                    src={iconInputValue} alt='stickers image'
                    style={{
                        // width: "100%",
                        maxWidth: "60px",
                        // borderRadius: "8px",
                        // height: "100%",
                        objectFit: "contain",
                    }}
                />

                <Box 
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0, left: 0,
                        bgcolor: "#0A000066",
                        m: "auto",
                        borderRadius: 2
                    }}
                >
                    <IconButton size='small' sx={{ mt: 2.5 }}>
                        <CloudUploadOutlinedIcon sx={{ color: "#fff", fontSize: "30px" }} />
                    </IconButton>
                </Box>
            </Box>

            <Box>
                <Stack direction="row" spacing="10px" alignItems="center" mb={2}>
                    <Typography
                        sx={{
                            fontWeight: "600",
                            fontSize: "16px",
                            color: kolors.dark,
                        }}
                    >Name: </Typography>

                    <Box>
                        <TextField variant="outlined" 
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
                </Stack>

                <Stack direction="row" spacing="10px" alignItems="center" mb={2}>
                    <Typography
                        sx={{
                            fontWeight: "600",
                            fontSize: "16px",
                            color: kolors.dark,
                        }}
                    >Price: </Typography>

                    <Box>
                        <TextField variant="outlined" 
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
                </Stack>
            </Box>

            <Stack direction="row" alignItems="center" justifyContent="center" mt={3}>
                <Button variant="contained" size='small'
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => deleteStickerBtn(selectedSticker)}
                    sx={{
                        ...themeBtnStyle,
                        fontSize: "12px",
                        fontWeight: "600",
                        // lineHeight: 14.52px;
                    }}
                >Delete sticker</Button>
            </Stack>

            
            <input 
                type="file" 
                id='stickerImage' 
                name="stickerImage" 
                accept='image/*' 
                onChange={handleFileUpload}
                style={{display: "none"}}
            />
        </Box>
    )
}

export default StickerDetailsEditComponent;
