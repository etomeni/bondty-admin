import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { themeBtnStyle } from '@/util/mui';
import { TopUpModal } from './TopUpModal';


interface _Props {
    tokenBalance: string, 
    userId: string, 
    // setValue: (data: number) => void
};

const TokenBalanceComponent: React.FC<_Props> = ({
    userId, tokenBalance
}) => {
    const navigate = useNavigate();
    const [topUpModal, setTopUpModal] = useState(false);


    return (
        <Box 
            sx={{
                p: 2,
                border: `1px solid ${kolors.border}`,
                borderRadius: "8px",
                width: "230px",
                alignSelf: "stretch",
                // align-self: stretch;

                // height: "130px",

            }}
        >
            <Box my="auto" height="100%">
                <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: "13px",
                        color: kolors.border,
                    }}
                >Token balance</Typography>

                <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: "40px",
                        color: kolors.dark
                    }}
                >{ tokenBalance }</Typography>

                <Stack direction="row" spacing="10px" alignItems="center">
                    <Button variant="contained" size='small'
                        type="button"
                        onClick={() => setTopUpModal(true)}
                        
                        sx={{
                            ...themeBtnStyle,
                            bgcolor: kolors.secondary,
                            color: kolors.primary,
                            fontSize: "12px",
                            fontWeight: "600",
                            // lineHeight: 14.52px;
                        }}
                    >Top up</Button>

                    <Button variant="contained" size='small'
                        type="button"
                        onClick={() => navigate(`/admin/users/${userId}/dyt-token-transactions`)}
                        sx={{
                            ...themeBtnStyle,
                            fontSize: "12px",
                            fontWeight: "600",
                            // lineHeight: 14.52px;
                        }}
                    >Transaction history</Button>
                </Stack>
            </Box>


            <TopUpModal 
                openTopUpModal={topUpModal} 
                closeTopUpModal={setTopUpModal} 
            />
        </Box>
    );
}

export default TokenBalanceComponent;