import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import NotificationComponent from '@/components/sunday/NotificationComponent';
import BookListingsComponent from '@/components/sunday/merchant/BookListings';
import BackNavigationArrowBtn from '@/components/sunday/BackNavigationArrowBtn';
import TopTotalCardComponent from '@/components/sunday/merchant/TopTotalCardComponent';
import MerchantTopOptionsComponent from '@/components/sunday/merchant/MerchantTopOptionsComponent';
import BookListingItemComponent from '@/components/sunday/merchant/BookListingItem';



const MerchantBooksDetailsPage = () => {
    const [bookView, setBookView] = useState<"list" | "details">("list");
    

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

            <MerchantTopOptionsComponent />


            <Stack direction="row" gap="20px" flexWrap="wrap" mt={5}
                alignItems="stretch" 
                justifyContent={{xs: "center", md: "start", lg: "space-between"}}
            >
                <TopTotalCardComponent 
                    title='Total sales made'
                    value='$2,000'
                />

                <TopTotalCardComponent 
                    title='Free books'
                    value='200'
                />

                <TopTotalCardComponent 
                    title='Paid books'
                    value='2'
                />
            </Stack>

            <Box mt={5}>
                {
                    bookView == "details" ?
                        <BookListingItemComponent 
                            // title={orderCategory}
                            setView={setBookView}
                        />
                    : 
                    <BookListingsComponent 
                        // setCategory={setOrderCategory}
                        setView={setBookView}
                    />
                }
            </Box>
            
        </Box>
    );
};

export default MerchantBooksDetailsPage;
