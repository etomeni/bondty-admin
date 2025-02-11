import { useState } from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
// import { useUserStore } from '@/state/userStore';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import { themeBtnStyle } from '@/util/mui';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid2';

import Typography from '@mui/material/Typography';
import dytTokenIcon from '@/assets/images/dytTokenIcon.png';
import CustomBgTab, { menuItemsInterface } from '@/components/sunday/dashboard/CustomBgTab';
import SubscriptionChartComponent from '@/components/sunday/dashboard/ChartSubscription';
import BoostChartComponent from '@/components/sunday/dashboard/ChartBoost';
import DeclinedRequestComponent from '@/components/sunday/dashboard/DeclinedRequest';
import ClientsReviewsComponent from '@/components/sunday/dashboard/ClientsReviews';
import StoreOrdersComponent from '@/components/sunday/dashboard/StoreOrders';
import VerificationRequestComponent from '@/components/sunday/dashboard/VerificationRequest';
import MerchantSuggestionComponent from '@/components/sunday/dashboard/MerchantSuggestion';
import SearchwordComponent from '@/components/sunday/SearchwordComponent';
import NotificationComponent from '@/components/sunday/NotificationComponent';



const Dashboard = () => {
    const [usersTypeMenuItems, setUsersTypeMenuItems] = useState([
        {
            label: "All",
            active: true,
        },
        {
            label: "Premium",
            active: false,
        },
        {
            label: <Typography component="span"
                sx={{
                    px: 1, py: 0.5,
                    bgcolor: kolors.secondary,
                    borderRadius: "8px",
                    fontSize: "13px",
                    // lineHeight: "15.73px",
                    textAlign: "center",
                    width: "inherit",
                    m: 0,
                }}
            >More</Typography>,
            active: false,
        }
    ]);

    
    const handleUsersTypeMenuItems = (menuItems: menuItemsInterface) => {
        const newMenuItems = usersTypeMenuItems.filter((item) => {
            if (menuItems.label != item.label) {
                item.active = false;
            } else {
                item.active = true;
            }
            return item
        });
        setUsersTypeMenuItems(newMenuItems);

    }



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
                <SearchwordComponent 
                    performSearch={() => {}}
                />

                <Stack direction='row' gap='30px' alignItems="center">
                    <Stack direction='row' gap='10px' alignItems="center">
                        <Button variant="contained" size='small'
                            type="button"
                            onClick={() => { }}
                            
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
                        > Create role + </Button>

                        <Button variant="contained" size='small'
                            type="button"
                            onClick={() => { }}
                            
                            sx={{
                                ...themeBtnStyle,
                                fontSize: "15px",
                                fontWeight: "400",
                                // lineHeight: 14.52px;
                            }}
                        > Add user + </Button>
                    </Stack>

                    <NotificationComponent />
                </Stack>
            </Stack>


            <Box mt={5}>
                <Box>
                    <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        lineHeight: "19.36px",
                        color: kolors.dark,
                    }}
                    >Dashboard</Typography>

                    <Typography
                        sx={{
                            fontWeight: "400",
                            fontSize: "16px",
                            lineHeight: "19.36px",
                            color: kolors.border,
                        }}
                    >Track app performance and sales</Typography>
                </Box>
                

                <Stack direction='row' my={3} gap='20px' flexWrap="wrap"
                    alignItems="center" justifyContent="space-between"
                >
                    <Box
                        sx={{
                            flexGrow: 1,
                            border: `0.5px solid ${kolors.border}`,
                            borderRadius: "8px",
                            bgcolor: kolors.secondary,
                            p: 2,
                            alignSelf: "stretch",
                        }}
                    >
                        <Stack direction='row' spacing="10px" height="35px"
                            alignItems="center" justifyContent="space-between"
                        >
                            <Typography
                                sx={{
                                    fontWeight: "600",
                                    fontSize: "11px",
                                    lineHeight: "13.31px",
                                    color: kolors.tertiary,
                                }}
                            >Total users</Typography>

                            <Box></Box>
                        </Stack>

                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: {xs: "20px", sm: "30px", md: "40px"},
                                color: kolors.primary,
                            }}
                        >10,000</Typography>

                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "12px",
                                    // lineHeight: "12px",
                                    color: kolors.tertiary
                                }}
                            >Select by user type</Typography>
                        </Box>

                        <CustomBgTab 
                            menuItems={usersTypeMenuItems} 
                            action={(item) => handleUsersTypeMenuItems(item)}
                        />

                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            border: `0.5px solid ${kolors.border}`,
                            borderRadius: "8px",
                            bgcolor: kolors.secondary,
                            p: 2,
                            alignSelf: "stretch",
                        }}
                    >
                        <Stack direction='row' spacing="10px" height="35px"
                            alignItems="center" justifyContent="space-between"
                        >
                            <Typography
                                sx={{
                                    fontWeight: "600",
                                    fontSize: "11px",
                                    lineHeight: "13.31px",
                                    color: kolors.tertiary,
                                }}
                            >DYT token purchase</Typography>

                            <Box>
                                <Select
                                    id="demo-simple-select"
                                    value={20}
                                    // onChange={handleChange}
                                    size='small'

                                    sx={{
                                        color: "#fff",
                                        borderRadius: "8px",
                                        bgcolor: kolors.primary,
                                        border: "none",
                                        // borderColor: kolors.tertiary,
                                        textAlign: "start",
                                        // my: 2,
                                        p: "1px",

                                        '& .MuiSelect-select': {
                                            paddingRight: "0px",
                                            paddingLeft: "10px",
                                            paddingTop: "1px",
                                            paddingBottom: "1px",
                                        },
                                        
                                        '.MuiOutlinedInput-notchedOutline': {
                                            // borderColor: kolors.primary,
                                            border: "none",
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            // borderColor: kolors.tertiary, // 'rgba(228, 219, 233, 0.25)',
                                            border: "none",
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            // borderColor: 'var(--TextField-brandBorderHoverColor)',
                                            border: "none",
                                        },
                                        '.MuiSvgIcon-root ': {
                                            fill: "#fff",
                                        }
                                    }}
                                >
                                    <MenuItem value={10}>Weekly</MenuItem>
                                    <MenuItem value={20}>Monthly</MenuItem>
                                    <MenuItem value={30}>Yearly</MenuItem>
                                </Select>
                            </Box>
                        </Stack>

                        <Stack direction='row' spacing="5px" alignItems="center">
                            <Box sx={{
                                maxWidth: "50px",
                                maxHeight: "50px",
                            }}>
                                <img 
                                    src={dytTokenIcon} 
                                    alt="dyt token icon" 
                                    style={{ width: "100%" }} 
                                />
                            </Box>

                            <Typography
                                sx={{
                                    fontWeight: "600",
                                    fontSize: {xs: "20px", sm: "30px", md: "40px"},
                                    color: kolors.primary,
                                }}
                            >$10,000</Typography>
                        </Stack>
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            border: `0.5px solid ${kolors.border}`,
                            borderRadius: "8px",
                            bgcolor: kolors.secondary,
                            alignSelf: "stretch",
                            p: 2, 
                        }}
                    >
                        <Stack direction='row' spacing="10px" height="35px" 
                            alignItems="center" justifyContent="space-between"
                        >
                            <Typography
                                sx={{
                                    fontWeight: "600",
                                    fontSize: "11px",
                                    lineHeight: "13.31px",
                                    color: kolors.tertiary,
                                }}
                            >Sticker purchase</Typography>

                            <Box>
                                <Select
                                    id="demo-simple-select"
                                    value={20}
                                    // onChange={handleChange}
                                    size='small'

                                    sx={{
                                        color: "#fff",
                                        borderRadius: "8px",
                                        bgcolor: kolors.primary,
                                        border: "none",
                                        // borderColor: kolors.tertiary,
                                        textAlign: "start",
                                        // my: 2,
                                        p: "1px",

                                        '& .MuiSelect-select': {
                                            paddingRight: "0px",
                                            paddingLeft: "10px",
                                            paddingTop: "1px",
                                            paddingBottom: "1px",
                                        },
                                        
                                        '.MuiOutlinedInput-notchedOutline': {
                                            // borderColor: kolors.primary,
                                            border: "none",
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            // borderColor: kolors.tertiary, // 'rgba(228, 219, 233, 0.25)',
                                            border: "none",
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            // borderColor: 'var(--TextField-brandBorderHoverColor)',
                                            border: "none",
                                        },
                                        '.MuiSvgIcon-root ': {
                                            fill: "#fff",
                                        }
                                    }}
                                >
                                    <MenuItem value={10}>Weekly</MenuItem>
                                    <MenuItem value={20}>Monthly</MenuItem>
                                    <MenuItem value={30}>Yearly</MenuItem>
                                </Select>
                            </Box>
                        </Stack>

                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: {xs: "20px", sm: "30px", md: "40px"},
                                color: kolors.primary,
                            }}
                        >$10,000</Typography>
                    </Box>
                </Stack>


                <Grid container spacing="20px" // rowSpacing="35px" columnSpacing="20px"
                    // direction="row"
                    sx={{
                        // justifyContent: "space-around",
                        alignItems: "stretch",
                        my: 3
                    }}
                >
                    <Grid size={{ xs: 12, md: 7 }}
                        sx={{
                            border: `1px solid ${kolors.border}`,
                            borderRadius: "8px",
                        }}
                    >
                        <SubscriptionChartComponent />
                    </Grid>

                    <Grid size={{ xs: 12, md: 5 }}
                        sx={{
                            border: `1px solid ${kolors.border}`,
                            borderRadius: "8px",
                        }}
                    >
                        <BoostChartComponent />
                    </Grid>

                    <Grid size={{ xs: 12, md: 7 }}
                        sx={{
                            border: `1px solid ${kolors.border}`,
                            borderRadius: "8px",
                        }}
                    >
                        <DeclinedRequestComponent />
                    </Grid>

                    <Grid size={{ xs: 12, md: 5 }}
                        sx={{
                            border: `1px solid ${kolors.border}`,
                            borderRadius: "8px",
                        }}
                    >
                        <ClientsReviewsComponent />
                    </Grid>


                    <Grid size={{ xs: 12, md: 7 }}
                        sx={{
                            border: `1px solid ${kolors.border}`,
                            borderRadius: "8px",
                        }}
                    >
                        <StoreOrdersComponent />
                    </Grid>

                    <Grid size={{ xs: 12, md: 5 }}
                        sx={{
                            border: `1px solid ${kolors.border}`,
                            borderRadius: "8px",
                        }}
                    >
                        <VerificationRequestComponent />
                    </Grid>

                    <Grid size={12}
                        sx={{
                            border: `1px solid ${kolors.border}`,
                            borderRadius: "8px",
                        }}
                    >
                        <MerchantSuggestionComponent />
                    </Grid>
                </Grid>


            </Box>
            
        </Box>
    );
};

export default Dashboard;
