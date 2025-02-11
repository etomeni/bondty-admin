import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import NotificationComponent from '@/components/sunday/NotificationComponent';
import { CustomTabContentPanel } from '@/components/sunday/CustomTabContentPanel';
import CustomTabsHeaderBar from '@/components/sunday/CustomTabsHeaderBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { themeBtnStyle } from '@/util/mui';
import OrdersListComponent from '@/components/sunday/orders/OrdersList';
import OrderDetailsComponent from '@/components/sunday/orders/OrderDetails';
import StoreComponent from '@/components/sunday/store/StoreComponent';


const StorePage = () => {
    const [tabsValue, setTabsValue] = useState(0);
    const [orderView, setOrderView] = useState<"list" | "details">("list");
    const [orderCategory, setOrderCategory] = useState<"Merchant order" | "Bondyt order">("Bondyt order");

    useEffect(() => {
        setOrderView("list");
    }, [tabsValue])
    


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
                <Stack direction="row" gap="20px" flexWrap="wrap"
                    alignItems="stretch" justifyContent={{xs: "center", md: "start", lg: "space-between"}}
                >
                    <Box
                        sx={{
                            border: `1px solid ${kolors.border}`,
                            bgcolor: "#fff",
                            borderRadius: 2,
                            p: 1.5,
                            width: "230px",
                            // height: "145px",
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "13px",
                                lineHeight: "16px",
                                color: "#595757"
                            }}
                        >Total sales made</Typography>

                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "40px",
                                lineHeight: "50px",
                                color: kolors.dark,
                            }}
                        >$2,000</Typography>

                    </Box>

                    <Box
                        sx={{
                            border: `1px solid ${kolors.border}`,
                            bgcolor: "#fff",
                            borderRadius: 2,
                            p: 1.5,
                            width: "230px",
                            // height: "145px",
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "13px",
                                lineHeight: "16px",
                                color: "#595757"
                            }}
                        >Completed  orders</Typography>

                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "40px",
                                lineHeight: "50px",
                                color: kolors.dark,
                                textAlign: "center",
                            }}
                        >200</Typography>

                        <Button variant="contained" size='small'
                            type="button" fullWidth
                            onClick={() => { }}
                            
                            sx={{
                                ...themeBtnStyle,
                                fontSize: "12px",
                                fontWeight: "600",
                                // lineHeight: 14.52px;
                                mt: 3
                            }}
                        >View</Button>
                    </Box>

                    <Box
                        sx={{
                            border: `1px solid ${kolors.border}`,
                            bgcolor: "#fff",
                            borderRadius: 2,
                            p: 1.5,
                            width: "230px",
                            // height: "145px",
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "13px",
                                lineHeight: "16px",
                                color: "#595757"
                            }}
                        >Pending gifts</Typography>

                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "40px",
                                lineHeight: "50px",
                                color: kolors.dark,
                                textAlign: "center",
                            }}
                        >20</Typography>

                        <Button variant="contained" size='small'
                            type="button" fullWidth
                            onClick={() => { }}
                            
                            sx={{
                                ...themeBtnStyle,
                                fontSize: "12px",
                                fontWeight: "600",
                                // lineHeight: 14.52px;
                                mt: 3
                            }}
                        >View</Button>
                    </Box>

                    <Box
                        sx={{
                            border: `1px solid ${kolors.border}`,
                            bgcolor: "#fff",
                            borderRadius: 2,
                            p: 1.5,
                            width: "230px",
                            // height: "145px",
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "13px",
                                lineHeight: "16px",
                                color: "#595757"
                            }}
                        >Declined gifts</Typography>

                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "40px",
                                lineHeight: "50px",
                                color: kolors.dark,
                                textAlign: "center",
                            }}
                        >5</Typography>

                        <Button variant="contained" size='small'
                            type="button" fullWidth
                            onClick={() => { }}
                            
                            sx={{
                                ...themeBtnStyle,
                                fontSize: "12px",
                                fontWeight: "600",
                                // lineHeight: 14.52px;
                                mt: 3
                            }}
                        >View</Button>
                    </Box>
                </Stack>

                <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3 }}>
                    <CustomTabsHeaderBar 
                        currentValue={tabsValue}
                        setValue={setTabsValue}
                        title={["Orders", "Store"]}
                    />
                </Box>

                <CustomTabContentPanel value={tabsValue} index={0}>
                    {
                        orderView == "details" ?
                            <OrderDetailsComponent 
                                title={orderCategory}
                                setView={setOrderView}
                            />
                        : 
                        <OrdersListComponent 
                            setCategory={setOrderCategory}
                            setView={setOrderView}
                        />
                    }
                    {/* <OrderDetailsComponent /> */}
                </CustomTabContentPanel>

                <CustomTabContentPanel value={tabsValue} index={1}>
                    <StoreComponent />
                </CustomTabContentPanel>
            </Box>
            
        </Box>
    );
};

export default StorePage;
