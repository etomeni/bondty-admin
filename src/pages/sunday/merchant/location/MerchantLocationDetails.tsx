import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';

import { themeBtnStyle } from '@/util/mui';
import SearchwordComponent from '@/components/sunday/SearchwordComponent';
import NotificationComponent from '@/components/sunday/NotificationComponent';
import BackNavigationArrowBtn from '@/components/sunday/BackNavigationArrowBtn';
import TopTotalCardComponent from '@/components/sunday/merchant/TopTotalCardComponent';
import MerchantTopOptionsComponent from '@/components/sunday/merchant/MerchantTopOptionsComponent';
import { currencyDisplay, formatedNumber, getQueryParams } from '@/util/resources';
import { usePlaceHook } from '@/hooks/merchants/useplaceHook';
import LoadingDataComponent from '@/components/LoadingData';
import { placeMerchantInterface } from '@/typeInterfaces/merchants.interface';
import { timeAgo } from '@/util/timeNdate';
import ConfirmationDialog from '@/components/sunday/ConfirmationDialog';
// import placeProvider from "@/assets/images/dashboard/placeProvider.jpeg";


let dialogData = {
    action: () => {},
    // state: false,
    title: '',
    description: '',
}

const MerchantLocationDetailsPage = () => {
    const navigate = useNavigate();
    // const viewType = getQueryParams("viewType");
    const category = getQueryParams("category");
    const merchant_id = getQueryParams("id");
    const is_deleted = getQueryParams("is_deleted");
    const is_suspended = getQueryParams("is_suspended");

    const [activePlace, setActivePlace] = useState<placeMerchantInterface>();

    const [confirmDialog, setConfirmDialog] = useState(false);

    const {
        isSubmitting,
        
        placeMerchant,
        selectedPlace, setSelectedPlace,
        placeMerchantAnalytics,

        getPlaceMerchant,
        deletePlace,
        getPlaceById,
        getPlaceMerchantAnalytics,
        searchPlaceMerchant
    } = usePlaceHook();

    useEffect(() => {
        if (merchant_id) {
            getPlaceMerchant(merchant_id);
            getPlaceMerchantAnalytics(merchant_id);
        } else {
            navigate(-1);
        }
    }, []);
    


    return (
        <Box mb={5}
            sx={{
                border: `1px solid ${kolors.border}`,
                bgcolor: "#fff",
                borderRadius: 2,
                p: 1.5,
                my: 3
            }}
        >
            <Stack direction='row' gap='10px' flexWrap="wrap"
                alignItems="center" justifyContent="space-between"
            >
                <BackNavigationArrowBtn />

                <NotificationComponent />
            </Stack>

            <MerchantTopOptionsComponent 
                merchantCaterory={category}
                merchantId={merchant_id}
                is_deleted={Number(is_deleted) ? true : false}
                is_suspended={Number(is_suspended) ? true : false}
            />


            <Stack direction="row" gap="20px" flexWrap="wrap" mt={5}
                alignItems="stretch" 
                justifyContent={{xs: "center", md: "start", lg: "space-between"}}
            >
                <TopTotalCardComponent 
                    title='Total sales made'
                    value={currencyDisplay(Number(placeMerchantAnalytics?.totalSales || 0))}
                />

                <TopTotalCardComponent 
                    title='Total reservations'
                    value={formatedNumber(Number(placeMerchantAnalytics?.totalReservations || 0))}
                />

                <TopTotalCardComponent 
                    title='Total declined orders'
                    value={formatedNumber(Number(placeMerchantAnalytics?.totalDeclined || 0))}
                />
            </Stack>

            <Box mt={5}>
                <Box 
                    sx={{
                        border: `1px solid ${kolors.border}`,
                        borderRadius: "8px",
                        overflow: "hidden"
                        // height: "100%"
                    }}
                >
                    <Stack direction="row" gap="10px" flexWrap="wrap"
                        alignItems="center" justifyContent="space-between"
                        bgcolor="#F2F2F2" p={1}
                    >
                        <Box> </Box>

                        <Box>
                            <SearchwordComponent 
                                performSearch={(searchWord) => {
                                    console.log(searchWord);

                                    if (searchWord == "") {
                                        getPlaceMerchant(merchant_id);
                                        getPlaceMerchantAnalytics(merchant_id);
                                    } else {
                                        searchPlaceMerchant(merchant_id, searchWord);
                                    }
                                    
                                }}
                            />
                        </Box>
                    </Stack>

                    <Box p={2}>
                        <Grid container spacing="20px" // rowSpacing="35px" columnSpacing="20px"
                            // direction="row"
                            sx={{
                                // justifyContent: "space-around",
                                alignItems: "stretch",
                                my: 3
                            }}
                        >
                            <Grid size={{ xs: 12, md: 5, lg: 4 }}>
                                <Box>
                                    {
                                        placeMerchant ? 
                                            placeMerchant.map((location) => (
                                                <Stack key={location.id} direction="row" // alignItems="center"
                                                    spacing="10px" mb={3}
                                                    onClick={() => {
                                                        setActivePlace(location);

                                                        getPlaceById(location.id);
                                                    }}
                                                    sx={{
                                                        bgcolor: activePlace && activePlace.id == location.id ? kolors.tertiary : kolors.bg,
                                                        borderRadius: "4px"
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            maxWidth: "94px",
                                                            maxHeight: "94px",
                                                            borderRadius: "4px",
                                                            overflow: "hidden"
                                                        }}
                                                    >
                                                        <img 
                                                            src={location.placePhotos[0].image_url} 
                                                            alt='place image'
                                                            style={{
                                                                width: "100%",
                                                                // borderRadius: "8px",
                                                                height: "100%",
                                                                objectFit: "contain",
                                                            }}
                                                        />
                                                    </Box>

                                                    <Box py={1}>
                                                        <Typography noWrap
                                                            sx={{
                                                                fontSize: "13px",
                                                                fontWeight: "600",
                                                                // lineHeight: "12px",
                                                                color: "#161616"
                                                            }}
                                                        >{location.name}</Typography>
                                                        {/* >Fine house resturant</Typography> */}

                                                        <Typography noWrap
                                                            sx={{
                                                                fontSize: "13px",
                                                                fontWeight: "600",
                                                                // lineHeight: "12px",
                                                                color: "#BCBABA",
                                                                textTransform: "capitalize"
                                                            }}
                                                        >{location.location.state + ", " + location.location.country}.</Typography>
                                                        {/* >Abuja, Nigeria.</Typography> */}

                                                        <Rating name="read-only"
                                                            value={location.rating || 0} 
                                                            readOnly
                                                            size='medium'
                                                        />
                                                    </Box>
                                                </Stack>
                                            ))
                                        : <LoadingDataComponent />
                                    }
                                    
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, md: 7, lg: 8 }}
                                sx={{
                                    border: `1px solid ${kolors.border}`,
                                    borderRadius: "8px",
                                    p: 2
                                }}
                            >
                                {
                                    selectedPlace ? 
                                        <Box>
                                            <Box mb={3}>
                                                <Stack direction='row' gap='20px' alignItems="center">
                                                    <Button variant="contained" size='small'
                                                        type="button"
                                                        onClick={() => { }}
                                                        
                                                        sx={{
                                                            ...themeBtnStyle,
                                                            fontSize: "15px",
                                                            fontWeight: "400",
                                                            // lineHeight: 14.52px;
                                                        }}
                                                    > Block Location </Button>

                                                    <Button variant="contained" size='small'
                                                        type="button"
                                                        onClick={() => {
                                                            setConfirmDialog(true);
                    
                                                            dialogData = {
                                                                action: () => {
                                                                    deletePlace(
                                                                        selectedPlace.data.id,
                                                                        () => {
                                                                            setConfirmDialog(false);
                                                                            dialogData = {
                                                                                action: () => {},
                                                                                // state: false,
                                                                                title: '',
                                                                                description: '',
                                                                            };

                                                                            setActivePlace(undefined);
                                                                            setSelectedPlace(undefined);

                                                                            getPlaceMerchant(merchant_id);
                                                                            getPlaceMerchantAnalytics(merchant_id);
                                                                        }
                                                                    );
                                                                },
                                                                // state: false,
                                                                title: 'Confirm',
                                                                description: 'Are you sure, you want to proceed with deleting this location?',
                                                            };
                                                        }}
                                                        
                                                        sx={{
                                                            ...themeBtnStyle,

                                                            bgcolor: kolors.secondary,
                                                            color: kolors.primary,

                                                            "&:hover": {
                                                                bgcolor: kolors.secondary,
                                                                color: kolors.primary
                                                            },
                                                            "&:active": {
                                                                bgcolor: kolors.primary,
                                                                color: "#fff"
                                                            },
                                                            "&:focus": {
                                                                bgcolor: kolors.secondary,
                                                                color: kolors.primary
                                                            },

                                                            fontSize: "15px",
                                                            fontWeight: "400",
                                                            // lineHeight: 14.52px;
                                                        }}
                                                    > Delete Location </Button>
                                                </Stack>
                                            </Box>

                                            <Stack direction="row" rowGap="30px" columnGap="20px"  flexWrap="wrap"
                                                alignItems="center" justifyContent={{xs: "center",  md: "space-between" }}
                                                // bgcolor="#F2F2F2" p={1}
                                            >
                                                <Box
                                                    sx={{
                                                        bgcolor: "#F2F2F2",
                                                        borderRadius: "4px",
                                                        height: "70px",
                                                        width: "120px",
                                                        p: 2,
                                                        display: "flex",
                                                        flexDirection: "column"
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontWeight: "500",
                                                            fontSize: "12px",
                                                            color: "#BCBABA",
                                                        }}
                                                    >Total Sales</Typography>

                                                    <Typography
                                                        sx={{
                                                            fontWeight: "600",
                                                            fontSize: "16px",
                                                            color: kolors.dark,
                                                            textAlign: "center",
                                                            mt: "auto",
                                                        }}
                                                    >{currencyDisplay(Number(selectedPlace.totalSales))}</Typography>
                                                </Box>

                                                <Box
                                                    sx={{
                                                        bgcolor: "#F2F2F2",
                                                        borderRadius: "4px",
                                                        height: "70px",
                                                        width: "120px",
                                                        p: 2,
                                                        display: "flex",
                                                        flexDirection: "column"
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontWeight: "500",
                                                            fontSize: "12px",
                                                            color: "#BCBABA",
                                                        }}
                                                    >Total reservations</Typography>

                                                    <Typography
                                                        sx={{
                                                            fontWeight: "600",
                                                            fontSize: "16px",
                                                            color: kolors.dark,
                                                            textAlign: "center",
                                                            mt: "auto",
                                                        }}
                                                    >{formatedNumber(Number(selectedPlace.totalReservations))}</Typography>
                                                </Box>

                                                <Box
                                                    sx={{
                                                        bgcolor: "#F2F2F2",
                                                        borderRadius: "4px",
                                                        height: "70px",
                                                        width: "120px",
                                                        p: 2,
                                                        display: "flex",
                                                        flexDirection: "column"
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontWeight: "500",
                                                            fontSize: "12px",
                                                            color: "#BCBABA",
                                                        }}
                                                    >Rooms booked</Typography>

                                                    <Typography
                                                        sx={{
                                                            fontWeight: "600",
                                                            fontSize: "16px",
                                                            color: kolors.dark,
                                                            textAlign: "center",
                                                            mt: "auto",
                                                        }}
                                                    >{formatedNumber(selectedPlace.data.placeReservations.length)}</Typography>
                                                </Box>

                                                <Box
                                                    sx={{
                                                        bgcolor: "#F2F2F2",
                                                        borderRadius: "4px",
                                                        height: "70px",
                                                        width: "120px",
                                                        p: 2,
                                                        display: "flex",
                                                        flexDirection: "column"
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontWeight: "500",
                                                            fontSize: "12px",
                                                            color: "#BCBABA",
                                                        }}
                                                    >Added to favourite</Typography>

                                                    <Typography
                                                        sx={{
                                                            fontWeight: "600",
                                                            fontSize: "16px",
                                                            color: kolors.dark,
                                                            textAlign: "center",
                                                            mt: "auto",
                                                        }}
                                                    >{formatedNumber(Number(selectedPlace.totalFavorites))}</Typography>
                                                </Box>
                                            </Stack>

                                            <Box mt={2}>
                                                <Typography
                                                    sx={{
                                                        fontWeight: "500",
                                                        fontSize: "13px",
                                                        color: kolors.dark,
                                                        mb: 1
                                                    }}
                                                >Customer feedback</Typography>

                                                {
                                                    selectedPlace.data.placeReservations.map((feedback) => (
                                                        <Box key={feedback.id}
                                                            sx={{
                                                                bgcolor: "#F2F2F2",
                                                                p: 2, mb: 2,
                                                                borderRadius: "8px"
                                                            }}
                                                        >
                                                            <Stack direction="row" spacing="20px"
                                                                alignItems="center" justifyContent="space-between"
                                                            >
                                                                <Typography
                                                                    sx={{
                                                                        fontWeight: "600",
                                                                        fontSize: "13px",
                                                                        color: kolors.dark,
                                                                    }}
                                                                >ID: {feedback.id}</Typography>

                                                                <Typography
                                                                    sx={{
                                                                        fontWeight: "400",
                                                                        fontSize: "13px",
                                                                        color: "#BCBABA"
                                                                    }}
                                                                >
                                                                    { feedback.rating?.created_at ? timeAgo(feedback.rating.created_at) : "" }
                                                                </Typography>
                                                                {/* >2 days ago</Typography> */}
                                                            </Stack>

                                                            <Stack direction="row" spacing="20px"
                                                                alignItems="center"
                                                            >
                                                                <Rating
                                                                    name="text-feedback"
                                                                    value={feedback.rating?.rating}
                                                                    readOnly
                                                                    // precision={1}
                                                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                                />

                                                                <Typography
                                                                    sx={{
                                                                        fontWeight: "500",
                                                                        fontSize: "24px",
                                                                        color: kolors.dark,
                                                                        mt: 3
                                                                    }}
                                                                >{feedback.rating?.rating}</Typography>
                                                            </Stack>

                                                            <Typography
                                                                sx={{
                                                                    fontSize: "13px",
                                                                    fontWeight: "400",
                                                                    color: "#595757",
                                                                }}
                                                            > { feedback.rating?.feedback } </Typography>
                                                        </Box>
                                                    ))
                                                }

                                            </Box>
                                        </Box>
                                    : isSubmitting ?
                                        <LoadingDataComponent />
                                    : <></>
                                }
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
            
            
            <ConfirmationDialog 
                actionYes={() => {
                    dialogData.action();
                }}
                isSubmitting={isSubmitting}
                openDialog={confirmDialog}
                setOpenDialog={setConfirmDialog}
                title='Confirm'
                description={dialogData.description}
                actionNo={() => {
                    setConfirmDialog(false);

                    dialogData = {
                        action: () => {},
                        // state: false,
                        title: '',
                        description: '',
                    };
                }}
            />
        </Box>
    );
};

export default MerchantLocationDetailsPage;
