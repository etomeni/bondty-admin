import React from 'react';
// import { useState } from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import kolors from '@/constants/kolors';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
// import pinkDiamond from "@/assets/images/stickers/pinkDiamondIcon.png";
// import gamer from "@/assets/images/stickers/gamerIcon.png";
// import oxygen from "@/assets/images/stickers/oxygenIcon.png";
import iphone13 from "@/assets/images/gifts/iphone13.jpeg";
import { usersDetailsInterface } from '@/typeInterfaces/users.interface';
import { currencyDisplay } from '@/util/resources';


interface _Props {
    userData: usersDetailsInterface, 
    // setValue: (data: number) => void
};

const ReceivedStickersGiftsComponent: React.FC<_Props> = ({
    userData,
}) => {
    // const navigate = useNavigate();


    return (
        <Box 
            sx={{
                p: 2,
                // alignSelf: "stretch",
            }}
        >
            <Box>
                <Box
                    sx={{
                        borderRadius: "8px",
                        border: `0.5px solid ${kolors.border}`,
                        bgcolor: "#F8F8F8",
                        p: 1
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "600",
                            fontSize: "13px",
                            color: kolors.border,
                        }}
                    >Received Stickers</Typography>
                </Box>

                <Stack direction="row" gap="10px" my={2}
                    alignItems="center" flexWrap="wrap"
                >
                    {
                        userData.receivedStickers.map((item) => (
                            item.sticker ? 
                                <Box key={item.id}
                                    sx={{
                                        width: "80px",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "600",
                                            fontSize: "13px",
                                            color: kolors.primary,
                                            top: 0,
                                            right: 0,
                                            textAlign: "right"
                                        }}
                                    >{item.quantity}x</Typography>

                                    <Box>
                                        <img 
                                            src={ item.sticker.url } 
                                            alt="Received Stickers" 
                                            style={{ width: "80%", objectFit: "contain" }} 
                                        />
                                    </Box>

                                    <Box textAlign="center">
                                        <Typography
                                            sx={{
                                                fontWeight: "600",
                                                fontSize: "13px",
                                                color: kolors.border,
                                                lineHeight: "14.52px"
                                            }}
                                        >{ item.sticker.name }</Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: "600",
                                                fontSize: "13px",
                                                color: kolors.border,
                                            }}
                                        >{ currencyDisplay(Number(item.sticker.price)) }</Typography>
                                    </Box>
                                </Box>
                            : <></>
                        ))
                    }
                </Stack>
            </Box>

            <Box mt={3}>
                <Box
                    sx={{
                        borderRadius: "8px",
                        border: `0.5px solid ${kolors.border}`,
                        bgcolor: "#F8F8F8",
                        p: 1
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "600",
                            fontSize: "13px",
                            color: kolors.border,
                        }}
                    >Received Gifts</Typography>
                </Box>

                <Stack direction="row" gap="10px" my={2}
                    alignItems="center" flexWrap="wrap"
                >
                    {
                        userData.receivedGifts.map((item) => (
                            item ? 
                                <Box key={item.id} maxWidth="100px">
                                    <Box
                                        sx={{
                                            maxWidth: "80px",
                                            maxHeight: "80px",
                                            borderRadius: "8px",
                                            overflow: "hidden"
                                        }}
                                    >
                                        <img 
                                            src={ iphone13 } alt='gifts'
                                            style={{
                                                width: "100%",
                                                // borderRadius: "8px",
                                                // height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </Box>

                                    <Typography
                                        sx={{
                                            fontWeight: "600",
                                            fontSize: "13px",
                                            lineHeight: "14.52px",
                                            color: kolors.border,
                                            mt: 1,
                                            textAlign: "center"
                                        }}
                                    >{ item.product.name }</Typography>
                                </Box>
                            : <></>
                        ))
                    }

                    {/* <Box maxWidth="100px">
                        <Box
                            sx={{
                                maxWidth: "80px",
                                maxHeight: "80px",
                                borderRadius: "8px",
                                overflow: "hidden"
                            }}
                        >
                            <img 
                                src={iphone13} alt='gifts'
                                style={{
                                    width: "100%",
                                    // borderRadius: "8px",
                                    // height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </Box>

                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "13px",
                                lineHeight: "14.52px",
                                color: kolors.border,
                                mt: 1,
                                textAlign: "center"
                            }}
                        >Iphone 13 pro</Typography>
                    </Box> */}

                </Stack>

            </Box>
        </Box>
    );
}

export default ReceivedStickersGiftsComponent;