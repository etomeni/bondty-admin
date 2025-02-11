import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import kolors from '@/constants/kolors';
import NotificationComponent from '@/components/sunday/NotificationComponent';
import BackNavigationArrowBtn from '@/components/sunday/BackNavigationArrowBtn';
import placeProvider from "@/assets/images/dashboard/placeProvider.jpeg"
import ModalWrapper from '@/components/ModalWrapper';
import { themeBtnStyle } from '@/util/mui';
import { getQueryParams } from '@/util/resources';


const PendingMerchantDeatilsPage = () => {
    const navigate = useNavigate();
    const [imagePreviewModal, setImagePreviewModal] = useState(false);
    const viewType = getQueryParams("viewType");


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
                    >Merchant { viewType }</Typography>

                    <Box>
                        <MerchantTextDetailsComponent 
                            title='Name'
                            value='James Raphel'
                        />

                        <MerchantTextDetailsComponent 
                            title='Email'
                            value='Embassy@gmail.com'
                        />

                        <MerchantTextDetailsComponent 
                            title='Phone number'
                            value='08162141984'
                        />

                        <MerchantTextDetailsComponent 
                            title='Location'
                            value='Abuja, Nigeria'
                        />
                        
                        <MerchantTextDetailsComponent 
                            title='Category'
                            value='Store'
                        />
                        
                        <MerchantTextDetailsComponent 
                            title='About'
                            value='Lorem ipsum dolor sit amet consectetur. Leo et suspendisse velLorem Lorem ipsum dolor sit amet consectetur. Leo et suspendisse velLorem Lorem ipsum dolor sit amet consectetur. Leo et suspendisse velLorem Lorem ipsum dolor sit amet consectetur. Leo et suspendisse velLorem'
                        />

                        <Stack direction="row" spacing="20px"
                            alignItems="center" my={2} 
                        >
                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "16px",
                                    color: "#595757",
                                    minWidth: "120px",
                                    // width: "120px",
                                }}
                            >ID: </Typography>

                            <Box
                                onClick={() => setImagePreviewModal(true)}
                                sx={{
                                    height: "140px",
                                    borderRadius: "8px",
                                    border: `1px solid ${kolors.border}`,
                                    overflow: "hidden"
                                }}
                            >
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
                        </Stack>

                        {
                            viewType == "request" ? 
                                <Stack direction="row" spacing="20px"
                                    alignItems="center" mt={5} 
                                >
                                    <Typography sx={{ minWidth: "120px" }}
                                    > </Typography>


                                    <Stack direction='row' gap='20px' alignItems="center">
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
                                </Stack>
                            : <></>
                        }

                    </Box>
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

export default PendingMerchantDeatilsPage;


interface MerchantText_Props {
    title: string;
    value: string;
};

const MerchantTextDetailsComponent: React.FC<MerchantText_Props> = ({
    title, value
}) => {

    return (
        <Box>
            <Stack direction="row" spacing="20px"
                alignItems="center" my={2} 
            >
                <Typography
                    sx={{
                        fontWeight: "400",
                        fontSize: "16px",
                        color: "#595757",
                        minWidth: "120px",
                        // width: "120px",
                    }}
                >{ title }: </Typography>

                <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: kolors.dark,
                    }}
                > { value }</Typography>
            </Stack>
        </Box>
    )
}