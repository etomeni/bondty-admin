import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { themeBtnStyle } from '@/util/mui';


interface _Props {
    walletBalance: string, 
    userId: string, 
};

const WalletBalanceComponent: React.FC<_Props> = ({
    userId, walletBalance
}) => {
    const navigate = useNavigate();


    return (
        <Box 
            sx={{
                p: 2,
                border: `1px solid ${kolors.border}`,
                borderRadius: "8px",
                width: "230px",
                alignSelf: "stretch",
                // height: "130px"
            }}
        >
            <Typography
                sx={{
                    fontWeight: "600",
                    fontSize: "13px",
                    color: kolors.border,
                }}
            >Wallet balance</Typography>

            <Typography
                sx={{
                    fontWeight: "600",
                    fontSize: "40px",
                    color: kolors.dark
                }}
            >{walletBalance}</Typography>

            <Stack direction="row" spacing="10px" alignItems="center">
                <Button variant="contained" size='small'
                    type="button"
                    onClick={() => navigate(`/admin/users/${userId}/transaction-history`)}
                    sx={{
                        ...themeBtnStyle,
                        fontSize: "12px",
                        fontWeight: "600",
                        // lineHeight: 14.52px;
                    }}
                >Transaction history</Button>
            </Stack>
        </Box>
    );
}

export default WalletBalanceComponent;