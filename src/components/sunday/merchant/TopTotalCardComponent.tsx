import React from 'react';
import Box from '@mui/material/Box';
import kolors from '@/constants/kolors';
import Typography from '@mui/material/Typography';


interface _Props {
    title: string;
    value: string, 
    // setView: (view: "list" | "details") => void
};

const TopTotalCardComponent: React.FC<_Props> = ({
    title, value
}) => {
    // const navigate = useNavigate();


    return (
        <Box
            sx={{
                border: `1px solid ${kolors.border}`,
                // bgcolor: "#fff",
                borderRadius: 2,
                p: 2,
                width: "200px",
                height: "100px",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <Typography
                sx={{
                    fontWeight: "600",
                    fontSize: "13px",
                    lineHeight: "16px",
                    color: "#595757"
                }}
            >{title}</Typography>

            <Typography
                sx={{
                    fontWeight: "600",
                    fontSize: "40px",
                    lineHeight: "50px",
                    color: kolors.dark,
                    textAlign: "center",
                    mt: "auto"
                }}
            >{value}</Typography>
        </Box>
    );
}

export default TopTotalCardComponent;