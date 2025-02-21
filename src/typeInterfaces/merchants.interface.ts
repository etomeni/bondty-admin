export type pendingMerchantInterface = {
    id: string,
    firstName: string,
    lastName: string,
    role: string,
    phoneNumber: string,
    identification: string,
    services: string[],
    email: string,
    organizationEmail: string,
    emailVerified: boolean,
    is_approved: boolean,
    idempotencyKey: string,
    language: string,
    resetCode: string,
    resetCodeExpire: string,
    is_deleted: boolean,
    is_suspended: boolean,
    lastLogin: string,
    createdAt: string,
    updatedAt: string,
    owner_id: any
}


export type merchantDetailsInterface = {
    id: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string,
    phoneNumber: string,
    identification: string,
    services: string[],
    email: string,
    organizationEmail: string,
    emailVerified: boolean,
    is_approved: boolean,
    idempotencyKey: string,
    language: string,
    resetCode: string,
    resetCodeExpire: string,
    is_deleted: boolean,
    is_suspended: boolean,
    lastLogin: string,
    createdAt: string,
    updatedAt: string,
    owner_id: any
}


export type securityDetailsInterface = {
    id: string,
    created_at: string,
    updated_at: string,
    target_id: string,
    target_type: string,
    idempotency_key: string,
    base_price_per_person: string,
    organizationEmail: string,
    organizationName: string,
    organizationLogo: string,
    added_price_per_male: string,
    added_price_per_female: string,
    location: {
        id: string,
        createdAt: string,
        updatedAt: string,
        latitude: number,
        longitude: number,
        city: string,
        state: string,
        country: string,
    },
    about: string,
    currency: string,
    isDeleted: boolean

}


export type securityMerchantFeedbackInterface = {
    id: string,
    created_at: string,
    updated_at: string,
    user_id: string,
    target_id: string,
    target_type: string,
    rating: number,
    feedback: string,
    security: {
        id: string,
        security: {
            id: string,
            organization_name: string,
            location: {
                id: string,
                createdAt: string,
                updatedAt: string,
                latitude: number,
                longitude: number,
                city: string,
                state: string,
                country: string,
            }
        }
    }
}


export type securityMerchantStatsInterface = {
    id: number,
    name: string,
    location: string,
    date: string,
    ticket_prices: {
        regular: number,
        vip: number
    },
    details: string,
    ticket_types: string[],
    banner: string,
    time: string,
    tickets_available: number,
    total_capacity: number,
    created_at: string,
    updated_at: string,
    admin_id: number,
    merchant_id: number,
}


export type securityMerchantJobHandledInterface = {
    id: string,
    full_name: string,
    gender: string,
    jobs_handled: number
}



export type eventMerchantInterface = {
    id: number,
    name: string,
    location: string,
    date: string,
    ticket_prices: {
        regular: number,
        vip: number
    },
    details: string,
    ticket_types: string[],
    banner: string,
    time: string,
    tickets_available: number,
    total_capacity: number,
    created_at: string,
    updated_at: string,
    admin_id: number,
    merchant_id: number,
}




export type bookMerchantInterface = {
    id: string,
    status: string,
    title: string,
    category_id: string,
    target_type: string,
    target_id: string,
    book_url: string,
    cover_url: string,
    author: string,
    created_at: string,
    updated_at: string,
    decline_note: string,
    rating: any,
    price: any
}


export type placeMerchantInterface = {
    id: string,
    name: string,
    rating: number,
    location: {
        id: string,
        state: string,
        country: string,
    },
    placePhotos: [
        {
            id: string,
            image_url: string,
        }
    ]
}


export type activePlaceAnalyticsInterface = {
    data: {
        id: string,
        placeReservations: { 
            id: string, 
            rating?: {
                id: string,
                created_at: string,
                updated_at: string,
                user_id: string,
                target_id: string,
                target_type: string,
                rating: number,
                feedback: string,
            }
        }[]
    },
    totalSales: string,
    totalReservations: number,
    totalFavorites: number
}



export type storeMerchantInterface = {
    id: string,
    name: string,
    description: string,
    store_id: string,
    category_id: string,
    features: string[],
    colors: string[],
    sizes: string[],
    price: string,
    in_stock: boolean,
    stock: number,
    product_photos: {
        id: string,
        url: string,
        is_current: boolean,
    }[],
    category: {
        id: string,
        is_current: string,
    },
    ratings: {
        id: string,
        created_at: string,
        updated_at: string,
        user_id: string,
        target_id: string,
        target_type: string,
        rating: number,
        feedback: string,
    }[]
}

export type completedNdeclinedStoreMerchantInterface = {
    id: string,
    created_at: string,
    updated_at: string,
    sender_id: string,
    order_id: string,
    recipient_id: string,
    shipping_address_id: string,
    product_id: string,
    quantity: number,
    is_purchased: boolean,
    price: string,
    total_price: string,
    recipient_action_status: string,
    message: string,
    accepted_at: null,
    rejected_at: string,
    sender: {
        id: string,
        first_name: string,
        tier: string,
        userTrait: any,
        userLocation: {
            id: string,
            city: string,
            state: string,
        }
    },
    recipient: {
        id: string,
        first_name: string,
        tier: string,
        userTrait: any,
        userLocation: {
            id: string,
            city: string,
            state: string,
        }
    },
    shipping_address: {
        id: string,
        city: string,
        state: string,
        country: string,
    },
    product: {
        id: string,
        name: string,
        description: string,
        store_id: string,
        category_id: string,
        features: string[],
        colors: string[],
        sizes: string[],
        price: string,
        in_stock: boolean,
        stock: number,
        product_photos: {
            id: string,
            url: string,
            is_current: boolean,
        }[],
        category: {
            id: string,
            is_current: string,
        }
    },
    order: {
        id: string,
        payment_status: string,
    }
}

export type pendingStoreMerchantInterface = {
    id: number,
    name: string,
    price: string,
    currency: string,
    url: string,
    created_at: string,
    updated_at: string,
    admin_id: number,
}