import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// import Autocomplete from '@mui/material/Autocomplete';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

import { themeBtnStyle } from '@/util/mui'; 
import { convertToBase64 } from '@/util/resources';
import { useAdvertiseHook } from '@/hooks/advertise/useAdvertiseHook';
import { createNewBannerInterface, placesLocationInterface } from '@/typeInterfaces/advertise.interface';
// import Autocomplete from "react-google-autocomplete";
import { usePlacesWidget } from "react-google-autocomplete";
import Chip from '@mui/material/Chip';


interface _Props {
    adsPlacement: string;
};

const NewEditBannerAdsComponent: React.FC<_Props> = ({
    adsPlacement 
}) => {
    // const navigate = useNavigate();
    const {id} = useParams();
    const apiKey = `${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}`;

    const [durationValue, setDurationValue] = useState<number>(30);
    const [inputAdLinkValue, setInputAdLinkValue] = useState('');
    const [selectedLocationPlace, setSelectedLocationPlace] = useState<placesLocationInterface[]>([]);
    // const [fullLocationPlace, setFullLocationPlace] = useState('');

    const [iconInputValue, setIconInputValue] = useState('');
    const [inputIconImage, setInputIconImage] = useState<any>();

    const { ref: locationMUIRef } = usePlacesWidget({
        apiKey: apiKey,
        onPlaceSelected: (place) => { handleSelectPlace(place); },
        // inputAutocompleteValue: "country",
        options: {
            types: ["geocode", "establishment"],
            // componentRestrictions: { country },
        },
    });


    const { 
        apiResponse, setApiResponse,
        isSubmitting,
        selectedAdvertisement,
        getAdvertisementsById,
        createNewAdvertisementBanner,

        // locationPlacesResults, setLocationPlacesResults,
        // searchLocationPlaces,
    } = useAdvertiseHook();
    
    useEffect(() => {
        if (id) {
            getAdvertisementsById(id || '');
        }
    }, [id]);

    useEffect(() => {
        if (selectedAdvertisement) {
            // setAdTitle(selectedAdvertisement.title || '');
            // setAdDescription(selectedAdvertisement.description || '');
            setIconInputValue(selectedAdvertisement.image_url || '');
            setInputAdLinkValue(selectedAdvertisement.action_url || '');
            
            // if (selectedAdvertisement.location && selectedAdvertisement.location.length) {
            //     setSelectedLocationPlace(selectedAdvertisement.location);
            // }

        }
    }, [selectedAdvertisement]);

    const handleSelectPlace = (place: any) => {
        const formattedPlace = formatPlace(place);

        const newPlaces = {
            city: formattedPlace.city, 
            state: formattedPlace.state, 
            country: formattedPlace.country 
        };

        // Use the useState callback function to ensure the latest state is used
        setSelectedLocationPlace((prevItems) => {
            // console.log(prevItems);
            return [...prevItems, newPlaces];

            // // Check if the new item already exists in the array
            // const isDuplicate = prevItems.some((item) => item.name === newItem.name);
    
            // if (!isDuplicate) {
            //     // If the item is unique, add it to the array
            //     return [...prevItems, newItem];
            // } else {
            //     // If the item is a duplicate, remove it from the array
            //     return prevItems.filter((item) => item.name !== newItem.name);
            // }
        });
    }

    const handleDurationChange = (_event: Event, newValue: number | number[]) => {
        setDurationValue(newValue as number);
    };

    const formatPlace = (place: any) => {
        const addressComponents = place.address_components;

        const city = addressComponents.find((comp: any) =>
        comp.types.includes("locality")
        )?.long_name || "";

        const state = addressComponents.find((comp: any) =>
        comp.types.includes("administrative_area_level_1")
        )?.long_name || "";

        const country = addressComponents.find((comp: any) =>
        comp.types.includes("country")
        )?.long_name || "";

        return { city, state, country };
    };

    

    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0]; 
        setInputIconImage(file);

        const base64 = await convertToBase64(file);
        // console.log(base64.result);
        setIconInputValue(base64.result);
    
        e.target.value = "";
    }

    const handleSubmit = () => {
        /* Validations */
        if (!inputAdLinkValue) {
            setApiResponse({
                display: true,
                status: false,
                message: "AD Link is required."
            });
            return;
        }

        if (!inputIconImage) {
            setApiResponse({
                display: true,
                status: false,
                message: "Ad image is required."
            });
            return;
        }

        if (!selectedLocationPlace.length) {
            setApiResponse({
                display: true,
                status: false,
                message: "Ad image is required."
            });
            return;
        }

        if (!adsPlacement) {
            setApiResponse({
                display: true,
                status: false,
                message: "Ad placement is required."
            });
            return;
        }


        const data2submit: createNewBannerInterface = {
            action_url: inputAdLinkValue,
            location: selectedLocationPlace,
            placement: adsPlacement,
            duration: `${durationValue}`,
            banner_image: inputIconImage
        };

        createNewAdvertisementBanner(
            data2submit,
            () => {}
        );
    }

    
    return (
        <Box>
            <Box maxWidth="520px" mx="auto">

                <Box
                    sx={{
                        width: "180px",
                        height: "260px",
                        border: `1px solid ${kolors.border}`,
                        borderRadius: "8px",
                        bgcolor: "#EFEFEF66", // "0A000066"
                        textAlign: "center",
                        mx: "auto",
                        my: 2, // py: 1,
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
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
                                    width: "100%", // "100%",
                                    height: "100%",
                                    // maxWidth: "100px",
                                    // maxHeight: "100px",
                                    // borderRadius: "8px",
                                    // marginTop: "15px",
                                    margin: "auto",
                                    objectFit: "contain",
                                }}
                            />
                        :
                        <IconButton size='small' sx={{ my: "auto" }}>
                            <CloudUploadOutlinedIcon 
                                sx={{ 
                                    color: kolors.border, 
                                    fontSize: "70px",
                                }} 
                            />
                        </IconButton>
                    }
                </Box>

                {/* <Box sx={{ py: 2 }}>
                    <Typography variant='body1' sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: kolors.dark,
                    }}> AD title </Typography>

                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        type='text'
                        inputMode='text'
                        defaultValue=""
                    />
                </Box> */}

                {/* AD Link */}
                <Box sx={{ py: 2 }}>
                    <Typography variant='body1' sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: kolors.dark,
                    }}> AD Link </Typography>

                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        type='url'
                        inputMode='url'
                        value={inputAdLinkValue}
                        onChange={(e) => {
                            const value = e.target.value;
                            setInputAdLinkValue(value);
                        }}
                    />
                </Box>
                
                {/* Location */}
                <Box sx={{ py: 2 }}>
                    <Typography variant='body1' sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: kolors.dark,
                    }}> Location </Typography>

                    <TextField
                        fullWidth
                        // color="secondary"
                        variant="outlined"
                        inputRef={locationMUIRef}
                    />

                    <Stack direction="row" gap="10px" flexWrap="wrap"
                        alignItems="center" mt={1}
                    >
                        {
                            selectedLocationPlace.map((item, index) => (
                                <Chip size='small' key={index}
                                    label={
                                        (item.city) +
                                        (item.state ? `${item.city ? "," : '' } ${item.state}` : "") +
                                        (item.country ? `${item.state ? "," : '' } ${item.country}` : '')
                                    }
                                    variant="outlined"
                                />
                            ))
                        }
                    </Stack>
                </Box>

                {/* <Box sx={{ py: 2 }}>
                    <Typography variant='body1' sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: kolors.dark,
                    }}> AD description </Typography>

                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        type='text'
                        inputMode='text'
                        defaultValue=""
                        multiline
                        rows={4}
                    />
                </Box> */}

                <Box sx={{ py: 2 }}>
                    <Typography variant='body1' sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: kolors.dark,
                    }}> Set an Duration </Typography>

                    <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
                        <Slider aria-label="Volume" 
                            color='secondary'
                            min={1} max={365}
                            value={durationValue} 
                            onChange={handleDurationChange} 
                        />
                        
                        <Box
                            sx={{
                                borderRadius: "8px",
                                border: `1px solid ${kolors.border}`,
                                p: 1
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "13px",
                                    color: kolors.border,
                                }}
                            >Days</Typography>

                            <Typography
                                sx={{
                                    fontWeight: "600",
                                    fontSize: "22px",
                                    color: kolors.primary,
                                }}
                            >{durationValue}</Typography>
                        </Box>
                    </Stack>
                </Box>


                {
                    apiResponse.display && (
                        <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                            <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                        </Stack>
                    )
                }

                <Button variant="contained" size='small'
                    fullWidth
                    type="button"
                    onClick={() => handleSubmit()}
                    disabled={isSubmitting}
                    sx={{
                        ...themeBtnStyle,
                        fontSize: "16px",
                        fontWeight: "400",
                        // lineHeight: 14.52px;
                    }}
                >Publish</Button>
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
    );
};

export default NewEditBannerAdsComponent;
