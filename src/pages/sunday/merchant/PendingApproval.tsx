import { useEffect } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
// import TablePagination from '@mui/material/TablePagination';

import kolors from '@/constants/kolors';
import { themeBtnStyle } from '@/util/mui';
import EmptyListComponent from '@/components/EmptyList';
import LoadingDataComponent from '@/components/LoadingData';
import { useMerchantHook } from '@/hooks/merchants/useMerchantHook';
import NotificationComponent from '@/components/sunday/NotificationComponent';


const PendingApprovalPage = () => {
    const navigate = useNavigate();

    const {
        // limitNo, setLimitNo,
        // currentPageNo, totalRecords,

        pendingMerchants,
        getAllPendingMerchants,
    } = useMerchantHook();

    useEffect(() => {
        getAllPendingMerchants();
    }, []);



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
                        >Available merchants</Typography>

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
                            onClick={() => {
                                navigate("/admin/merchant/available-merchants")
                            }}
                            
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

                <Box mt={2}>
                    <Typography
                        sx={{
                            fontWeight: "600",
                            fontSize: "16px",
                            color: kolors.dark,
                            mt: 4, mb: 2,
                        }}
                    >Pending Approval</Typography>

                    <TableContainer>
                        <Table aria-label="Pending Approval table">
                            <TableHead>
                                <TableRow 
                                    sx={{ 
                                        bgcolor: kolors.bg,
                                        border: `1px solid ${kolors.border}`,
                                    }}
                                >
                                    <TableCell>Merchant name</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    pendingMerchants ? 
                                        pendingMerchants.map((merchant) => (
                                            <TableRow key={merchant.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    { merchant.firstName + " " + merchant.lastName }
                                                </TableCell>
                                                
                                                <TableCell sx={{textTransform: "capitalize"}}>
                                                    { merchant.services.toString() }
                                                </TableCell>

                                                <TableCell>
                                                    { merchant.email }
                                                </TableCell>
            
                                                <TableCell>
                                                    <Button variant="contained" size='small'
                                                        type="button"
                                                        onClick={() => {
                                                            navigate({
                                                                pathname: "/admin/merchant/pending-merchant-deatils",
                                                                search: `?${createSearchParams({ 
                                                                    viewType: "request",
                                                                    id: merchant.id
                                                                })}`,
                                                            });
                                                        }}
                                                        
                                                        sx={{
                                                            ...themeBtnStyle,
                                                            fontSize: "12px",
                                                            fontWeight: "600",
                                                            // lineHeight: 14.52px;
                                                        }}
                                                    >View details</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    : <></>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {
                        pendingMerchants ?
                            pendingMerchants.length ? <></>
                            : <Box my={5}>
                                <EmptyListComponent notFoundText='No pending merchant record found.' />
                            </Box>
                        : <Box my={5}>
                            <LoadingDataComponent />
                        </Box>
                    }

                    {/* <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        component="div"
                        count={totalRecords} // totalRecords
                        rowsPerPage={limitNo}
                        page={currentPageNo -1}
                        onPageChange={(_e, page)=> {
                            // console.log(page);
    
                            const newPage = page + 1;
                            getAllPendingMerchants(newPage, limitNo);
                        }}
                        onRowsPerPageChange={(e) => {
                            const value = e.target.value;
                            // console.log(value);
    
                            setLimitNo(Number(value));
                            getAllPendingMerchants();
                        }}
                    /> */}
                </Box>
            </Box>
            
        </Box>
    );
};

export default PendingApprovalPage;
