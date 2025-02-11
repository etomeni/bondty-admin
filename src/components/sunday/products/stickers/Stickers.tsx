import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import kolors from '@/constants/kolors';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

import { themeBtnStyle } from '@/util/mui';
import { currencyDisplay } from '@/util/resources';
import StickerDetailsComponent from './StickerDetails';
import StickerDetailsEditComponent from './StickerDetailsEdit';
import { UploadStickerModal } from './UploadStickerModal';
import { useStickersHook } from '@/hooks/products/useStickersHook';
import EmptyListComponent from '@/components/EmptyList';
import LoadingDataComponent from '@/components/LoadingData';
import { stickerInterface } from '@/typeInterfaces/stickers.interface';



interface _Props {
    // performSearch: (searchword: string) => void
};

const StickersComponent: React.FC<_Props> = ({
    // performSearch
}) => {
    const [editStickerState, setEditStickerState] = useState(false);
    const [uploadStickerModal, setUploadStickerModal] = useState(false);

    const {
        stickers,
        selectedSticker, setSelectedSticker,

        isSubmitting,
        getStickerById,
        getAllSticker,
        editSticker,
        deleteSticker,
    } = useStickersHook();

    useEffect(() => {
        getAllSticker();
    }, [])

    
    return (
        <Box
            sx={{
                border: `1px solid ${kolors.border}`,
                // bgcolor: "#fff",
                borderRadius: 2,
                p: 1.5,
                my: 3
            }}
        >
            <Button variant="contained" size='small'
                type="button"
                onClick={() => setUploadStickerModal(true)}
                
                sx={{
                    ...themeBtnStyle,
                    fontSize: "12px",
                    fontWeight: "600",
                    // lineHeight: 14.52px;
                }}
            >
                Update sticker pack 
                <CloudUploadOutlinedIcon sx={{ fontSize: "16px", ml: 1 }} />
            </Button>

            <Grid container spacing="20px"
                sx={{
                    justifyContent: "space-between",
                    alignItems: "start",
                    my: 3
                }}
            >
                <Grid size={{ xs: 12, sm: 8, md: 9 }}>
                    <Box>
                        <Stack direction="row" gap="10px" flexWrap="wrap" 
                            alignItems="center"
                        >
                            {
                                stickers ?
                                    stickers.length ?
                                        stickers.map((item, index) => (
                                            <Box key={index}
                                                onClick={() => {
                                                    setSelectedSticker(item);
                                                    // getStickerById(item.id);
                                                }}
                                            >
                                                <StickerItemCardComponent 
                                                    stickerItem={item}
                                                    activeStickers={selectedSticker}
                                                />
                                            </Box>
                                        ))
                                    : <Box width="100%" my={5}>
                                        <EmptyListComponent 
                                            notFoundText='No record found.'
                                        />
                                    </Box>
                                : <Box width="100%" my={5}>
                                    <LoadingDataComponent />
                                </Box>
                            }
                        </Stack>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                    <Box>
                        {
                            editStickerState ? 
                                selectedSticker ?
                                    <StickerDetailsEditComponent 
                                        selectedSticker={selectedSticker}
                                        isSubmitting={isSubmitting}
                                        deleteStickerBtn={(sticker: stickerInterface) => {
                                            // console.log(sticker);
                                            // setEditStickerState(false);
                                            deleteSticker(
                                                sticker.id,
                                                () => {
                                                    getAllSticker();
                                                    
                                                    setTimeout(() => {
                                                        if (stickers?.length) setSelectedSticker(stickers[0])
                                                        setEditStickerState(false)
                                                    }, 1000);
                                                }
                                            )
                                        }}
                                        saveStickerBtn={(oldSticker: stickerInterface, newData) => {
                                            // console.log(oldSticker);
                                            // const newStickerData = {
                                            //     name: newData.name,
                                            //     icon: newData.icon,
                                            //     price: newData.price,
                                            //     image: newData.image,
                                            //     imagePreview: newData.imagePreview
                                            // };
                                            // console.log(newStickerData);

                                            
                                            editSticker(
                                                oldSticker.id,
                                                newData.name,
                                                newData.price,
                                                newData.image,
                                                () => {
                                                    getAllSticker();
                                                    getStickerById(oldSticker.id);

                                                    setTimeout(() => {
                                                        setEditStickerState(false);
                                                        // if (stickers?.length) setSelectedSticker(stickers[0]);
                                                    }, 1000);
                                                }
                                            )
                                        }}
                                    />
                                : <></>
                            :
                                selectedSticker ?
                                    <StickerDetailsComponent 
                                        selectedSticker={selectedSticker}
                                        editStickerBtn={() => setEditStickerState(true)}
                                    />
                                : <></>
                        }
                    </Box>
                </Grid>
            </Grid>

            <UploadStickerModal 
                openUploadStickerModal={uploadStickerModal}
                closeUploadStickerModal={() => setUploadStickerModal(false)}
            />
        </Box>
    )
}

export default StickersComponent;




interface StickerItem_Props {
    stickerItem: stickerInterface
    activeStickers: stickerInterface | undefined
    // setActiveSticker: (searchword: string) => void
};

const StickerItemCardComponent: React.FC<StickerItem_Props> = ({
    stickerItem, activeStickers,
    // setActiveSticker
}) => {
    const [activeItem, setActiveItem] = useState(false);

    useEffect(() => {
        if (activeStickers) {
            if (stickerItem.name == activeStickers.name) {
                setActiveItem(true);
            } else {
                setActiveItem(false);
            }
        }
    }, [activeStickers])
    

    return (
        <Box
            sx={{
                // border: `1px solid ${kolors.border}`,
                bgcolor: activeItem ? kolors.secondary : "#fff",
                borderRadius: "8px",
                p: 1.5,
                width: "130px",
                textAlign: "center",

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // justifyItems: "center"

                cursor: "pointer",
            }}
        >
            <Box
                sx={{
                    maxWidth: "60px",
                }}
            >
                <img 
                    src={stickerItem.url} alt='stickers image'
                    style={{
                        width: "100%",
                        // borderRadius: "8px",
                        // height: "100%",
                        objectFit: "contain",
                    }}
                />
            </Box>

            <Box mt={1}>
                <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        // lineHeight: "19px",
                        color: activeItem ? kolors.primary : kolors.border,
                        textAlign: "center"
                    }}
                >{ stickerItem.name }</Typography>

                <Typography
                    sx={{
                        fontWeight: "400",
                        fontSize: "14px",
                        // lineHeight: "19px",
                        color: activeItem ? kolors.primary : kolors.border,
                        textAlign: "center"
                    }}
                >{ currencyDisplay(Number(stickerItem.price)) }</Typography>
            </Box>
        </Box>
    )
}