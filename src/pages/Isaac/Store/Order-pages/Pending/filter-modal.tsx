import { X } from "lucide-react"
import type { FilterCategory } from "./pendingApi"

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  selectedFilter: FilterCategory
  onFilterSelect: (filter: FilterCategory) => void
}

export function FilterModal({ isOpen, onClose, selectedFilter, onFilterSelect }: FilterModalProps) {
  if (!isOpen) return null

  return (
    <div className="absolute top-full right-0 mt-2 z-50">
      <div className="bg-white rounded-lg shadow-lg w-48">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Filter Orders</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="p-4 space-y-2">
          <button
            onClick={() => {
              onFilterSelect("all")
              onClose()
            }}
            className={`w-full py-2 px-4 text-left rounded-md ${
              selectedFilter === "all" ? "bg-[#5E17EB] text-white" : "text-gray-900 hover:bg-gray-100"
            }`}
          >
            All
          </button>
          <button
            onClick={() => {
              onFilterSelect("merchant")
              onClose()
            }}
            className={`w-full py-2 px-4 text-left rounded-md ${
              selectedFilter === "merchant" ? "bg-[#5E17EB] text-white" : "text-gray-900 hover:bg-gray-100"
            }`}
          >
            Merchant order
          </button>
          <button
            onClick={() => {
              onFilterSelect("admin")
              onClose()
            }}
            className={`w-full py-2 px-4 text-left rounded-md ${
              selectedFilter === "admin" ? "bg-[#5E17EB] text-white" : "text-gray-900 hover:bg-gray-100"
            }`}
          >
            Bondyt order
          </button>
        </div>
      </div>
    </div>
  )
}

