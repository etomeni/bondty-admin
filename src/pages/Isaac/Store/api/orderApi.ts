import apiClient from "../../utils/apiClient"

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

interface User {
  id: string
  first_name: string
  tier: string
  userTrait: Record<string, unknown>
  userLocation: {
    id: string
    city: string
    state: string
  }
}

interface ShippingAddress {
  id: string
  city: string
  state: string
  country: string
}

interface Product {
  id: string
  name: string
  description: string
  store_id: string
  category_id: string
  features: string[]
  colors: string[]
  sizes: string[]
  price: string
  in_stock: boolean
  stock: number
  product_photos: {
    id: string
    url: string
    is_current: boolean
  }[]
  category: {
    id: string
    is_current: string
  }
}

interface OrderDetails {
  id: string
  payment_status: string
}

interface ApiResponse {
  statusCode: number
  message: string
  data: Order[]
}

export async function fetchOrders(category: string): Promise<Order[]> {
  try {
    const response = await apiClient.get<ApiResponse>("admin/product/order", {
      params: { category },
    })

    if (response.data.statusCode === 200) {
      return response.data.data
    } else {
      throw new Error(response.data.message)
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching orders:", error.message)
    } else {
      console.error("An unknown error occurred while fetching orders")
    }
    throw error
  }
}

