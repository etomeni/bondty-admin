import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import kolors from '@/constants/kolors';
import { themeBtnStyle } from '@/util/mui';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';


interface _Props {
    // menuItems: {
    //     title: string;
    //     status: boolean;
    //     baseLink: string;
    // }[],
    // value: number, 
    // setValue: (data: number) => void
};

const TopTotalCard: React.FC<_Props> = ({
    // menuItems, value, setValue
}) => {
    // const navigate = useNavigate();


    return (
        <Box 
            sx={{
                bgcolor: "#5E17EB2E",
                p: 1.5,
                borderRadius: "8px"
            }}
        >
            <Stack direction="row" alignItems="center" spacing="10px">
                <IconButton size='small'
                    sx={{
                        bgcolor: "#5E17EB2E"
                    }}
                >
                    <CheckBoxOutlinedIcon 
                        sx={{
                            color: kolors.tertiary,
                            fontSize: "18px"
                        }}
                    />
                </IconButton>

                <Typography noWrap
                    sx={{
                        fontSize: "12px",
                        fontWeight: "400",
                        // lineHeight: "13.31px"
                        color: kolors.tertiary
                    }}
                >Total Reassigned</Typography>
            </Stack>

            <Typography
                sx={{
                    fontSize: "30px",
                    fontWeight: "600",
                    // lineHeight: "36.31px",
                    color: kolors.primary,
                    textAlign: "center"
                }}  
            >100</Typography>

            <Button variant="contained" size='small'
                type="button" fullWidth
                onClick={() => { }}
                
                sx={{
                    ...themeBtnStyle,
                    fontSize: "12px",
                    fontWeight: "600",
                    // lineHeight: 14.52px;
                }}
            >View</Button>
        </Box>
    );
}

export default TopTotalCard;