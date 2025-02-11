// import { useNavigate } from 'react-router-dom';
// import { useUserStore } from '@/state/userStore';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

import NotificationComponent from '@/components/sunday/NotificationComponent';
import SearchwordComponent from '@/components/sunday/SearchwordComponent';
import Chip from '@mui/material/Chip';
import BackNavigationArrowBtn from '@/components/sunday/BackNavigationArrowBtn';
import { useEffect } from 'react';
import { useUsersHook } from '@/hooks/users/useUsersHook';
import { useNavigate, useParams } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import LoadingDataComponent from '@/components/LoadingData';
import EmptyListComponent from '@/components/EmptyList';
import { currencyDisplay } from '@/util/resources';
import dayjs from 'dayjs';


const UserTransactionHistoryPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const {
        // apiResponse, setApiResponse,

        limitNo, setLimitNo,
        currentPageNo,
        totalRecords,
        // totalPages,

        transactionPayments,
        transactionWithrawals,

        getUserTransactionHistory,
        // getUserDytTransactionHistory,
    } = useUsersHook();


    useEffect(() => {
        if (id) {
            getUserTransactionHistory(id, currentPageNo, limitNo);
        } else {
            navigate(-1);
        }
    }, []);

    const handleSearch = (searchword: string) => {
        console.log(searchword);

    }


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
                <SearchwordComponent 
                    performSearch={(searchword) => handleSearch(searchword)}
                />

                <NotificationComponent />
            </Stack>

            <Stack direction='row' spacing='10px' mt={3}
                alignItems="center" justifyContent="space-between"
            >
                <BackNavigationArrowBtn />

                <Box></Box>
            </Stack>


            <Box mt={5}>

                <Grid container spacing="20px">
                    <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                        <Box>
                            <Typography variant='h3'
                                sx={{
                                    color: kolors.dark,
                                    fontSize: "20px",
                                    fontWeight: "900",
                                    // lineHeight: "8.29px",
                                    letterSpacing: "-0.345px",
                                    mb: 1
                                }}
                            >Payment history</Typography>

                            <Box sx={{ border: `1px solid ${kolors.border}` }}>
                                <TableContainer>
                                    <Table aria-label="Users table">
                                        <TableHead>
                                            <TableRow 
                                                sx={{ 
                                                    bgcolor: kolors.bg,
                                                    // border: `1px solid ${kolors.border}`,
                                                }}
                                            >
                                                <TableCell>Topup</TableCell>
                                                <TableCell>Withdrawal</TableCell>
                                                <TableCell>Date</TableCell>
                                                <TableCell>Status </TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {
                                                transactionPayments && transactionPayments.map((payment) => (
                                                    <TableRow key={payment.id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            { currencyDisplay(Number(payment.amount)) }
                                                        </TableCell>
                                                        
                                                        <TableCell> </TableCell>

                                                        <TableCell>
                                                            { payment.created_at }
                                                        </TableCell>

                                                        <TableCell>
                                                            <Chip 
                                                                label={payment.status}
                                                                size='small' // color="success"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }

                                            {/* <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    $500
                                                </TableCell>
                                                
                                                <TableCell>$500</TableCell>
                                                <TableCell>21/8/2024</TableCell>
                                                <TableCell>
                                                    <Chip 
                                                        label="Complete"
                                                        size='small' color="success"
                                                    />
                                                </TableCell>
                                            </TableRow>

                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    $500
                                                </TableCell>
                                                
                                                <TableCell> </TableCell>
                                                <TableCell>21/8/2024</TableCell>
                                                <TableCell>
                                                    <Chip 
                                                        label="Pending"
                                                        size='small' color="warning"
                                                    />
                                                </TableCell>
                                            </TableRow> */}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                {
                                    transactionPayments ?
                                        transactionPayments.length ? <></>
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
                                        getUserTransactionHistory(id || '', newPage, limitNo);
                                    }}
                                    onRowsPerPageChange={(e) => {
                                        const value = e.target.value;
                                        // console.log(value);
                
                                        setLimitNo(Number(value));
                                        getUserTransactionHistory(id || '', currentPageNo, Number(value));
                                    }}
                                />
                            </Box>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                        <Box>
                            <Typography variant='h3'
                                sx={{
                                    color: kolors.dark,
                                    fontSize: "20px",
                                    fontWeight: "900",
                                    // lineHeight: "8.29px",
                                    letterSpacing: "-0.345px",
                                    mb: 1
                                }}
                            >Withrawals history</Typography>

                            <Box sx={{ border: `1px solid ${kolors.border}` }}>
                                <TableContainer>
                                    <Table aria-label="Users table">
                                        <TableHead>
                                            <TableRow 
                                                sx={{ 
                                                    bgcolor: kolors.bg,
                                                    // border: `1px solid ${kolors.border}`,
                                                }}
                                            >
                                                <TableCell>Topup</TableCell>
                                                <TableCell>Withdrawal</TableCell>
                                                <TableCell>Date</TableCell>
                                                <TableCell>Status </TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {
                                                transactionWithrawals && transactionWithrawals.map((withrawal) => (
                                                    <TableRow key={withrawal.id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell> </TableCell>

                                                        <TableCell component="th" scope="row">
                                                            { currencyDisplay(Number(withrawal.amount)) }
                                                        </TableCell>

                                                        <TableCell>
                                                            { dayjs(withrawal.created_at).format('DD/MM/YYYY') }
                                                        </TableCell>

                                                        <TableCell>
                                                            <Chip 
                                                                label={withrawal.withdrawal_status}
                                                                size='small' // color="success"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                {
                                    transactionWithrawals ?
                                        transactionWithrawals.length ? <></>
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
                                        getUserTransactionHistory(id || '', newPage, limitNo);
                                    }}
                                    onRowsPerPageChange={(e) => {
                                        const value = e.target.value;
                                        // console.log(value);
                
                                        setLimitNo(Number(value));
                                        getUserTransactionHistory(id || '', currentPageNo, Number(value));
                                    }}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>


            </Box>
            
            
        </Box>
    );
};

export default UserTransactionHistoryPage;
