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
import { merchantDetailsInterface } from '@/typeInterfaces/merchants.interface';
import EmptyListComponent from '@/components/EmptyList';
import LoadingDataComponent from '@/components/LoadingData';


interface _Props {
    merchantCategory: "Store" | "Locations" | "Events" | "Security" | "Books";
    merchantValues: merchantDetailsInterface[] | undefined, 

    action: (
        merchantCategory: "Store" | "Locations" | "Events" | "Security" | "Books",
        merchantValues: merchantDetailsInterface,
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

                            merchantValues ? 
                                merchantValues.map((item, index) => (
                                    <TableRow key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            { item.firstName + " " + item.lastName }
                                        </TableCell>
                                        
                                        <TableCell sx={{textTransform: "capitalize"}}>
                                            { item.services.toString() }
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
                            : <></>
                        }
                    </TableBody>
                </Table>
            </TableContainer>


            {
                merchantValues ?
                    merchantValues.length ? <></>
                    : <Box my={5}>
                        <EmptyListComponent notFoundText='No merchant record found.' />
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
    );
}

export default AvailableMerchantsValueComponent;