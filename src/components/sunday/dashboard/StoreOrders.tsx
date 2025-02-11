import React from 'react';
// import { useState } from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import Chip from '@mui/material/Chip';



interface _Props {
    // menuItems: {
    //     title: string;
    //     status: boolean;
    //     baseLink: string;
    // }[],
    // value: number, 
    // setValue: (data: number) => void
};

const StoreOrdersComponent: React.FC<_Props> = ({
    // menuItems, value, setValue
}) => {
    // const navigate = useNavigate();


    return (
        <Box 
            sx={{
                // border: `1px solid ${kolors.border}`,
                // borderRadius: "8px",
                // height: "100%"
            }}
        >
            <Stack direction='row' spacing="10px"
                alignItems="center" justifyContent="space-between"
                p={2}
            >
                <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: "11px",
                        lineHeight: "13.31px",
                        color: kolors.dark,
                    }}
                >Store orders</Typography>

                <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: "12px",
                        lineHeight: "14.31px",
                        color: kolors.primary,
                    }}
                >More</Typography>
            </Stack>

            <Box mt={2}>
                <TableContainer>
                    <Table aria-label="Store orders table">
                        <TableHead>
                            <TableRow 
                                sx={{ 
                                    bgcolor: kolors.bg,
                                    border: `1px solid ${kolors.border}`,
                                }}
                            >
                                <TableCell>Product</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Delivery Details</TableCell>
                                <TableCell>State</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    Iphone 13
                                </TableCell>
                                
                                <TableCell>$1,500</TableCell>
                                <TableCell>House 1 amore street katampe Abuja</TableCell>

                                <TableCell>
                                    <Chip 
                                        label="Pending"
                                        size='small' color="warning"
                                    />
                                </TableCell>
                                
                            </TableRow>

                        </TableBody>

                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    Iphone 13
                                </TableCell>
                                
                                <TableCell>$1,500</TableCell>
                                <TableCell>House 1 amore street katampe Abuja</TableCell>

                                <TableCell>
                                    <Chip 
                                        label="Complete"
                                        size='small' color="success"
                                    />
                                </TableCell>
                                
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </Box>
    );
}

export default StoreOrdersComponent;