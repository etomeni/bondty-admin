import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Typography from '@mui/material/Typography';


export interface menuItemsInterface {
    label: string | JSX.Element;
    active: boolean;
};


interface _Props {
    menuItems: menuItemsInterface[],
    action: (data: menuItemsInterface) => void;

    // value: number, 
    // setValue: (data: number) => void
};

const CustomBgTab: React.FC<_Props> = ({
    menuItems, action, // value, setValue
}) => {


    return (
        <Box>
            <Stack direction="row" spacing="5px" alignItems="center"
                sx={{
                    border: `1px solid ${kolors.secondary}`,
                    borderRadius: "8px",
                    bgcolor: kolors.secondary,
                    p: 0, m: 0,
                }}
            >
                {
                    menuItems.map((item, index) => (
                        <Box key={index}
                            onClick={() => action(item)}
                            sx={{
                                borderRadius: "8px",
                                bgcolor: item.active ? kolors.primary : "none",
                                px: 2, py: 1,
                                flexGrow: 1,
                                m: 0,
                                cursor: "pointer"
                            }}
                        >
                            <Typography 
                                sx={{
                                    color: "#fff",
                                    fontWeight: "600",
                                    fontSize: "13px",
                                    // lineHeight: "15.73px",
                                    textAlign: "center",
                                    p: 0, m: 0,
                                    // bgcolor: "red",
                                    width: "100%",

                                }}
                            >{ item.label }</Typography>
                        </Box>
                    ))
                }
            </Stack>
        </Box>
    );
}

export default CustomBgTab;