import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import VerifiedIcon from '@mui/icons-material/Verified';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { useUsersHook } from '@/hooks/users/useUsersHook';
import SearchwordComponent from '@/components/sunday/SearchwordComponent';
import NotificationComponent from '@/components/sunday/NotificationComponent';
import CustomBgTab, { menuItemsInterface } from '@/components/sunday/dashboard/CustomBgTab';
import EmptyListComponent from '@/components/EmptyList';
import LoadingDataComponent from '@/components/LoadingData';
import { calculateAge } from '@/util/timeNdate';
import { formatedNumber } from '@/util/resources';


const UsersPage = () => {
    const navigate = useNavigate();

    const [usersTypeMenuItems, setUsersTypeMenuItems] = useState([
        {
            label: "All",
            active: true,
        },
        {
            label: "Free",
            active: false,
        },
        {
            label: "Premium",
            active: false,
        },
        {
            label: "Verified",
            active: false,
        },
        {
            label: "Not verified",
            active: false,
        },
    ]);

    const {
        // apiResponse, setApiResponse,
        limitNo, setLimitNo,
        currentPageNo, totalRecords,
        // totalPages,

        // isSubmitting,

        // singleUsers, albumUsers,
        users, 
        // selectedUserDetails,
        getUsers,
        getNotVerifiedUsers,
        getFreeUsers,
        getPremiumUsers,
        getVerifiedUsers,

        // getUserById,
        // searchUsers,
    } = useUsersHook();

    useEffect(() => {
        handleGetUsersOnMenuChange();
    }, [usersTypeMenuItems]);
    
    
    const handleSearch = (searchword: string) => {
        console.log(searchword);

    }

    
    const handleUsersTypeMenuItems = (menuItems: menuItemsInterface) => {
        const newMenuItems = usersTypeMenuItems.filter((item) => {
            if (menuItems.label != item.label) {
                item.active = false;
            } else {
                item.active = true;
            }
            return item
        });
        setUsersTypeMenuItems(newMenuItems);
    }

    const handleGetUsersOnMenuChange = (pageNo = currentPageNo, limit = limitNo) => {
        const menuItem = usersTypeMenuItems.find(item => item.active);
        if (menuItem) {
            if (menuItem.label == "All") {
                getUsers(pageNo, limit);
            } else if (menuItem.label == "Free") {
                getFreeUsers(pageNo, limit);
            } else if (menuItem.label == "Premium") {
                getPremiumUsers(pageNo, limit);
            } else if (menuItem.label == "Verified") {
                getVerifiedUsers(pageNo, limit);
            } else if (menuItem.label == "Not verified") {
                getNotVerifiedUsers(pageNo, limit);
            } else {
                handleUsersTypeMenuItems({active: false, label: "All"});
                getUsers(currentPageNo, limitNo);
            }
        } else {
            handleUsersTypeMenuItems({active: false, label: "All"});
            getUsers(currentPageNo, limitNo);
        }
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


            <Box mt={5}>
                <Box>
                    <Typography
                        sx={{
                            fontWeight: "600",
                            fontSize: "16px",
                            lineHeight: "19.36px",
                            color: kolors.dark,
                        }}
                    >Users</Typography>

                    <Typography
                        sx={{
                            fontWeight: "400",
                            fontSize: "16px",
                            lineHeight: "19.36px",
                            color: kolors.border,
                        }}
                    >Track user signup</Typography>
                </Box>

                <Box
                    sx={{
                        border: `1px solid ${kolors.border}`,
                        borderRadius: "8px",
                        p: 2, my: 2,
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "600",
                            fontSize: "12px",
                            color: kolors.tertiary,
                        }}
                    >Total users</Typography>

                    <Typography
                        sx={{
                            fontWeight: "600",
                            fontSize: "40px",
                            color: kolors.primary,
                        }}
                    >{ formatedNumber(Number(totalRecords)) }</Typography>

                    <Box mt={3} width={{xs: "100%", sm: "80%", md: "70%", lg: "50%"}}>
                        <Typography
                            sx={{
                                fontWeight: "400",
                                fontSize: "12px",
                                color: kolors.tertiary,
                            }}
                        >Select by user type</Typography>

                        <CustomBgTab 
                            menuItems={usersTypeMenuItems} 
                            action={(item) => handleUsersTypeMenuItems(item)}
                        />
                    </Box>

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
                                    <TableCell>Name</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>Age </TableCell>
                                    <TableCell>Account type</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    users ?
                                        users.map((userData) => (
                                            <TableRow hover key={userData.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                onClick={() => navigate(`/admin/users/${userData.id}`)}
                                            >
                                                <TableCell component="th" scope="row">
                                                    <Stack direction='row' spacing="5px"
                                                        alignItems="center" sx={{textTransform: "capitalize"}}
                                                    >
                                                        <Stack direction="row" spacing="5px" alignItems="center">
                                                            <Typography
                                                                sx={{
                                                                    fontWeight: "600"
                                                                }}
                                                            >{ userData.first_name }</Typography>

                                                            {
                                                                userData.userTrait && userData.userTrait.verified ? 
                                                                    <VerifiedIcon
                                                                        sx={{
                                                                            fontSize: "18px",
                                                                            color: kolors.primary,
                                                                        }}
                                                                    />
                                                                : <></>
                                                            }
                                                        </Stack>
                                                    </Stack>
                                                </TableCell>
                                                
                                                <TableCell sx={{textTransform: "capitalize"}}>
                                                    {userData.userLocation.city + ", " + userData.userLocation.state}
                                                </TableCell>

                                                <TableCell sx={{textTransform: "capitalize"}}>
                                                    {userData.userTrait && userData.userTrait.gender || ''}
                                                </TableCell>

                                                <TableCell>
                                                    {/* {userData.userTrait && userData.userTrait.date_of_birth} */}
                                                    {userData.userTrait && calculateAge(userData.userTrait.date_of_birth) }
                                                </TableCell>
                                                
                                                <TableCell>
                                                    {
                                                        userData.tier == "daily" || 
                                                        userData.tier == "weekly" || 
                                                        userData.tier == "monthly" || 
                                                        userData.tier == "yearly" ?
                                                            <Typography component="div"
                                                                sx={{
                                                                    fontWeight: "700",
                                                                    fontSize: "16px",
                                                                    background: "linear-gradient(80.09deg, #9D5900 3.97%, #F7C028 53.75%, #B88C08 97.81%)",
                                                                    WebkitBackgroundClip: "text",
                                                                    backgroundClip: "text",
                                                                    WebkitTextFillColor: "transparent",
                                                                }}
                                                            >Premium  
                                                                <Typography 
                                                                    sx={{
                                                                        fontWeight: "400",
                                                                        fontSize: "12px",
                                                                    }}
                                                                > ({userData.tier})</Typography>
                                                            </Typography>
                                                        :
                                                        <Typography
                                                            sx={{
                                                                fontWeight: "700",
                                                                fontSize: "16px",
                                                                color: kolors.primary,
                                                            }}
                                                        >{userData.tier}</Typography>
                                                    }

                                                </TableCell>
                                            </TableRow>
                                        ))
                                    : <></>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {
                        users ?
                            users.length ? <></>
                            : <Box my={5}>
                                <EmptyListComponent notFoundText='No users record found.' />
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
                            handleGetUsersOnMenuChange(newPage, limitNo);
                        }}
                        onRowsPerPageChange={(e) => {
                            const value = e.target.value;
                            // console.log(value);
    
                            setLimitNo(Number(value));
                            handleGetUsersOnMenuChange();
                        }}
                    />
                </Box>

            </Box>
            
        </Box>
    );
};

export default UsersPage;
