import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import NotificationComponent from '@/components/sunday/NotificationComponent';
import { themeBtnStyle } from '@/util/mui';
// import mtnLogo from "@/assets/images/mtn2.png";
import BackNavigationArrowBtn from '@/components/sunday/BackNavigationArrowBtn';
import { getQueryParams } from '@/util/resources';
import { useAdvertiseHook } from '@/hooks/advertise/useAdvertiseHook';
import LoadingDataComponent from '@/components/LoadingData';


const LiveAdDetailsPage = () => {
    const navigate = useNavigate();
    const ad_id = getQueryParams("id");

    const { 
        // isSubmitting,
        selectedAdvertisement,  
        getAdvertisementsById,
        // reviewAdvertisementRequest,
    } = useAdvertiseHook();

    useEffect(() => {
        getAdvertisementsById(ad_id);
    }, []);

    const handleOnClickedBtn = (url: string) => {
        // const newWindow = window.open(url, "_blank", "noopener,noreferrer");
        const newWindow = window.open(url, "_blank", "noopener");
        if (newWindow) newWindow.opener = null;
    }

    const displayLocation = () => {
        try {
            if (selectedAdvertisement && selectedAdvertisement.location) {
                const country = selectedAdvertisement.location.country ? selectedAdvertisement.location.country + ": " : '';
                const city = selectedAdvertisement.location.city ? selectedAdvertisement.location.city : '';
                const state = selectedAdvertisement.location.state ? selectedAdvertisement.location.state : '';
                const sdds: any = country + " " + city + " " + state;
                return sdds;
            } else {
                return ''
            }
        } catch (error) {
            return ''
        }
    }


    
    return (
        <Box 
            sx={{
                border: `1px solid ${kolors.border}`,
                bgcolor: "#fff",
                borderRadius: 2,
                p: 2, my: 3,
                minHeight: "100dvh"
            }}
        >
            <Stack direction='row' gap='10px' flexWrap="wrap"
                alignItems="center" justifyContent="space-between"
            >
                <BackNavigationArrowBtn />

                <NotificationComponent />
            </Stack>

            <Box mt={5}>
                {
                    selectedAdvertisement ? 
                        <Box>
                            <Stack direction="row" gap="10px" flexWrap="wrap"
                                alignItems="start" justifyContent="space-between"
                            >
                                <Box 
                                    sx={{
                                        // flexBasis: {xs: "100%", sm: "70%", md: "60%"},
                                        maxWidth: {xs: "100%", sm: "70%", md: "60%"},
                                    }}
                                >
                                    <ListItem alignItems="flex-start" disablePadding 
                                        onClick={() => handleOnClickedBtn(selectedAdvertisement.action_url) }
                                    >
                                        <ListItemAvatar>
                                            <Avatar variant="square"
                                                alt={`${selectedAdvertisement.title} ads image`}
                                                src={selectedAdvertisement.image_url}
                                                sx={{ 
                                                    width: "auto", 
                                                    height: "auto",
                                                    objectFit: "contain",
                                                    maxWidth: "100px", 
                                                    maxHeight: "70px",
                                                }}
                                            />
                                        </ListItemAvatar>

                                        <Box px={2}>
                                            <ListItemText
                                                primary={selectedAdvertisement.title || ''}
                                                secondary={selectedAdvertisement.description || ""}
                                            />
                                        </Box>
                                    </ListItem>
                                </Box>

                                <Box
                                    sx={{
                                        // flexBasis: {sm: "14%", md: "19%"},
                                        maxWidth: {sm: "14%", md: "19%"},
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            color: kolors.dark,
                                        }}
                                    >
                                        {dayjs(selectedAdvertisement.start_date || '').format('DD/MM/YYYY')} - {
                                        dayjs(selectedAdvertisement.end_date || '').format('DD/MM/YYYY') }
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            color: kolors.dark,
                                            textTransform: "capitalize"
                                        }}
                                    >{selectedAdvertisement.ad_type || ''}</Typography>
                                </Box>

                                <Box
                                    sx={{
                                        // flexBasis: {sm: "13%", md: "18%"},
                                        width: "fit-content"
                                    }}
                                >
                                    <Button variant="contained" size='small'
                                        type="button"
                                        onClick={() => {
                                            navigate(`/admin/ad-manager/edit/${ad_id}`)
                                        }}
                                        
                                        sx={{
                                            ...themeBtnStyle,
                                            bgcolor: kolors.secondary,
                                            fontSize: "15px",
                                            fontWeight: "400",
                                            // lineHeight: 14.52px;
                                            color: kolors.primary
                                        }}
                                    >Edit</Button>
                                </Box>
                            </Stack>

                            <Typography
                                sx={{
                                    fontWeight: "600",
                                    fontSize: "20px",
                                    color: kolors.dark,
                                }}
                            >Results</Typography>

                            <Box
                                sx={{
                                    border: `1px solid ${kolors.border}`,
                                    borderRadius: "8px",
                                    p: 2
                                }}
                            >
                                <Stack direction="row" alignItems="center" spacing="20px">
                                    <Stack direction="row" alignItems="center" spacing="20px"  
                                        sx={{
                                            border: `1px solid ${kolors.border}`,
                                            p: 1,
                                            borderRadius: "8px"
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                bgcolor: kolors.secondary,
                                                px: "10px", py: "5px",
                                                borderRadius: "8px",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "600",
                                                    fontSize: "13px",
                                                    color: kolors.primary,
                                                }}
                                            >Men</Typography>
                                        </Box>

                                        <Typography
                                            sx={{
                                                fontWeight: "600",
                                                fontSize: "16px",
                                                color: kolors.dark
                                            }}
                                        >1,319</Typography>
                                    </Stack>

                                    <Stack direction="row" alignItems="center" spacing="20px"  
                                        sx={{
                                            border: `1px solid ${kolors.border}`,
                                            p: 1,
                                            borderRadius: "8px"
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                bgcolor: kolors.secondary,
                                                px: "10px", py: "5px",
                                                borderRadius: "8px",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "600",
                                                    fontSize: "13px",
                                                    color: kolors.primary,
                                                }}
                                            >Women</Typography>
                                        </Box>

                                        <Typography
                                            sx={{
                                                fontWeight: "600",
                                                fontSize: "16px",
                                                color: kolors.dark
                                            }}
                                        >1,319</Typography>
                                    </Stack>
                                </Stack>

                                <Box my={2}>
                                    <ReviewTextDetailsComponent 
                                        title='Link clicks'
                                        value='100,000'
                                    />
                                    <ReviewTextDetailsComponent 
                                        title='Cost per click'
                                        value='$0.5'
                                    />
                                    <ReviewTextDetailsComponent 
                                        title='Reach'
                                        value='38,283'
                                    />
                                    <ReviewTextDetailsComponent 
                                        title='Impressions'
                                        value='38,283'
                                    />
                                    <ReviewTextDetailsComponent 
                                        title='Locations'
                                        // value='Nigeria: Abuja, Lagos Portharcourt'
                                        value={ displayLocation() }
                                    />

                                </Box>

                                <FormControlLabel
                                    control={
                                        <Switch 
                                            // focusVisibleClassName=".Mui-focusVisible" 
                                            disableRipple 
                                            sx={(_theme) => ({
                                                '& .MuiSwitch-switchBase': {
                                                    transitionDuration: '300ms',
                                                    '&.Mui-checked': {
                                                        transform: 'translateX(16px)',
                                                        color: kolors.primary,
                                                        '& + .MuiSwitch-track': {
                                                            backgroundColor: kolors.secondary,
                                                        }
                                                    }
                                                }
                                            })}
                                        />

                                    }
                                    label="Switch off AD"
                                />
                            </Box>
                        </Box>
                    : <LoadingDataComponent />
                }
            </Box>
            
        </Box>
    );
};

export default LiveAdDetailsPage;


interface ReviewText_Props {
    title: string;
    value: string;
};

const ReviewTextDetailsComponent: React.FC<ReviewText_Props> = ({
    title, value
}) => {

    return (
        <Box>
            <Stack direction="row" spacing="20px"
                alignItems="center" my={2} 
            >
                <Typography
                    sx={{
                        fontWeight: "400",
                        fontSize: "16px",
                        color: "#595757",
                        flexBasis: "120px"
                    }}
                >{ title }: </Typography>

                <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: kolors.dark,
                    }}
                > { value }</Typography>
            </Stack>
        </Box>
    )
}