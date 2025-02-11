import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// import bgImage from "@/assets/images/auth/background.png";
// import bgImage from "@/assets/images/auth/background.webp";
import authIconImg from "@/assets/images/auth/authIconImg.png";



function AuthSideIconTextComponent() {
    return (
        <Box>
            <Box
                sx={{
                    maxWidth: "290px",
                    maxHeight: "291px"
                }}
            >
                <img 
                    src={authIconImg} 
                    alt="auth icon image" 
                    style={{ width: "100%", objectFit: "contain" }} 
                />
            </Box>

            <Box textAlign="center" mt={3}>
                <Typography
                    sx={{
                        fontSize: "20px",
                        fontWeight: "900",
                        // lineHeight: "19.36px",
                        color: "#fff"
                    }}
                >Connect with Bondyt</Typography>

                <Typography
                    sx={{
                        fontSize: "16px",
                        fontWeight: "400",
                        // lineHeight: "19.36px",
                        color: "#fff"
                    }}
                >Lets change how the world of online dating works</Typography>
            </Box>
        </Box>
    )
}

export default AuthSideIconTextComponent