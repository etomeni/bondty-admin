import apiClient from "../../../utils/apiClient"
import type { ApiResponse } from "./types"

export type FilterCategory = "all" | "admin" | "merchant"

export async function fetchPendingOrders(category: FilterCategory = "all"): Promise<ApiResponse> {
  try {
    const response = await apiClient.get("admin/product/order/pending", {
      params: { category },
    })
    return response.data as ApiResponse
  } catch (error) {
    console.error("Error fetching pending orders:", error)
    throw error
  }
}

