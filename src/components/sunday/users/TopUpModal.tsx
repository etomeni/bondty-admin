import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import kolors from '@/constants/kolors';
import { themeBtnStyle } from '@/util/mui';
import dytTokenIcon from "@/assets/images/dytTokenIcon.png";
import InputAdornment from '@mui/material/InputAdornment';
import { currencyDisplay } from '@/util/resources';



interface _Props {
    openTopUpModal: boolean,
    closeTopUpModal: (state: boolean) => void,
    // topUp: string[],
}

export const TopUpModal: React.FC<_Props> = ({
    openTopUpModal, closeTopUpModal, // topUp
}) => {
    const [topUpAmount, setTopUpAmount] = useState("");
    

    return (
        <Modal
            open={openTopUpModal}
            onClose={() => closeTopUpModal(false) }
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
                            <Box></Box>

                            <IconButton onClick={() => closeTopUpModal(false)}>
                                <CloseIcon sx={{color: kolors.primary, fontSize: "20px"}} />
                            </IconButton>
                        </Stack>
                    </Box>

                    <Box id='payout-modal-description' mt={5}>
                        <Stack direction="row" gap="20px" flexWrap="wrap"
                            alignItems="center" justifyContent="space-between"
                        >
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography
                                    sx={{
                                        fontWeight: "600",
                                        fontSize: "13px",
                                        lineHeight: "16px",
                                        color: kolors.dark,
                                        mb: 0.5
                                    }}
                                >Set an amount</Typography>

                                <Slider aria-label="Amount" 
                                    color='secondary'
                                    min={1} max={10000}
                                    value={Number(topUpAmount || 0)} 
                                    onChange={(_e, value) => {
                                        setTopUpAmount(`${value}`)
                                    }} 
                                />
                            </Box>

                            <Box
                                sx={{
                                    width: "85px",
                                    height: "79px",
                                    border: `1px solid ${kolors.primary}`,
                                    borderRadius: "12px",
                                    p: 1.5,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: 'center'
                                }}
                            >
                                <Box>
                                    <Stack direction="row" alignItems="center" spacing="10px">
                                        <img 
                                            src={dytTokenIcon} 
                                            alt="Received Stickers" 
                                            style={{ 
                                                width: "100%", 
                                                maxWidth: "22px",
                                                objectFit: "contain",
                                            }} 
                                        />

                                        <Typography
                                            sx={{
                                                fontWeight: "600",
                                                fontSize: "23px",
                                                lineHeight: "28px",
                                                color: kolors.dark,
                                            }}
                                        >20</Typography>
                                    </Stack>

                                    <Typography mt={1}
                                        sx={{
                                            fontWeight: "600",
                                            fontSize: "13px",
                                            lineHeight: "16px",
                                            color: kolors.border
                                        }}
                                    >{currencyDisplay(Number(topUpAmount))}</Typography>
                                </Box>
                            </Box>
                        </Stack>

                        <Box my={3}>
                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "13px",
                                    lineHeight: "15px",
                                    color: kolors.border,
                                    mb: 0.5
                                }}
                            >Impute manually</Typography>

                            <TextField variant="outlined" 
                                type='number'
                                placeholder='0.00'
                                inputMode='numeric'
                                size='small'
                                sx={{
                                    // ...authMuiTextFieldStyle
                                }}
                                slotProps={{
                                    input: {
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    },
                                }}

                                value={topUpAmount}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    // console.log(value);
                                    setTopUpAmount(value);
                                }}
                            />
                        </Box>

                        <Button variant="contained" size='small'
                            type="button" fullWidth
                            onClick={() => { }}
                            
                            sx={{
                                ...themeBtnStyle,
                                fontSize: "12px",
                                fontWeight: "600",
                                // lineHeight: 14.52px;
                            }}
                        >Top up</Button>                     
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}
