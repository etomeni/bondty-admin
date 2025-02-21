import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import NotificationComponent from '@/components/sunday/NotificationComponent';
import Typography from '@mui/material/Typography';
import BackNavigationArrowBtn from '@/components/sunday/BackNavigationArrowBtn';

import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
// import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
// import TablePagination from '@mui/material/TablePagination';

// import placeProvider from "@/assets/images/dashboard/placeProvider.jpeg"
import { currencyDisplay, getQueryParams } from '@/util/resources';
// import { usePlaceHook } from '@/hooks/merchants/useplaceHook';
import { useStoreHook } from '@/hooks/merchants/useStoreHook';
import EmptyListComponent from '@/components/EmptyList';
import LoadingDataComponent from '@/components/LoadingData';



const StoreOrdersPage = () => {
    const navigate = useNavigate();
    const { orderCategory } = useParams();
    const [receiverAddressMoreBtn, setReceiverAddressMoreBtn] = useState(false);
    
    // const viewType = getQueryParams("viewType");
    const category = getQueryParams("category");
    const merchant_id = getQueryParams("id");

    
    const {
        limitNo, setLimitNo,
        currentPageNo, totalRecords,

        storeProductDetails,
        // completedStoreProduct,
        // declinedStoreProduct,
        // pendingStoreProduct,

        getMerchantDeclinedStoreProduct,
        // getMerchantPendingStoreProduct,
        getMerchantCompletedStoreProduct,
    } = useStoreHook();

    useEffect(() => {
        if (merchant_id && category) {
            if (orderCategory == "Completed" ) {
                getMerchantCompletedStoreProduct(merchant_id, category);
            }

            if (orderCategory == "Declined" ) {
                getMerchantDeclinedStoreProduct(merchant_id, category);
            }

            // getMerchantStoreAnalytics(merchant_id);
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
                <Stack direction="row" alignItems="center" spacing="15px">
                    <BackNavigationArrowBtn />

                    <Typography
                        sx={{
                            fontWeight: "600",
                            fontSize: "16px",
                            // lineHeight: "19.36px",
                            color: kolors.dark,
                        }}  
                    >{orderCategory} orders</Typography>
                </Stack>

                <NotificationComponent />
            </Stack>

            <Box sx={{ border: `0.5px solid ${kolors.border}`, mt: 5 }}>
                <Box
                    sx={{
                        bgcolor: "#F2F2F2",
                        border: `0.5px solid ${kolors.border}`,
                        px: "15px", py: "5px",
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "600",
                            fontSize: "16px",
                            // lineHeight: "19.36px",
                            color: kolors.dark,
                        }}  
                    >Merchant order</Typography>
                </Box>

                <Box my={3}>
                    <TableContainer>
                        <Table aria-label="Merchant order table">
                            <TableBody>
                                {
                                    storeProductDetails ?  
                                        storeProductDetails.map((storeItem) => (
                                            <TableRow key={storeItem.id}
                                                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                sx={{ verticalAlign: "top" }}
                                            >
                                                <TableCell>
                                                    <Box
                                                        sx={{
                                                            width: "146px",
                                                            // minWidth: "100px",
                                                            height: "131px",
                                                            // minHeight: "100px",
                                                        }}
                                                    >
                                                        <img
                                                            src={storeItem.product.product_photos[0].url}
                                                            alt='store image'
                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                objectFit: "cover"
                                                            }}
                                                        />
                                                    </Box>
                                                </TableCell>
                                                
                                                <TableCell>
                                                    <Box>
                                                        <Typography
                                                            sx={{
                                                                fontWeight: "600",
                                                                fontSize: "16px",
                                                                color: kolors.dark,
                                                            }}
                                                        >{ storeItem.product.name }</Typography>

                                                        <Typography
                                                            sx={{
                                                                fontWeight: "600",
                                                                fontSize: "16px",
                                                                color: "#595757",
                                                            }}
                                                        >{storeItem.product.colors.toString()}</Typography>

                                                        <Box
                                                            sx={{
                                                                borderRadius: "8px",
                                                                padding: "10px",
                                                                bgcolor: kolors.secondary,
                                                                width: "fit-content",
                                                                my: 1
                                                            }}
                                                        >
                                                            <Typography noWrap
                                                                sx={{
                                                                    fontWeight: "600",
                                                                    fontSize: "16px",
                                                                    color: kolors.primary,
                                                                }}
                                                            >Payment confirmed</Typography>
                                                        </Box>

                                                        <Typography
                                                            sx={{
                                                                fontWeight: "600",
                                                                fontSize: "16px",
                                                                color: kolors.dark,
                                                            }}
                                                        >{currencyDisplay(Number(storeItem.product.price))}</Typography>
                                                    </Box>
                                                </TableCell>

                                                <TableCell>
                                                    <Box>
                                                        <Typography
                                                            sx={{
                                                                fontWeight: "600",
                                                                fontSize: "16px",
                                                                color: kolors.dark,
                                                            }}
                                                        >Sender</Typography>

                                                        <Box
                                                            sx={{
                                                                borderRadius: "8px",
                                                                padding: "10px 20px",
                                                                bgcolor: kolors.primary,
                                                                width: "fit-content",
                                                                my: 1
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    fontWeight: "600",
                                                                    fontSize: "13px",
                                                                    color: "#fff",
                                                                }}
                                                            >{storeItem.sender.first_name}</Typography>
                                                        </Box>

                                                        <Typography
                                                            sx={{
                                                                fontWeight: "400",
                                                                fontSize: "13px",
                                                                color: kolors.dark,
                                                                border: `0.5px solid ${kolors.border}`,
                                                                borderRadius: "4px",
                                                                p: 1
                                                            }}
                                                        >{ storeItem.message }</Typography>
                                                    </Box>
                                                </TableCell>

                                                <TableCell>
                                                    <Box>
                                                        <Typography
                                                            sx={{
                                                                fontWeight: "600",
                                                                fontSize: "16px",
                                                                color: kolors.dark,
                                                            }}
                                                        >Receiver</Typography>

                                                        <Box
                                                            sx={{
                                                                borderRadius: "8px",
                                                                padding: "10px 20px",
                                                                bgcolor: kolors.primary,
                                                                width: "fit-content",
                                                                my: 1
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    fontWeight: "600",
                                                                    fontSize: "13px",
                                                                    color: "#fff",
                                                                }}
                                                            >{storeItem.sender.first_name}</Typography>
                                                        </Box>

                                                        <Box border="0.5px solid #BCBABA">
                                                            <Box aria-label='Address' p={1} borderBottom="0.5px solid #BCBABA">
                                                                <Stack direction="row" spacing="10px"
                                                                    alignItems="center" justifyContent="space-between"
                                                                >
                                                                    <Typography
                                                                        sx={{
                                                                            fontWeight: "400",
                                                                            fontSize: "13px",
                                                                            color: "#595757",    
                                                                        }}
                                                                    >Address</Typography>

                                                                    <Typography 
                                                                        onClick={() => setReceiverAddressMoreBtn(!receiverAddressMoreBtn)}
                                                                        sx={{
                                                                            fontWeight: "400",
                                                                            fontSize: "13px",
                                                                            color: kolors.primary,
                                                                            cursor: "pointer"    
                                                                        }}
                                                                    >{ receiverAddressMoreBtn ? "Close" : "More"}</Typography>
                                                                </Stack>

                                                                <Typography
                                                                    sx={{
                                                                        fontWeight: "400",
                                                                        fontSize: "13px",
                                                                        color: kolors.dark,
                                                                    }}
                                                                >
                                                                    { storeItem.shipping_address.city + " " }
                                                                    { storeItem.shipping_address.state + " " }
                                                                    { storeItem.shipping_address.country }
                                                                    {/* House 1 Amore street Katampe Abuja, Nigeria */}
                                                                </Typography>
                                                            </Box>

                                                            {
                                                                receiverAddressMoreBtn ? 
                                                                    <Box>
                                                                        <Box aria-label='Name' p={1} borderBottom="0.5px solid #BCBABA">
                                                                            <Stack direction="row" spacing="10px"
                                                                                alignItems="center" justifyContent="space-between"
                                                                            >
                                                                                <Typography
                                                                                    sx={{
                                                                                        fontWeight: "400",
                                                                                        fontSize: "13px",
                                                                                        color: "#595757",    
                                                                                    }}
                                                                                >Name</Typography>

                                                                            </Stack>

                                                                            <Typography
                                                                                sx={{
                                                                                    fontWeight: "400",
                                                                                    fontSize: "13px",
                                                                                    color: kolors.dark,
                                                                                }}
                                                                            >{ storeItem.recipient.first_name }</Typography>
                                                                        </Box>

                                                                        <Box aria-label='Phone number' p={1} borderBottom="0.5px solid #BCBABA">
                                                                            <Stack direction="row" spacing="10px"
                                                                                alignItems="center" justifyContent="space-between"
                                                                            >
                                                                                <Typography
                                                                                    sx={{
                                                                                        fontWeight: "400",
                                                                                        fontSize: "13px",
                                                                                        color: "#595757",    
                                                                                    }}
                                                                                >Phone number</Typography>

                                                                            </Stack>

                                                                            <Typography
                                                                                sx={{
                                                                                    fontWeight: "400",
                                                                                    fontSize: "13px",
                                                                                    color: kolors.dark,
                                                                                }}
                                                                            >
                                                                                {/* { storeItem.recipient. } */}
                                                                            </Typography>
                                                                        </Box>

                                                                        <Box aria-label='Location' p={1} borderBottom="0.5px solid #BCBABA">
                                                                            <Stack direction="row" spacing="10px"
                                                                                alignItems="center" justifyContent="space-between"
                                                                            >
                                                                                <Typography
                                                                                    sx={{
                                                                                        fontWeight: "400",
                                                                                        fontSize: "13px",
                                                                                        color: "#595757",    
                                                                                    }}
                                                                                >Location</Typography>

                                                                            </Stack>

                                                                            <Typography
                                                                                sx={{
                                                                                    fontWeight: "400",
                                                                                    fontSize: "13px",
                                                                                    color: kolors.dark,
                                                                                }}
                                                                            >
                                                                                { storeItem.recipient.userLocation.city + " " }
                                                                                { storeItem.recipient.userLocation.state }
                                                                            </Typography>
                                                                        </Box>
                                                                    </Box>
                                                                : <></>
                                                            }
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    : <></>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {
                        storeProductDetails ?
                            storeProductDetails.length ? <></>
                            : <Box my={5}>
                                <EmptyListComponent notFoundText='No record found.' />
                            </Box>
                        : <Box my={5}>
                            <LoadingDataComponent />
                        </Box>
                    }

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        component="div"
                        count={totalRecords} // totalRecords
                        rowsPerPage={limitNo}
                        page={currentPageNo -1}
                        onPageChange={(_e, page)=> {
                            // console.log(page);
    
                            const newPage = page + 1;

                            if (orderCategory == "Completed" ) {
                                getMerchantCompletedStoreProduct(merchant_id, category, newPage, limitNo);
                            }
                
                            if (orderCategory == "Declined" ) {
                                getMerchantDeclinedStoreProduct(merchant_id, category, newPage, limitNo);
                            }
                        }}
                        onRowsPerPageChange={(e) => {
                            const value = Number(e.target.value);
                            // console.log(value);
    
                            setLimitNo(value);

                            if (orderCategory == "Completed" ) {
                                getMerchantCompletedStoreProduct(merchant_id, category, currentPageNo, value);
                            }
                
                            if (orderCategory == "Declined" ) {
                                getMerchantDeclinedStoreProduct(merchant_id, category, currentPageNo, value);
                            }
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default StoreOrdersPage;
