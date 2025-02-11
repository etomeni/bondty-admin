"use client"

import type React from "react"
import { ChevronLeft } from "lucide-react"
import type { Order } from "../types" // Make sure to import the Order type from your types file

interface MerchantOrderProps {
  order: Order | undefined
  onBack: () => void
}

const MerchantOrder: React.FC<MerchantOrderProps> = ({ order, onBack }) => {
  if (!order) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <p>Loading order details...</p>
      </div>
    )
  }

  // Fallback values and null checks
  const recipientActionStatus = order.recipient_action_status || "pending"
  const paymentStatus = order.order?.payment_status || "Unknown"
  const totalPrice = order.total_price ? Number.parseFloat(order.total_price).toLocaleString() : "N/A"
  const productName = order.product?.name || "Unknown Product"
  const productDescription = order.product?.description || "No description available"
  const productPhotos = order.product?.product_photos || []

  return (
    <div className="bg-white min-h-screen">
      <div className="component-border">
        {/* Header */}
        <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="hover:bg-gray-200 p-1 rounded transition-colors duration-200">
              <ChevronLeft className="w-5 h-5 text-gray-900" />
            </button>
            <h1 className="text-lg font-medium text-gray-900">Merchant order</h1>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={recipientActionStatus}
              onChange={() => {}}
              className="py-1 px-3 text-sm bg-amber-50 text-amber-800 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gray-50 py-1 rounded-lg justify-end pr-40">
          <span className="text-sm font-medium text-gray-700">Merchant ID</span>
          <span className="px-6 py-3 bg-[#6C38FF] text-white text-sm rounded font-medium">
            {order.product?.store_id || "N/A"}
          </span>
        </div>

        {/* Main Content */}
        <div className="p-6 ">
          <div className="border-b border-gray-200 pb-6">
            <div className="flex gap-6">
              <div>
                <img
                  src={productPhotos[0]?.url || "/placeholder.svg"}
                  alt={productName}
                  className="w-40 h-40 object-cover rounded-lg"
                />
                <div className="flex gap-2 mt-2">
                  {productPhotos.slice(1, 4).map((photo, index) => (
                    <img
                      key={index}
                      src={photo.url || "/placeholder.svg"}
                      alt={`${productName} view ${index + 2}`}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>

              <div className="flex-1 pl-20">
                <div>
                  <h2 className="text-xl font-medium text-gray-900">{productName}</h2>
                  <p className="text-gray-600 mt-1">{productDescription}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-purple-200 text-[#6C38FF] rounded-lg text-sm">
                    {paymentStatus}
                  </span>
                  <p className="mt-3 text-xl font-semibold text-gray-900">${totalPrice}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 mt-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Sender</h3>
              <span className="px-6 py-3 bg-[#6C38FF] text-white rounded-md text-sm">
                {order.sender?.first_name || "Unknown Sender"}
              </span>
              <p className="text-sm text-gray-600 border border-gray-200 rounded-lg p-4 mt-5">
                {order.message || "No message"}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Receiver</h3>
              <span className="px-6 py-3 bg-purple-200 text-[#6C38FF] rounded-md text-sm ">
                {order.recipient?.first_name || "Unknown Recipient"}
              </span>
              <div className="border border-gray-200 rounded-lg p-4 space-y-4 mt-5">
                <div>
                  <p className="text-sm font-medium text-gray-600">Address</p>
                  <p className="text-sm text-gray-900 mt-1">
                    {order.shipping_address
                      ? `${order.shipping_address.city}, ${order.shipping_address.state}, ${order.shipping_address.country}`
                      : "Address not available"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Name</p>
                  <p className="text-sm text-gray-900 mt-1">{order.recipient?.first_name || "Unknown"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Location</p>
                  <p className="text-sm text-gray-900 mt-1">
                    {order.recipient?.userLocation
                      ? `${order.recipient.userLocation.city}, ${order.recipient.userLocation.state}`
                      : "Location not available"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MerchantOrder

