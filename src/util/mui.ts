import { SxProps, Theme } from '@mui/material/styles';
// import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import colors from '@/constants/kolors';


export const auth2MuiTextFieldStyle: SxProps<Theme> = {
    '& label.Mui-focused': {
        color: 'var(--TextField-brandBorderFocusedColor)',
    },
    '& .MuiInputBase-input': { // Target input text
        color: "#fff",
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: 1.5
    },
    '& .MuiInputBase-placeholder': { // Target placeholder text
        color: 'gray',
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: 1.5
    },
    '& .MuiOutlinedInput-root': {
        // bgcolor: darkTheme ? '#1C1B1F' : '#EFEFEF',
        borderRadius: '13.79px',
        borderColor: "#fff",
        // height: '42px',

        '& fieldset': {
            // border: `1px solid ${colors.primary}`,
            borderColor: "#fff",
        },
        '&:hover fieldset': {
            border: `2px solid ${colors.primary}`,
        },
        '&.Mui-focused fieldset': {
            border: `1px solid ${colors.primary}`,
        },
    },



    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
    },
    
    "& input[type=number]": {
        MozAppearance: "textfield",
    },
}

export const releaseTextFieldStyle: SxProps<Theme> = {
    '& label.Mui-focused': {
        color: 'var(--TextField-brandBorderFocusedColor)',
    },
    '& .MuiInputBase-input': { // Target input text
        color: colors.dark,
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: 1.5,
    },
    '& .MuiInputBase-placeholder': { // Target placeholder text
        color: 'gray',
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: 1.5
    },
    '& .MuiOutlinedInput-root': {
        // bgcolor: darkTheme ? '#1C1B1F' : '#EFEFEF',
        borderRadius: '8px',
        // height: '42px',

        '& fieldset': {
            // border: `1px solid ${colors.primary}`,
        },
        '&:hover fieldset': {
            border: `2px solid ${colors.primary}`,
        },
        '&.Mui-focused fieldset': {
            border: `1px solid ${colors.primary}`,
        },
    },



    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
    },
    
    "& input[type=number]": {
        MozAppearance: "textfield",
    },
}


export const authMuiTextFieldStyle: SxProps<Theme> = {
    '& label.Mui-focused': {
        color: 'var(--TextField-brandBorderFocusedColor)',
    },
    '& .MuiInputBase-input': { // Target input text
        color: colors.dark,
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: 1.5
    },
    '& .MuiInputBase-placeholder': { // Target placeholder text
        color: 'gray',
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: 1.5
    },
    '& .MuiOutlinedInput-root': {
        // bgcolor: darkTheme ? '#1C1B1F' : '#EFEFEF',
        borderRadius: '13.79px',
        // height: '42px',

        '& fieldset': {
            // border: `1px solid ${colors.primary}`,
        },
        '&:hover fieldset': {
            border: `2px solid ${colors.primary}`,
        },
        '&.Mui-focused fieldset': {
            border: `1px solid ${colors.primary}`,
        },
    },



    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
    },
    
    "& input[type=number]": {
        MozAppearance: "textfield",
    },
}


export const contactMuiTextFieldStyle: SxProps<Theme> = {
    '& label.Mui-focused': {
        // color: 'var(--TextField-brandBorderFocusedColor)',
    },
    '& .MuiInputBase-input': { // Target input text
        color: colors.dark,
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: 1.5,
        // bgcolor: {xs: "#2E2E2E", md: "#F1F1D6"},
        bgcolor: "#F1F1D6",
        borderRadius: '12px',
        // padding: "15px",
    },

    '& .MuiInputBase-placeholder': { // Target placeholder text
        color: 'gray',
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: 1.5
    },
    '& .MuiOutlinedInput-root': {
        // bgcolor: darkTheme ? '#1C1B1F' : '#EFEFEF',
        borderRadius: '12px',
        // height: '42px',
        border: 0,
        // padding: "15px",
        '&.MuiInputBase-multiline': {
            padding: "0",
            '& .MuiInputBase-input': {
                padding: "15px",
            }
        },


        '& fieldset': {
            // border: '1px solid #b9c1cd',
            border: 0,
        },
        '&:hover fieldset': {
            // border: '1px solid #434e5e',
            border: 0,
        },
        '&.Mui-focused fieldset': {
            // border: '1px solid #434e5e',
            border: 0,
        },
    },

    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
    },
    
    "& input[type=number]": {
        MozAppearance: "textfield",
    },
}


export const newsletterMuiTextFieldStyle: SxProps<Theme> = {
    '& label.Mui-focused': {
        color: 'var(--TextField-brandBorderFocusedColor)',
    },
    '& .MuiInputBase-input': { // Target input text
        color: colors.dark,
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: 1.5
    },
    '& .MuiInputBase-placeholder': { // Target placeholder text
        color: 'gray',
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: 1.5
    },
    '& .MuiOutlinedInput-root': {
        // bgcolor: darkTheme ? '#1C1B1F' : '#EFEFEF',
        // borderRadius: '13.79px',
        // height: '42px',

        '& fieldset': {
            // border: `1px solid ${colors.primary}`,
        },
        '&:hover fieldset': {
            border: `2px solid ${colors.primary}`,
        },
        '&.Mui-focused fieldset': {
            border: `1px solid ${colors.primary}`,
        },
    },



    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
    },
    
    "& input[type=number]": {
        MozAppearance: "textfield",
    },
}


export const disableNumbericIconStyle: SxProps<Theme> = { 
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
    },
    
    "& input[type=number]": {
        MozAppearance: "textfield",
    },
}

export const themeBtnStyle: SxProps<Theme> = { 
    bgcolor: colors.primary,
    borderRadius: 1.5,
    textTransform: "none",
    color: "#fff",

    // p: "16px 25px",
    // // width: "fit-content",
    // height: "auto",

    "&.Mui-disabled": {
        background: "#9c9c9c",
        color: "#797979"
    },
    "&:hover": {
        bgcolor: colors.tertiary,
        color: "#fff"
    },
    "&:active": {
        bgcolor: colors.primary,
        color: "#fff"
    },
    "&:focus": {
        bgcolor: colors.primary,
        color: "#fff"
    },

}

export const MuiSelectFieldStyle = (darkTheme: boolean = true) =>{

    return (
        {
            color: darkTheme ?  "#fff" : "#000",
            borderRadius: "16px",
            // bgcolor: darkTheme ? "#fff" : "#272727",

            '.MuiOutlinedInput-notchedOutline': {
                borderColor: darkTheme ? '#fff' : "#b9c1cd",
                borderWidth: 1
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#434e5e', // 'rgba(228, 219, 233, 0.25)',
                borderWidth: 1
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#434e5e', // 'var(--TextField-brandBorderHoverColor)', // 'rgba(228, 219, 233, 0.25)',
                borderWidth: 1
            },
            '.MuiSvgIcon-root ': {
                fill: darkTheme ? "#fff" : "#797979",
            }
        }
    )
}

export const numberOfLinesTypographyStyle = (num: number) => {
    const style: SxProps<Theme> = { 
        display: '-webkit-box',
        overflow: 'hidden',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: num,
    }

    return style;
}


export const contentWidth: SxProps<Theme> = {
    width: {xs: "calc(100% - 40px)", sm: "calc(100% - 100px)", md: "calc(100% - 140px)" },
    maxWidth: "1300px",
    mx: "auto",
}

