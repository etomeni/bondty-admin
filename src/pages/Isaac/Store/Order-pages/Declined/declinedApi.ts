import apiClient from "../../../utils/apiClient"
import type { ApiResponse } from "./types"

export type FilterCategory = "all" | "admin" | "merchant"

export async function fetchDeclinedOrders(category: FilterCategory = "all"): Promise<ApiResponse> {
  try {
    const response = await apiClient.get("admin/product/order/declined", {
      params: { category },
    })
    return response.data as ApiResponse
  } catch (error) {
    console.error("Error fetching Declined orders:", error)
    throw error
  }
}

