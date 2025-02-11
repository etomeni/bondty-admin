export type advertiseInterface = {
    id: any;
    action_url: string;
    image_url: string;
    start_date: string;
    end_date: string;
    title: string;
    ad_type: string;
    placement: string;
    section: string[];
    stats: any;
    status: string;
    location: {
        city: string;
        state: string;
        country: string;
    },
    duration: number,
    daily_budget: number;
    declined_note: string;
    description: string;
    created_at: string;
    updated_at: string;
    creator_id: number;
    analytics: {
        id: any;
        name: string;
        price: string;
        currency: string;
        url: string;
        created_at: string;
        updated_at: string;
        admin_id: number
    }
}



export type placesLocationInterface = {
    city: string;
    state: string;
    country: string;
}

export type createNewBannerInterface = {
    action_url: string;
    location: placesLocationInterface[],
    placement: string;
    duration: string;
    banner_image: any;
}

export type createNewInprofileInterface = {
    action_url: string;
    location: placesLocationInterface[],
    title: string;
    description: string;
    duration: string;
    profile_image: any;
}

export type reviewRequestInterface = {
    status: string;
    id: string;
    declined_note: string;
}
