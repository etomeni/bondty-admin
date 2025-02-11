import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import kolors from '@/constants/kolors';
import { themeBtnStyle } from '@/util/mui';



interface _Props {
    openWithdrawalRequestModal: boolean,
    closeWithdrawalRequestModal: (state: boolean) => void,
    // topUp: string[],
}

export const WithdrawalRequestDetailsModal: React.FC<_Props> = ({
    openWithdrawalRequestModal, closeWithdrawalRequestModal, // topUp
}) => {
 

    return (
        <Modal
            open={openWithdrawalRequestModal}
            onClose={() => closeWithdrawalRequestModal(false) }
            aria-labelledby="payout-modal-title"
            aria-describedby="payout-modal-description"
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    outline: "none",
                }}
            >
                <Box p={2}
                    sx={{
                        bgcolor: "#fff",
                        width: "100%",
                        maxWidth: {xs: "92%", sm: "496px"},
                        // maxHeight: "605px",
                        maxHeight: "95%",
                        borderRadius: "12px",
                        // p: "25px",
                        color: kolors.dark,
                        overflow: "scroll"
                    }}
                >
                    <Box id='payout-modal-title'>
                        <Stack direction="row" spacing="20px"
                            alignItems="center" justifyContent="space-between"
                        >
                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: "600",
                                        fontSize: "16px",
                                        color: kolors.dark,
                                    }}
                                >User Detail</Typography>
                            </Box>

                            <IconButton onClick={() => closeWithdrawalRequestModal(false)}>
                                <CloseIcon sx={{color: kolors.primary, fontSize: "20px"}} />
                            </IconButton>
                        </Stack>
                    </Box>

                    <Box id='payout-modal-description' mt={3}>
                        <Stack direction="row" spacing="20px" mb={2} 
                            alignItems="center"
                        >
                            <Box width="80px">
                                <Typography
                                    sx={{
                                        fontWeight: "600",
                                        fontSize: "13px",
                                        color: kolors.border,
                                    }}
                                >Username: </Typography>
                            </Box>

                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: "600",
                                        fontSize: "13px",
                                        color: "#fff",
                                        px: "11px",
                                        py: "4px",
                                        // lineHeight: 
                                        borderRadius: "4px",
                                        bgcolor: kolors.primary
                                    }}
                                > Joshua</Typography>
                            </Box>
                        </Stack>

                        <Stack direction="row" spacing="20px" mb={2} 
                            alignItems="center"
                        >
                            <Box width="80px">
                                <Typography
                                    sx={{
                                        fontWeight: "600",
                                        fontSize: "13px",
                                        color: kolors.border,
                                    }}
                                >Amount: </Typography>
                            </Box>

                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: "600",
                                        fontSize: "13px",
                                    }}
                                > $500</Typography>
                            </Box>
                        </Stack>

                        <Stack direction="row" spacing="20px" mb={2} 
                            alignItems="center"
                        >
                            <Box width="80px">
                                <Typography
                                    sx={{
                                        fontWeight: "600",
                                        fontSize: "13px",
                                        color: kolors.border,
                                    }}
                                >Method: </Typography>
                            </Box>

                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: "600",
                                        fontSize: "13px",
                                    }}
                                > Paypal</Typography>
                            </Box>
                        </Stack>

                        <Stack direction="row" spacing="20px" mb={2} 
                            alignItems="center"
                        >
                            <Box width="80px">
                                <Typography
                                    sx={{
                                        fontWeight: "600",
                                        fontSize: "13px",
                                        color: kolors.border,
                                    }}
                                >Narration: </Typography>
                            </Box>

                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: "600",
                                        fontSize: "13px",
                                    }}
                                >
                                    Lorem ipsum dolor sit amet consectetur. 
                                    Leo et suspendisse velLorem 
                                </Typography>
                            </Box>
                        </Stack>



                        <Stack direction="row" spacing="20px" my={3} 
                            alignItems="center" justifyContent="center"
                        >
                            <Box>
                                <Button variant="contained" size='small'
                                    type="button" fullWidth
                                    onClick={() => { }}
                                    
                                    sx={{
                                        ...themeBtnStyle,
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        // lineHeight: 14.52px;
                                    }}
                                >Accept</Button>
                            </Box>

                            <Box>
                                <Button variant="contained" size='small'
                                    type="button" fullWidth
                                    onClick={() => { }}
                                    
                                    sx={{
                                        ...themeBtnStyle,
                                        bgcolor: kolors.secondary,
                                        color: kolors.primary,
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        // lineHeight: 14.52px;
                                    }}
                                >Reject</Button>
                            </Box>
                        </Stack>                  
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}
