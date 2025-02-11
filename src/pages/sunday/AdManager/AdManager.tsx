import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import NotificationComponent from '@/components/sunday/NotificationComponent';
import SearchwordComponent from '@/components/sunday/SearchwordComponent';
import { themeBtnStyle } from '@/util/mui';

// import mtnLogo from "@/assets/images/mtn2.png";
import { CustomTabContentPanel } from '@/components/sunday/CustomTabContentPanel';
import { useAdvertiseHook } from '@/hooks/advertise/useAdvertiseHook';
import EmptyListComponent from '@/components/EmptyList';
import LoadingDataComponent from '@/components/LoadingData';
import { advertiseInterface } from '@/typeInterfaces/advertise.interface';
import CustomTabsHeaderBar from '@/components/sunday/CustomTabsHeaderBar';


const AdManagerPage = () => {
    const navigate = useNavigate();
    const [tabsValue, setTabsValue] = useState(0);

    const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
    const openFilterMenu = Boolean(filterAnchorEl);
    const handleClickFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
        setFilterAnchorEl(event.currentTarget);
    };
    const handleCloseFilter = () => {
        setFilterAnchorEl(null);
    };


    const { 
        pendingAdvertisement, 
        liveAdvertisement, 
        getPendingAdvertisements,
        getLiveAdvertisements,
    } = useAdvertiseHook();

    useEffect(() => {
        if (tabsValue == 0) {
            getPendingAdvertisements();
        } else if (tabsValue == 1) {
            getLiveAdvertisements();
        } else {
            
        }
    }, [tabsValue]);


    return (
        <Box mb={5}
            sx={{
                border: `1px solid ${kolors.border}`,
                bgcolor: "#fff",
                borderRadius: 2,
                p: 2,
                my: 3,
                minHeight: "90dvh",
            }}
        >
            <Stack direction='row' gap='10px' flexWrap="wrap"
                alignItems="center" justifyContent="space-between"
            >
                <SearchwordComponent 
                    performSearch={() => {}}
                />

                <NotificationComponent />
            </Stack>

            <Box mt={5}>
                <Stack direction='row' spacing="10px"
                    alignItems="center" justifyContent="space-between"
                >
                    <Button variant="contained" size='small'
                        type="button"
                        onClick={() => { 
                            navigate("/admin/ad-manager/edit/new")
                        }}
                        
                        sx={{
                            ...themeBtnStyle,
                            fontSize: "12px",
                            fontWeight: "600",
                            // lineHeight: 14.52px;
                        }}
                    >
                        Add Promotion
                        <AddIcon sx={{ fontSize: "16px", ml: 1 }} />
                    </Button>

                    {
                        tabsValue ? 
                            <div>
                                <IconButton size='small'
                                    aria-controls={openFilterMenu ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openFilterMenu ? 'true' : undefined}
                                    onClick={handleClickFilter}
                                    id="basic-button"
                                >
                                    <TuneIcon sx={{ color: kolors.primary, fontSize: "18px" }} />
                                </IconButton>

                                <Menu
                                    id="basic-menu"
                                    anchorEl={filterAnchorEl}
                                    open={openFilterMenu}
                                    onClose={handleCloseFilter}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={() => {
                                        handleCloseFilter();
                                    }}
                                    >All</MenuItem>

                                    <MenuItem onClick={() => {
                                        handleCloseFilter();
                                    }}
                                    >Inprofile</MenuItem>

                                    <MenuItem onClick={() => {
                                       handleCloseFilter(); 
                                    }}>Banner</MenuItem>
                                </Menu>
                            </div>
                        : <></>
                    }
                </Stack>

                <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3 }}>
                    <CustomTabsHeaderBar 
                        currentValue={tabsValue}
                        setValue={setTabsValue}
                        title={["Ad review", "Live Ads"]}
                    />
                </Box>

                {/* Ad review */}
                <CustomTabContentPanel value={tabsValue} index={0}>
                    {
                        pendingAdvertisement ? 
                            pendingAdvertisement.length ? 
                                <List disablePadding >
                                    {
                                        pendingAdvertisement.map((item) => (
                                            <AdsComponent 
                                                key={item.id}
                                                onClick={() => navigate(`review-details?id=${item.id}`)}
                                                adsData={item}
                                            />
                                        ))
                                    }
                                </List>
                            : <Box my={5}>
                                <EmptyListComponent 
                                    notFoundText='No ad found.'
                                />
                            </Box>
                        : <Box>
                            <LoadingDataComponent />
                        </Box>
                    }
                </CustomTabContentPanel>

                {/* live ads */}
                <CustomTabContentPanel value={tabsValue} index={1}>
                    {
                        liveAdvertisement ? 
                            liveAdvertisement.length ? 
                                <List disablePadding >
                                    {
                                        liveAdvertisement.map((item) => (
                                            <AdsComponent 
                                                key={item.id}
                                                btnText='View details' 
                                                adsData={item}
                                                onClick={() => navigate(`live-details?id=${item.id}`)}
                                            />
                                        ))
                                    }
                                </List>
                            : <Box my={5}>
                                <EmptyListComponent 
                                    notFoundText='No ad found.'
                                />
                            </Box>
                        : <Box>
                            <LoadingDataComponent />
                        </Box>
                    }
                </CustomTabContentPanel>
            </Box>
            
        </Box>
    );
};

export default AdManagerPage;


interface _Props {
    adsData: advertiseInterface;
    btnText?: string;
    onClick: (data: advertiseInterface) => void,
};

const AdsComponent: React.FC<_Props> = ({
    btnText = "View", adsData, onClick
}) => {

    return (
        <ListItem alignItems="flex-start"
            secondaryAction={
                <Button variant="contained" size='small'
                    type="button"
                    onClick={() => onClick(adsData)}
                    
                    sx={{
                        ...themeBtnStyle,
                        fontSize: "12px",
                        fontWeight: "600",
                        // lineHeight: 14.52px;
                    }}
                >{ btnText }</Button>
            }
        >
            <ListItemButton onClick={() => onClick(adsData)}>
                <ListItemAvatar>
                    <Avatar variant="square"
                        alt="ads manager" 
                        src={adsData.image_url}
                        sx={{ 
                            width: "auto", 
                            height: "auto",
                            objectFit: "contain",
                            maxWidth: "100px", 
                            maxHeight: "70px",
                        }}
                    />
                </ListItemAvatar>

                <Box px={2}>
                    <ListItemText
                        primary={adsData.title || ""} 
                        secondary={adsData.description || "" }
                    />
                </Box>
            </ListItemButton>
        </ListItem>
    )
}