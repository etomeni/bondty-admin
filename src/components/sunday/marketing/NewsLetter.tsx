// import { useEffect, useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Box from '@mui/material/Box';
import kolors from '@/constants/kolors';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import CircularProgress from '@mui/material/CircularProgress';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { newsletterMuiTextFieldStyle } from '@/util/mui';
import { useNewsletterHook } from '@/hooks/marketing/useNewsletterHook';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TuneIcon from '@mui/icons-material/Tune';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';



const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, false] }],
        [{ font: [] }], // fonts
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ script: "sub" }, { script: "super" }],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        // ["link", "image", "video"],
        ["link", "image"],
        // ["undo", "redo"],
    ],
}


interface _Props {
    // performSearch: (searchword: string) => void
};

const NewsLetterComponent: React.FC<_Props> = ({
    // performSearch
}) => {
    const [filterValue, setFilterValue] = useState("All");

    const {
        apiResponse, // setApiResponse,

        reactQuillValue, setReactQuillValue,

        errors,
        isValid,
        isSubmittingForm,
        // sendNewsletterForm,
        onSubmit,
        register,
    } = useNewsletterHook();

    const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
    const openFilterMenu = Boolean(filterAnchorEl);
    const handleClickFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
        setFilterAnchorEl(event.currentTarget);
    };
    const handleCloseFilter = () => {
        setFilterAnchorEl(null);
    };
    
    
    return (
        <Box
            sx={{
                // border: `1px solid ${kolors.border}`,
                // bgcolor: "#fff",
                borderRadius: 2,
                // p: 1.5,
                my: 3
            }}
        >
            <form noValidate onSubmit={ onSubmit } >
                <Box sx={{ mb: 2 }}>
                    <Typography variant='subtitle1'
                        sx={{
                            color: kolors.dark,
                            fontSize: "12px",
                            fontWeight: "500",
                            lineHeight: "11.101px",
                            letterSpacing: "-0.463px",
                            my: 1
                        }}
                    >Newsletter Title</Typography>

                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        placeholder=''
                        // autoFocus
                        defaultValue=""
                        size='small'
                        sx={{
                            ...newsletterMuiTextFieldStyle
                        }}
                        error={ errors.title ? true : false }
                        { ...register('title') }
                    />
                    { errors.title && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.title?.message }</Box> }
                </Box>

                <Box minHeight={{xs: "420px", sm: "400px"}} position="relative">
                    <Box height="350px">
                        <ReactQuill 
                            theme="snow" 
                            value={reactQuillValue} 
                            onChange={setReactQuillValue} 
                            placeholder='Type your message here'
                            className='ReactQuillIputStyle'
                            modules={modules}
                        />
                    </Box>

                    <Stack direction="row" alignItems="center" 
                        spacing={2} 
                        sx={{
                            position: "absolute",
                            bottom: 20,
                            right: 10,
                        }}
                    >
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
                            <MenuItem 
                                onClick={() => {
                                    handleCloseFilter();
                                    setFilterValue("All");
                                }}
                                sx={{ 
                                    color: filterValue == "All" ? kolors.primary : "initial",
                                    justifyContent: "space-between",
                                }}
                            >All 
                                <Checkbox 
                                    checked={filterValue == "All" ? true : false}
                                    sx={{
                                        color: "#D9D9D9",
                                        '&.Mui-checked': {
                                            color: kolors.primary,
                                        },
                                    }}
                                />
                            </MenuItem>

                            <MenuItem 
                                onClick={() => {
                                    handleCloseFilter();
                                    setFilterValue("Premium");
                                }}

                                sx={{ 
                                    color: filterValue == "Premium" ? kolors.primary : "initial",
                                    justifyContent: "space-between",
                                }}
                            >Premium 
                                <Checkbox 
                                    checked={filterValue == "Premium" ? true : false}
                                    sx={{
                                        color: "#D9D9D9",
                                        '&.Mui-checked': {
                                            color: kolors.primary,
                                        },
                                    }}
                                />
                            </MenuItem>

                            <MenuItem 
                                onClick={() => {
                                    handleCloseFilter(); 
                                    setFilterValue("Free users");
                                }}

                                sx={{ 
                                    color: filterValue == "Free users" ? kolors.primary : "initial",
                                    justifyContent: "space-between",
                                }}
                            >Free users
                                <Checkbox 
                                    checked={filterValue == "Free users" ? true : false}
                                    sx={{
                                        color: "#D9D9D9",
                                        '&.Mui-checked': {
                                            color: kolors.primary,
                                        },
                                    }}
                                />
                            </MenuItem>
                        </Menu>

                        

                        <Button variant="contained" 
                            fullWidth type="submit" 
                            disabled={ !isValid || isSubmittingForm } 
                            size='small'
                            sx={{ 
                                bgcolor: "#fff",
                                color: kolors.primary,
                                width: "fit-content",

                                // "&.Mui-disabled": {
                                //     background: "#c4c4c4",
                                //     color: "#797979"
                                // },
                                "&:hover": {
                                    bgcolor: kolors.primary,
                                    color: "#fff",
                                },
                                "&:active": {
                                    bgcolor: kolors.primary,
                                    color: "#fff",
                                },
                                "&:focus": {
                                    bgcolor: kolors.primary,
                                    color: "#fff",
                                },
                                borderRadius: "12px",
                                my: 2, 
                                // py: 1.5
                                textTransform: "none"
                            }}
                        >
                            <SendOutlinedIcon sx={{ fontSize: "16px", pr: "5px" }} />
                            <span style={{ display: isSubmittingForm ? "none" : "initial" }}>Send</span>

                            <CircularProgress size={25} sx={{ display: isSubmittingForm ? "initial" : "none", color: kolors.primary, fontWeight: "bold" }} />
                        </Button>
                    </Stack>
                </Box>

                {/* { errors.message && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.message?.message }</Box> } */}


                {
                    apiResponse.display && (
                        <Stack sx={{ width: '100%', my: 2 }}>
                            <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                        </Stack>
                    )
                }
                
            </form>
        </Box>
    )
}

export default NewsLetterComponent;


