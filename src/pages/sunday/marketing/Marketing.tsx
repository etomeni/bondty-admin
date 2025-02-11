import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import NotificationComponent from '@/components/sunday/NotificationComponent';
import { CustomTabContentPanel } from '@/components/sunday/CustomTabContentPanel';
import CustomTabsHeaderBar from '@/components/sunday/CustomTabsHeaderBar';
import NewsLetterComponent from '@/components/sunday/marketing/NewsLetter';
import PushNotificationComponent from '@/components/sunday/marketing/PushNotification';


const MarketingPage = () => {
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
                <Box> </Box>
                <NotificationComponent />
            </Stack>

            <Box mt={5}>

                <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3 }}>
                    <CustomTabsHeaderBar 
                        currentValue={tabsValue}
                        setValue={setTabsValue}
                        title={["News letter", "Push Notification"]}
                    />
                </Box>

                <CustomTabContentPanel value={tabsValue} index={0}>
                    <NewsLetterComponent />
                </CustomTabContentPanel>

                <CustomTabContentPanel value={tabsValue} index={1}>
                    <PushNotificationComponent />               
                </CustomTabContentPanel>
            </Box>
            
        </Box>
    );
};

export default MarketingPage;
