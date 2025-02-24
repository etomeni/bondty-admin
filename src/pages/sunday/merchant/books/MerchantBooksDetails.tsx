import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import NotificationComponent from '@/components/sunday/NotificationComponent';
import BookListingsComponent from '@/components/sunday/merchant/BookListings';
import BackNavigationArrowBtn from '@/components/sunday/BackNavigationArrowBtn';
import TopTotalCardComponent from '@/components/sunday/merchant/TopTotalCardComponent';
import MerchantTopOptionsComponent from '@/components/sunday/merchant/MerchantTopOptionsComponent';
import BookListingItemComponent from '@/components/sunday/merchant/BookListingItem';
import { currencyDisplay, formatedNumber, getQueryParams } from '@/util/resources';
import { useBookHook } from '@/hooks/merchants/useBookHook';
import { bookMerchantInterface } from '@/typeInterfaces/merchants.interface';



const MerchantBooksDetailsPage = () => {
    const navigate = useNavigate();
    const [bookView, setBookView] = useState<"list" | "details">("list");

    const [selectedBook, setSelectedBook] = useState<bookMerchantInterface>();
    
    // const viewType = getQueryParams("viewType");
    const category = getQueryParams("category");
    const merchant_id = getQueryParams("id");
    const is_deleted = getQueryParams("is_deleted");
    const is_suspended = getQueryParams("is_suspended");

    const {
        // isSubmitting,

        // bookMerchant,
        bookMerchantAnalytics,

        getBookMerchant,
        // getBookMerchantCategory,
        getBookMerchantAnalytics,
        // searchBookMerchant,
    } = useBookHook();

    useEffect(() => {
        if (merchant_id) {
            getBookMerchant(merchant_id, "recently_added");
            getBookMerchantAnalytics(merchant_id);
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
                is_deleted={Number(is_deleted) ? true : false}
                is_suspended={Number(is_suspended) ? true : false}
            />


            <Stack direction="row" gap="20px" flexWrap="wrap" mt={5}
                alignItems="stretch" 
                justifyContent={{xs: "center", md: "start", lg: "space-between"}}
            >
                <TopTotalCardComponent 
                    title='Total sales made'
                    value={bookMerchantAnalytics?.totalSales.totalSales ? currencyDisplay(Number(bookMerchantAnalytics.totalSales.totalSales)) : ''}
                    // value='$2,000'
                />

                <TopTotalCardComponent 
                    title='Free books'
                    value={ formatedNumber(Number(bookMerchantAnalytics?.freeBooksCount)) }
                />

                <TopTotalCardComponent 
                    title='Paid books'
                    value={ formatedNumber(Number(bookMerchantAnalytics?.paidBooksCount)) }
                />
            </Stack>

            <Box mt={5}>
                {
                    bookView == "details" ?
                        <BookListingItemComponent 
                            // title={orderCategory}
                            // filter={filterValue}
                            merchant_id={merchant_id}
                            setView={setBookView}
                            bookItem={selectedBook}
                        />
                    : 
                    <BookListingsComponent 
                        // setCategory={setOrderCategory}
                        category={category}
                        merchant_id={merchant_id}
                        setView={setBookView}
                        selectBook={setSelectedBook}
                    />
                }
            </Box>
            
        </Box>
    );
};

export default MerchantBooksDetailsPage;
