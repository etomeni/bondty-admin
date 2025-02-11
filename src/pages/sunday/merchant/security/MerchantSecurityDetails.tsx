import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import kolors from '@/constants/kolors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import TuneIcon from '@mui/icons-material/Tune';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Avatar from '@mui/material/Avatar';

import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';

import NotificationComponent from '@/components/sunday/NotificationComponent';
import BackNavigationArrowBtn from '@/components/sunday/BackNavigationArrowBtn';
import MerchantTopOptionsComponent from '@/components/sunday/merchant/MerchantTopOptionsComponent';
import SearchwordComponent from '@/components/sunday/SearchwordComponent';
import TopTotalCardComponent from '@/components/sunday/merchant/TopTotalCardComponent';
import placeProvider from "@/assets/images/dashboard/placeProvider.jpeg"


const MerchantSecurityDetailsPage = () => {
    const [filterValue, setFilterValue] = useState("All");

    const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
    const openFilterMenu = Boolean(filterAnchorEl);
    const handleClickFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
        setFilterAnchorEl(event.currentTarget);
    };
    const handleCloseFilter = () => {
        setFilterAnchorEl(null);
    };


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
                <BackNavigationArrowBtn />

                <NotificationComponent />
            </Stack>

            <MerchantTopOptionsComponent />

            <Stack direction="row" gap="20px" flexWrap="wrap" mt={5}
                alignItems="stretch" 
                justifyContent={{xs: "center", md: "start", lg: "space-between"}}
            >
                <TopTotalCardComponent 
                    title='Total sales made'
                    value='$2,000'
                />

                <TopTotalCardComponent 
                    title='Total service provided'
                    value='200'
                />

                <TopTotalCardComponent 
                    title='Total rejected'
                    value='2'
                />
            </Stack>


            <Box mt={5}>
                <Box 
                    sx={{
                        border: `1px solid ${kolors.border}`,
                        borderRadius: "8px",
                        overflow: "hidden"
                        // height: "100%"
                    }}
                >
                    <Stack direction="row" gap="10px" flexWrap="wrap"
                        alignItems="center" justifyContent="space-between"
                        bgcolor="#F2F2F2" p={1}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "16px",
                                    color: kolors.dark,
                                }}
                            >Security providers</Typography>
                        </Box>

                        <Box>
                            <SearchwordComponent 
                                performSearch={() => {}}
                            />
                        </Box>
                    </Stack>

                    <Box p={2}>
                        <Grid container spacing="20px" // rowSpacing="35px" columnSpacing="20px"
                            // direction="row"
                            sx={{
                                // justifyContent: "space-around",
                                alignItems: "stretch",
                                my: 3
                            }}
                        >
                            <Grid size={{ xs: 12, md: 7, lg: 6 }}>
                                <Box>
                                    <TableContainer>
                                        <Table aria-label="Pending Approval table" size='small'
                                            sx={{
                                                border: `1px solid ${kolors.border}`
                                            }}
                                        >
                                            <TableHead>
                                                <TableRow 
                                                    sx={{ 
                                                        bgcolor: kolors.bg,
                                                        border: `1px solid ${kolors.border}`,
                                                    }}
                                                >
                                                    <TableCell>Name</TableCell>
                                                    <TableCell>Gender</TableCell>
                                                    <TableCell>Jobs handled</TableCell>
                                                </TableRow>
                                            </TableHead>

                                            <TableBody>
                                                {
                                                    [1, 2, 3].map((_item, index) => (
                                                        <TableRow key={index}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                <Stack direction="row" spacing="10px" alignItems="center">
                                                                    <Avatar 
                                                                        alt="image" 
                                                                        src={placeProvider}
                                                                    />
                                                                    
                                                                    <Typography
                                                                        sx={{
                                                                            fontWeight: "400",
                                                                            fontSize: "16px",
                                                                            color: "#595757"
                                                                        }}
                                                                    >Joseph john</Typography>
                                                                </Stack>
                                                            </TableCell>
                                                            
                                                            <TableCell>
                                                                Male
                                                            </TableCell>
                                                            
                                                            <TableCell>
                                                                3
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, md: 5, lg: 6 }}
                                sx={{
                                    border: `1px solid ${kolors.border}`,
                                    borderRadius: "8px",
                                    overflow: "hidden"
                                }}
                            >
                                <Box 
                                    sx={{
                                        bgcolor: kolors.bg,
                                        px: 2, py: 0.5,
                                        borderBottom: `1px solid ${kolors.border}`,
                                    }}
                                >
                                    <Stack direction="row" rowGap="30px" columnGap="20px"  flexWrap="wrap"
                                        alignItems="center" justifyContent="space-between"
                                        // bgcolor="#F2F2F2" p={1}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: "16px",
                                                color: kolors.dark,
                                            }}
                                        >Customer feedback</Typography>

                                        <Box>
                                            <IconButton size='small'
                                                aria-controls={openFilterMenu ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={openFilterMenu ? 'true' : undefined}
                                                onClick={handleClickFilter}
                                                id="basic-button"                        
                                            >
                                                <TuneIcon sx={{ color: kolors.primary, fontSize: "18px" }} />
                                            </IconButton>

                                            <Menu
                                                id="basic-menu"
                                                anchorEl={filterAnchorEl}
                                                open={openFilterMenu}
                                                onClose={handleCloseFilter}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <MenuItem 
                                                    onClick={() => {
                                                        handleCloseFilter();
                                                        setFilterValue("All");
                                                    }}
                                                    sx={{ 
                                                        color: filterValue == "All" ? kolors.primary : "initial",
                                                    }}
                                                >All</MenuItem>

                                                <MenuItem 
                                                    onClick={() => {
                                                        handleCloseFilter();
                                                        setFilterValue("This week");
                                                    }}
                                                    sx={{ 
                                                        color: filterValue == "This week" ? kolors.primary : "initial",
                                                    }}
                                                >This week</MenuItem>

                                                <MenuItem 
                                                    onClick={() => {
                                                        handleCloseFilter();
                                                        setFilterValue("This month");
                                                    }}
                                                    sx={{ 
                                                        color: filterValue == "This month" ? kolors.primary : "initial",
                                                    }}
                                                >This month</MenuItem>

                                                <MenuItem 
                                                    onClick={() => {
                                                        handleCloseFilter();
                                                        setFilterValue("This year");
                                                    }}
                                                    sx={{ 
                                                        color: filterValue == "This year" ? kolors.primary : "initial",
                                                    }}
                                                >This year</MenuItem>
                                            </Menu>
                                        </Box>
                                    </Stack>
                                </Box>

                                <Box p={2}>

                                    <Box
                                        sx={{
                                            bgcolor: "#F2F2F2",
                                            p: 2,
                                            borderRadius: "8px",
                                            my: 2
                                        }}
                                    >
                                        <Stack direction="row" spacing="20px"
                                            alignItems="center" justifyContent="space-between"
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "600",
                                                    fontSize: "13px",
                                                    color: kolors.dark,
                                                }}
                                            >ID: 1234hg53</Typography>

                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: "13px",
                                                    color: "#BCBABA"
                                                }}
                                            >2 days ago</Typography>
                                        </Stack>


                                        <Stack direction="row" spacing="20px"
                                            alignItems="center"
                                        >
                                            <Rating
                                                name="text-feedback"
                                                value={4}
                                                readOnly
                                                precision={1}
                                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                            />

                                            <Typography
                                                sx={{
                                                    fontWeight: "500",
                                                    fontSize: "24px",
                                                    color: kolors.dark,
                                                    mt: 3
                                                }}
                                            >4.0</Typography>
                                        </Stack>


                                        <Typography
                                            sx={{
                                                fontSize: "13px",
                                                fontWeight: "400",
                                                color: "#595757",
                                            }}
                                        >
                                            Lacus sed viverra tellus in hac habitasse platea dictumst. 
                                            Malesuada nunc vel risus commodo. 
                                            In mollis nunc sed id semper risus in hendrerit. 
                                        </Typography>

                                    </Box>

                                    <Box
                                        sx={{
                                            bgcolor: "#F2F2F2",
                                            p: 2,
                                            borderRadius: "8px",
                                            my: 2
                                        }}
                                    >
                                        <Stack direction="row" spacing="20px"
                                            alignItems="center" justifyContent="space-between"
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "600",
                                                    fontSize: "13px",
                                                    color: kolors.dark,
                                                }}
                                            >ID: 1234hg53</Typography>

                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: "13px",
                                                    color: "#BCBABA"
                                                }}
                                            >2 days ago</Typography>
                                        </Stack>


                                        <Stack direction="row" spacing="20px"
                                            alignItems="center"
                                        >
                                            <Rating
                                                name="text-feedback"
                                                value={4}
                                                readOnly
                                                precision={1}
                                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                            />

                                            <Typography
                                                sx={{
                                                    fontWeight: "500",
                                                    fontSize: "24px",
                                                    color: kolors.dark,
                                                    mt: 3
                                                }}
                                            >4.0</Typography>
                                        </Stack>


                                        <Typography
                                            sx={{
                                                fontSize: "13px",
                                                fontWeight: "400",
                                                color: "#595757",
                                            }}
                                        >
                                            Lacus sed viverra tellus in hac habitasse platea dictumst. 
                                            Malesuada nunc vel risus commodo. 
                                            In mollis nunc sed id semper risus in hendrerit. 
                                        </Typography>

                                    </Box>

                                </Box>
                            </Grid>
                        </Grid>
                        
                    </Box>
                </Box>
            </Box>
            
        </Box>
    );
};

export default MerchantSecurityDetailsPage;
