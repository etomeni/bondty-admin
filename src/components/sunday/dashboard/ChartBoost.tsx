import React from 'react';
// import { useState } from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
{/* <SimpleLineChart /> */}
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';


interface _Props {
    // menuItems: {
    //     title: string;
    //     status: boolean;
    //     baseLink: string;
    // }[],
    // value: number, 
    // setValue: (data: number) => void
};

const BoostChartComponent: React.FC<_Props> = ({
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
                >Boost</Typography>

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

            <Box position="relative">
                <Box>
                    <Gauge
                        value={75}
                        startAngle={-110}
                        endAngle={110}

                        cornerRadius="50%"
                        sx={(_theme) => ({
                            // [`& .${gaugeClasses.valueText}`]: {
                            //     fontSize: 40,
                            // },
                            [`& .${gaugeClasses.valueArc}`]: {
                                fill: kolors.primary,
                            },
                            // [`& .${gaugeClasses.referenceArc}`]: {
                            //     fill: theme.palette.text.disabled,
                            // },
                        })}
                        
                        text=""
                        // width={500}
                        height={300}
                    />
                </Box>

                <Box
                    sx={{
                        position: "absolute",
                        top: "70px",
                        width: "100%"
                    }}
                >
                    <Gauge
                        value={75}
                        startAngle={-110}
                        endAngle={110}

                        cornerRadius="50%"
                        sx={(_theme) => ({
                            [`& .${gaugeClasses.valueText}`]: {
                                fontSize: "18px",
                            },
                            [`& .${gaugeClasses.valueArc}`]: {
                                fill: kolors.tertiary,
                            },
                            // [`& .${gaugeClasses.referenceArc}`]: {
                            //     fill: theme.palette.text.disabled,
                            // },
                        })}
                    

                        text={
                            ({ value, valueMax }) => `${value} / ${valueMax} \n Average user activity`
                        }
                        // width={500}
                        height={200}
                    />
                </Box>
            </Box>

            <Box
                sx={{
                    border: `1px solid ${kolors.border}`,
                    borderRadius: "8px",
                    p: 1,
                }}
            >
                <Stack direction="row" spacing="10px" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" spacing="5px" alignItems="center">
                        <Box
                            sx={{
                                width: "36px",
                                borderRadius: "12px",
                                height: "6px",
                                bgcolor: kolors.primary
                            }}
                        ></Box>

                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: "12px",
                                color: kolors.dark
                            }}
                        >Profile boosted</Typography>
                    </Stack>

                    <Typography
                        sx={{
                            fontWeight: 400,
                            fontSize: "12px",
                            color: kolors.border
                        }}
                    >35%</Typography>
                </Stack>

                <Stack direction="row" spacing="10px" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" spacing="5px" alignItems="center">
                        <Box
                            sx={{
                                width: "36px",
                                borderRadius: "12px",
                                height: "6px",
                                bgcolor: kolors.secondary
                            }}
                        ></Box>

                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: "12px",
                                color: kolors.dark
                            }}
                        >Profile boosted</Typography>
                    </Stack>

                    <Typography
                        sx={{
                            fontWeight: 400,
                            fontSize: "12px",
                            color: kolors.border
                        }}
                    >35%</Typography>
                </Stack>
            </Box>
        </Box>
    );
}

export default BoostChartComponent;