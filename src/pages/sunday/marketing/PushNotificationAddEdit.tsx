import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import kolors from '@/constants/kolors';
import { themeBtnStyle } from '@/util/mui';
import NotificationComponent from '@/components/sunday/NotificationComponent';
import BackNavigationArrowBtn from '@/components/sunday/BackNavigationArrowBtn';
import brokenImage  from "@/assets/images/brokenImage.png";
import { convertToBase64 } from '@/util/resources';
import { useNavigate } from 'react-router-dom';


interface _Props {
    // performSearch: (searchword: string) => void
};

const targetOptions = [
    "All", "Free users", "Premium", "Merchant (Books)",
    "Merchant (Store)", "Merchant (Places)", "Merchant (Events)"
];

const frequencyOptions = [
    { value: "Hourly", displayText: "Hourly" },
    { value: "Daily", displayText: "Daily" },
    { value: "Weekends", displayText: "Weekends" },
    { value: "Weekly", displayText: "Weekly" },
    { value: "Biweekly", displayText: "Biweekly" },
    { value: "Monthly", displayText: "Monthly" },
    { value: "Every 3 months", displayText: "Every 3 months" },
    { value: "Every 6 months", displayText: "Every 6 months" },
];


const PushNotificationAddEditPage: React.FC<_Props> = ({
    // performSearch
}) => {
    const navigate = useNavigate();

    const [titleInput, setTitleInput] = useState("");
    const [messageInput, setMessageInput] = useState("");
    const [targetInput, setTargetInput] = useState(targetOptions);
    const [frequencyInput, setFrequencyInput] = useState('');
    const [dateInput, setDateInput] = useState('');
    const [timeInput, setTimeInput] = useState('');
    const [bannerInput, setBannerInput] = useState('');
    const [bannerImagePreview, setBannerImagePreview] = useState('');
    // const [inputIconImage, setInputIconImage] = useState<any>();

    const [targetAnchorEl, setTargetAnchorEl] = useState<null | HTMLElement>(null);
    const openTargetMenu = Boolean(targetAnchorEl);
    const handleClickTarget = (event: React.MouseEvent<HTMLButtonElement>) => {
        setTargetAnchorEl(event.currentTarget);
    };
    const handleCloseTarget = () => {
        setTargetAnchorEl(null);
    };

    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0]; 
        setBannerInput(file);

        const base64 = await convertToBase64(file);
        // console.log(base64.result);
        setBannerImagePreview(base64.result);
    
        e.target.value = "";
    }

    const handleSubmitSchedule = () => {
        if (!bannerInput) {
            return "Please uplaod banner image";
        }

    }
    

    
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
                <BackNavigationArrowBtn />

                <Box>
                    <Typography
                        sx={{
                            fontWeight: "600",
                            fontSize: "24px",
                            color: kolors.dark
                        }}
                    >Push notifications</Typography>
                </Box>

                <NotificationComponent />
            </Stack>

            <Box mt={5}>
                <Box sx={{ width: "600px", mx: "auto" }} >
                    <Box mb={2}>
                        <Typography
                            sx={{
                                fontWeight: "700",
                                fontSize: "16px",
                                color: "#595757"
                            }}
                        >Target</Typography>


                        <Button
                            disableElevation
                            // endIcon={<ArrowDropDownIcon />}

                            aria-controls={openTargetMenu ? 'target-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openTargetMenu ? 'true' : undefined}
                            onClick={handleClickTarget}
                            id="target-button"
                            size='small'
                            fullWidth
                            sx={{
                                border: `1px solid ${kolors.border}`,
                                justifyContent: "space-between",
                                px: 1,
                                textTransform: "none",
                            }}
                        >
                            <Typography noWrap
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "14px",
                                    color: "#595757"
                                }}
                            >
                                { targetInput.includes("All") ? "All" : targetInput.toString() } 
                            </Typography>

                            <IconButton size='small' component="div">
                                <ArrowDropDownIcon />
                            </IconButton>
                        </Button>

                        <Menu
                            id="target-menu"
                            anchorEl={targetAnchorEl}
                            open={openTargetMenu}
                            onClose={handleCloseTarget}
                            MenuListProps={{
                                'aria-labelledby': 'target-button',
                            }}
                        >
                            {
                                targetOptions.map((option, index) => (
                                    <MenuItem key={index}
                                        onClick={() => {
                                            // handleCloseTarget();

                                            if (option == "All") {
                                                if (targetInput.includes(option)) {
                                                    setTargetInput([]);                                                    
                                                } else {
                                                    setTargetInput(targetOptions);
                                                }
                                            } else {
                                                setTargetInput((prevArray) => {
                                                    // Check if the string exists in the array
                                                    if (prevArray.includes(option)) {
                                                        // Remove the string if it exists
                                                        return prevArray.filter((item) => item !== option && item != "All");
                                                    } else {
                                                        // Add the string if it doesn't exist
                                                        return [...prevArray, option];
                                                    }
                                                });
                                            }
                                        }}
                                        sx={{ 
                                            color: targetInput.includes(option) ? kolors.primary : "initial",
                                            justifyContent: "space-between",
                                        }}
                                    >{ option } 
                                        <Checkbox 
                                            checked={ targetInput.includes(option) ? true : false}
                                            sx={{
                                                color: "#D9D9D9",
                                                '&.Mui-checked': {
                                                    color: kolors.primary,
                                                },
                                            }}
                                        />
                                    </MenuItem>
                                ))
                            }
                        </Menu>
                    </Box>

                    <Box mb={2}>
                        <Typography
                            sx={{
                                fontWeight: "700",
                                fontSize: "16px",
                                color: "#595757"
                            }}
                        >Title</Typography>
                        
                        <TextField variant="outlined" 
                            fullWidth
                            type='text'
                            placeholder=''
                            size='small'
                            sx={{
                                // ...authMuiTextFieldStyle
                            }}

                            value={titleInput}
                            onChange={(e) => {
                                const value = e.target.value;
                                // console.log(value);
                                setTitleInput(value);
                            }}
                        />
                    </Box>

                    <Box mb={2}>
                        <Typography
                            sx={{
                                fontWeight: "700",
                                fontSize: "16px",
                                color: "#595757"
                            }}
                        >Message</Typography>
                        
                        <TextField variant="outlined" 
                            fullWidth
                            type='text'
                            placeholder=''
                            size='small'
                            multiline
                            rows={4}
                            sx={{
                                // ...authMuiTextFieldStyle
                            }}

                            value={messageInput}
                            onChange={(e) => {
                                const value = e.target.value;
                                // console.log(value);
                                setMessageInput(value);
                            }}
                        />
                    </Box>

                    <Box mb={2}>
                        <Stack direction="row" gap="15px"
                            alignItems="center" justifyContent="space-between"
                        >
                            <Select
                                // id="frequency-select"
                                value={frequencyInput || '0'}
                                onChange={(selectedValue) => {
                                    const value = selectedValue.target.value
                                    
                                    setFrequencyInput(value);
                                }}
                                // size='small'

                                sx={{
                                    color: kolors.dark,
                                    borderRadius: "8px",
                                    // bgcolor: "#fff",
                                    // border: "none",
                                    borderColor: kolors.border,
                                    textAlign: "start",
                                    // my: 2,
                                    // p: "1px",

                                    // '& .MuiSelect-select': {
                                    //     paddingRight: "0px",
                                    //     paddingLeft: "10px",
                                    //     paddingTop: "1px",
                                    //     paddingBottom: "1px",
                                    // },
                                    
                                    '.MuiOutlinedInput-notchedOutline': {
                                        borderColor: kolors.border,
                                        // border: "none",
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: kolors.border, // 'rgba(228, 219, 233, 0.25)',
                                        // border: "none",
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'var(--TextField-brandBorderHoverColor)',
                                        // border: "none",
                                    },
                                    '.MuiSvgIcon-root ': {
                                        fill: kolors.dark,
                                    }
                                }}
                            >
                                <MenuItem value={'0'} disabled>Frequency</MenuItem>

                                {
                                    frequencyOptions.map((option, index) => (
                                        <MenuItem key={index}
                                            value={option.value}
                                        >
                                            { option.displayText }
                                        </MenuItem>
                                    ))
                                }
                            </Select>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker', 'DatePicker']}>
                                    <DatePicker
                                        label="Date"
                                        value={dayjs(dateInput || undefined)}
                                        onChange={(newValue) => {
                                            const value = dayjs(newValue).format('YYYY/MM/DD');
                                            setDateInput(value)
                                        }}
                                        minDate={dayjs()}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker', 'TimePicker']}>
                                    <TimePicker
                                        label="Time"
                                        value={dayjs(timeInput || undefined)}
                                        onChange={(newValue) => {
                                            const value = dayjs(newValue).format("YYYY-MM-DD HH:mm:ss");
                                            // console.log(value);
                                            setTimeInput(value)
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Stack>
                    </Box>

                    <Box mb={2}>
                        <Typography
                            sx={{
                                fontWeight: "700",
                                fontSize: "16px",
                                color: "#595757",
                                textAlign: "center",
                                mb: 1,
                            }}
                        >Banner</Typography>

                        <Box
                            onClick={() => {
                                document.getElementById("bannerImage")?.click();
                            }}  
                            sx={{
                                width: "170px",
                                height: "170px",
                                border: `1px solid ${kolors.border}`,
                                borderRadius: "12px",
                                bgcolor: kolors.bg,
                                overflow: "hidden",

                                margin: "auto",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                            }}
                        >
                            {
                                bannerImagePreview ? 
                                    <img 
                                        src={bannerImagePreview}
                                        alt='upload image preview'
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                        }}
                                    />
                                :
                                    <img 
                                        src={brokenImage}
                                        alt='upload image'
                                        style={{
                                            width: "128px",
                                            height: "104px",
                                            objectFit: "contain",
                                        }}
                                    />
                            }
                        </Box>
                    </Box>

                    <Box my={4}>
                        <Stack direction='row' gap='20px' alignItems="center" justifyContent="center">
                            <Button variant="contained" size='small'
                                type="button"
                                onClick={() => navigate(-1)}
                                
                                sx={{
                                    ...themeBtnStyle,

                                    bgcolor: kolors.secondary,
                                    color: kolors.primary,

                                    "&:hover": {
                                        bgcolor: kolors.secondary,
                                        color: kolors.primary
                                    },
                                    "&:active": {
                                        bgcolor: kolors.primary,
                                        color: "#fff"
                                    },
                                    "&:focus": {
                                        bgcolor: kolors.secondary,
                                        color: kolors.primary
                                    },

                                    fontSize: "15px",
                                    fontWeight: "400",
                                    // lineHeight: 14.52px;
                                }}
                            > Back </Button>

                            <Button variant="contained" size='small'
                                type="button"
                                onClick={() => handleSubmitSchedule()}
                                
                                sx={{
                                    ...themeBtnStyle,
                                    fontSize: "15px",
                                    fontWeight: "400",
                                    // lineHeight: 14.52px;
                                }}
                            > Schedule </Button>
                        </Stack>
                    </Box>

                </Box>
            </Box>

                    
            <input 
                type="file" 
                id='bannerImage' 
                name="bannerImage" 
                accept='image/*' 
                onChange={handleFileUpload}
                style={{display: "none"}}
            />
        </Box>
    )
}

export default PushNotificationAddEditPage;


