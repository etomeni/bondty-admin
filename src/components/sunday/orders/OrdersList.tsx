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
import Avatar from '@mui/material/Avatar';
import placeProvider from "@/assets/images/dashboard/placeProvider.jpeg"
import { numberOfLinesTypographyStyle, themeBtnStyle } from '@/util/mui';
import Button from '@mui/material/Button';



interface _Props {
    setView: (view: "list" | "details") => void
    setCategory: (category: "Merchant order" | "Bondyt order") => void
};

const OrdersListComponent: React.FC<_Props> = ({
    setView, setCategory
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
            <Box mt={2}>
                <TableContainer>
                    <Table aria-label="Store orders table" size='small'
                        sx={{ 
                            border: `1px solid ${kolors.border}`,
                            borderRadius: 2
                        }}
                    >
                        <TableHead>
                            <TableRow
                                sx={{ 
                                    bgcolor: kolors.bg,
                                    border: "none", // `1px solid ${kolors.border}`,
                                }}
                            >
                                <TableCell>Product details</TableCell>
                                <TableCell>Sender/Note</TableCell>
                                <TableCell>Recievers Adddress</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, py: 2 }}
                            >
                                <TableCell component="th" scope="row">
                                    <Stack direction="row" spacing="10px"
                                        alignItems="start"
                                    >
                                        <Avatar variant="rounded"
                                            alt=""
                                            src={placeProvider}
                                            sx={{ 
                                                width: "150px", height: "130px",
                                                bgcolor: kolors.secondary
                                            }}
                                        />

                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontWeight: "600",
                                                    fontSize: "16px",
                                                    color: kolors.dark
                                                }}
                                            >2014 Mercedes Glk350</Typography>

                                            <Typography
                                                sx={{
                                                    fontWeight: "600",
                                                    fontSize: "16px",
                                                    color: "#595757"
                                                }}
                                            >Grey</Typography>

                                            <Box
                                                sx={{
                                                    borderRadius: "8px",
                                                    padding: "10px",
                                                    bgcolor: kolors.secondary,
                                                    width: "fit-content"
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontWeight: "600",
                                                        fontSize: "13px",
                                                        color: kolors.primary,
                                                    }}
                                                >Payment confirmed</Typography>
                                            </Box>

                                            <Typography
                                                sx={{
                                                    fontWeight: "600",
                                                    fontSize: "16px",
                                                    color: kolors.dark
                                                }}
                                            >$3,000</Typography>
                                        </Box>
                                    </Stack>
                                </TableCell>
                                
                                <TableCell>
                                    <Stack alignItems="center" spacing="10px" justifyContent="space-around">
                                        <Box
                                            sx={{
                                                borderRadius: "8px",
                                                padding: "10px",
                                                bgcolor: kolors.primary,
                                                width: "fit-content"
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "600",
                                                    fontSize: "13px",
                                                    color: "#fff",
                                                }}
                                            >Michel</Typography>
                                        </Box>

                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: "13px",
                                                color: "#595757",
                                                border: `1px solid ${kolors.border}`,
                                                borderRadius: "8px",
                                                p: 1,
                                                maxWidth: "170px",
                                                ...numberOfLinesTypographyStyle(3)
                                            }}
                                        >
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                                            Quasi qui vel tenetur dolorem sit voluptatum, 
                                            corporis magni architecto repellat incidunt cum totam adipisci 
                                            consequuntur quae aliquam dicta impedit ex? Corporis?
                                        </Typography>
                                    </Stack>
                                </TableCell>
                                
                                <TableCell>
                                    <Stack alignItems="center" spacing="10px" justifyContent="space-around">
                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: "13px",
                                                color: "#595757",
                                                maxWidth: "170px",
                                                ...numberOfLinesTypographyStyle(3)
                                            }}
                                        > House 1 amore street katampe Abuja </Typography>

                                        <Box
                                            sx={{
                                                borderRadius: "8px",
                                                padding: "10px",
                                                bgcolor: kolors.secondary,
                                                width: "fit-content"
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "600",
                                                    fontSize: "13px",
                                                    color: kolors.primary,
                                                }}
                                            >Maria</Typography>
                                        </Box>

                                    </Stack>
                                </TableCell>

                                <TableCell>
                                    <Button variant="contained" size='small'
                                        type="button"
                                        onClick={() => {
                                            setView("details");
                                            setCategory("Merchant order");
                                        }}
                                        
                                        sx={{
                                            ...themeBtnStyle,
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            // lineHeight: 14.52px;
                                            mt: 3
                                        }}
                                    >View</Button>
                                </TableCell>
                            </TableRow>

                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Stack direction="row" spacing="10px"
                                        alignItems="start"
                                    >
                                        <Avatar variant="rounded"
                                            alt=""
                                            src={placeProvider}
                                            sx={{ 
                                                width: "150px", height: "130px",
                                                bgcolor: kolors.secondary
                                            }}
                                        />

                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontWeight: "600",
                                                    fontSize: "16px",
                                                    color: kolors.dark
                                                }}
                                            >2014 Mercedes Glk350</Typography>

                                            <Typography
                                                sx={{
                                                    fontWeight: "600",
                                                    fontSize: "16px",
                                                    color: "#595757"
                                                }}
                                            >Grey</Typography>

                                            <Box
                                                sx={{
                                                    borderRadius: "8px",
                                                    padding: "10px",
                                                    bgcolor: kolors.secondary,
                                                    width: "fit-content"
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontWeight: "600",
                                                        fontSize: "13px",
                                                        color: kolors.primary,
                                                    }}
                                                >Payment confirmed</Typography>
                                            </Box>

                                            <Typography
                                                sx={{
                                                    fontWeight: "600",
                                                    fontSize: "16px",
                                                    color: kolors.dark
                                                }}
                                            >$3,000</Typography>
                                        </Box>
                                    </Stack>
                                </TableCell>
                                
                                <TableCell>
                                    <Stack alignItems="center" spacing="10px" justifyContent="space-around">
                                        <Box
                                            sx={{
                                                borderRadius: "8px",
                                                padding: "10px",
                                                bgcolor: kolors.primary,
                                                width: "fit-content"
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "600",
                                                    fontSize: "13px",
                                                    color: "#fff",
                                                }}
                                            >Michel</Typography>
                                        </Box>

                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: "13px",
                                                color: "#595757",
                                                border: `1px solid ${kolors.border}`,
                                                borderRadius: "8px",
                                                p: 1,
                                                maxWidth: "170px",
                                                ...numberOfLinesTypographyStyle(3)
                                            }}
                                        >
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                                            Quasi qui vel tenetur dolorem sit voluptatum, 
                                            corporis magni architecto repellat incidunt cum totam adipisci 
                                            consequuntur quae aliquam dicta impedit ex? Corporis?
                                        </Typography>
                                    </Stack>
                                </TableCell>
                                
                                <TableCell>
                                    <Stack alignItems="center" spacing="10px" justifyContent="space-around">
                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: "13px",
                                                color: "#595757",
                                                maxWidth: "170px",
                                                ...numberOfLinesTypographyStyle(3)
                                            }}
                                        > House 1 amore street katampe Abuja </Typography>

                                        <Box
                                            sx={{
                                                borderRadius: "8px",
                                                padding: "10px",
                                                bgcolor: kolors.secondary,
                                                width: "fit-content"
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "600",
                                                    fontSize: "13px",
                                                    color: kolors.primary,
                                                }}
                                            >Maria</Typography>
                                        </Box>

                                    </Stack>
                                </TableCell>

                                <TableCell>
                                    <Button variant="contained" size='small'
                                        type="button"
                                        onClick={() => {
                                            setView("details");
                                            setCategory("Bondyt order");
                                        }}
                                        
                                        sx={{
                                            ...themeBtnStyle,
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            // lineHeight: 14.52px;
                                            mt: 3
                                        }}
                                    >View</Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </Box>
    );
}

export default OrdersListComponent;