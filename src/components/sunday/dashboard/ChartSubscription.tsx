import React from 'react';
// import { useState } from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';



interface _Props {
    // menuItems: {
    //     title: string;
    //     status: boolean;
    //     baseLink: string;
    // }[],
    // value: number, 
    // setValue: (data: number) => void
};

const SubscriptionChartComponent: React.FC<_Props> = ({
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
                >Subscription</Typography>

                <Box>
                    <Select
                        id="demo-simple-select"
                        value={20}
                        // onChange={handleChange}
                        size='small'

                        sx={{
                            color: kolors.dark,
                            borderRadius: "8px",
                            // bgcolor: "#fff",
                            // border: "none",
                            borderColor: kolors.border,
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
                                borderColor: kolors.border,
                                // border: "none",
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: kolors.border, // 'rgba(228, 219, 233, 0.25)',
                                // border: "none",
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'var(--TextField-brandBorderHoverColor)',
                                // border: "none",
                            },
                            '.MuiSvgIcon-root ': {
                                fill: kolors.dark,
                            }
                        }}
                    >
                        <MenuItem value={10}>Weekly</MenuItem>
                        <MenuItem value={20}>Monthly</MenuItem>
                        <MenuItem value={30}>Yearly</MenuItem>
                    </Select>
                </Box>
            </Stack>

            <Box 
                sx={{
                    my: 2,
                    borderBottom: `1px solid ${kolors.border}`
                }}
            >
                <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: "24px",
                        lineHeight: "29.05px",
                        color: kolors.primary
                    }}
                >
                    10,000 
                    <Typography component="span"
                        sx={{
                            fontWeight: "400",
                            fontSize: "12px",
                            lineHeight: "13.31px",
                            color: kolors.border,
                            pl: 1,
                        }}
                    > Premium</Typography>
                </Typography>
            </Box>

            <Box>
                <LineChart
                    xAxis={[
                        { 
                            data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                            scaleType: 'band',
                        }
                    ]}

                    series={[
                        {
                            data: [2, 5.5, 12, 18, 15, 50, 20, 56, 20, 17, 23, 19],
                            area: true,
                            color: kolors.tertiary,
                        },
                        
                    ]}

                    // width={500}
                    height={300}
                />
            </Box>

        </Box>
    );
}

export default SubscriptionChartComponent;