import { type FormEvent, type Dispatch, type SetStateAction, useState, type ChangeEvent } from "react"
import { X, MapPin } from "lucide-react"
// @ts-ignore
import LocationSelectionModal from "./LocationSelectionModal"

interface LocationData {
  city: string
  state: string
  country: string
}

interface Event {
  id: number
  name: string
  location: string
  date: string
  ticket_prices: {
    regular: number
    vip: number
  }
  details: string
  banner: File | null
  // Add other properties as needed
}

interface EventModalProps {
  editingEvent: Event | null
  selectedLocation: string
  currentStep: number
  setCurrentStep: Dispatch<SetStateAction<number>>
  onClose: () => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  onLocationSelect: (locationData: LocationData) => void
  setBannerFile: Dispatch<SetStateAction<File | null>>
}

export default function EventModal({
  editingEvent,
  selectedLocation,
  currentStep,
  setCurrentStep,
  onClose,
  onSubmit,
  onLocationSelect,
  setBannerFile,
}: EventModalProps) {
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setBannerFile(file)

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreviewUrl(null)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {editingEvent ? "Edit Event" : "Add New Event"} - Step {currentStep} of 2
          </h3>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-700" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          {currentStep === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={editingEvent?.name || ""}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] text-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <div className="relative">
                  <input
                    type="text"
                    value={selectedLocation}
                    readOnly
                    placeholder="Select location"
                    className="w-full p-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] text-gray-800 cursor-pointer"
                    onClick={() => setShowLocationModal(true)}
                  />
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  name="date"
                  type="date"
                  required
                  defaultValue={editingEvent?.date ? new Date(editingEvent.date).toISOString().split("T")[0] : ""}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] text-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Regular Price</label>
                <input
                  name="regular_price"
                  type="number"
                  required
                  defaultValue={editingEvent?.ticket_prices.regular || ""}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] text-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">VIP Price</label>
                <input
                  name="vip_price"
                  type="number"
                  required
                  defaultValue={editingEvent?.ticket_prices.vip || ""}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] text-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  required
                  defaultValue={editingEvent?.details || ""}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] text-gray-800"
                  rows={3}
                />
              </div>
            </>
          )}
          {currentStep === 2 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] text-gray-800"
              />
              {previewUrl && (
                <div className="mt-2">
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="Banner preview"
                    className="max-w-full h-auto rounded-lg"
                  />
                </div>
              )}
            </div>
          )}
          <div className="flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
              >
                Previous
              </button>
            )}
            {currentStep < 2 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="bg-[#5E17EB] text-white py-2 px-4 rounded-lg hover:bg-[#4B11C2]"
              >
                Next
              </button>
            ) : (
              <button type="submit" className="bg-[#5E17EB] text-white py-2 px-4 rounded-lg hover:bg-[#4B11C2]">
                {editingEvent ? "Update Event" : "Add Event"}
              </button>
            )}
          </div>
        </form>
      </div>
      <LocationSelectionModal
        isVisible={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onSelectLocation={onLocationSelect}
      />
    </div>
  )
}

