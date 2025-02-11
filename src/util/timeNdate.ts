export function calculateAge(dateOfBirth: string): number {
    // Parse the date of birth string into a Date object
    const dob = new Date(dateOfBirth);
    
    // Get the current date
    const today = new Date();
    
    // Calculate the difference in years
    let age = today.getFullYear() - dob.getFullYear();
    
    // Adjust if the birthday hasn't occurred yet this year
    const monthDifference = today.getMonth() - dob.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    
    return age;
}

export function timeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    // Define time intervals in seconds
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };

    // Calculate the difference for each interval
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`;
        }
    }

    return "just now";
}
