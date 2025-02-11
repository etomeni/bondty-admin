// Base interfaces for common fields
interface BaseEntity {
    id: string
    created_at?: string
    updated_at?: string
  }
  
  // Location related interfaces
  interface UserLocation {
    id: string
    city: string
    state: string
  }
  
  interface ShippingAddress extends BaseEntity {
    city: string
    state: string
    country: string
  }
  
  // User related interfaces
  interface UserTrait {
    [key: string]: unknown
  }
  
  interface User extends BaseEntity {
    first_name: string
    tier: "free_tier" | string
    userTrait: UserTrait
    userLocation: UserLocation
  }
  
  // Product related interfaces
  interface ProductPhoto {
    id: string
    url: string
    is_current: boolean
  }
  
  interface ProductCategory extends BaseEntity {
    is_current: string
  }
  
  interface Product extends BaseEntity {
    name: string
    description: string
    store_id: string | null // null indicates Bondyt order, string indicates Merchant order
    category_id: string
    features: string[]
    colors: string[]
    sizes: string[]
    price: string
    in_stock: boolean
    stock: number
    product_photos: ProductPhoto[]
    category: ProductCategory
  }
  
  // Order related interfaces
  interface Order extends BaseEntity {
    payment_status: "pending" | "completed" | "failed"
  }
  
  // Main Product Order interface
  interface ProductOrder extends BaseEntity {
    sender_id: string
    order_id: string
    recipient_id: string
    shipping_address_id: string
    product_id: string
    quantity: number
    is_purchased: boolean
    price: string
    total_price: string
    recipient_action_status: "pending" | "accepted" | "rejected"
    message: string | null
    accepted_at: string | null
    rejected_at: string | null
    sender: User
    recipient: User
    shipping_address: ShippingAddress
    product: Product
    order: Order
  }
  
  // API Response interface
  interface ApiResponse {
    statusCode: number
    message: string
    data: ProductOrder[]
  }
  
  // Helper type to determine if order is merchant or bondyt
  type OrderType = "merchant" | "bondyt"
  
  // Helper function to determine order type
  function getOrderType(order: ProductOrder): OrderType {
    return order.product.store_id ? "merchant" : "bondyt"
  }
  
  export type {
    ApiResponse,
    ProductOrder,
    User,
    ShippingAddress,
    Product,
    Order,
    ProductPhoto,
    ProductCategory,
    UserLocation,
    UserTrait,
    OrderType,
  }
  
  export { getOrderType }
  
  