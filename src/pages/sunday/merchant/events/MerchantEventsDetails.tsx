import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import TuneIcon from '@mui/icons-material/Tune';

import SearchwordComponent from '@/components/sunday/SearchwordComponent';
import NotificationComponent from '@/components/sunday/NotificationComponent';
import BackNavigationArrowBtn from '@/components/sunday/BackNavigationArrowBtn';
import TopTotalCardComponent from '@/components/sunday/merchant/TopTotalCardComponent';
import MerchantTopOptionsComponent from '@/components/sunday/merchant/MerchantTopOptionsComponent';
import kolors from '@/constants/kolors';
import { currencyDisplay, formatedNumber, getQueryParams } from '@/util/resources';
import { useEventHook } from '@/hooks/merchants/useEventHook';
import LoadingDataComponent from '@/components/LoadingData';
import { eventMerchantInterface } from '@/typeInterfaces/merchants.interface';


const MerchantEventsDetailsPage = () => {
    const navigate = useNavigate();
    const [filterValue, setFilterValue] = useState("All");

    const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
    const openFilterMenu = Boolean(filterAnchorEl);
    const handleClickFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
        setFilterAnchorEl(event.currentTarget);
    };
    const handleCloseFilter = () => {
        setFilterAnchorEl(null);
    };

    const [activeEvent, setActiveEvent] = useState<eventMerchantInterface>();
    // const viewType = getQueryParams("viewType");
    const category = getQueryParams("category");
    const merchant_id = getQueryParams("id");
    const is_deleted = getQueryParams("is_deleted");
    const is_suspended = getQueryParams("is_suspended");

    const {
        // isSubmitting,
        
        eventMerchant,
        eventMerchantAnalytics,

        getEventMerchant,
        getEventMerchantAnalytics,
        searchEventMerchant,
    } = useEventHook();

    useEffect(() => {
        if (merchant_id) {
            getEventMerchant(merchant_id);
            getEventMerchantAnalytics(merchant_id);
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
                    value={ eventMerchantAnalytics && eventMerchantAnalytics.total_sales ? currencyDisplay(Number(eventMerchantAnalytics.total_sales)) : "" }
                    // value={eventMerchantAnalytics?.total_sales}
                />

                <TopTotalCardComponent 
                    title='Total tickets sold'
                    value={ eventMerchantAnalytics && eventMerchantAnalytics.totalTicketsSold ? formatedNumber(Number(eventMerchantAnalytics.totalTicketsSold)) : "" }
                    // value='200'
                />

                <TopTotalCardComponent 
                    title='Total event listed'
                    value={ eventMerchantAnalytics && eventMerchantAnalytics.numberOfEvents ? formatedNumber(Number(eventMerchantAnalytics.numberOfEvents)) : "" }
                    // value='2'
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
                            <IconButton size='small'
                                aria-controls={openFilterMenu ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openFilterMenu ? 'true' : undefined}
                                onClick={handleClickFilter}
                                id="basic-button"                        
                            >
                                <TuneIcon sx={{ color: kolors.primary, fontSize: "18px" }} />
                            </IconButton>

                            <Menu
                                id="basic-menu"
                                anchorEl={filterAnchorEl}
                                open={openFilterMenu}
                                onClose={handleCloseFilter}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem 
                                    onClick={() => {
                                        handleCloseFilter();
                                        setFilterValue("All");
                                    }}
                                    sx={{ 
                                        color: filterValue == "All" ? kolors.primary : "initial",
                                    }}
                                >All</MenuItem>

                                <MenuItem 
                                    onClick={() => {
                                        handleCloseFilter();
                                        setFilterValue("This week");
                                    }}
                                    sx={{ 
                                        color: filterValue == "This week" ? kolors.primary : "initial",
                                    }}
                                >This week</MenuItem>

                                <MenuItem 
                                    onClick={() => {
                                        handleCloseFilter();
                                        setFilterValue("This month");
                                    }}
                                    sx={{ 
                                        color: filterValue == "This month" ? kolors.primary : "initial",
                                    }}
                                >This month</MenuItem>

                                <MenuItem 
                                    onClick={() => {
                                        handleCloseFilter();
                                        setFilterValue("This year");
                                    }}
                                    sx={{ 
                                        color: filterValue == "This year" ? kolors.primary : "initial",
                                    }}
                                >This year</MenuItem>
                            </Menu>
                        </Box>

                        <Box>
                            <SearchwordComponent 
                                performSearch={(searchWord) => {
                                    console.log(searchWord);

                                    if (searchWord == "") {
                                        getEventMerchant(merchant_id);
                                        getEventMerchantAnalytics(merchant_id);
                                    } else {
                                        searchEventMerchant(merchant_id, searchWord);
                                    }
                                }}
                            />
                        </Box>
                    </Stack>

                    <Box p={2}>
                        <Grid container spacing="20px" // rowSpacing="35px" columnSpacing="20px"
                            // direction="row"
                            sx={{
                                // justifyContent: "space-around",
                                alignItems: "stretch",
                                my: 3
                            }}
                        >
                            <Grid size={{ xs: 12, md: 5, lg: 4 }}>
                                <Box>
                                    {
                                        eventMerchant ? 
                                            eventMerchant.map((event) => (
                                                <Stack key={event.id} direction="row" // alignItems="center"
                                                    spacing="10px" mb={3}
                                                    onClick={() => {
                                                        setActiveEvent(event);

                                                        getEventMerchant(`${event.id}`);
                                                    }}
                                                    sx={{
                                                        bgcolor: activeEvent && activeEvent.id == event.id ? kolors.tertiary : kolors.bg,
                                                        borderRadius: "4px"
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            maxWidth: "94px",
                                                            maxHeight: "94px",
                                                            borderRadius: "4px",
                                                            overflow: "hidden"
                                                        }}
                                                    >
                                                        <img 
                                                            src={event.banner} 
                                                            alt='place image'
                                                            style={{
                                                                width: "100%",
                                                                // borderRadius: "8px",
                                                                height: "100%",
                                                                objectFit: "contain",
                                                            }}
                                                        />
                                                    </Box>

                                                    <Box py={1}>
                                                        <Typography noWrap
                                                            sx={{
                                                                fontSize: "13px",
                                                                fontWeight: "600",
                                                                // lineHeight: "12px",
                                                                color: "#161616"
                                                            }}
                                                        >{event.name}</Typography>

                                                        <Typography noWrap
                                                            sx={{
                                                                fontSize: "13px",
                                                                fontWeight: "600",
                                                                // lineHeight: "12px",
                                                                color: "#BCBABA",
                                                                textTransform: "capitalize"
                                                            }}
                                                        >{event.location}.</Typography>

                                                        {/* <Rating name="read-only"
                                                            value={event.rating || 0} 
                                                            readOnly
                                                            size='medium'
                                                        /> */}
                                                    </Box>
                                                </Stack>
                                            ))
                                        : <LoadingDataComponent />
                                    }
                                </Box>

                            </Grid>

                            <Grid size={{ xs: 12, md: 7, lg: 8 }}
                                sx={{
                                    border: `1px solid ${kolors.border}`,
                                    borderRadius: "8px",
                                    p: 2
                                }}
                            >
                                <Box>
                                    <Stack direction="row" rowGap="30px" columnGap="20px"  flexWrap="wrap"
                                        alignItems="center" // justifyContent={{xs: "center",  md: "space-between" }}
                                        // bgcolor="#F2F2F2" p={1}
                                    >
                                        <Box
                                            sx={{
                                                bgcolor: "#F2F2F2",
                                                borderRadius: "4px",
                                                height: "70px",
                                                width: "120px",
                                                p: 2,
                                                display: "flex",
                                                flexDirection: "column"
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "500",
                                                    fontSize: "12px",
                                                    color: "#BCBABA",
                                                }}
                                            >Ticket sold</Typography>

                                            <Typography
                                                sx={{
                                                    fontWeight: "600",
                                                    fontSize: "16px",
                                                    color: kolors.dark,
                                                    textAlign: "center",
                                                    mt: "auto",
                                                }}
                                            >0</Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                bgcolor: "#F2F2F2",
                                                borderRadius: "4px",
                                                height: "70px",
                                                width: "120px",
                                                p: 2,
                                                display: "flex",
                                                flexDirection: "column"
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "500",
                                                    fontSize: "12px",
                                                    color: "#BCBABA",
                                                }}
                                            >Amount made </Typography>

                                            <Typography
                                                sx={{
                                                    fontWeight: "600",
                                                    fontSize: "16px",
                                                    color: kolors.dark,
                                                    textAlign: "center",
                                                    mt: "auto",
                                                }}
                                            >$0.00</Typography>
                                        </Box>
                                    </Stack>

                                </Box>
                            </Grid>
                        </Grid>
                        
                    </Box>
                </Box>
            </Box>
            
        </Box>
    );
};

export default MerchantEventsDetailsPage;
