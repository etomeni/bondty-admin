import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';


interface _Props {
    performSearch: (searchword: string) => void
};

const SearchwordComponent: React.FC<_Props> = ({
    performSearch
}) => {
    const [searchword, setSearchword] = useState('');
      
    const handleSearch = () => {
        console.log(searchword);
        if (searchword.trim() == '') return;

        performSearch(searchword);
    }

    
    return (
        <Box>
            <form noValidate 
                onSubmit={(e) => {
                    e.preventDefault(); // Prevent default form submission behavior
                    handleSearch()
                }}
                style={{ maxWidth: "549px", width: "100%", alignSelf: "center" }}
            >
                <TextField variant="outlined" 
                    type='search'
                    placeholder='Search'
                    inputMode='search'
                    size='small'
                    sx={{
                        // ...authMuiTextFieldStyle
                    }}

                    value={searchword}
                    onChange={(e) => {
                        const value = e.target.value;
                        // console.log(value);
                        setSearchword(value);
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </form>
        </Box>
    )
}

export default SearchwordComponent;