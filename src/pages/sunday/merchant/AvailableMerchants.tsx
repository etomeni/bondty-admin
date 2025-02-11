import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';


import NotificationComponent from '@/components/sunday/NotificationComponent';
import SearchwordComponent from '@/components/sunday/SearchwordComponent';
import CustomTabsHeaderBar from '@/components/sunday/CustomTabsHeaderBar';
import { CustomTabContentPanel } from '@/components/sunday/CustomTabContentPanel';
import AvailableMerchantsValueComponent from '@/components/sunday/merchant/AvailableMerchantsValueComponent';


const merchantValueData = [
    {
        merchantName: "Embassy",
        category: "Events",
        email: "Embassy@gmail.com",
    },
    {
        merchantName: "Treasure Nelson",
        category: "Locations",
        email: "Embassy@gmail.com",
    },
    {
        merchantName: "James Raphel",
        category: "Store",
        email: "Embassy@gmail.com",
    },
];

const AvailableMerchantsPage = () => {
    const navigate = useNavigate();
    const [tabsValue, setTabsValue] = useState(0);

    
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
                        action={() => {
                            navigate({
                                pathname: "/admin/merchant/merchant-store",
                                // search: `?${createSearchParams({ viewType: "credentials" })}`,
                            });
                        }}
                        merchantCategory='Store'
                        merchantValues={merchantValueData}
                    />
                </CustomTabContentPanel>

                <CustomTabContentPanel value={tabsValue} index={1}>
                    <AvailableMerchantsValueComponent 
                        action={() => {
                            navigate({
                                pathname: "/admin/merchant/merchant-location-details",
                                // search: `?${createSearchParams({ viewType: "credentials" })}`,
                            });
                        }}
                        merchantCategory='Locations'
                        merchantValues={merchantValueData}
                    />
                </CustomTabContentPanel>
             
                <CustomTabContentPanel value={tabsValue} index={2}>
                    <AvailableMerchantsValueComponent 
                        action={() => {
                            navigate({
                                pathname: "/admin/merchant/merchant-events-details",
                                // search: `?${createSearchParams({ viewType: "credentials" })}`,
                            });
                        }}
                        merchantCategory='Events'
                        merchantValues={merchantValueData}
                    />
                </CustomTabContentPanel>

                <CustomTabContentPanel value={tabsValue} index={3}>
                    <AvailableMerchantsValueComponent 
                        action={() => {
                            navigate({
                                pathname: "/admin/merchant/merchant-security-details",
                                // search: `?${createSearchParams({ viewType: "credentials" })}`,
                            });
                        }}
                        merchantCategory='Security'
                        merchantValues={merchantValueData}
                    />
                </CustomTabContentPanel>

                <CustomTabContentPanel value={tabsValue} index={4}>
                    <AvailableMerchantsValueComponent 
                        action={() => {
                            navigate({
                                pathname: "/admin/merchant/merchant-books-details",
                                // search: `?${createSearchParams({ viewType: "credentials" })}`,
                            });
                        }}
                        merchantCategory='Books'
                        merchantValues={merchantValueData}
                    />
                </CustomTabContentPanel>
            </Box>
            
        </Box>
    );
};

export default AvailableMerchantsPage;
