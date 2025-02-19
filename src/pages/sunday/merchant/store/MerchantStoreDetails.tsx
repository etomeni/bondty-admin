// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import NotificationComponent from '@/components/sunday/NotificationComponent';
import Typography from '@mui/material/Typography';
import BackNavigationArrowBtn from '@/components/sunday/BackNavigationArrowBtn';
import MerchantTopOptionsComponent from '@/components/sunday/merchant/MerchantTopOptionsComponent';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SearchwordComponent from '@/components/sunday/SearchwordComponent';
import StarIcon from '@mui/icons-material/Star';
import placeProvider from "@/assets/images/dashboard/placeProvider.jpeg"
import TopTotalCardComponent from '@/components/sunday/merchant/TopTotalCardComponent';
import { getQueryParams } from '@/util/resources';
import { useEffect } from 'react';
import { usePlaceHook } from '@/hooks/merchants/useplaceHook';
import { useNavigate } from 'react-router-dom';



const MerchantStoreDetailsPage = () => {
    const navigate = useNavigate();
    // const [tabsValue, setTabsValue] = useState(0);
    // const [orderView, setOrderView] = useState<"list" | "details">("list");
    // const [orderCategory, setOrderCategory] = useState<"Merchant order" | "Bondyt order">("Bondyt order");

    // const viewType = getQueryParams("viewType");
    const category = getQueryParams("category");
    const merchant_id = getQueryParams("id");

    // useEffect(() => {
    //     setOrderView("list");
    // }, [tabsValue]);
    

    const {
        // limitNo, setLimitNo,
        // currentPageNo, totalRecords,

        placeMerchant,
        placeMerchantAnalytics,
        

        getPlaceMerchant,
        getPlaceMerchantAnalytics,
    } = usePlaceHook();

    useEffect(() => {
        if (merchant_id) {
            getPlaceMerchant(merchant_id);
            getPlaceMerchantAnalytics(merchant_id);
            
        } else {
            navigate(-1);
        }
    }, []);


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

            <MerchantTopOptionsComponent 
                merchantCaterory={category}
                merchantId={merchant_id}
            />


            <Stack direction="row" gap="20px" flexWrap="wrap" mt={5}
                alignItems="stretch" 
                justifyContent={{xs: "center", md: "start", lg: "space-between"}}
            >
                <TopTotalCardComponent 
                    title='Total sales made'
                    value='$2,000'
                />

                <TopTotalCardComponent 
                    title='Completed  orders'
                    value='200'
                />

                <TopTotalCardComponent 
                    title='Declined orders'
                    value='2'
                />
                <TopTotalCardComponent 
                    title='Total available products'
                    value='5'
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
                                <MenuItem value={0}>All</MenuItem>
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
                    </Stack>

                    <Box p={2}>
                        <Stack direction="row" rowGap="30px" columnGap="20px"  flexWrap="wrap"
                            alignItems="center" justifyContent={{xs: "center",  md: "space-between" }}
                            // bgcolor="#F2F2F2" p={1}
                        >
                            {
                                [1,2,3,4,5,6,7,8,9,0].map((_item, index) => (
                                    <Box key={index}
                                        sx={{
                                            width: "170px",
                                            bgcolor: "#F2F2F2",
                                            borderRadius: "8px"
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                borderRadius: "8px",
                                                overflow: "hidden"
                                            }}
                                        >
                                            <Box 
                                                sx={{
                                                    height: "160px"
                                                }}
                                            >
                                                <img
                                                    src={placeProvider}
                                                    alt='store image'
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover"
                                                    }}
                                                />
                                            </Box>

                                            <Box
                                                sx={{
                                                    // height: "40px",
                                                    bgcolor: kolors.primary,
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontWeight: "600",
                                                        fontSize: "16px",
                                                        lineHeight: "40px",
                                                        color: "#fff",
                                                        textAlign: "center",
                                                    }}
                                                >In stock</Typography>
                                            </Box>
                                        </Box>

                                        <Box p={1}>
                                            <Stack direction="row" alignItems="center" spacing="5px"
                                                justifyContent="space-between"
                                            >
                                                <Typography
                                                    sx={{
                                                        fontWeight: "500",
                                                        fontSize: "13px",
                                                        color: kolors.dark
                                                    }}
                                                >Grey fitted shirt</Typography>

                                                <Stack direction="row" alignItems="center" spacing="5px">
                                                    <StarIcon 
                                                        sx={{
                                                            color: "gold",
                                                            fontSize: "18px",
                                                        }}
                                                    />

                                                    <Typography
                                                        sx={{
                                                            fontWeight: "500",
                                                            fontSize: "13px",
                                                            color: kolors.dark
                                                        }}
                                                    >5.0</Typography>
                                                </Stack>
                                            </Stack>

                                            <Typography
                                                sx={{
                                                    fontWeight: "500",
                                                    fontSize: "13px",
                                                    color: kolors.dark
                                                }}
                                            >$40.00</Typography>
                                        </Box>
                                    </Box>
                                ))
                            }
                        </Stack>
                    </Box>
                </Box>
            </Box>
            
        </Box>
    );
};

export default MerchantStoreDetailsPage;
