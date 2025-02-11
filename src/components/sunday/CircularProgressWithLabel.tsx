import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import kolors from '@/constants/kolors';


export default function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {


    return (
        <>
            {
                props.value < 1 ?
                <CircularProgress size={25} sx={{ color: kolors.tertiary, fontWeight: "bold" }} />
                :
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress variant="determinate" {...props} />
                    <Box
                        sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            // bgcolor: "#00000080"
                        }}
                    >
                        <Typography
                            variant="caption"
                            component="div"
                            // color="text.secondary"
                            sx={{ color: "#fff", bgcolor: "#00000080" }}
                            fontSize={10}
                        >{`${props.value}%`}</Typography>
                    </Box>
                </Box>
            }
        </>
    );
}