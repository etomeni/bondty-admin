import { useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';

import NotificationComponent from '@/components/sunday/NotificationComponent';
import SearchwordComponent from '@/components/sunday/SearchwordComponent';
import CustomTabsHeaderBar from '@/components/sunday/CustomTabsHeaderBar';
import { CustomTabContentPanel } from '@/components/sunday/CustomTabContentPanel';
import AvailableMerchantsValueComponent from '@/components/sunday/merchant/AvailableMerchantsValueComponent';
import { useMerchantHook } from '@/hooks/merchants/useMerchantHook';



const AvailableMerchantsPage = () => {
    const navigate = useNavigate();
    const [tabsValue, setTabsValue] = useState(0);

    const {
        // limitNo, setLimitNo,
        // currentPageNo, totalRecords,
        // apiResponse,

        merchants,
        getMerchantsByCategory,
    } = useMerchantHook();

    useEffect(() => {
        switch (tabsValue) {
            case 0:
                getMerchantsByCategory("stores");
                break;
        
            case 1:
                getMerchantsByCategory("locations");
                break;
        
            case 2:
                getMerchantsByCategory("place"); // √
                break;
        
            case 3:
                getMerchantsByCategory("security");
                break;
        
            case 4:
                getMerchantsByCategory("books");
                break;
        
            default:
                getMerchantsByCategory("store");
                break;
        }
    }, [tabsValue]);

    
    return (
        <Box mb={5}
            sx={{
                border: `1px solid ${kolors.border}`,
                bgcolor: "#fff",
                borderRadius: 2,
                p: 1.5,
                my: 3,
                minHeight: "95dvh"
            }}
        >
            <Stack direction='row' gap='10px' flexWrap="wrap"
                alignItems="center" justifyContent="space-between"
            >
                <SearchwordComponent performSearch={() => {}} />

                <NotificationComponent />
            </Stack>

            <Box mt={5}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3 }}>
                    <CustomTabsHeaderBar 
                        currentValue={tabsValue}
                        setValue={setTabsValue}
                        title={["Store", "Locations", "Events", "Security", "Books"]}
                    />
                </Box>

                <CustomTabContentPanel value={tabsValue} index={0}>
                    <AvailableMerchantsValueComponent 
                        action={(merchantCategory, merchant) => {
                            navigate({
                                pathname: "/admin/merchant/merchant-store",
                                search: `?${createSearchParams({ 
                                    viewType: "credentials",
                                    category: merchantCategory,
                                    id: merchant.id,
                                })}`,
                            });
                        }}
                        merchantCategory='Store'
                        merchantValues={merchants}
                    />
                </CustomTabContentPanel>

                <CustomTabContentPanel value={tabsValue} index={1}>
                    <AvailableMerchantsValueComponent 
                        action={(merchantCategory, merchant) => {
                            navigate({
                                pathname: "/admin/merchant/merchant-location-details",
                                search: `?${createSearchParams({ 
                                    viewType: "credentials",
                                    category: merchantCategory,
                                    id: merchant.id,
                                })}`,
                            });
                        }}
                        merchantCategory='Locations'
                        merchantValues={merchants}
                    />
                </CustomTabContentPanel>
             
                <CustomTabContentPanel value={tabsValue} index={2}>
                    <AvailableMerchantsValueComponent 
                        action={(merchantCategory, merchant) => {
                            navigate({
                                pathname: "/admin/merchant/merchant-events-details",
                                search: `?${createSearchParams({ 
                                    viewType: "credentials",
                                    category: merchantCategory,
                                    id: merchant.id,
                                })}`,
                            });
                        }}
                        merchantCategory='Events'
                        merchantValues={merchants}
                    />
                </CustomTabContentPanel>

                <CustomTabContentPanel value={tabsValue} index={3}>
                    <AvailableMerchantsValueComponent 
                        action={(merchantCategory, merchant) => {
                            navigate({
                                pathname: "/admin/merchant/merchant-security-details",
                                search: `?${createSearchParams({ 
                                    viewType: "credentials",
                                    category: merchantCategory,
                                    id: merchant.id,
                                })}`,
                            });
                        }}
                        merchantCategory='Security'
                        merchantValues={merchants}
                    />
                </CustomTabContentPanel>

                <CustomTabContentPanel value={tabsValue} index={4}>
                    <AvailableMerchantsValueComponent 
                        action={(merchantCategory, merchant) => {
                            navigate({
                                pathname: "/admin/merchant/merchant-books-details",
                                search: `?${createSearchParams({ 
                                    viewType: "credentials",
                                    category: merchantCategory,
                                    id: merchant.id,
                                })}`,
                            });
                        }}
                        merchantCategory='Books'
                        merchantValues={merchants}
                    />
                </CustomTabContentPanel>
            </Box>
        </Box>
    );
};

export default AvailableMerchantsPage;
