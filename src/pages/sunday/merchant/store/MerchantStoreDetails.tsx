import { useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';

// import placeProvider from "@/assets/images/dashboard/placeProvider.jpeg"
import EmptyListComponent from '@/components/EmptyList';
import LoadingDataComponent from '@/components/LoadingData';
import SearchwordComponent from '@/components/sunday/SearchwordComponent';
import NotificationComponent from '@/components/sunday/NotificationComponent';
import BackNavigationArrowBtn from '@/components/sunday/BackNavigationArrowBtn';
import TopTotalCardComponent from '@/components/sunday/merchant/TopTotalCardComponent';
import MerchantTopOptionsComponent from '@/components/sunday/merchant/MerchantTopOptionsComponent';

// import { usePlaceHook } from '@/hooks/merchants/useplaceHook';
import { useStoreHook } from '@/hooks/merchants/useStoreHook';
import { currencyDisplay, getQueryParams } from '@/util/resources';



const MerchantStoreDetailsPage = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState<string>('0');
    
    // const viewType = getQueryParams("viewType");
    const category = getQueryParams("category");
    const merchant_id = getQueryParams("id");
    

    const {
        // limitNo, setLimitNo,
        // currentPageNo, totalRecords,

        // placeMerchant,
        // placeMerchantAnalytics,

        storeMerchant,
        allCategories,
        storeMerchantAnalytics,
        // completedStoreProduct,
        // declinedStoreProduct,
        // pendingStoreProduct,

        getMerchantStore,
        getAllCategories,
        // getMerchantDeclinedStoreProduct,
        // getMerchantPendingStoreProduct,
        // getMerchantCompletedStoreProduct,
        getMerchantStoreAnalytics,
        searchStoreMerchant,
    } = useStoreHook();

    useEffect(() => {
        getAllCategories();
    }, []);

    useEffect(() => {
        if (merchant_id) {
            if (activeCategory != "0") getMerchantStore(merchant_id, activeCategory);
            getMerchantStoreAnalytics(merchant_id);
        } else {
            navigate(-1);
        }
    }, [activeCategory]);

    useEffect(() => {
        if (allCategories.length) {
            const _activeCategory = allCategories[0].id;
            setActiveCategory(_activeCategory);
        }
    }, [allCategories]);

    function calculateAverageRating(ratings: any[]): number {
        if (ratings.length === 0) {
            return 0; // Return 0 if there are no ratings to avoid division by zero
        }
    
        const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
        const averageRating = totalRating / ratings.length;
    
        return averageRating;
    }
    

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
                    value={currencyDisplay(Number(storeMerchantAnalytics?.totalSales))}
                    // value='$2,000'
                />

                <Box sx={{ cursor: "pointer" }}
                    onClick={() => {
                        navigate({
                            pathname: "/admin/merchant/store-orders/Completed",
                            search: `?${createSearchParams({ 
                                viewType: "Completed",
                                category: activeCategory,
                                id: merchant_id
                            })}`,
                        });
                    }}
                >
                    <TopTotalCardComponent 
                        title='Completed orders'
                        value={`${storeMerchantAnalytics?.completedCount || 0}`}
                    />
                </Box>


                <Box sx={{ cursor: "pointer" }}
                    onClick={() => {
                        navigate({
                            pathname: "/admin/merchant/store-orders/Declined",
                            search: `?${createSearchParams({ 
                                viewType: "Declined",
                                category: activeCategory,
                                id: merchant_id
                            })}`,
                        });
                    }}
                >
                    <TopTotalCardComponent 
                        title='Declined orders'
                        value={`${storeMerchantAnalytics?.rejectedCount || 0}`}
                    />
                </Box>

                <TopTotalCardComponent 
                    title='Total available products'
                    value={`${storeMerchantAnalytics?.totalAvailableItems || 0}`}
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
                                value={activeCategory}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setActiveCategory(value);
                                }}

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
                                <MenuItem value={0} disabled>All</MenuItem>
                                {
                                    allCategories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}
                                            sx={{
                                                textTransform: "capitalize"
                                            }}
                                        >{category.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </Box>

                        <Box>
                            <SearchwordComponent 
                                performSearch={(searchWord) => {
                                    console.log(searchWord);

                                    if (searchWord == "") {
                                        getMerchantStore(merchant_id, activeCategory);
                                        getMerchantStoreAnalytics(merchant_id);
                                    } else {
                                        searchStoreMerchant(merchant_id, searchWord);
                                    }

                                }}
                            />
                        </Box>
                    </Stack>

                    <Box p={2}>
                        <Stack direction="row" rowGap="30px" columnGap="20px"  flexWrap="wrap"
                            alignItems="center" justifyContent={{xs: "center",  md: "space-between" }}
                            // bgcolor="#F2F2F2" p={1}
                        >
                            {
                                storeMerchant ?
                                    storeMerchant.length ?
                                        storeMerchant.map((storeItem) => (
                                            <Box key={storeItem.id}
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
                                                            src={storeItem.product_photos[0].url}
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
                                                            bgcolor: storeItem.in_stock ? kolors.primary : "#7B7979",
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
                                                        >{ storeItem.in_stock ? "In stock" : "Out of stock" }</Typography>
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
                                                        >{ storeItem.name }</Typography>

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
                                                            >{ calculateAverageRating(storeItem.ratings) }</Typography>
                                                        </Stack>
                                                    </Stack>

                                                    <Typography
                                                        sx={{
                                                            fontWeight: "500",
                                                            fontSize: "13px",
                                                            color: kolors.dark
                                                        }}
                                                    >{currencyDisplay(Number(storeItem.price))}</Typography>
                                                </Box>
                                            </Box>
                                        ))
                                    : <Box my={5} mx="auto">
                                        <EmptyListComponent notFoundText='No record found.' />
                                    </Box>
                                : <Box my={5} mx="auto">
                                    <LoadingDataComponent />
                                </Box>
                            }
                        </Stack>
                    </Box>
                </Box>
            </Box>
            
        </Box>
    );
};

export default MerchantStoreDetailsPage;
