import React from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import Avatar from '@mui/material/Avatar';
import placeProvider from "@/assets/images/dashboard/placeProvider.jpeg";
import { themeBtnStyle } from '@/util/mui';



interface _Props {
    // menuItems: {
    //     title: string;
    //     status: boolean;
    //     baseLink: string;
    // }[],
    // value: number, 
    // setValue: (data: number) => void
};

const MerchantSuggestionComponent: React.FC<_Props> = ({
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
                >Merchant suggestion</Typography>

                <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: "12px",
                        lineHeight: "14.31px",
                        color: kolors.primary,
                    }}
                >Download sugestions</Typography>
            </Stack>

            <Box mt={2}>
                <TableContainer>
                    <Table aria-label="Merchant suggestion table">
                        <TableHead>
                            <TableRow 
                                sx={{ 
                                    bgcolor: kolors.bg,
                                    border: `1px solid ${kolors.border}`,
                                }}
                            >
                                <TableCell>User</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Suggestion</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Stack direction='row' spacing="5px"
                                        alignItems="center"
                                    >
                                        <Avatar // variant="rounded"
                                            alt=""
                                            src={placeProvider}
                                            sx={{ 
                                                width: "22px", height: "22px",
                                                bgcolor: kolors.secondary
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                fontWeight: "600"
                                            }}
                                        >Joshua</Typography>
                                    </Stack>
                                </TableCell>
                                
                                <TableCell>Derby, United Kingdom</TableCell>
                                <TableCell>Lacus sed viverra tellus in hac habitasse platea di</TableCell>

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
                                    >View user profile</Button>
                                </TableCell>
                                
                            </TableRow>

                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Stack direction='row' spacing="5px"
                                        alignItems="center"
                                    >
                                        <Avatar // variant="rounded"
                                            alt=""
                                            src={placeProvider}
                                            sx={{ 
                                                width: "22px", height: "22px",
                                                bgcolor: kolors.secondary
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                fontWeight: "600"
                                            }}
                                        >Michelle</Typography>
                                    </Stack>
                                </TableCell>
                                
                                <TableCell>Derby, United Kingdom</TableCell>
                                <TableCell>Lacus sed viverra tellus in hac habitasse platea di</TableCell>

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
                                    >View user profile</Button>
                                </TableCell>
                                
                            </TableRow>
                        </TableBody>

                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}

export default MerchantSuggestionComponent;