import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';

import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import NotificationComponent from '@/components/sunday/NotificationComponent';
import { themeBtnStyle } from '@/util/mui';
import { createSearchParams, useNavigate } from 'react-router-dom';


const PendingApprovalPage = () => {
    const navigate = useNavigate();


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
                    {/* <Box
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

                    </Box> */}

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

                    {/* <Box
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
                    </Box> */}
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
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        Embassy
                                    </TableCell>
                                    
                                    <TableCell>Store</TableCell>
                                    <TableCell>Embassy@gmail.com</TableCell>

                                    <TableCell>
                                        <Button variant="contained" size='small'
                                            type="button"
                                            onClick={() => {
                                                navigate({
                                                    pathname: "/admin/merchant/pending-merchant-deatils",
                                                    search: `?${createSearchParams({ viewType: "request" })}`,
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

                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        Treasure Nelson
                                    </TableCell>
                                    
                                    <TableCell>Places</TableCell>
                                    <TableCell>Embassy@gmail.com</TableCell>

                                    <TableCell>
                                        <Button variant="contained" size='small'
                                            type="button"
                                            onClick={() => {
                                                navigate({
                                                    pathname: "/admin/merchant/pending-merchant-deatils",
                                                    search: `?${createSearchParams({ viewType: "request" })}`,
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

                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        James Raphel
                                    </TableCell>
                                    
                                    <TableCell>Events</TableCell>
                                    <TableCell>Embassy@gmail.com</TableCell>

                                    <TableCell>
                                        <Button variant="contained" size='small'
                                            type="button"
                                            onClick={() => {
                                                navigate({
                                                    pathname: "/admin/merchant/pending-merchant-deatils",
                                                    search: `?${createSearchParams({ viewType: "request" })}`,
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
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
            
        </Box>
    );
};

export default PendingApprovalPage;
