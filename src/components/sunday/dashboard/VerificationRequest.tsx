import React from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import placeProvider from "@/assets/images/dashboard/placeProvider.jpeg"
import Button from '@mui/material/Button';
import { themeBtnStyle } from '@/util/mui';


interface _Props {
    // menuItems: {
    //     title: string;
    //     status: boolean;
    //     baseLink: string;
    // }[],
    // value: number, 
    // setValue: (data: number) => void
};

const VerificationRequestComponent: React.FC<_Props> = ({
    // menuItems, value, setValue
}) => {
    // const navigate = useNavigate();


    return (
        <Box 
            sx={{
                p: 2,
            }}
        >

            <Stack direction='row' spacing="10px"
                alignItems="center" justifyContent="space-between"
            >
                <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: "11px",
                        lineHeight: "13.31px",
                        color: kolors.dark,
                    }}
                >Verification requests</Typography>

                <Box> </Box>
            </Stack>


            <Stack direction='row' spacing="10px"
                justifyContent="space-between" alignItems="center" 
                sx={{
                    border: `1px solid ${kolors.border}`,
                    borderRadius: "8px",
                    p: 1,
                    my: 2
                }}
            >
                <Stack direction="row" spacing="5px">
                    <Avatar variant="rounded"
                        alt=""
                        src={placeProvider}
                        sx={{ 
                            width: "84px", height: "84px",
                            bgcolor: kolors.secondary
                        }}
                    />

                    <Box>
                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "13px",
                                color: kolors.dark
                            }}
                        >Joshua</Typography>

                        <Typography
                            sx={{
                                fontWeight: "400",
                                fontSize: "12px",
                                color: kolors.border
                            }}
                        >Male, 25</Typography>

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
                    <Button variant="contained" size='small'
                        type="button"
                        onClick={() => { }}
                        
                        sx={{
                            ...themeBtnStyle,
                            fontSize: "12px",
                            fontWeight: "600",
                            // lineHeight: 14.52px;
                        }}
                    >Approve</Button>

                    <Typography
                        onClick={() => {}}
                        sx={{
                            fontWeight: "600",
                            fontSize: "13px",
                            color: kolors.dark,
                            textAlign: "center",
                            mt: 1,
                            cursor: "pointer"
                        }}
                    >Reject</Typography>
                </Box>
            </Stack>

            <Stack direction='row' spacing="10px"
                justifyContent="space-between" alignItems="center" 
                sx={{
                    border: `1px solid ${kolors.border}`,
                    borderRadius: "8px",
                    p: 1,
                    mt: 2
                }}
            >
                <Stack direction="row" spacing="5px">
                    <Avatar variant="rounded"
                        alt=""
                        src={placeProvider}
                        sx={{ 
                            width: "84px", height: "84px",
                            bgcolor: kolors.secondary
                        }}
                    />

                    <Box>
                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "13px",
                                color: kolors.dark
                            }}
                        >Michelle</Typography>

                        <Typography
                            sx={{
                                fontWeight: "400",
                                fontSize: "12px",
                                color: kolors.border
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
                    <Button variant="contained" size='small'
                        type="button"
                        onClick={() => { }}
                        
                        sx={{
                            ...themeBtnStyle,
                            fontSize: "12px",
                            fontWeight: "600",
                            // lineHeight: 14.52px;
                        }}
                    >Approve</Button>

                    <Typography
                        onClick={() => {}}
                        sx={{
                            fontWeight: "600",
                            fontSize: "13px",
                            color: kolors.dark,
                            textAlign: "center",
                            mt: 1,
                            cursor: "pointer"
                        }}
                    >Reject</Typography>
                </Box>
            </Stack>

        </Box>
    );
}

export default VerificationRequestComponent;