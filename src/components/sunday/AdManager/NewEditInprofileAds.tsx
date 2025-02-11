import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import kolors from '@/constants/kolors';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import Autocomplete from '@mui/material/Autocomplete';
// import mtnLogo from "@/assets/images/mtn2.png";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { themeBtnStyle } from '@/util/mui'; 
import { convertToBase64 } from '@/util/resources';
import { createNewInprofileInterface, placesLocationInterface } from '@/typeInterfaces/advertise.interface';
import { useAdvertiseHook } from '@/hooks/advertise/useAdvertiseHook';
import { usePlacesWidget } from "react-google-autocomplete";


interface _Props {
    adsPlacement: string;
};


const NewEditInprofileAdsComponent: React.FC<_Props> = ({
    adsPlacement 
}) => {
    // const navigate = useNavigate();
    const {id} = useParams();
    const apiKey = `${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}`;

    const [durationValue, setDurationValue] = useState<number>(30);
    // const [adLink, setAdLink] = useState('');
    const [adTitle, setAdTitle] = useState('');
    const [adDescription, setAdDescription] = useState('');
    const [inputAdLinkValue, setInputAdLinkValue] = useState('');
    const [selectedLocationPlace, setSelectedLocationPlace] = useState<placesLocationInterface[]>([]);

    const [iconInputValue, setIconInputValue] = useState('');
    const [inputIconImage, setInputIconImage] = useState<any>();

    const { ref: locationMUIRef } = usePlacesWidget({
        apiKey: apiKey,
        onPlaceSelected: (place) => {
            handleSelectPlace(place);
        },
        // inputAutocompleteValue: "country",
        options: {
            types: ["geocode", "establishment"],
        },
    });
    
    const { 
        apiResponse, setApiResponse,
        isSubmitting,
        selectedAdvertisement,
        getAdvertisementsById,
        createNewInprofileAdvertisement,
    } = useAdvertiseHook();


    useEffect(() => {
        if (id) {
            getAdvertisementsById(id || '');
        }
    }, [id]);

    useEffect(() => {
        if (selectedAdvertisement) {
            setAdTitle(selectedAdvertisement.title || '');
            setAdDescription(selectedAdvertisement.description || '');
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

    const handleDurationChange = (_e: Event, newValue: number | number[]) => {
        setDurationValue(newValue as number);

        console.log(adsPlacement);
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
                message: "Ad link is required."
            });
            return;
        }

        if (!adTitle) {
            setApiResponse({
                display: true,
                status: false,
                message: "Ad title is required."
            });
            return;
        }

        if (!adDescription) {
            setApiResponse({
                display: true,
                status: false,
                message: "Ad description is required."
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
        

        const data2submit: createNewInprofileInterface = {
            action_url: inputAdLinkValue,
            location: selectedLocationPlace,
            duration: `${durationValue}`,
            title: adTitle,
            description: adDescription,
            profile_image: inputIconImage
        };

        createNewInprofileAdvertisement(
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
                
                <Box sx={{ py: 2 }}>
                    <Typography variant='body1' sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: kolors.dark,
                    }}> AD Title </Typography>

                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        type='text'
                        inputMode='text'
                        value={adTitle}
                        onChange={(e) => {
                            setAdTitle(e.target.value);
                        }}
                    />
                </Box>

                <Box sx={{ py: 2 }}>
                    <Typography variant='body1' sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: kolors.dark,
                    }}> AD Link </Typography>

                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        type='text'
                        inputMode='text'
                        value={inputAdLinkValue}
                        onChange={(e) => {
                            setInputAdLinkValue(e.target.value);
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


                    {/* <Typography component="small"
                        sx={{
                            fontWeight: "400",
                            fontSize: "12px",
                        }}
                    >{
                        selectedLocationPlace ? 
                            selectedLocationPlace.city ? selectedLocationPlace.city + ", " : "" +
                            selectedLocationPlace.state ? selectedLocationPlace.state + ", " : "" +
                            selectedLocationPlace.country ? selectedLocationPlace.country : ""
                        : ""
                    }</Typography> */}
                </Box>

                {/* AD description */}
                <Box sx={{ py: 2 }}>
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
                        value={adDescription}
                        onChange={(e) => {
                            setAdDescription(e.target.value);
                        }}
                        multiline
                        rows={4}
                    />
                </Box>

                <Box sx={{ py: 2 }}>
                    <Typography variant='body1' sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: kolors.dark,
                    }}> Set AD duration </Typography>

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
                    fullWidth type="button"
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

export default NewEditInprofileAdsComponent;
