import { useNavigate } from 'react-router-dom';
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
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import VerifiedIcon from '@mui/icons-material/Verified';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import NotificationComponent from '@/components/sunday/NotificationComponent';
import SearchwordComponent from '@/components/sunday/SearchwordComponent';
import ringStickerIcon from '@/assets/images/stickers/ringStickerIcon.png';



const UserStickerTransactionsPage = () => {
    const navigate = useNavigate();
    
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
                <IconButton size='small' onClick={() => navigate(-1)}>
                    <ArrowBackIosIcon sx={{ fontSize: "18px", color: kolors.border }} />
                </IconButton>

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
                        >$10,000</Typography>
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
                                    <TableCell>Sticker </TableCell>
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
                                    <TableCell>
                                        <Stack direction="row" alignItems="center" spacing="5px">
                                            <img src={ringStickerIcon} alt='' 
                                                style={{
                                                    width: "100%",
                                                    maxWidth: "19.65px",
                                                    objectFit: "contain"
                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "8px",
                                                    color: kolors.dark
                                                }}
                                            >X1</Typography>
                                        </Stack>
                                    </TableCell>
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
                                    <TableCell>
                                        <Stack direction="row" alignItems="center" spacing="5px">
                                            <img src={ringStickerIcon} alt='' 
                                                style={{
                                                    width: "100%",
                                                    maxWidth: "19.65px",
                                                    objectFit: "contain"
                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "8px",
                                                    color: kolors.dark
                                                }}
                                            >X1</Typography>
                                        </Stack>
                                    </TableCell>
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
                                    <TableCell>
                                        <Stack direction="row" alignItems="center" spacing="5px">
                                            <img src={ringStickerIcon} alt='' 
                                                style={{
                                                    width: "100%",
                                                    maxWidth: "19.65px",
                                                    objectFit: "contain"
                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "8px",
                                                    color: kolors.dark
                                                }}
                                            >X1</Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>$50</TableCell>

                                </TableRow>

                            </TableBody>

                        </Table>
                    </TableContainer>
                </Box>
            </Box>
            
            
        </Box>
    );
};

export default UserStickerTransactionsPage;
