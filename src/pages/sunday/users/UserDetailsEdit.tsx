import { useEffect, useState } from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
// import { useUserStore } from '@/state/userStore';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';

import Avatar from '@mui/material/Avatar';
import placeProvider from "@/assets/images/dashboard/placeProvider.jpeg";
import Typography from '@mui/material/Typography';
import { themeBtnStyle } from '@/util/mui';
import VerifiedIcon from '@mui/icons-material/Verified';
import TodayIcon from '@mui/icons-material/Today';
import PlaceIcon from '@mui/icons-material/Place';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TokenBalanceComponent from '@/components/sunday/users/TokenBalance';
import WalletBalanceComponent from '@/components/sunday/users/WalletBalance';
import LastSeenCardComponent from '@/components/sunday/users/LastSeen';
import ProfileInformationComponent from '@/components/sunday/users/ProfileInformation';
import ReceivedStickersGiftsComponent from '@/components/sunday/users/ReceivedStickersGifts';
import { TravelLocationModal } from '@/components/sunday/users/TravelLocationModal';
import NotificationComponent from '@/components/sunday/NotificationComponent';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useUsersHook } from '@/hooks/users/useUsersHook';
import { useNavigate, useParams } from 'react-router-dom';
import { currencyDisplay } from '@/util/resources';
import { timeAgo } from '@/util/timeNdate';



const UserDetailsEditProfilePage = () => {
    const navigate = useNavigate();
    const [travelLocationsModal, setTravelLocationsModal] = useState(false);
    const {id} = useParams();

    const {
        // apiResponse, setApiResponse,

        // isSubmitting,
        selectedUserDetails, 

        // suspendUserById,
        getUserById,
    } = useUsersHook();

    useEffect(() => {
        if (id) {
            getUserById(id);
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
                <Box></Box>

                <NotificationComponent />
            </Stack>

            {
                selectedUserDetails ? 
                    <Box mt={5}>
                        <Box>
                            <Stack direction='row' gap="10px" mt={2} flexWrap="wrap"
                                justifyContent="space-between" alignItems="center" 
                            >

                                <Stack direction='row' spacing={{xs: "20px", sm: "30px", md: "50px"}} 
                                    justifyContent="space-between" alignItems="center" 
                                >
                                    <Stack direction="row" spacing="10px">
                                        <Avatar variant="rounded"
                                            alt=""
                                            src={placeProvider}
                                            sx={{ 
                                                width: "84px", height: "84px",
                                                bgcolor: kolors.secondary
                                            }}
                                        />

                                        <Box>
                                            <Stack direction="row" alignItems="center" spacing="5px">
                                                <Typography
                                                    sx={{
                                                        fontWeight: "600",
                                                        fontSize: "13px",
                                                        color: kolors.dark
                                                    }}
                                                >Michelle</Typography>

                                                <VerifiedIcon sx={{ color: kolors.primary, fontSize: "18px" }} />
                                            </Stack>

                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: "12px",
                                                    color: kolors.border,
                                                    mb: 1
                                                }}
                                            >Female, 22</Typography>

                                            <Stack direction="row" spacing="5px" alignItems="center">
                                                {
                                                    [placeProvider, placeProvider, placeProvider].map((item, index) => (
                                                        <Avatar variant="rounded" key={index}
                                                            alt=""
                                                            src={item}
                                                            sx={{ 
                                                                width: "22px", height: "22px",
                                                                bgcolor: kolors.secondary
                                                            }}
                                                        />
                                                    ))
                                                }
                                            </Stack>
                                        </Box>
                                    </Stack>

                                    <Box>
                                        <Stack direction="row" spacing="2px" alignItems="center">
                                            <Typography
                                                sx={{
                                                    fontWeight: "600",
                                                    fontSize: "16px",
                                                    background: "linear-gradient(80.09deg, #9D5900 3.97%, #F7C028 53.75%, #B88C08 97.81%)",
                                                    WebkitBackgroundClip: "text",
                                                    backgroundClip: "text",
                                                    WebkitTextFillColor: "transparent",
                                                }}
                                            >Premium</Typography>

                                            <ArrowDropDownIcon sx={{ color: kolors.dark, fontSize: "18px" }} />
                                        </Stack>

                                        <Stack direction="row" mt={1.5} spacing="5px" alignItems="center">
                                            <TodayIcon sx={{ color: kolors.primary }} />

                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: "16px",
                                                    color: kolors.border,
                                                }}
                                            >1999-04-24</Typography>

                                            <ArrowDropDownIcon sx={{ color: kolors.dark, fontSize: "18px" }} />
                                        </Stack>
                                    </Box>
                                </Stack>

                                <Stack direction="row" spacing="10px" alignItems="center">
                                    <Button variant="contained" size='small'
                                        type="button"
                                        onClick={() => { }}
                                        
                                        sx={{
                                            ...themeBtnStyle,
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            // lineHeight: 14.52px;
                                        }}
                                    >Save</Button>
                                </Stack>
                            </Stack>

                            <Stack direction='row' alignItems="center" gap="10px" mt={2} flexWrap="wrap">
                                <PlaceIcon sx={{ color: kolors.primary, fontSize: "16px" }} />

                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: "12px",
                                        color: kolors.border,
                                    }}
                                >Lagos, Nigeria</Typography>

                                <InfoOutlinedIcon sx={{ color: kolors.dark, fontSize: "16px" }} />

                                <Box onClick={() => setTravelLocationsModal(true)}
                                    sx={{
                                        bgcolor: kolors.secondary,
                                        color: kolors.primary,
                                        borderRadius: "8px",
                                        p: 1,
                                        cursor: "pointer",
                                        ":hover": {
                                            bgcolor: kolors.tertiary,
                                            color: "#fff"
                                        }
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: "12px",
                                        }}
                                    >Click to see users travel mode loactions</Typography>
                                </Box>

                            </Stack>
                        </Box>

                        <Stack direction='row' gap="20px" mt={3}
                            alignItems="center" // justifyContent="stretch"
                        >
                            {/* <TokenBalanceComponent />
                            <WalletBalanceComponent />
                            <LastSeenCardComponent /> */}


                            <TokenBalanceComponent 
                                tokenBalance={currencyDisplay(Number(selectedUserDetails.userDyt.balance || 0))}
                                userId={id || ''}
                            />

                            <WalletBalanceComponent 
                                walletBalance={currencyDisplay(Number(selectedUserDetails.userWallet.balance || 0))}
                                userId={id || ''}
                            />

                            <LastSeenCardComponent 
                                lastSeen={timeAgo(selectedUserDetails.last_login)}
                            />
                        </Stack>


                        <Grid container spacing="20px" // rowSpacing="35px" columnSpacing="20px"
                            // direction="row"
                            sx={{
                                // justifyContent: "space-around",
                                alignItems: "stretch",
                                my: 3
                            }}
                        >
                            <Grid size={{ xs: 12, md: 5 }}
                                sx={{
                                    border: `1px solid ${kolors.border}`,
                                    borderRadius: "8px",
                                }}
                            >
                                <ProfileInformationComponent editable />
                            </Grid>

                            <Grid size={{ xs: 12, md: 7 }}
                                sx={{
                                    border: `1px solid ${kolors.border}`,
                                    borderRadius: "8px",
                                }}
                            >
                                <ReceivedStickersGiftsComponent 
                                    userData={selectedUserDetails}
                                />
                            </Grid>

                        </Grid>



                    </Box>
                : <></>
            }


            <TravelLocationModal 
                openTravelLocationsModal={travelLocationsModal} 
                closeTravelLocationsModal={setTravelLocationsModal} 
                userId={id || ''}
            />

        </Box>
    );
};

export default UserDetailsEditProfilePage;
