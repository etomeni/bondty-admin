import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import NotificationComponent from '@/components/sunday/NotificationComponent';
import StickersComponent from '@/components/sunday/products/stickers/Stickers';
import ReelsComponent from '@/components/sunday/products/reels/Reels';



const ProductsPage = () => {

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
                <Box> </Box>
                <NotificationComponent />
            </Stack>

            <Box mt={5}>
                <StickersComponent />

                <ReelsComponent />
            </Box>
            
        </Box>
    );
};

export default ProductsPage;
