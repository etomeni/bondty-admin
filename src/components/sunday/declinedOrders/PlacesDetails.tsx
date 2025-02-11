import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import kolors from '@/constants/kolors';
import { themeBtnStyle } from '@/util/mui';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import placeProvider from "@/assets/images/dashboard/placeProvider.jpeg"
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';


interface _Props {
    // menuItems: {
    //     title: string;
    //     status: boolean;
    //     baseLink: string;
    // }[],
    // value: number, 
    // setValue: (data: number) => void
};

const DeclinedOrdersPlacesDetails: React.FC<_Props> = ({
    // menuItems, value, setValue
}) => {
    // const navigate = useNavigate();


    return (
        <Box
            sx={{
                border: `1px solid ${kolors.border}`,
                borderRadius: "10px",
                p: "10px"
            }}
        >
            <Stack direction="row" alignItems="center"
                justifyContent="space-between" spacing="15px"
            >
                <Box>
                    <IconButton size='small'>
                        <ArrowBackIosNewIcon 
                            sx={{ fontSize: "18px" }}
                        />
                    </IconButton>
                </Box>

                <Box>
                    <Button variant="contained" size='small'
                        type="button"
                        onClick={() => { }}
                        
                        sx={{
                            ...themeBtnStyle,
                            fontSize: "12px",
                            fontWeight: "600",
                            // lineHeight: 14.52px;
                        }}
                    >Done</Button>
                </Box>
            </Stack>


            <Box px={5}>
                <Stack direction="row" alignItems="center"
                    justifyContent="center" spacing="15px"
                    color={kolors.primary}
                >
                    <Box
                        sx={{
                            bgcolor: kolors.secondary,
                            borderRadius: "8px",
                            p: 1.5,
                            width: "100%",
                            maxWidth: "150px"
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "13px",
                                fontWeight: "600",
                                lineHeight: "16px",
                            }}
                        >Date</Typography>

                        <Typography
                        >Nov 14, 2024</Typography>
                    </Box>

                    <Box
                        sx={{
                            bgcolor: kolors.secondary,
                            borderRadius: "8px",
                            p: 1.5,
                            width: "100%",
                            maxWidth: "150px"
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "13px",
                                fontWeight: "600",
                                lineHeight: "16px",
                            }}
                        >Time</Typography>

                        <Typography
                        >7:00 pm</Typography>
                    </Box>
                    
                    <Box
                        sx={{
                            bgcolor: kolors.secondary,
                            borderRadius: "8px",
                            p: 1.5,
                            width: "100%",
                            maxWidth: "150px"
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "13px",
                                fontWeight: "600",
                                lineHeight: "16px",
                            }}
                        >Type</Typography>

                        <Typography
                        >VVIP</Typography>
                    </Box>
                </Stack>

                <Stack direction="row" alignItems="center"
                    spacing="10px" my={3}
                >
                    <Box
                        sx={{
                            maxWidth: "135px",
                            maxHeight: "80px",
                            borderRadius: "8px",
                            overflow: "hidden"
                        }}
                    >
                        <img 
                            src={placeProvider} alt='place Provider image'
                            style={{
                                width: "100%",
                                // borderRadius: "8px",
                                // height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </Box>

                    <Box>
                        <Typography noWrap
                            sx={{
                                fontSize: "13px",
                                fontWeight: "600",
                                // lineHeight: "12px",
                                color: "#161616"
                            }}
                        >Fine house resturant</Typography>

                        <Typography noWrap
                            sx={{
                                fontSize: "13px",
                                fontWeight: "600",
                                // lineHeight: "12px",
                                color: "#BCBABA"
                            }}
                        >Abuja, Nigeria.</Typography>

                        <Rating name="read-only"
                            value={2} readOnly
                        />
                    </Box>
                </Stack>

                <Box>
                    <Stack direction="row" alignItems="center"
                        spacing="10px" my={2}
                    >
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />

                        <Typography
                            sx={{
                                fontSize: "16px",
                                fontWeight: '600',
                                lineHeight: "19.36px"
                            }}
                        >Joseph</Typography>

                        <Box bgcolor={kolors.secondary} 
                            borderRadius="8px" py={0.5} px={1}
                        >
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    // lineHeight: "19.36px"
                                    p: 0, m: 0
                                }}
                            >$50</Typography>
                        </Box>

                    </Stack>

                </Box>
            </Box>


        </Box>
    );
}

export default DeclinedOrdersPlacesDetails;