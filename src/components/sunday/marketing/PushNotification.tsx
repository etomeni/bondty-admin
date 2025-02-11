// import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import AddIcon from '@mui/icons-material/Add';

import kolors from '@/constants/kolors';
import { numberOfLinesTypographyStyle, themeBtnStyle } from '@/util/mui';
import { useNavigate } from 'react-router-dom';


interface _Props {
    // performSearch: (searchword: string) => void
};

const PushNotificationComponent: React.FC<_Props> = ({
    // performSearch
}) => {
    const navigate = useNavigate();

    
    return (
        <Box
            sx={{
                // border: `1px solid ${kolors.border}`,
                // bgcolor: "#fff",
                // borderRadius: 2,
                // p: 1.5,
                my: 3
            }}
        >
            <Stack direction="row" spacing="15px" mb={2}
                alignItems="center" justifyContent="space-between"
            >
                <Box></Box>

                <Button variant="contained" size='small'
                    type="button"
                    onClick={() => navigate("/admin/marketing/push-notification-add-edit?action=addNew")}

                    sx={{
                        ...themeBtnStyle,
                        fontSize: "12px",
                        fontWeight: "600",
                        // lineHeight: 14.52px;
                    }}
                > 
                    Add push notifications
                    <AddIcon sx={{ fontSize: "16px", ml: 1 }} />
                </Button>
            </Stack>  

            <Box>
                <TableContainer>
                    <Table aria-label="Push Notifications table"
                        sx={{
                            border: `1px solid ${kolors.border}`,
                        }}
                    >
                        <TableHead>
                            <TableRow 
                                sx={{ 
                                    bgcolor: kolors.bg,
                                    // border: `1px solid ${kolors.border}`,
                                }}
                            >
                                <TableCell>Topic</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>Content</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">Reminder</TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            ...numberOfLinesTypographyStyle(2)
                                        }}
                                    >
                                        Fringilla phasellus faucibus scelerisque eleifend donec 
                                        pretium vulputate sapien
                                        Lacus sed viverra tellus in hac habitasse platea di
                                        Fringilla phasellus faucibus scelerisque eleifend donec 
                                        pretium vulputate sapien
                                        Lacus sed viverra tellus in hac habitasse platea di
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    <Stack direction="row" alignItems="center" spacing="10px">
                                        <IconButton size='small'>
                                            <DeleteForeverOutlinedIcon sx={{ color: "red", fontSize: "20px" }} />
                                        </IconButton>

                                        <Button variant="contained" size='small'
                                            type="button"
                                            onClick={() => { }}
                                            
                                            sx={{
                                                ...themeBtnStyle,
                                                fontSize: "12px",
                                                fontWeight: "600",
                                                // lineHeight: 14.52px;
                                            }}
                                        >Edit</Button>
                                    </Stack>
                                </TableCell>
                                
                            </TableRow>
                        </TableBody>

                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default PushNotificationComponent;


