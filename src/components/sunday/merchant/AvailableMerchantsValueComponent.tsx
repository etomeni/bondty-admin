import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import kolors from '@/constants/kolors';
import { themeBtnStyle } from '@/util/mui';


interface availableMerchantInterface {
    merchantName: string;
    category: string;
    email: string;
}


interface _Props {
    merchantCategory: "Store" | "Locations" | "Events" | "Security" | "Books";
    merchantValues: availableMerchantInterface[], 

    action: (
        merchantCategory: "Store" | "Locations" | "Events" | "Security" | "Books",
        merchantValues: availableMerchantInterface,
    ) => void
};

const AvailableMerchantsValueComponent: React.FC<_Props> = ({
    merchantCategory, merchantValues, action
}) => {

    return (
        <Box>
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
                            merchantValues.map((item, index) => (
                                <TableRow key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        { item.merchantName }
                                    </TableCell>
                                    
                                    <TableCell>
                                        { item.category }
                                    </TableCell>
                                    
                                    <TableCell>
                                        { item.email }
                                    </TableCell>

                                    <TableCell>
                                        <Button variant="contained" size='small'
                                            type="button"
                                            onClick={() => {
                                                action(merchantCategory, item);
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
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default AvailableMerchantsValueComponent;