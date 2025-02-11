import React from 'react';
import Box from '@mui/material/Box';
import DeclinedOrdersPlacesList from './PlacesList';


interface _Props {
    // menuItems: {
    //     title: string;
    //     status: boolean;
    //     baseLink: string;
    // }[],
    // value: number, 
    // setValue: (data: number) => void
};

const DeclinedOrdersPlaces: React.FC<_Props> = ({
    // menuItems, value, setValue
}) => {
    // const navigate = useNavigate();


    return (
        <Box>
            <DeclinedOrdersPlacesList />
            {/* <DeclinedOrdersPlacesDetails /> */}
        </Box>
    );
}

export default DeclinedOrdersPlaces;