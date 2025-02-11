import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';

import kolors from '@/constants/kolors';
import { themeBtnStyle } from '@/util/mui';
import ModalWrapper from '@/components/ModalWrapper';
import placeProvider from "@/assets/images/dashboard/placeProvider.jpeg"
import NotificationComponent from '@/components/sunday/NotificationComponent';
import BackNavigationArrowBtn from '@/components/sunday/BackNavigationArrowBtn';


const BooksRequestPage = () => {
    const navigate = useNavigate();
    const [imagePreviewModal, setImagePreviewModal] = useState(false);


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

            <Box mt={5}>
                <Box
                    sx={{
                        maxWidth: "570px",
                        borderRadius: "8px",
                        boxShadow: "0px 5px 11px 0px #00000014",
                        p: 2,
                        mx: "auto"
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "600",
                            fontSize: "24px",
                            color: kolors.dark,
                        }}
                    >Book request</Typography>


                    <Box my={2}>
                        <Typography
                            sx={{
                                fontWeight: "400",
                                fontSize: "16px",
                                color: kolors.dark,
                            }}
                        >Genre</Typography>

                        <TextField variant="outlined" 
                            fullWidth
                            type='text'
                            placeholder=''
                            inputMode='text'
                            size='small'
                            sx={{
                                // ...authMuiTextFieldStyle
                            }}

                            value="Romance"
                        />
                    </Box>

                    <Box my={2}>
                        <Typography
                            sx={{
                                fontWeight: "400",
                                fontSize: "16px",
                                color: kolors.dark,
                            }}
                        >Author name</Typography>

                        <TextField variant="outlined" 
                            fullWidth
                            type='text'
                            placeholder=''
                            inputMode='text'
                            size='small'
                            sx={{
                                // ...authMuiTextFieldStyle
                            }}

                            value="Daniel Aboyi"
                        />
                    </Box>

                    <Box my={2}>
                        <Typography
                            sx={{
                                fontWeight: "400",
                                fontSize: "16px",
                                color: kolors.dark,
                            }}
                        >Book title</Typography>

                        <TextField variant="outlined" 
                            fullWidth
                            type='text'
                            placeholder=''
                            inputMode='text'
                            size='small'
                            sx={{
                                // ...authMuiTextFieldStyle
                            }}

                            value="Apartment Building"
                        />
                    </Box>

                    <Box my={2}>
                        <Stack direction="row" spacing="20px"
                            alignItems="center" justifyContent="space-between"
                        >
                            <Stack direction="row" spacing="20px"
                                alignItems="center" justifyContent="space-between"
                                sx={{
                                    border: `1px solid ${kolors.border}`,
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                    flexGrow: 1,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "100px",
                                        // height: "66px",
                                        bgcolor: "#CE0104",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "700",
                                            fontSize: "16px",
                                            color: "#fff",
                                            lineHeight: "66px",
                                            textAlign: "center"
                                        }}
                                    >PDF</Typography>
                                </Box>

                                <Box p={2}>
                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: "14px",
                                            textAlign: "right"
                                        }}
                                    >Doc 1.PDF</Typography>
                                </Box>
                            </Stack>

                            <IconButton size='small'>
                                <DownloadIcon />
                            </IconButton>
                        </Stack>
                    </Box>

                    <Box my={2}>
                        <Stack direction="row" spacing="20px"
                            alignItems="center"
                        >
                            <Box
                                sx={{
                                    width: "200px",
                                    height: "140px",
                                    borderRadius: "8px",
                                    overflow: "hidden"
                                }}
                            >
                                <img 
                                    alt=''
                                    src={placeProvider}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                />
                            </Box>

                            <IconButton size='small'>
                                <DownloadIcon />
                            </IconButton>
                        </Stack>
                    </Box>

                    <Chip label="$50" 
                        variant="outlined" 
                    />



                    <Box my={2}>
                        <TextField variant="outlined" 
                            fullWidth
                            type='text'
                            placeholder='Tell the merchant why their book was rejected'
                            inputMode='text'
                            size='small'
                            multiline
                            rows={4}
                            value=""
                            sx={{
                                // ...authMuiTextFieldStyle
                            }}
                        />
                    </Box>


                    <Stack direction='row' gap='20px' mt={5}
                        alignItems="center" justifyContent="center"
                    >
                        <Button variant="contained" size='small'
                            type="button"
                            onClick={() => { navigate("/admin/merchant/available-merchants") }}
                            
                            sx={{
                                ...themeBtnStyle,
                                fontSize: "15px",
                                fontWeight: "400",
                                // lineHeight: 14.52px;
                            }}
                        > Accept </Button>

                        <Button variant="contained" size='small'
                            type="button"
                            onClick={() => { }}
                            
                            sx={{
                                ...themeBtnStyle,

                                bgcolor: kolors.secondary,
                                color: kolors.primary,

                                "&:hover": {
                                    bgcolor: kolors.secondary,
                                    color: kolors.primary
                                },
                                "&:active": {
                                    bgcolor: kolors.primary,
                                    color: "#fff"
                                },
                                "&:focus": {
                                    bgcolor: kolors.secondary,
                                    color: kolors.primary
                                },

                                fontSize: "15px",
                                fontWeight: "400",
                                // lineHeight: 14.52px;
                            }}
                        > Reject </Button>
                    </Stack>
                </Box>
            </Box>


            <ModalWrapper 
                closeModal={() => setImagePreviewModal(false)}
                openModal={imagePreviewModal}
            >
                <Box>
                    <img 
                        src={placeProvider} 
                        alt='official Id'
                        style={{
                            width: "100%",
                            // borderRadius: "8px",
                            height: "100%",
                            objectFit: "contain",
                        }}
                    />
                </Box>
            </ModalWrapper>
        </Box>
    );
};

export default BooksRequestPage;
