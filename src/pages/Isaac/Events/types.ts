export interface Event {
    id: number
    name: string
    location: string
    date: string
    ticket_prices: {
      regular: number
      vip: number
    }
    details: string
    ticket_types: string[]
    banner: string // Changed from File to string
    time: string
    tickets_available: number
    total_capacity: number
    created_at: string
    updated_at: string
    admin_id: number
    merchant_id: number
  }
  
  export function getBannerUrl(banner: string): string {
    return banner.startsWith("http") ? banner : `https://v0.blob.com/${banner}`
  }
  
  