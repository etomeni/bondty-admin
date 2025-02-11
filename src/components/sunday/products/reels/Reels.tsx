import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import kolors from '@/constants/kolors';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import cloudUploadIcon from "@/assets/images/cloudUploadIcon.png";
import { convertToBase64 } from '@/util/resources';
import { themeBtnStyle } from '@/util/mui';
import { useReelsHook } from '@/hooks/products/useReelsHook';
import { Typography } from '@mui/material';
import EmptyListComponent from '@/components/EmptyList';
import { reelInterface } from '@/typeInterfaces/reels.interface';
import CircularProgressWithLabel from '../../CircularProgressWithLabel';

interface _Props {
    // performSearch: (searchword: string) => void
};


const ReelsComponent: React.FC<_Props> = ({
    // performSearch
}) => {
    const [captionInput, setCaptionInput] = useState('');
    const [reelVideoInput, setReelVideoInput] = useState<any>();
    const [reelVideoPreview, setReelVideoPreview] = useState('');
    const [uploadingReel, setUploadingReel] = useState<reelInterface>();

    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);

    const {
        reels,
        selectedReel, 
        setSelectedReel,
        _setToastNotification,

        // isSubmitting,
        getReelById,
        getAllReels,
        editReel,
        addNewReel,
        deleteReel,
        uploadProgress
    } = useReelsHook();

    useEffect(() => {
        getAllReels();
    }, []);

    useEffect(() => {
        if (selectedReel) {
            setCaptionInput(selectedReel.caption || '');
            setReelVideoPreview(selectedReel.url || '');
        }
    }, [selectedReel]);

    const [anchorMoreReelEl, setAnchorMoreReelEl] = useState<{ [key: string]: HTMLElement | null }>({});

    const handleClickMoreReel = (event: React.MouseEvent<HTMLElement>, id: string) => {
        setAnchorMoreReelEl(prev => ({ ...prev, [id]: event.currentTarget }));
    };

    const handleCloseMoreReel = (id: string) => {
        setAnchorMoreReelEl(prev => ({ ...prev, [id]: null }));
    };

    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0]; 
        setReelVideoInput(file);

        const base64 = await convertToBase64(file);
        setReelVideoPreview(base64.result);
    
        e.target.value = "";
    }

    const handleSubmit = () => {
        if (!captionInput) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "reels caption is required."
            });
            return;
        }

        if (!reelVideoInput) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "reels video is required."
            });

            return;
        }

        setUploadingReel({
            caption: captionInput,
            id: '',
            url: reelVideoPreview
        });

        if (selectedReel && selectedReel.id) {
            editReel(
                selectedReel.id,
                captionInput,
                reelVideoInput,
                () => {
                    setUploadingReel(undefined);
                    getAllReels();
                }
            );
        } else {
            addNewReel(
                captionInput,
                reelVideoInput,
                () => {
                    setUploadingReel(undefined);
                    getAllReels();
                }
            );
        }

        setSelectedReel(undefined);
        setCaptionInput('');
        setReelVideoPreview('');
        setReelVideoInput(undefined);
    }

    const togglePlayStop = (index: number) => {
        const video = videoRefs.current[index];

        if (video) {
            if (currentlyPlaying === index) {
                video.pause();
                video.currentTime = 0;
                setCurrentlyPlaying(null);
            } else {
                if (currentlyPlaying !== null) {
                    const currentlyPlayingVideo = videoRefs.current[currentlyPlaying];
                    if (currentlyPlayingVideo) {
                        currentlyPlayingVideo.pause();
                        currentlyPlayingVideo.currentTime = 0;
                    }
                }
                video.play();
                setCurrentlyPlaying(index);
            }
        }
    };

    return (
        <Box
            sx={{
                border: `1px solid ${kolors.border}`,
                borderRadius: 2,
                p: 1.5,
                my: 3
            }}
        >
            <Grid container spacing="20px">
                <Grid size={{ xs: 12, sm: 4, md: 4 }}
                    sx={{
                        border: `1px solid ${kolors.border}`,
                        borderRadius: "4px",
                        overflow: "hidden"
                    }}
                >
                    <Box sx={{position: "relative"}}>
                        <Stack height="470px" alignItems="center" justifyContent="center">
                            <Box mt="auto">
                                <Box sx={{ position: "relative", zIndex: 1 }}>
                                    <img 
                                        alt='upload icon'
                                        src={cloudUploadIcon}
                                        onClick={() => {
                                            document.getElementById("reelVideo")?.click();
                                        }}
                                        style={{
                                            width: "100px",
                                            objectFit: "contain",
                                            textAlign: "center",
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box mt="auto" width="100%">
                                <Box p={2}>
                                    <TextField variant="outlined" 
                                        fullWidth
                                        type='text'
                                        placeholder='Write a caption for this post...'
                                        multiline
                                        rows={5}
                                        sx={{
                                            zIndex: 1,
                                            color: kolors.primary,

                                            '& .MuiInputBase-input': {
                                                color: reelVideoPreview ? "#fff" : kolors.dark,
                                            },

                                            '& .MuiOutlinedInput-root': {
                                                bgcolor: reelVideoPreview ? "#00000080" : "#ffffff80",
                                            }

                                        }}
            
                                        value={captionInput}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setCaptionInput(value);
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Stack>

                        <video loop autoPlay
                            src={reelVideoPreview}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                position: "absolute",
                                top: 0,
                                display: reelVideoPreview ? "initial" : "none"
                            }}
                        />

                        <Box
                            sx={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                display: reelVideoPreview ? "initial" : "none"
                            }}
                        >
                            <Button variant="contained" size='small'
                                type="button"
                                onClick={() => { handleSubmit() }}
                                
                                sx={{
                                    ...themeBtnStyle,
                                    fontSize: "15px",
                                    fontWeight: "400",
                                }}
                            > Upload </Button>
                        </Box>

                    </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 8, md: 8 }}>
                    <Box>
                        <Stack direction="row" gap="10px" flexWrap="wrap"
                            alignItems="center"
                        >
                            {
                                uploadingReel ? 
                                    <Box
                                        sx={{
                                            width: "100px",
                                            height: "110px",
                                            bgcolor: "#D9D9D9",
                                            position: "relative",
                                            overflow: "hidden",
                                            borderRadius: "2px",
                                        }}
                                        // onClick={() => { togglePlayStop(index); }}
                                    >
                                        <Box
                                            sx={{
                                                bgcolor: "#00000080",
                                                width: "100%",
                                                height: "100%",
                                                position: "absolute",
                                                // top: 0,
                                            }}
                                        >
                                            <Box sx={{ position: "absolute", top: "45px", right: "40px", zIndex: 2 }}>
                                                <CircularProgressWithLabel 
                                                    value={uploadProgress} size={30} 
                                                    sx={{ color: kolors.tertiary,
                                                        fontWeight: "bold", mx: 'auto' 
                                                    }} 
                                                />
                                            </Box>
                                        </Box>

                                        <video loop
                                            src={uploadingReel.url}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </Box>
                                : <></>
                            }


                            {
                                reels ? 
                                    reels.length ?
                                        reels.map((item, index) => {
                                            const menuId = `MoreReel-menu-${item.id}`;
                                            const buttonId = `MoreReel-button-${item.id}`;
                                            const isMenuOpen = Boolean(anchorMoreReelEl[item.id]);

                                            return (
                                                <Box key={item.id}
                                                    sx={{
                                                        width: "100px",
                                                        height: "110px",
                                                        bgcolor: "#D9D9D9",
                                                        position: "relative",
                                                        overflow: "hidden",
                                                        borderRadius: "2px"
                                                    }}
                                                    onClick={() => { togglePlayStop(index); }}
                                                >
                                                    <Box sx={{ position: "absolute", top: 1, right: 1, zIndex: 2 }}>
                                                        <IconButton
                                                            aria-label={`MoreReel-${index}`}
                                                            id={buttonId}
                                                            size='small'
                                                            aria-controls={isMenuOpen ? menuId : undefined}
                                                            aria-expanded={isMenuOpen ? 'true' : undefined}
                                                            onClick={(e) => handleClickMoreReel(e, item.id)}
                                                            sx={{
                                                                bgcolor: kolors.tertiary,
                                                                color: "#fff",
                                                                ':hover': {
                                                                    bgcolor: kolors.tertiary,
                                                                    color: "#fff"
                                                                }
                                                            }}
                                                        >
                                                            <MoreVertIcon sx={{ fontSize: "14px" }} />
                                                        </IconButton>

                                                        <Menu
                                                            id={menuId}
                                                            MenuListProps={{
                                                                'aria-labelledby': buttonId,
                                                            }}
                                                            anchorEl={anchorMoreReelEl[item.id]}
                                                            open={isMenuOpen}
                                                            onClose={() => handleCloseMoreReel(item.id)}
                                                        >
                                                            <MenuItem 
                                                                onClick={() => {
                                                                    setSelectedReel(item);
                                                                    handleCloseMoreReel(item.id);
                                                                    getReelById(item.id);
                                                                }}
                                                            >Edit</MenuItem>

                                                            <MenuItem 
                                                                onClick={() =>{
                                                                    deleteReel(
                                                                        item.id,
                                                                        () => {
                                                                            getAllReels();
                                                                            handleCloseMoreReel(item.id);
                                                                        }
                                                                    );
                                                                }}
                                                            >
                                                                <Box 
                                                                    sx={{
                                                                        bgcolor: "#A80D05",
                                                                        py: "10px",
                                                                        px: "20px",
                                                                        borderRadius: "4px",
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        sx={{
                                                                            fontWeight: "700",
                                                                            fontSize: "13px",
                                                                            color: "16px",
                                                                            textAlign: "center"
                                                                        }}
                                                                    >Delete</Typography>
                                                                </Box>
                                                            </MenuItem>
                                                        </Menu>
                                                    </Box>

                                                    <video loop
                                                        src={item.url}
                                                        ref={(el) => (videoRefs.current[index] = el)}
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                </Box>
                                            );
                                        })
                                    : 
                                    <Box m="auto">
                                        <EmptyListComponent 
                                            notFoundText='No reels found.'
                                        />
                                    </Box>
                                : 
                                    <Box
                                        sx={{
                                            width: "100px",
                                            height: "110px",
                                            bgcolor: "#D9D9D9",
                                        }}
                                    > </Box>
                            }
                        </Stack>

                    </Box>
                </Grid>
            </Grid>

                       
            <input 
                type="file" 
                id='reelVideo' 
                name="reelVideo" 
                accept='video/*' 
                onChange={handleFileUpload}
                style={{display: "none"}}
            />
        </Box>
    )
}

export default ReelsComponent;