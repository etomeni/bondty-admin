export type locationInterface = {
    ip: string,
    usedIps: string[],
    city: string,
    region: string,
    country: string,
    isp: string,
    lat: number,
    lon: number,
};

// export type authUserInterface = {
//     id: string,
//     first_name: string,
//     last_name: string,
//     tier: string,
//     UserTraits: {
//         date_of_birth: string,
//         gender: string,
//         verified: boolean,
//     },
// };


export type userInterface = {
    id: string;
    role_id: string,
    
    email: string;
    first_name: string;
    last_name: string;
    email_verified: boolean,
    is_suspended: boolean,
    idempotency_key: string;
    
    last_login: string,
    created_at: string;
    updated_at: string;
};



export type usersListInterface = {
    id: string;
    first_name: string;
    tier: string;
    userTrait: {
        date_of_birth: string;
        gender: any,
        verified: boolean
    },
    userLocation: {
        id: string;
        city: string;
        state: string;
    }
}

export type userReceivedStickersInterface = {
    id: string;
    created_at: string;
    updated_at: string;
    sender_id: string;
    receiver_id: string;
    sticker_id: string,
    quantity: number,
    status: string;
    sticker: {
        name: string;
        url: string;
        price: number
    }
}

export type userReceivedGiftsInterface = {
    id: string;
    product: {
        id: string;
        name: string;
    }
}


export type usersDetailsInterface = {
    email: string;
    first_name: string;
    tier: string;
    last_login: string;
    userTrait: {
        date_of_birth: string;
        gender: string,
        verified: boolean,
        hobbies: string[],
        joining_purpose: string[]
    },
    userProfile: {
        bio: string,
        last_active_at: string
    },
    profilePhoto: {
        url: string;
    },
    userPreference: {
        ideal_partner_qualities: [
            "Ambition",
            "Loyalty"
        ]
    },
    userLocation: {
        latitude: number,
        longitude: number,
        city: string;
        state: string;
        country: string;
    },
    receivedStickers: userReceivedStickersInterface[],
    receivedGifts: userReceivedGiftsInterface[],
    userDyt: {
        id: string;
        balance: number
    },
    userWallet: {
        id: string;
        balance: number
    }
}


export type userTravelLocationInterface = {
    id: string;
    created_at: string;
    updated_at: string;
    user_id: string;
    latitude: boolean;
    longitude: boolean;
    city: string;
    state: string;
    country: string;
    is_current: false,
    is_travel_mode: boolean
}
