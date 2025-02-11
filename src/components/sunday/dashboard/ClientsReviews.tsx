import React from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Typography from '@mui/material/Typography';


interface _Props {
    // menuItems: {
    //     title: string;
    //     status: boolean;
    //     baseLink: string;
    // }[],
    // value: number, 
    // setValue: (data: number) => void
};

const ClientsReviewsComponent: React.FC<_Props> = ({
    // menuItems, value, setValue
}) => {
    // const navigate = useNavigate();


    return (
        <Box 
            sx={{
                // border: `1px solid ${kolors.border}`,
                // borderRadius: "8px",
                p: 2,
                // height: "100%"
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
                >Declined requests</Typography>

                <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: "12px",
                        lineHeight: "14.31px",
                        color: kolors.primary,
                    }}
                >More</Typography>
            </Stack>

            <Stack direction='row' spacing="10px"
                alignItems="start" justifyContent="space-between"
                sx={{
                    border: `1px solid ${kolors.border}`,
                    borderRadius: "8px",
                    p: 1,
                    my: 2
                }}
            >
                <Box>
                    <Typography 
                        sx={{
                            fontWeight: "600",
                            fontSize: "16px",
                            color: kolors.dark
                        }}
                    >Vanilla Abuja</Typography>

                    <Typography 
                        sx={{
                            fontWeight: "400",
                            fontSize: "15px",
                            color: kolors.border
                        }}
                    >South, london</Typography>
                </Box>

                <Box>
                    <Typography sx={{ fontSize: "13px" }}>
                        <Typography component="span"
                            sx={{
                                fontWeight: "600",
                            }}
                        >ID:1234hg53 </Typography>

                        <Typography component="span"
                            sx={{ color: "#595757" }}
                        >
                            Lacus sed viverra tellus in hac habitasse platea dictumst. 
                            Malesuada nunc vel risus commodo. 
                            In mollis nunc sed id semper risus in hendrerit.
                        </Typography>
                    </Typography>

                </Box>
            </Stack>



        </Box>
    );
}

export default ClientsReviewsComponent;