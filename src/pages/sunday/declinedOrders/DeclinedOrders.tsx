import { useState } from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
// import { useUserStore } from '@/state/userStore';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TopTotalCard from '@/components/sunday/declinedOrders/TopTotalCard';
import kolors from '@/constants/kolors';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DeclinedOrdersPlaces from '@/components/sunday/declinedOrders/Places';



function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
  
function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}
  
  
const DeclinedOrders = () => {
    const [tabsBalue, setTabsValue] = useState(0);


    return (
        <Box mb={5}
            sx={{
                border: `1px solid ${kolors.border}`,
                bgcolor: "#fff",
                borderRadius: 2,
                p: 1.5
            }}
        >

            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabsBalue} 
                        onChange={(_e, newValue) => {
                            setTabsValue(newValue);
                        }} 
                        aria-label="basic tabs example"
                        scrollButtons
                        allowScrollButtonsMobile
                    >
                        <Tab label="Places" {...a11yProps(0)} />
                        <Tab label="Security" {...a11yProps(1)} />
                        <Tab label="Events" {...a11yProps(2)} />
                        <Tab label="Store" {...a11yProps(3)} />
                    </Tabs>
                </Box>
            </Box>



            <Box mt={5}>
                <Stack direction="row" gap="15px" flexWrap="wrap"
                    alignItems="center" justifyContent="space-between"
                >
                    <TopTotalCard />
                    <TopTotalCard />
                    <TopTotalCard />
                    <TopTotalCard />
                    <TopTotalCard />
                    <TopTotalCard />
                </Stack>

                <CustomTabPanel value={tabsBalue} index={0}>
                    <Box mt={5}>
                        <DeclinedOrdersPlaces />
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={tabsBalue} index={1}>
                    Security
                </CustomTabPanel>
                <CustomTabPanel value={tabsBalue} index={2}>
                    Events
                </CustomTabPanel>
                <CustomTabPanel value={tabsBalue} index={3}>
                    Store
                </CustomTabPanel>
            </Box>
            
        </Box>
    );
};

export default DeclinedOrders;
