import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import kolors from '@/constants/kolors';
import SearchwordComponent from '@/components/sunday/SearchwordComponent';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import TuneIcon from '@mui/icons-material/Tune';
// import placeProvider from "@/assets/images/dashboard/placeProvider.jpeg"
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useBookHook } from '@/hooks/merchants/useBookHook';
import { useNavigate } from 'react-router-dom';
import LoadingDataComponent from '@/components/LoadingData';
import EmptyListComponent from '@/components/EmptyList';
import ConfirmationDialog from '../ConfirmationDialog';
import TablePagination from '@mui/material/TablePagination';
import { bookMerchantInterface } from '@/typeInterfaces/merchants.interface';



let dialogData = {
    action: () => {},
    // state: false,
    title: '',
    description: '',
}

interface _Props {
    setView: (view: "list" | "details") => void
    selectBook: (book: bookMerchantInterface) => void

    category: string;
    merchant_id: string;
    // // value: number, 
};

const BookListingsComponent: React.FC<_Props> = ({
    setView, merchant_id, selectBook, // category, 
}) => {
    const navigate = useNavigate();

    const [filterValue, setFilterValue] = useState<"recently_added" | "paid" | "free">("recently_added");

    const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
    const openFilterMenu = Boolean(filterAnchorEl);
    const handleClickFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
        setFilterAnchorEl(event.currentTarget);
    };
    const handleCloseFilter = () => {
        setFilterAnchorEl(null);
    };

    const [confirmDialog, setConfirmDialog] = useState(false);

    const {
        limitNo, setLimitNo,
        currentPageNo, // setCurrentPageNo,
        totalRecords, // setTotalRecords,
        // totalPages, setTotalPages,

        isSubmitting,

        bookMerchant,

        getBookMerchant,
        // getBookMerchantCategory,
        searchBookMerchant,
        deleteBook,
        // uploadProgress,
    } = useBookHook();

    useEffect(() => {
        if (merchant_id) {
            getBookMerchant(merchant_id, filterValue);
        } else {
            navigate(-1);
        }
    }, [filterValue]);
    


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
                        {/* <MenuItem 
                            onClick={() => {
                                handleCloseFilter();
                                setFilterValue("All");
                            }}
                            sx={{ 
                                color: filterValue == "All" ? kolors.primary : "initial",
                            }}
                        >All</MenuItem> */}

                        <MenuItem value="recently_added"
                            onClick={() => {
                                handleCloseFilter();
                                setFilterValue("recently_added");
                            }}
                            sx={{ 
                                color: filterValue == "recently_added" ? kolors.primary : "initial",
                            }}
                        >Recently added</MenuItem>

                        {/* <MenuItem 
                            onClick={() => {
                                handleCloseFilter();
                                setFilterValue("Most viewed");
                            }}
                            sx={{ 
                                color: filterValue == "Most viewed" ? kolors.primary : "initial",
                            }}
                        >Most viewed</MenuItem> */}

                        <MenuItem value="free"
                            onClick={() => {
                                handleCloseFilter();
                                setFilterValue("free");
                            }}
                            sx={{ 
                                color: filterValue == "free" ? kolors.primary : "initial",
                            }}
                        >Free</MenuItem>

                        <MenuItem value="paid"
                            onClick={() => {
                                handleCloseFilter();
                                setFilterValue("paid");
                            }}
                            sx={{ 
                                color: filterValue == "paid" ? kolors.primary : "initial",
                            }}
                        >Paid</MenuItem>
                    </Menu>
                </Box>

                <Box>
                    <SearchwordComponent 
                        performSearch={(searchWord) => {
                            console.log(searchWord);

                            if (searchWord == "") {
                                getBookMerchant(merchant_id, filterValue);
                            } else {
                                searchBookMerchant(merchant_id, searchWord);
                            }
                        }}
                    />
                </Box>
            </Stack>

            <Box p={2}>

                <Stack direction="row" gap="20px"  flexWrap="wrap"
                    alignItems="center" // justifyContent=""
                >
                    {
                        bookMerchant ? 
                            bookMerchant.length ? 
                                bookMerchant.map((book) => (
                                    <Box key={book.id}
                                        sx={{ width: "140px" }}
                                        onClick={() => {
                                            selectBook(book);
                                            setView("details");
                                        }}
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
                                                    top: "5px",
                                                    left: "5px",                
                                                }}
                                            >
                                                <IconButton size='small'
                                                    sx={{ bgcolor: kolors.primary, ":hover": {bgcolor: kolors.tertiary} }}
                                                    onClick={() => {
                                                        setConfirmDialog(true);
                    
                                                        dialogData = {
                                                            action: () => {
                                                                deleteBook(
                                                                    book.id,
                                                                    () => {
                                                                        setConfirmDialog(false);
                                                                        getBookMerchant(merchant_id, filterValue);

                                                                        dialogData = {
                                                                            action: () => {},
                                                                            // state: false,
                                                                            title: '',
                                                                            description: '',
                                                                        };
                                                                    }
                                                                );
                                                            },
                                                            title: 'Confirm',
                                                            description: 'Are you sure, you want to proceed with deleting this book?',
                                                        };
                                                    }}
                                                >
                                                    <DeleteForeverOutlinedIcon 
                                                        sx={{ color: "#fff", fontSize: "20px" }} 
                                                    />
                                                </IconButton>
                                            </Box>
        
                                            <img 
                                                alt='book image'
                                                src={book.cover_url}
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
                                        >{ book.title }</Typography>
                                    </Box>
                                ))
                            : <EmptyListComponent notFoundText='No record found.' />
                        : <LoadingDataComponent />
                    }

                    {/* <Box
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
                                    top: "5px",
                                    left: "5px"
                                }}
                            >
                                <IconButton size='small' 
                                    sx={{ bgcolor: kolors.primary, ":hover": {bgcolor: kolors.tertiary} }}
                                >
                                    <DeleteForeverOutlinedIcon 
                                        sx={{ color: "#fff", fontSize: "20px" }} 
                                    />
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
                    </Box> */}
                </Stack>

                <Box>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        component="div"
                        count={totalRecords} // totalRecords
                        rowsPerPage={limitNo}
                        page={currentPageNo -1}
                        onPageChange={(_e, page)=> {
                            // console.log(page);

                            const newPage = page + 1;
                            getBookMerchant(merchant_id, filterValue, newPage, limitNo);
                        }}
                        onRowsPerPageChange={(e) => {
                            const value = e.target.value;
                            // console.log(value);

                            setLimitNo(Number(value));
                            getBookMerchant(merchant_id, filterValue, currentPageNo, Number(value));
                        }}
                    />
                </Box>
            </Box>

            <ConfirmationDialog 
                actionYes={() => {
                    dialogData.action();
                }}
                isSubmitting={isSubmitting}
                openDialog={confirmDialog}
                setOpenDialog={setConfirmDialog}
                title='Confirm'
                description={dialogData.description}
                actionNo={() => {
                    setConfirmDialog(false);

                    dialogData = {
                        action: () => {},
                        // state: false,
                        title: '',
                        description: '',
                    };
                }}
            />
        </Box>
    );
}

export default BookListingsComponent;