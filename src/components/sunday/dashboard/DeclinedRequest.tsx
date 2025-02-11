import React, { useState } from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Typography from '@mui/material/Typography';
import CustomBgTab, { menuItemsInterface } from './CustomBgTab';
import Avatar from '@mui/material/Avatar';
import placeProvider from "@/assets/images/dashboard/placeProvider.jpeg"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface _Props {
    // menuItems: {
    //     title: string;
    //     status: boolean;
    //     baseLink: string;
    // }[],
    // value: number, 
    // setValue: (data: number) => void
};

const DeclinedRequestComponent: React.FC<_Props> = ({
    // menuItems, value, setValue
}) => {
    // const navigate = useNavigate();
    const [declinedRequestMenuItems, setDeclinedRequestMenuItems] = useState([
        {
            label: "Places",
            // action: () => {},
            active: true,
        },
        {
            label: "Security",
            // action: () => {},
            active: false,
        },
        {
            label: "Events",
            // action: () => {},
            active: false,
        },
        {
            label: "Store",
            // action: () => {},
            active: false,
        }
    ]);


    const handleDeclinedRequestTab = (menuItems: menuItemsInterface) => {
        const newdeclineData = declinedRequestMenuItems.filter((item) => {
            if (menuItems.label != item.label) {
                item.active = false;
            } else {
                item.active = true;
            }
            return item
        });
        setDeclinedRequestMenuItems(newdeclineData);


    }

    return (
        <Box 
            sx={{
                // border: `1px solid ${kolors.border}`,
                // borderRadius: "8px",
                p: 2,
                // height: "auto",
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

            <Box my={2}>
                <CustomBgTab 
                    menuItems={declinedRequestMenuItems} 
                    action={(item) => handleDeclinedRequestTab(item)}
                />
            </Box>
            
            <Stack direction='row' spacing="10px"
                justifyContent="space-between" alignItems="start" 

                sx={{
                    border: `1px solid ${kolors.border}`,
                    borderRadius: "8px",
                    p: 1,
                }}
            >
                <Stack direction="row" spacing="5px">
                    <Avatar variant="rounded"
                        alt=""
                        src={placeProvider}
                        sx={{ 
                            width: "47px", height: "47px",
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
                        >Fine house resturant</Typography>

                        <Typography
                            sx={{
                                fontWeight: "400",
                                fontSize: "12px",
                                color: kolors.border
                            }}
                        >Abuja, Nigeria.</Typography>
                    </Box>
                </Stack>
                
                <Stack direction="row" alignItems="center" spacing="5px">
                    <Typography
                        sx={{
                            fontWeight: "400",
                            fontSize: "13px",
                            color: kolors.border
                        }}  
                    >25min ago</Typography>

                    <ChevronRightIcon sx={{ color: kolors.border, fontSize: "18px" }} />
                </Stack>
            </Stack>
        </Box>
    );
}

export default DeclinedRequestComponent;