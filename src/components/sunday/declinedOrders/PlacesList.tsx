import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import kolors from '@/constants/kolors';
import { themeBtnStyle } from '@/util/mui';
import placeProvider from "@/assets/images/dashboard/placeProvider.jpeg"


interface _Props {
    // menuItems: {
    //     title: string;
    //     status: boolean;
    //     baseLink: string;
    // }[],
    // value: number, 
    // setValue: (data: number) => void
};

const DeclinedOrdersPlacesList: React.FC<_Props> = ({
    // menuItems, value, setValue
}) => {
    // const navigate = useNavigate();


    return (
        <Box>
            <TableContainer>
                <Table aria-label="Best performing projects table">
                    <TableHead>
                        <TableRow 
                            sx={{ 
                                bgcolor: kolors.bg,
                                border: `1px solid ${kolors.border}`,
                            }}
                        >
                            <TableCell>Provider</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Services</TableCell>
                            <TableCell>State</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row"
                            >
                                <Box>
                                    <Stack direction="row" alignItems="center"
                                        spacing="10px"
                                    >
                                        <Box
                                            sx={{
                                                maxWidth: "47px",
                                                maxHeight: "47px",
                                                borderRadius: "8px",
                                                overflow: "hidden"
                                            }}
                                        >
                                            <img 
                                                src={placeProvider} alt='place Provider image'
                                                style={{
                                                    width: "100%",
                                                    // borderRadius: "8px",
                                                    // height: "100%",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </Box>

                                        <Box>
                                            <Typography noWrap
                                                sx={{
                                                    fontSize: "13px",
                                                    fontWeight: "600",
                                                    // lineHeight: "12px",
                                                    color: "#161616"
                                                }}
                                            >Fine house resturant</Typography>

                                            <Typography noWrap
                                                sx={{
                                                    fontSize: "13px",
                                                    fontWeight: "600",
                                                    // lineHeight: "12px",
                                                    color: "#BCBABA"
                                                }}
                                            >Abuja, Nigeria.</Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                            </TableCell>
                            
                            <TableCell>25min ago</TableCell>
                            <TableCell>$45</TableCell>
                            <TableCell>Logistics/Security</TableCell>

                            <TableCell>
                                <Button variant="contained" size='small'
                                    type="button"
                                    onClick={() => { }}
                                    
                                    sx={{
                                        ...themeBtnStyle,
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        // lineHeight: 14.52px;
                                    }}
                                >View</Button>
                            </TableCell>
                            
                        </TableRow>

                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row"
                            >
                                <Box>
                                    <Stack direction="row" alignItems="center"
                                        spacing="10px"
                                    >
                                        <Box
                                            sx={{
                                                maxWidth: "47px",
                                                maxHeight: "47px",
                                                borderRadius: "8px",
                                                overflow: "hidden"
                                            }}
                                        >
                                            <img 
                                                src={placeProvider} alt='place Provider image'
                                                style={{
                                                    width: "100%",
                                                    // borderRadius: "8px",
                                                    // height: "100%",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </Box>

                                        <Box>
                                            <Typography noWrap
                                                sx={{
                                                    fontSize: "13px",
                                                    fontWeight: "600",
                                                    // lineHeight: "12px",
                                                    color: "#161616"
                                                }}
                                            >Fine house resturant</Typography>

                                            <Typography noWrap
                                                sx={{
                                                    fontSize: "13px",
                                                    fontWeight: "600",
                                                    // lineHeight: "12px",
                                                    color: "#BCBABA"
                                                }}
                                            >Abuja, Nigeria.</Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                            </TableCell>
                            
                            <TableCell>25min ago</TableCell>
                            <TableCell>$45</TableCell>
                            <TableCell>Logistics/Security</TableCell>

                            <TableCell>
                                <Button variant="contained" size='small'
                                    type="button"
                                    onClick={() => { }}
                                    
                                    sx={{
                                        ...themeBtnStyle,
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        // lineHeight: 14.52px;
                                    }}
                                >View</Button>
                            </TableCell>
                            
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default DeclinedOrdersPlacesList;