import React from 'react';
// import { useState } from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import placeProvider from "@/assets/images/dashboard/placeProvider.jpeg"
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';


interface _Props {
    title: "Merchant order" | "Bondyt order";
    // value: number, 
    setView: (view: "list" | "details") => void
};

const OrderDetailsComponent: React.FC<_Props> = ({
    title, setView
}) => {
    // const navigate = useNavigate();


    return (
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
                <Stack direction="row" spacing="10px" alignItems="center">
                    <IconButton size='small' onClick={() => setView("list")}>
                        <NavigateBeforeIcon sx={{ fontSize: "24px" }} />
                    </IconButton>

                    <Typography
                        sx={{
                            fontWeight: "600",
                            fontSize: "16px",
                            color: kolors.dark,
                        }}
                    >{ title }</Typography>
                </Stack>

                <Box>
                    <Select
                        id="demo-simple-select"
                        value={10}
                        // onChange={handleChange}
                        size='small'

                        sx={{
                            color: kolors.dark,
                            borderRadius: "8px",
                            bgcolor: kolors.secondary,
                            border: "none",
                            // borderColor: kolors.border,
                            textAlign: "start",
                            // my: 2,
                            // p: "1px",

                            // '& .MuiSelect-select': {
                            //     paddingRight: "0px",
                            //     paddingLeft: "10px",
                            //     paddingTop: "1px",
                            //     paddingBottom: "1px",
                            // },
                            
                            '.MuiOutlinedInput-notchedOutline': {
                                // borderColor: kolors.border,
                                border: "none",
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                // borderColor: kolors.border, // 'rgba(228, 219, 233, 0.25)',
                                border: "none",
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                // borderColor: 'var(--TextField-brandBorderHoverColor)',
                                border: "none",
                            },
                            '.MuiSvgIcon-root ': {
                                fill: kolors.dark,
                            }
                        }}
                    >
                        <MenuItem value={10}>Incomplete</MenuItem>
                        <MenuItem value={20}>In progress</MenuItem>
                        <MenuItem value={30}>Complete</MenuItem>
                    </Select>
                </Box>
            </Stack>

            <Box p={2}>
                <Stack direction="row" flexWrap="wrap"
                    gap={{xs: "10px", sm: "30px", md: "50px", lg: "70px" }}
                >
                    <Stack direction="row" spacing="10px"
                        alignItems="start"
                    >
                        <Avatar variant="rounded"
                            alt=""
                            src={placeProvider}
                            sx={{ 
                                width: "150px", height: "130px",
                                bgcolor: kolors.secondary
                            }}
                        />

                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    color: kolors.dark
                                }}
                            >2014 Mercedes Glk350</Typography>

                            <Typography
                                sx={{
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    color: "#595757"
                                }}
                            >Grey</Typography>

                            <Box
                                sx={{
                                    borderRadius: "8px",
                                    padding: "10px",
                                    bgcolor: kolors.secondary,
                                    width: "fit-content"
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "600",
                                        fontSize: "13px",
                                        color: kolors.primary,
                                    }}
                                >Payment confirmed</Typography>
                            </Box>

                            <Typography
                                sx={{
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    color: kolors.dark
                                }}
                            >$3,000</Typography>
                        </Box>
                    </Stack>
                    
                    {
                        title == "Merchant order" ?
                            <Box>
                                <Stack direction="row" spacing="5px"
                                    alignItems="center"
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "600",
                                            fontSize: "13px",
                                            color: kolors.dark,
                                        }}
                                    >Merchant ID: </Typography>

                                    <Box 
                                        sx={{
                                            px: "22px",
                                            py: "8px",
                                            borderRadius: "4px",
                                            bgcolor: kolors.primary
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: "600",
                                                fontSize: "13px",
                                                color: "#fff"
                                            }}
                                        >MER-101</Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        : <></>
                    }

                    <Box></Box>
                </Stack>


                <Stack direction="row" flexWrap="wrap" mt={4}
                    gap={{xs: "20px", sm: "35px", md: "50px", lg: "70px"}}
                >
                    <Stack spacing="10px">
                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "16px",
                                color: kolors.dark
                            }}
                        >Sender</Typography>

                        <Box 
                            sx={{
                                px: "22px",
                                py: "8px",
                                borderRadius: "4px",
                                bgcolor: kolors.primary,
                                width: "fit-content"
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: "600",
                                    fontSize: "13px",
                                    color: "#fff"
                                }}
                            >Michel</Typography>
                        </Box>

                        <Typography
                            sx={{
                                fontWeight: "400",
                                fontSize: "13px",
                                color: kolors.dark,
                                border: `1px solid ${kolors.border}`,
                                borderRadius: "8px",
                                p: 1,
                                maxWidth: {xs: "100%", md: "200px"},
                            }}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                            Quasi qui vel tenetur dolorem sit voluptatum, 
                            corporis magni architecto repellat incidunt cum totam adipisci 
                            consequuntur quae aliquam dicta impedit ex? Corporis?
                        </Typography>
                    </Stack>

                    <Stack spacing="10px">
                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "16px",
                                color: kolors.dark
                            }}
                        >Receiver</Typography>

                        <Box 
                            sx={{
                                px: "22px",
                                py: "8px",
                                borderRadius: "4px",
                                bgcolor: kolors.primary,
                                width: "fit-content"
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: "600",
                                    fontSize: "13px",
                                    color: "#fff"
                                }}
                            >Michel</Typography>
                        </Box>

                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "13px",
                                    color: "#595757",
                                }}
                            >Address</Typography>

                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "13px",
                                    color: kolors.dark,
                                    maxWidth: {xs: "100%", md: "200px"},
                                }}
                            >
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                                Quasi qui vel tenetur dolorem sit voluptatum, 
                                corporis magni architecto repellat incidunt cum totam adipisci 
                                consequuntur quae aliquam dicta impedit ex? Corporis?
                            </Typography>
                        </Box>
                    </Stack>

                    <Box></Box>
                </Stack>
            </Box>
        </Box>
    );
}

export default OrderDetailsComponent;