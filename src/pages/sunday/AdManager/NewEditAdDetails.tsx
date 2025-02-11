import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NotificationComponent from '@/components/sunday/NotificationComponent';
// import mtnLogo from "@/assets/images/mtn2.png";
import NewEditBannerAdsComponent from '@/components/sunday/AdManager/NewEditBannerAds';
import NewEditInprofileAdsComponent from '@/components/sunday/AdManager/NewEditInprofileAds';
import BackNavigationArrowBtn from '@/components/sunday/BackNavigationArrowBtn';
import { themeBtnStyle } from '@/util/mui';


function toggleStringInArray(array: string[], newValue: string) {
    // Find the index of the string in the array
    const index = array.indexOf(newValue);
    
    if (index === -1) {
      // If the string does not exist, add it
      array.push(newValue);
    } else {
      // If the string exists, remove it
      array.splice(index, 1);
    }
  
    return array;
}

const bannerAdsValue = ["Places", "Books", "Events"];

const NewEditAdDetailsPage = () => {
    // const navigate = useNavigate();
    // const {id} = useParams();

    const [selectedPlacement, setSelectedPlacement] = useState("Placement");
    const [bannerAdsLocation, setBannerAdsLocation] = useState<string[]>([]);


    const [placementAnchorEl, setPlacementAnchorEl] = useState<null | HTMLElement>(null);
    const openPlacementMenu = Boolean(placementAnchorEl);
    const handleClickPlacement = (event: React.MouseEvent<HTMLButtonElement>) => {
        setPlacementAnchorEl(event.currentTarget);
    };
    const handleClosePlacement = () => {
        setPlacementAnchorEl(null);
    };
    

    
    return (
        <Box mb={5}
            sx={{
                border: `1px solid ${kolors.border}`,
                bgcolor: "#fff",
                borderRadius: 2,
                p: 2, my: 3,
                minHeight: "90dvh",
            }}
        >
            <Stack direction='row' gap='10px' flexWrap="wrap"
                alignItems="center" justifyContent="space-between"
            >
                <BackNavigationArrowBtn />

                <NotificationComponent />
            </Stack>

            <Box mt={5}>

                <Box>
                    <Button
                        id="placement-button"
                        aria-controls={openPlacementMenu ? 'placement-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openPlacementMenu ? 'true' : undefined}
                        onClick={handleClickPlacement}
                        endIcon={<ArrowDropDownIcon />}
                        sx={{
                            ...themeBtnStyle
                        }}
                    > { selectedPlacement } </Button>

                    <Menu
                        id="placement-menu"
                        anchorEl={placementAnchorEl}
                        open={openPlacementMenu}
                        onClose={handleClosePlacement}
                        MenuListProps={{
                            'aria-labelledby': 'placement-button',
                        }}
                    >
                        <MenuItem>
                            <Box>
                                <Stack direction="row" spacing="20px" 
                                    alignItems="center" justifyContent="space-between"
                                    onClick={() => {
                                        setSelectedPlacement("Banner ads")
                                        setBannerAdsLocation(bannerAdsValue);
                                        setPlacementAnchorEl(null);
                                    }}
                                >
                                    <Typography>Banner ads</Typography>

                                    <Checkbox 
                                        checked={selectedPlacement == "Banner ads" ? true : false}
                                        sx={{
                                            color: "#D9D9D9",
                                            '&.Mui-checked': {
                                                color: kolors.primary,
                                            },
                                        }}
                                    />
                                </Stack>
                                
                                <Box>
                                    { 
                                        bannerAdsValue.map((item, index) => (
                                            <MenuItem key={index} component="div">
                                                <Stack direction="row" spacing="20px" 
                                                    alignItems="center" justifyContent="space-between"
                                                    onClick={() => { 
                                                        const newLocations = toggleStringInArray(bannerAdsLocation, item);
                                                        setBannerAdsLocation(newLocations);
                                                        setSelectedPlacement("Banner ads")
                                                        setPlacementAnchorEl(null);
                                                    }}
                                                >
                                                    <Typography>{item}</Typography>

                                                    <Checkbox 
                                                        checked={bannerAdsLocation.includes(item) ? true : false}
                                                        size='small'
                                                        sx={{
                                                            color: "#D9D9D9",
                                                            '&.Mui-checked': {
                                                                color: kolors.primary,
                                                            },
                                                        }}
                                                    />
                                                </Stack>
                                            </MenuItem>
                                        ))
                                    }
                                </Box>
                            </Box>
                        </MenuItem>

                        <MenuItem>
                            <Stack direction="row" spacing="20px" 
                                alignItems="center" justifyContent="space-between"
                                onClick={() => {
                                    setSelectedPlacement("Inprofile Ads")
                                    setBannerAdsLocation([]);
                                    setPlacementAnchorEl(null);
                                }}
                            >
                                <Typography>Inprofile Ads</Typography>

                                <Checkbox 
                                    checked={selectedPlacement == "Inprofile Ads" ? true : false}
                                    sx={{
                                        color: "#D9D9D9",
                                        '&.Mui-checked': {
                                            color: kolors.primary,
                                        },
                                    }}
                                />
                            </Stack>
                        </MenuItem>
                    </Menu>
                </Box>


                <Box maxWidth="520px" mx="auto">
                    {
                        selectedPlacement == "Inprofile Ads" ?
                            <NewEditInprofileAdsComponent 
                                adsPlacement={"Inprofile Ads"} 
                            />
                        :
                            <NewEditBannerAdsComponent 
                                adsPlacement={bannerAdsLocation.toString() || selectedPlacement} 
                            />
                    }

                </Box>
            </Box>
        </Box>
    );
};

export default NewEditAdDetailsPage;
