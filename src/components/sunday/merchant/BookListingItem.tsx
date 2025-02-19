import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import kolors from '@/constants/kolors';
import BackNavigationArrowBtn from '@/components/sunday/BackNavigationArrowBtn';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import { themeBtnStyle } from '@/util/mui';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid2';
// import placeProvider from "@/assets/images/dashboard/placeProvider.jpeg";
import { bookMerchantInterface } from '@/typeInterfaces/merchants.interface';
import { useState } from 'react';
import ConfirmationDialog from '../ConfirmationDialog';
import { useBookHook } from '@/hooks/merchants/useBookHook';
import { currencyDisplay } from '@/util/resources';
import LoadingDataComponent from '@/components/LoadingData';


let dialogData = {
    action: () => {},
    // state: false,
    title: '',
    description: '',
}

interface _Props {
    bookItem: bookMerchantInterface | undefined,
    // filter: any,
    merchant_id: string,
    setView: (view: "list" | "details") => void
};

const BookListingItemComponent: React.FC<_Props> = ({
    setView, bookItem, // merchant_id // title
}) => {
    const [confirmDialog, setConfirmDialog] = useState(false);

    const {
        isSubmitting,
        // getBookMerchantCategory,
        deleteBook,
    } = useBookHook();


    return (
        <Box 
            sx={{
                border: `1px solid ${kolors.border}`,
                borderRadius: "8px",
                overflow: "hidden"
                // height: "100%"
            }}
        >
            {
                bookItem ?
                    <Box>
                        <Stack direction="row" gap="10px" flexWrap="wrap"
                            alignItems="center" justifyContent="space-between"
                            bgcolor="#F2F2F2" p={1}
                        >
                            <BackNavigationArrowBtn _onClick={() => setView("list")} />
            
                            <Box>
                                <Button variant="contained" size='small'
                                    type="button"
                                    onClick={() => {
                                        setConfirmDialog(true);
            
                                        dialogData = {
                                            action: () => {
                                                deleteBook(
                                                    bookItem.id,
                                                    () => {
                                                        setConfirmDialog(false);
                                                        setView("list");
            
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
            
                                    sx={{
                                        ...themeBtnStyle,
                                        fontSize: "15px",
                                        fontWeight: "400",
                                        // lineHeight: 14.52px;
                                    }}
                                > Delete book </Button>
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
                                <Grid size={{ xs: 12, md: 5, lg: 4 }}>
                                    <Box>
                                        <Stack direction="row" spacing="10px">
                                            <Box
                                                sx={{
                                                    width: "100px",
                                                    height: "140px",
                                                    borderRadius: "4px",
                                                    overflow: "hidden"
                                                }}
                                            >
                                                <img
                                                    alt='book image'
                                                    src={ bookItem?.cover_url}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover"
                                                    }}
                                                />
                                            </Box>
            
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        fontWeight: "700",
                                                        fontSize: "16px",
                                                        // lineHeight: "12px",
                                                        color: kolors.dark,
                                                    }}
                                                >{ bookItem?.title }</Typography>
                                                {/* >Apartment house</Typography> */}
            
                                                <Typography
                                                    sx={{
                                                        fontWeight: "700",
                                                        fontSize: "16px",
                                                        // lineHeight: "12px",
                                                        color: kolors.dark,
                                                    }}
                                                >{bookItem?.category_id}</Typography>
                                                {/* >Horror</Typography> */}
            
                                                <Typography
                                                    sx={{
                                                        fontWeight: "400",
                                                        fontSize: "16px",
                                                        // lineHeight: "12px",
                                                        color: kolors.dark,
                                                    }}
                                                >{ currencyDisplay(Number(bookItem?.price)) }</Typography>
                                                {/* >$50</Typography> */}
                                                
                                                <Typography
                                                    sx={{
                                                        fontWeight: "700",
                                                        fontSize: "16px",
                                                        // lineHeight: "12px",
                                                        color: "#BCBABA",
                                                    }}
                                                >{ bookItem?.author } </Typography>
                                                {/* >Daniel Aboyi </Typography> */}
            
                                                <Rating
                                                    name="book-feedback"
                                                    // value={bookItem?.rating}
                                                    value={0}
                                                    readOnly
                                                    // precision={1}
                                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                />
                                            </Box>
                                        </Stack>
            
                                    </Box>
                                </Grid>
            
                                <Grid size={{ xs: 12, md: 7, lg: 8 }}
                                    sx={{
                                        border: `1px solid ${kolors.border}`,
                                        borderRadius: "8px",
                                        p: 2
                                    }}
                                >
                                    <Box>
                                        <Stack direction="row" rowGap="30px" columnGap="20px"  flexWrap="wrap"
                                            alignItems="center" justifyContent={{xs: "center",  md: "space-between" }}
                                            // bgcolor="#F2F2F2" p={1}
                                        >
                                            <Box
                                                sx={{
                                                    bgcolor: "#F2F2F2",
                                                    borderRadius: "4px",
                                                    height: "70px",
                                                    width: "120px",
                                                    p: 2,
                                                    display: "flex",
                                                    flexDirection: "column"
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontWeight: "500",
                                                        fontSize: "12px",
                                                        color: "#BCBABA",
                                                    }}
                                                >Ticket sold</Typography>
            
                                                <Typography
                                                    sx={{
                                                        fontWeight: "600",
                                                        fontSize: "16px",
                                                        color: kolors.dark,
                                                        textAlign: "center",
                                                        mt: "auto",
                                                    }}
                                                >0</Typography>
                                            </Box>
            
                                            <Box
                                                sx={{
                                                    bgcolor: "#F2F2F2",
                                                    borderRadius: "4px",
                                                    height: "70px",
                                                    width: "120px",
                                                    p: 2,
                                                    display: "flex",
                                                    flexDirection: "column"
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontWeight: "500",
                                                        fontSize: "12px",
                                                        color: "#BCBABA",
                                                    }}
                                                >Amount made </Typography>
            
                                                <Typography
                                                    sx={{
                                                        fontWeight: "600",
                                                        fontSize: "16px",
                                                        color: kolors.dark,
                                                        textAlign: "center",
                                                        mt: "auto",
                                                    }}
                                                >$0.00</Typography>
                                            </Box>
            
                                            <Box
                                                sx={{
                                                    bgcolor: "#F2F2F2",
                                                    borderRadius: "4px",
                                                    height: "70px",
                                                    width: "120px",
                                                    p: 2,
                                                    display: "flex",
                                                    flexDirection: "column"
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontWeight: "500",
                                                        fontSize: "12px",
                                                        color: "#BCBABA",
                                                    }}
                                                >Views</Typography>
            
                                                <Typography
                                                    sx={{
                                                        fontWeight: "600",
                                                        fontSize: "16px",
                                                        color: kolors.dark,
                                                        textAlign: "center",
                                                        mt: "auto",
                                                    }}
                                                >1k</Typography>
                                            </Box>
            
                                        </Stack>
            
                                        <Box mt={2}>
                                            <Typography
                                                sx={{
                                                    fontWeight: "500",
                                                    fontSize: "13px",
                                                    color: kolors.dark,
                                                    mb: 1
                                                }}
                                            >Customer feedback</Typography>
            
                                            <Box
                                                sx={{
                                                    bgcolor: "#F2F2F2",
                                                    p: 2,
                                                    borderRadius: "8px"
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
                                    </Box>
                                </Grid>
                            </Grid>
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
                : <LoadingDataComponent />
            }
        </Box>
    );
}

export default BookListingItemComponent;