import { useNavigate } from 'react-router-dom';
// import { useUserStore } from '@/state/userStore';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';

import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ListItemText from '@mui/material/ListItemText';



const NotificationPage = () => {
    const navigate = useNavigate();
    
    // const handleSearch = (searchword: string) => {
    //     console.log(searchword);

    // }


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
            {/* <Stack direction='row' gap='10px' flexWrap="wrap"
                alignItems="center" justifyContent="space-between"
            >
                <SearchwordComponent 
                    performSearch={(searchword) => handleSearch(searchword)}
                />

                <NotificationComponent />
            </Stack> */}

            <Stack direction='row' spacing='10px' mt={3}
                alignItems="center" justifyContent="space-between"
            >
                <IconButton size='small' onClick={() => navigate(-1)}>
                    <ArrowBackIosIcon sx={{ fontSize: "18px", color: kolors.border }} />
                </IconButton>

                <Box> </Box>
            </Stack>


            <Box mt={5}>
                <Box>
                    <Typography
                        sx={{
                            fontWeight: "600",
                            fontSize: "24px",
                            color: kolors.dark,
                            textAlign: "center",
                        }}
                    >Notifications</Typography>

                    <List sx={{ border: `1px solid ${kolors.border}`, borderRadius: "8px", mt: 2 }}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <ImageIcon />
                                </Avatar>
                            </ListItemAvatar>
                            
                            <ListItemText 
                                primary="Account reported" 
                                secondary="@Michelle has reported @Joshua for inappropriate content" 
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <WorkIcon />
                            </Avatar>
                            </ListItemAvatar>
                              
                            <ListItemText 
                                primary="Account reported" 
                                secondary="@Michelle has reported @Joshua for inappropriate content" 
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <BeachAccessIcon />
                            </Avatar>
                            </ListItemAvatar>
                              
                            <ListItemText 
                                primary="Account reported" 
                                secondary="@Michelle has reported @Joshua for inappropriate content" 
                            />
                        </ListItem>
                    </List>

                </Box>
            </Box>
            
            
        </Box>
    );
};

export default NotificationPage;
