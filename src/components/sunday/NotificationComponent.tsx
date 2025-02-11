import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import kolors from '@/constants/kolors';
import IconButton from '@mui/material/IconButton';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';


const NotificationComponent: React.FC = () => {
    const navigate = useNavigate();
    
    
    return (
        <Box>
            <IconButton size='small'
                onClick={() => navigate("/admin/notifications")}
                sx={{
                    border: `1px solid ${kolors.border}`,
                    borderRadius: "8px"
                }}
            >
                <NotificationsNoneIcon sx={{ fontSize: "18px" }} />
            </IconButton>
        </Box>
    )
}

export default NotificationComponent;