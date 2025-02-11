import React from 'react';
// import { useState } from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import { themeBtnStyle } from '@/util/mui';
import SearchwordComponent from '../SearchwordComponent';


interface _Props {
    // title: "Merchant order" | "Bondyt order";
    // // value: number, 
    // setView: (view: "list" | "details") => void
};

const StoreComponent: React.FC<_Props> = ({
    // title, setView
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
                <Box>
                    <Select
                        id="demo-simple-select"
                        defaultValue={20}
                        // onChange={handleChange}
                        size='small'

                        sx={{
                            color: "#fff",
                            borderRadius: "8px",
                            bgcolor: kolors.primary,
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
                                fill: kolors.border,
                            }
                        }}
                    >
                        <MenuItem value={10}>Men</MenuItem>
                        <MenuItem value={20}>Women</MenuItem>
                        <MenuItem value={30}>Gadgets</MenuItem>
                        <MenuItem value={40}>Beauty/Skincare</MenuItem>
                        <MenuItem value={50}>Foodstuff</MenuItem>
                        <MenuItem value={60}>Cars</MenuItem>
                    </Select>
                </Box>

                <Box>
                    <SearchwordComponent 
                        performSearch={() => {}}
                    />
                </Box>

                <Box>
                    <Button variant="contained" size='small'
                        type="button"
                        onClick={() => { }}
                        
                        sx={{
                            ...themeBtnStyle,
                            bgcolor: kolors.secondary,
                            color: kolors.primary,
                            fontSize: "12px",
                            fontWeight: "600",
                            // lineHeight: 14.52px;
                        }}
                    >
                        Add Promotion
                        <AddIcon sx={{ fontSize: "16px", ml: 1 }} />
                    </Button>
                </Box>
            </Stack>

            <Box p={2}>
                <Stack direction="row" gap="10px" flexWrap="wrap"
                    alignItems="center" // justifyContent="space-between"
                    // bgcolor="#F2F2F2" p={1}
                >
                    {
                        [1,2,3,4,5,6,7,8,9,0].map((_item, index) => (
                            <Box key={index}
                                sx={{
                                    width: "170px",
                                    borderRadius: "4px",
                                    overflow: "hidden"
                                }}
                            >
                                <Box>
                                    <img
                                        src=''
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain"
                                        }}
                                    />
                                </Box>

                            </Box>
                        ))
                    }
                </Stack>
            </Box>
        </Box>
    );
}

export default StoreComponent;