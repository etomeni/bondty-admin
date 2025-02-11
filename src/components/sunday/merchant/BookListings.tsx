import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import kolors from '@/constants/kolors';
import SearchwordComponent from '@/components/sunday/SearchwordComponent';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import TuneIcon from '@mui/icons-material/Tune';
import placeProvider from "@/assets/images/dashboard/placeProvider.jpeg"
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';




interface _Props {
    setView: (view: "list" | "details") => void

    // title: "Merchant order" | "Bondyt order";
    // // value: number, 
};

const BookListingsComponent: React.FC<_Props> = ({
    setView, // title
}) => {
    // const navigate = useNavigate();

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
                                setFilterValue("Recently added");
                            }}
                            sx={{ 
                                color: filterValue == "Recently added" ? kolors.primary : "initial",
                            }}
                        >Recently added</MenuItem>

                        <MenuItem 
                            onClick={() => {
                                handleCloseFilter();
                                setFilterValue("Most viewed");
                            }}
                            sx={{ 
                                color: filterValue == "Most viewed" ? kolors.primary : "initial",
                            }}
                        >Most viewed</MenuItem>

                        <MenuItem 
                            onClick={() => {
                                handleCloseFilter();
                                setFilterValue("Free");
                            }}
                            sx={{ 
                                color: filterValue == "Free" ? kolors.primary : "initial",
                            }}
                        >Free</MenuItem>

                        <MenuItem 
                            onClick={() => {
                                handleCloseFilter();
                                setFilterValue("Paid");
                            }}
                            sx={{ 
                                color: filterValue == "Paid" ? kolors.primary : "initial",
                            }}
                        >Paid</MenuItem>
                    </Menu>
                </Box>

                <Box>
                    <SearchwordComponent 
                        performSearch={() => {}}
                    />
                </Box>
            </Stack>

            <Box p={2}>

                <Stack direction="row" gap="20px"  flexWrap="wrap"
                    alignItems="center" // justifyContent=""
                >
                    {
                        [1, 2, 3, 4].map((_item, index) => (
                            <Box key={index}
                                sx={{ width: "140px" }}
                                onClick={() => setView("details")}
                            >
                                <Box
                                    sx={{
                                        borderRadius: "12px",
                                        height: "190px",
                                        overflow: "hidden",
                                        position: "relative",
                                    }}
                                >
                                    <Box 
                                        sx={{
                                            position: "absolute",
                                        }}
                                    >
                                        <IconButton size='small'>
                                            <DeleteForeverOutlinedIcon sx={{ color: "#fff", fontSize: "20px" }} />
                                        </IconButton>
                                    </Box>

                                    <img 
                                        alt='book image'
                                        src={placeProvider}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover"
                                        }}
                                    />
                                </Box>

                                <Typography
                                    sx={{
                                        fontWeight: "600",
                                        fontSize: "14px",
                                        textAlign: "center",
                                        color: "#595757",
                                        mt: 2
                                    }}
                                >Apartment House</Typography>
                            </Box>
                        ))
                    }
                </Stack>
                
            </Box>
        </Box>
    );
}

export default BookListingsComponent;