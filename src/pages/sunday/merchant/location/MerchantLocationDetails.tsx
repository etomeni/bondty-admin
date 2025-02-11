// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import NotificationComponent from '@/components/sunday/NotificationComponent';
import Typography from '@mui/material/Typography';
import BackNavigationArrowBtn from '@/components/sunday/BackNavigationArrowBtn';
import MerchantTopOptionsComponent from '@/components/sunday/merchant/MerchantTopOptionsComponent';
import SearchwordComponent from '@/components/sunday/SearchwordComponent';
import StarIcon from '@mui/icons-material/Star';
import TopTotalCardComponent from '@/components/sunday/merchant/TopTotalCardComponent';
import Button from '@mui/material/Button';
import { themeBtnStyle } from '@/util/mui';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid2';



const MerchantLocationDetailsPage = () => {


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

            <MerchantTopOptionsComponent />


            <Stack direction="row" gap="20px" flexWrap="wrap" mt={5}
                alignItems="stretch" 
                justifyContent={{xs: "center", md: "start", lg: "space-between"}}
            >
                <TopTotalCardComponent 
                    title='Total sales made'
                    value='$2,000'
                />

                <TopTotalCardComponent 
                    title='Total reservations'
                    value='200'
                />

                <TopTotalCardComponent 
                    title='Total declined orders'
                    value='2'
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
                        <Box>
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
                                > Delete Location </Button>
                            </Stack>
                        </Box>

                        <Box>
                            <SearchwordComponent 
                                performSearch={() => {}}
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

                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, md: 7, lg: 8 }}
                                sx={{
                                    border: `1px solid ${kolors.border}`,
                                    borderRadius: "8px",
                                    p: 2
                                }}
                            >
                                <Box>
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
                                            >$0.00</Typography>
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
                                            >0</Typography>
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
                                            >6</Typography>
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
                                            >10</Typography>
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

                                        <Box
                                            sx={{
                                                bgcolor: "#F2F2F2",
                                                p: 2,
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
                                                >ID: 1234hg53</Typography>

                                                <Typography
                                                    sx={{
                                                        fontWeight: "400",
                                                        fontSize: "13px",
                                                        color: "#BCBABA"
                                                    }}
                                                >2 days ago</Typography>
                                            </Stack>


                                            <Stack direction="row" spacing="20px"
                                                alignItems="center"
                                            >
                                                <Rating
                                                    name="text-feedback"
                                                    value={4}
                                                    readOnly
                                                    precision={1}
                                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                />

                                                <Typography
                                                    sx={{
                                                        fontWeight: "500",
                                                        fontSize: "24px",
                                                        color: kolors.dark,
                                                        mt: 3
                                                    }}
                                                >4.0</Typography>
                                            </Stack>


                                            <Typography
                                                sx={{
                                                    fontSize: "13px",
                                                    fontWeight: "400",
                                                    color: "#595757",
                                                }}
                                            >
                                                Lacus sed viverra tellus in hac habitasse platea dictumst. 
                                                Malesuada nunc vel risus commodo. 
                                                In mollis nunc sed id semper risus in hendrerit. 
                                            </Typography>

                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
            
        </Box>
    );
};

export default MerchantLocationDetailsPage;
