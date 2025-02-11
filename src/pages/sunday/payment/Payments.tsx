import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Chip from '@mui/material/Chip';

import kolors from '@/constants/kolors';
import EmptyListComponent from '@/components/EmptyList';
import LoadingDataComponent from '@/components/LoadingData';
import NotificationComponent from '@/components/sunday/NotificationComponent';
import { currencyDisplay } from '@/util/resources';
import { themeBtnStyle } from '@/util/mui';
import { WithdrawalRequestDetailsModal } from '@/components/sunday/payment/WithdrawalRequestModal';

const transactionData = [
    { id: "0", amount: 500, date: '2024/08/21', user: "Maria", status: "Complete" },
    { id: "1", amount: 500, date: '2024/08/21', user: "Maria", status: "Complete" },
    { id: "2", amount: 500, date: '2024/08/21', user: "Maria", status: "Complete" },
    { id: "3", amount: 500, date: '2024/08/21', user: "Maria", status: "Complete" },
    { id: "4", amount: 500, date: '2024/08/21', user: "Maria", status: "Complete" },
    { id: "5", amount: 500, date: '2024/08/21', user: "Maria", status: "Complete" },
    { id: "6", amount: 500, date: '2024/08/21', user: "Maria", status: "Complete" },
    { id: "7", amount: 500, date: '2024/08/21', user: "Maria", status: "Complete" },
]

const withdrawalData = [
    {
        id: '0',
        amount: 500,
        user: "Joshua",
        date: '2024/08/21',
    }
];


const PaymentsPage = () => {
    const [revenueTransactions, setRevenueTransactions] = useState<typeof transactionData>([]);
    const [withdrawalRequests, setWithdrawalRequests] = useState<typeof withdrawalData>([]);
    const [vieWithdrawalRequestModal, setVieWWithdrawalRequestModal] = useState(false);

    const [limitNo, setLimitNo] = useState(25);
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    // const [totalPages, setTotalPages] = useState(1);


    useEffect(() => {
        setRevenueTransactions(transactionData);
        setWithdrawalRequests(withdrawalData);

        setCurrentPageNo(1);
        setTotalRecords(0);
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
                <Box> </Box>
                <NotificationComponent />
            </Stack>

            <Box mt={5}>
                <Box>
                    <Grid container spacing="20px">
                        <Grid size={{ xs: 12, md: 8, lg: 9 }}>
                            <Typography variant='h3'
                                sx={{
                                    color: kolors.dark,
                                    fontSize: "20px",
                                    fontWeight: "900",
                                    // lineHeight: "8.29px",
                                    letterSpacing: "-0.345px"
                                }}
                            >Transaction history</Typography>

                            <Box p={1} my={2}>
                                {
                                    !revenueTransactions ? 
                                        <Stack alignItems="center" justifyContent="center"
                                            sx={{
                                                border: `1px solid ${kolors.border}`,
                                                borderRadius: "10px"
                                            }}
                                        >
                                            <LoadingDataComponent />
                                        </Stack>
                                    : revenueTransactions.length ? 
                                        <Box>
                                            <TableContainer>
                                                <Table aria-label="transactions table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>#</TableCell>
                                                            <TableCell>Amount ($)</TableCell>

                                                            <TableCell>Date</TableCell>
                                                            <TableCell>User</TableCell>

                                                            <TableCell>Status</TableCell>
                                                        </TableRow>
                                                    </TableHead>

                                                    <TableBody>
                                                        {revenueTransactions.map((transaction, index) => (
                                                            <TableRow
                                                                key={transaction.id}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: "pointer" }}
                                                                onClick={() => {
                                                                    // _setContactDetails(contactData);
                                                                    // navigate(`/admin/contacts/${contactData._id}`);

                                                                    // const params = {
                                                                    //     transactionType: transaction.transactionType,
                                                                    // };
                                                                    // navigate({
                                                                    //     pathname: `/admin/revenue/${transaction._id}`,
                                                                    //     search: `?${createSearchParams(params)}`,
                                                                    // });
                                                                }}
                                                            >
                                                                <TableCell component="th" scope="row"
                                                                >{ (limitNo * (currentPageNo - 1)) + (index + 1) }.</TableCell>

                                                                <TableCell>
                                                                    <Typography
                                                                        sx={{
                                                                            color: "#667085",
                                                                            fontSize: "14px",
                                                                            fontWeight: "500",
                                                                            lineHeight: "20px"
                                                                        }}
                                                                    >{ currencyDisplay((Number(transaction.amount))) }</Typography>
                                                                </TableCell>

                                                                <TableCell>
                                                                    <Typography
                                                                        sx={{
                                                                            color: "#667085",
                                                                            fontSize: "14px",
                                                                            fontWeight: "500",
                                                                            // lineHeight: "20px",
                                                                            textTransform: "capitalize"
                                                                        }}
                                                                    >{ transaction.date }</Typography>
                                                                </TableCell>

                                                                <TableCell
                                                                    sx={{
                                                                        color: "#667085",
                                                                        fontSize: "14px",
                                                                        fontWeight: "500",
                                                                        lineHeight: "20px"
                                                                    }}
                                                                >{ transaction.user }</TableCell>

                                                                <TableCell>
                                                                    <Chip 
                                                                        label={ transaction.status } 
                                                                        size='small' 
                                                                        // color={}
                                                                        // color="warning"
                                                                    />
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                            
                                            <TablePagination
                                                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                                component="div"
                                                count={totalRecords} // totalRecords
                                                rowsPerPage={limitNo}
                                                page={currentPageNo -1}
                                                onPageChange={(_e, page)=> {
                                                    // console.log(page);
                            
                                                    const newPage = page + 1;
                                                    console.log(newPage);
                                                    
                                                    // getTransactions(newPage, limitNo);
                                                }}
                                                onRowsPerPageChange={(e) => {
                                                    const value = e.target.value;
                                                    // console.log(value);
                            
                                                    setLimitNo(Number(value));
                                                    // getTransactions(1, limitNo);
                                                }}
                                            />
                                        </Box>
                                    : <Box my={3}> <EmptyListComponent notFoundText="No transaction record yet." /> </Box>
                                }

                            </Box>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                            <Typography variant='h2'
                                sx={{
                                    color: kolors.dark,
                                    fontSize: "20px",
                                    fontWeight: "900",
                                    // lineHeight: "8.29px",
                                    letterSpacing: "-0.345px"
                                }}
                            >Withdrawal request</Typography>

                            <Box bgcolor={kolors.bg} borderRadius="10px" p={1} my={2}>
                                {
                                    !withdrawalRequests ? <LoadingDataComponent />
                                    : withdrawalRequests.length ?
                                        withdrawalRequests.map((withdrawal) => (
                                            <Box key={withdrawal.id} bgcolor="#fff" borderRadius="8px" p={1.5} mb={1} 
                                                onClick={() => {
                                                    // const params = {
                                                    //     transactionType: withdrawal.transactionType,
                                                    // };
                                                    // navigate({
                                                    //     pathname: `/admin/revenue/${withdrawal._id}`,
                                                    //     search: `?${createSearchParams(params)}`,
                                                    // });
                                                }}
                                            >
                                                <Stack direction="row" alignItems="center" justifyContent="space-between">
                                                    <Typography variant='h3'
                                                        sx={{
                                                            color: kolors.dark,
                                                            fontSize: "20px",
                                                            fontWeight: "900",
                                                            // lineHeight: "8.29px",
                                                            letterSpacing: "-0.345px"
                                                        }}
                                                    >{currencyDisplay(Number(withdrawal.amount))}</Typography>

                                                    <Button variant="contained" size='small'
                                                        type="button"
                                                        onClick={() => { setVieWWithdrawalRequestModal(true) }}
                                                        
                                                        sx={{
                                                            ...themeBtnStyle,
                                                            fontSize: "15px",
                                                            fontWeight: "400",
                                                            // lineHeight: 14.52px;
                                                        }}
                                                    > View </Button>
                                                </Stack>

                                                <Box mt={2}>
                                                    <Typography
                                                        sx={{
                                                            color: "#7B7979",
                                                            fontSize: "13px",
                                                            fontWeight: "500",
                                                            // lineHeight: "8.29px",
                                                            letterSpacing: "-0.345px"
                                                        }}
                                                    >{ withdrawal.user }</Typography>
                                                </Box>
                                            </Box>
                                        ))
                                    : <Box my={3}> <EmptyListComponent notFoundText="No pending withdrawal request yet." /> </Box>
                                }
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            
            <WithdrawalRequestDetailsModal 
                closeWithdrawalRequestModal={() => setVieWWithdrawalRequestModal(false)}
                openWithdrawalRequestModal={vieWithdrawalRequestModal}
            />
        </Box>
    );
};

export default PaymentsPage;
