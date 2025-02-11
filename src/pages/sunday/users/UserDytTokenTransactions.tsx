import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import VerifiedIcon from '@mui/icons-material/Verified';

import NotificationComponent from '@/components/sunday/NotificationComponent';
import SearchwordComponent from '@/components/sunday/SearchwordComponent';
import dytTokenIcon from '@/assets/images/dytTokenIcon.png';
import { useUsersHook } from '@/hooks/users/useUsersHook';
import BackNavigationArrowBtn from '@/components/sunday/BackNavigationArrowBtn';
import TablePagination from '@mui/material/TablePagination';
import EmptyListComponent from '@/components/EmptyList';
import LoadingDataComponent from '@/components/LoadingData';



const UserDytTokenTransactionsPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const {
        // apiResponse, setApiResponse,

        limitNo, setLimitNo,
        currentPageNo,
        totalRecords,
        // totalPages,

        // isSubmitting,

        dytTransactions,
        getUserDytTransactionHistory,
    } = useUsersHook();


    useEffect(() => {
        if (id) {
            getUserDytTransactionHistory(id, currentPageNo, limitNo);
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

                <Box>
                    <Select
                        id="demo-simple-select"
                        value={20}
                        // onChange={handleChange}
                        size='small'

                        sx={{
                            color: "#fff",
                            borderRadius: "8px",
                            bgcolor: kolors.primary,
                            border: "none",
                            // borderColor: kolors.tertiary,
                            textAlign: "start",
                            // my: 2,
                            p: "1px",

                            '& .MuiSelect-select': {
                                paddingRight: "0px",
                                paddingLeft: "10px",
                                paddingTop: "1px",
                                paddingBottom: "1px",
                            },
                            
                            '.MuiOutlinedInput-notchedOutline': {
                                // borderColor: kolors.primary,
                                border: "none",
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                // borderColor: kolors.tertiary, // 'rgba(228, 219, 233, 0.25)',
                                border: "none",
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                // borderColor: 'var(--TextField-brandBorderHoverColor)',
                                border: "none",
                            },
                            '.MuiSvgIcon-root ': {
                                fill: "#fff",
                            }
                        }}
                    >
                        <MenuItem value={10}>All</MenuItem>
                        <MenuItem value={20}>This week</MenuItem>
                        <MenuItem value={30}>This month</MenuItem>
                        <MenuItem value={40}>2025</MenuItem>
                    </Select>
                </Box>
            </Stack>


            <Box mt={5}>
                <Box
                    sx={{
                        border: `1px solid ${kolors.border}`,
                        borderRadius: "8px",
                        // bgcolor: kolors.secondary,
                        p: 2,
                        // alignSelf: "stretch",
                        mb: 3,
                        width: "fit-content"
                    }}
                >
                    <Stack direction='row' spacing="10px" height="35px"
                        alignItems="center" justifyContent="space-between"
                    >
                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "11px",
                                lineHeight: "13.31px",
                                color: kolors.tertiary,
                            }}
                        >Total purchase</Typography>
                        
                        <Box></Box>
                    </Stack>

                    <Stack direction='row' spacing="5px" alignItems="center">
                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: {xs: "20px", sm: "30px", md: "40px"},
                                color: kolors.primary,
                            }}
                        >10,000</Typography>

                        <Box sx={{
                            maxWidth: "50px",
                            maxHeight: "50px",
                        }}>
                            <img 
                                src={dytTokenIcon} 
                                alt="dyt token icon" 
                                style={{ width: "100%" }} 
                            />
                        </Box>
                    </Stack>
                </Box>

                <Box>
                    <TableContainer>
                        <Table aria-label="Users table">
                            <TableHead>
                                <TableRow 
                                    sx={{ 
                                        bgcolor: kolors.bg,
                                        border: `1px solid ${kolors.border}`,
                                    }}
                                >
                                    <TableCell>User</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>DYT </TableCell>
                                    <TableCell>Amount </TableCell>
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
                                            <Stack direction="row" spacing="5px" alignItems="center">
                                                <Typography
                                                    sx={{
                                                        fontWeight: "600"
                                                    }}
                                                >Joshua</Typography>

                                                <VerifiedIcon
                                                    sx={{
                                                        fontSize: "18px",
                                                        color: kolors.primary,
                                                    }}
                                                />

                                            </Stack>
                                        </Stack>
                                    </TableCell>
                                    
                                    <TableCell>South, london</TableCell>
                                    <TableCell>Male</TableCell>
                                    <TableCell>200</TableCell>
                                    <TableCell>$50</TableCell>
                                </TableRow>

                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Stack direction='row' spacing="5px"
                                            alignItems="center"
                                        >
                                            <Stack direction="row" spacing="5px" alignItems="center">
                                                <Typography
                                                    sx={{
                                                        fontWeight: "600"
                                                    }}
                                                >Joshua</Typography>

                                                <VerifiedIcon
                                                    sx={{
                                                        fontSize: "18px",
                                                        color: kolors.primary,
                                                    }}
                                                />

                                            </Stack>
                                        </Stack>
                                    </TableCell>
                                    
                                    <TableCell>South, london</TableCell>
                                    <TableCell>Male</TableCell>
                                    <TableCell>27</TableCell>
                                    <TableCell>$50</TableCell>
                                </TableRow>
                                
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Stack direction='row' spacing="5px"
                                            alignItems="center"
                                        >
                                            <Stack direction="row" spacing="5px" alignItems="center">
                                                <Typography
                                                    sx={{
                                                        fontWeight: "600"
                                                    }}
                                                >Joshua</Typography>
                                            </Stack>
                                        </Stack>
                                    </TableCell>
                                    
                                    <TableCell>South, london</TableCell>
                                    <TableCell>Male</TableCell>
                                    <TableCell>217</TableCell>
                                    <TableCell>$50</TableCell>

                                </TableRow>

                            </TableBody>

                        </Table>
                    </TableContainer>


                    {
                        dytTransactions ?
                            dytTransactions.length ? <></>
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
                            getUserDytTransactionHistory(id || '', newPage, limitNo);
                        }}
                        onRowsPerPageChange={(e) => {
                            const value = e.target.value;
                            // console.log(value);
    
                            setLimitNo(Number(value));
                            getUserDytTransactionHistory(id || '', currentPageNo, Number(value));
                        }}
                    />
                </Box>
            </Box>
            
            
        </Box>
    );
};

export default UserDytTokenTransactionsPage;
