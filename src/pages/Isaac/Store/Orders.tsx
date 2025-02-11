"use client"

import type React from "react"
import { useState, useEffect } from "react"
import MerchantOrder from "./Order-components/Merchant-order"
import BondytOrder from "./Order-components/Bondyt-order"
import { fetchOrders, type Order } from "./api/orderApi"
import LoadingModal from "../LoadingModal"

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [orderType, setOrderType] = useState<"merchant" | "bondyt" | null>(null)
  const [orderTypeFilter, setOrderTypeFilter] = useState<"all" | "admin" | "merchant">("all")
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const fetchedOrders = await fetchOrders(orderTypeFilter)
        setOrders(fetchedOrders)
      } catch (err) {
        setError("Failed to fetch orders. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    loadOrders()
  }, [orderTypeFilter])

  const filteredOrders = orders.filter((order) => {
    if (orderTypeFilter === "all") return true
    if (orderTypeFilter === "admin") return !order.product.store_id // Assuming bondyt orders don't have a store_id
    if (orderTypeFilter === "merchant") return !!order.product.store_id
    return true
  })

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order)
    setOrderType(order.product.store_id ? "merchant" : "bondyt")
  }

  const handleBack = () => {
    setSelectedOrder(null)
    setOrderType(null)
  }

  const handleFilterChange = (newFilter: "all" | "admin" | "merchant") => {
    setOrderTypeFilter(newFilter)
    setIsFilterModalOpen(false)
  }

  if (isLoading) {
    return <LoadingModal />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (selectedOrder && orderType === "merchant") {
    return <MerchantOrder order={selectedOrder} onBack={handleBack} />
  }

  if (selectedOrder && orderType === "bondyt") {
    return <BondytOrder order={selectedOrder} onBack={handleBack} />
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden component-border relative">
      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end pt-16 px-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-64 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg text-gray-800">Filter Orders</h3>
                <button onClick={() => setIsFilterModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  ✕
                </button>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <button
                onClick={() => handleFilterChange("all")}
                className={`w-full py-2 px-4 rounded-full text-center transition-colors ${
                  orderTypeFilter === "all" ? "bg-purple-100 text-purple-700" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleFilterChange("admin")}
                className={`w-full py-2 px-4 rounded-full text-center transition-colors ${
                  orderTypeFilter === "admin" ? "bg-purple-500 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Bondyt orders
              </button>
              <button
                onClick={() => handleFilterChange("merchant")}
                className={`w-full py-2 px-4 rounded-full text-center transition-colors ${
                  orderTypeFilter === "merchant" ? "bg-purple-100 text-purple-700" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Merchant orders
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 p-4 bg-gray-200 border-b border-gray-200">
        <div className="text-sm font-semibold text-gray-500">Product details</div>
        <div className="text-sm font-semibold text-gray-500">Sender/Note</div>
        <div className="text-sm font-semibold text-gray-500">Receiver's Address</div>
        <div className="text-sm font-semibold text-gray-500 flex justify-between items-center">
          Status
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="p-1 hover:bg-gray-300 rounded transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="grid grid-cols-4 gap-4 p-6">
              <div className="flex gap-4">
                <div className="w-32 space-y-2">
                  <img
                    src={order.product.product_photos[0]?.url || "/placeholder.svg"}
                    alt={`${order.product.name} main`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <div className="grid grid-cols-3 gap-1">
                    {order.product.product_photos.slice(1, 4).map((photo, i) => (
                      <img
                        key={i}
                        src={photo.url || "/placeholder.svg"}
                        alt={`${order.product.name} view ${i + 2}`}
                        className="w-full h-8 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {order?.product?.name || "Product Name Not Available"}
                  </h3>
                  <p className="text-gray-500">{order?.product?.description || "No description available"}</p>
                  <span className="inline-block mt-2 px-4 py-2 bg-purple-200 text-[#6C38FF] rounded-lg text-xs font-medium">
                    {order?.order?.payment_status || "N/A"}
                  </span>
                  <p className="mt-2 font-bold text-xl text-gray-900">
                    ${order?.total_price ? Number.parseFloat(order.total_price).toLocaleString() : "0.00"}
                  </p>
                </div>
              </div>

              <div>
                <button className="px-6 py-2 bg-[#6C38FF] text-white rounded-md text-md font-medium hover:bg-[#6C38FF] transition-colors">
                  {order.sender.first_name}
                </button>
                <p className="mt-2 text-sm text-gray-600 border border-gray-200 rounded-lg p-3">{order.message}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 border border-gray-200 rounded-lg mb-2">
                  {`${order?.shipping_address?.city || "N/A"}, ${order?.shipping_address?.state || "N/A"}, ${
                    order?.shipping_address?.country || "N/A"
                  }`}
                </p>

                <button className="px-6 py-2 bg-purple-200 text-[#6C38FF] rounded-md text-md font-medium ">
                  {order.recipient.first_name}
                </button>
              </div>

              <div className="flex items-start justify-end">
                <button
                  onClick={() => handleOrderClick(order)}
                  className="px-8 py-3 bg-[#6C38FF] hover:bg-[#6C38FF] text-white rounded-md text-lg font-medium transition-colors"
                >
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">
            {orderTypeFilter === "admin"
              ? "No Bondyt orders found."
              : orderTypeFilter === "merchant"
                ? "No Merchant orders found."
                : "No orders found."}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders

