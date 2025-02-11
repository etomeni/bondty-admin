export interface ApiResponse {
    statusCode: number
    message: string
    data: Order[]
  }
  
  export interface Order {
    id: string
    created_at: string
    updated_at: string
    sender_id: string
    order_id: string
    recipient_id: string
    shipping_address_id: string
    product_id: string
    quantity: number
    is_purchased: boolean
    price: string
    total_price: string
    recipient_action_status: string
    message: string
    accepted_at: string | null
    rejected_at: string | null
    sender: User
    recipient: User
    shipping_address: ShippingAddress
    product: Product
    order: OrderDetails
  }
  
  export interface User {
    id: string
    first_name: string
    tier: string
    userTrait: Record<string, unknown>
    userLocation: UserLocation
  }
  
  export interface UserLocation {
    id: string
    city: string
    state: string
  }
  
  export interface ShippingAddress {
    id: string
    city: string
    state: string
    country: string
  }
  
  export interface Product {
    id: string
    name: string
    description: string
    store_id: string | null
    category_id: string
    features: string[]
    colors: string[]
    sizes: string[]
    price: string
    in_stock: boolean
    stock: number
    product_photos: ProductPhoto[]
    category: Category
  }
  
  export interface ProductPhoto {
    id: string
    url: string
    is_current: boolean
  }
  
  export interface Category {
    id: string
    is_current: string
  }
  
  export interface OrderDetails {
    id: string
    payment_status: string
  }
  
  