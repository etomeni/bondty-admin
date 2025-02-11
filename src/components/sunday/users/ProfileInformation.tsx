import React, { useState } from 'react';
// import { useState } from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import kolors from '@/constants/kolors';
import Typography from '@mui/material/Typography';
// import { numberOfLinesTypographyStyle } from '@/util/mui';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
// import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';



interface _Props {
    bio?: string;
    aboutMeData?: string[];
    lookingForData?: string[];
    interestedInData?: string[];
    editable?: boolean;
    saveBtn?: (data: any) => void
};

const aboutMeTemptData = [
    "182 cm📏", "I am sobar🍺", "Christian🙏🏽", "No, i don't smoke💨",
    "Woman👩", "AA🧬", "Open to kids👶", "Don't have kids👶"
];
const lookingForTemptData = [
    "Long term relationship", "Ambition", "Kindness", "Loyalty",
];
const interestedInTemptData = [
    "Dancing", "Horror movies", "Concerts", "wine",
];

const bioTemptData = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit, amet, delectus totam ratione nisi quia fugiat id harum consequuntur, cupiditate quos voluptates magnam ipsam non? Provident culpa ad libero unde.";

const ProfileInformationComponent: React.FC<_Props> = ({
    bio = bioTemptData, 
    aboutMeData = aboutMeTemptData,
    lookingForData = lookingForTemptData,
    interestedInData = interestedInTemptData,
    editable = false, saveBtn
}) => {
    // const navigate = useNavigate();
    const [aboutMe, setAboutMe] = useState(aboutMeData);
    const [lookingFor, setLookingFor] = useState(lookingForData);
    const [interestedIn, setInterestedIn] = useState(interestedInData);


    const handleDelete = (
        infoType: "aboutMe" | "lookingFor" | "interestedIn", 
        value: string, _index: number 
    ) => {
        // console.info('You clicked the delete icon.');
        if (infoType == "aboutMe") {
            // const newAboutMe: string[] = []; // aboutMe
            // let removed = aboutMe.splice(index, 1);
            const newAboutMe = aboutMe.filter((val) => val != value );

            setAboutMe(newAboutMe);
        } else if (infoType == "lookingFor") {
            // const newLookingFor: string[] = []; // lookingFor
            const newLookingFor = lookingFor.filter((val) => val != value );

            setLookingFor(newLookingFor);
        } else if (infoType == 'interestedIn') {
            // const newInterestedIn: string[] = []; // interestedIn
            const newInterestedIn = interestedIn.filter((val) => val != value );

            setInterestedIn(newInterestedIn);
        }
    };

    const handleSave = () => {
        if (saveBtn) {
            saveBtn({
                bio: bio, 
                aboutMeData: aboutMe,
                lookingForData: lookingFor,
                interestedInData: interestedIn,
            });
        }
    }

    const handleAddNewFunc = (
        infoType: "aboutMe" | "lookingFor" | "interestedIn", 
        value: string
    ) => {
        if (infoType == "aboutMe") {
            setAboutMe([ ...aboutMe, value ]);
        } else if (infoType == "lookingFor") {
            setLookingFor([ ...lookingFor, value ]);
        } else if (infoType == 'interestedIn') {
            setInterestedIn([ ...interestedIn, value ]);
        }
    };


    return (
        <Box 
            sx={{
                p: 2,
                // alignSelf: "stretch",
            }}
        >
            <Box>
                <Stack direction="row" spacing="10px" 
                    alignItems="center" justifyContent="space-between"
                >
                    <Typography
                        sx={{
                            fontWeight: "600",
                            fontSize: "13px",
                            color: kolors.border,
                        }}
                    >Profile information</Typography>

                    <Typography
                        onClick={() => handleSave()}
                        sx={{
                            fontWeight: "600",
                            fontSize: "13px",
                            color: kolors.primary,
                            cursor: "pointer"
                        }}
                    >Save</Typography>

                </Stack>

                <Typography mt={1}
                    sx={{
                        // ...numberOfLinesTypographyStyle(5),
                        fontWeight: "400",
                        fontSize: "16px",
                        color: kolors.dark,
                    }}
                >{ bio }</Typography>
            </Box>

            <Box mt={3}>
                <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: "13px",
                        color: kolors.border,
                    }}
                >About me</Typography>

                <Stack direction="row" mt={1} gap="10px" 
                    alignItems="center" flexWrap="wrap"
                >
                    {
                        aboutMe.map((value, index) => (
                            <Chip key={index}
                                label={value}
                                size='small'
                                sx={{ bgcolor: kolors.secondary }}

                                onDelete={
                                    editable ? 
                                    () => handleDelete("aboutMe", value, index) 
                                    : undefined
                                }

                            />
                        ))
                    }

                    {
                        editable &&
                        <AddNewInfoComponent 
                            infoType='aboutMe'
                            handleNewValue={(val, infoType) => handleAddNewFunc(infoType, val)} 
                        />
                    }
                </Stack>
            </Box>

            <Box mt={3}>
                <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: "13px",
                        color: kolors.border,
                    }}
                >I'm looking for</Typography>

                <Stack direction="row" mt={1} gap="10px" 
                    alignItems="center" flexWrap="wrap"
                >
                    {
                        lookingFor.map((value, index) => (
                            <Chip key={index}
                                label={value}
                                size='small'
                                sx={{ bgcolor: kolors.secondary }}

                                onDelete={
                                    editable ? 
                                    () => handleDelete("lookingFor", value, index) 
                                    : undefined
                                }
                            />
                        ))
                    }

                    {
                        editable && 
                        <AddNewInfoComponent 
                            infoType='lookingFor' 
                            handleNewValue={(val, infoType) => handleAddNewFunc(infoType, val)} 
                        />
                    }
                </Stack>
            </Box>

            <Box mt={3}>
                <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: "13px",
                        color: kolors.border,
                    }}
                >I'm lnterested in</Typography>

                <Stack direction="row" mt={1} gap="10px" 
                    alignItems="center" flexWrap="wrap"
                >
                    {
                        interestedIn.map((value, index) => (
                            <Chip key={index}
                                label={value}
                                size='small'
                                sx={{ bgcolor: kolors.secondary }}

                                onDelete={
                                    editable ? 
                                    () => handleDelete("interestedIn", value, index) 
                                    : undefined
                                }
                            />
                        ))
                    }

                    {
                        editable && 
                        <AddNewInfoComponent 
                            infoType='interestedIn' 
                            handleNewValue={(val, infoType) => handleAddNewFunc(infoType, val)} 
                        />

                        // <Chip label="Add +" size='small'
                        //     clickable
                        //     onClick={() => {}}
                        //     sx={{ 
                        //         bgcolor: kolors.primary, 
                        //         color: "#fff", 
                        //         ":hover": { bgcolor: kolors.tertiary } 
                        //     }}
                        // />
                    }

                </Stack>
            </Box>
               
        </Box>
    );
}

export default ProfileInformationComponent;



interface AddNewInfo_Props {
    infoType: "aboutMe" | "lookingFor" | "interestedIn", 
    handleNewValue: (value: string, infoType: "aboutMe" | "lookingFor" | "interestedIn", ) => void
};

const AddNewInfoComponent: React.FC<AddNewInfo_Props> = ({
    infoType, handleNewValue
}) => {
    const [open, setOpen] = useState(false);
    const [newValue, setNewValue] = useState('');

    const handleTooltipClose = () => {
        setOpen(false);
    };
    const handleTooltipOpen = () => {
        setOpen(true);
    };

    const handleSubmit = () => {
        if (newValue) handleNewValue(newValue, infoType);
        
        handleTooltipClose();
        setNewValue('');
    }
    
    return (
        <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
                <Tooltip
                    onClose={handleTooltipClose}
                    open={open}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title={
                        <Box bgcolor="#fff">
                            <form noValidate 
                                onSubmit={(e) => {
                                    e.preventDefault(); // Prevent default form submission behavior
                                    handleSubmit()
                                }}
                            >
                                <TextField 
                                    type='text'
                                    placeholder=''
                                    inputMode='text'

                                    value={newValue}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        // console.log(value);
                                        setNewValue(value);
                                    }}
                                
                                    size='small'
                                />
                            </form>
                        </Box>
                    }
                    slotProps={{
                        popper: {
                            disablePortal: true,
                        },
                        tooltip: {
                            sx: {
                                // backgroundColor: "#fff",
                                bgcolor: kolors.bg,
                                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                '& .MuiTooltip-arrow': {
                                    color: '#c4c4c4',
                                },
                            },
                        },
                    }}

                    // componentsProps={{
                    //     tooltip: {
                    //       sx: {
                    //         bgcolor: kolors.bg,
                    //         boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    //         '& .MuiTooltip-arrow': {
                    //           color: '#c4c4c4',
                    //         },
                    //       },
                    //     },
                    // }}
                >
                    <Chip label="Add +" size='small'
                        clickable
                        onClick={() => handleTooltipOpen()}
                        sx={{ 
                            bgcolor: kolors.primary, 
                            color: "#fff", 
                            ":hover": { bgcolor: kolors.tertiary } 
                        }}
                    />
                </Tooltip>
            </div>
        </ClickAwayListener>
    )
}
