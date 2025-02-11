import { useState, type FormEvent } from "react"
import { Trash2, X, Upload, Star, Plus, MapPin } from "lucide-react"
// @ts-ignore
import LocationSelectionModal from "../LocationSelection"

interface Place {
  id: number
  name: string
  location: string
  category: string
  rating: number
  images: string[]
  weekdayHours: string
  weekendHours: string
  menuPdf?: string
}

interface SelectedLocation {
  city: string
  state: string
  country: string
  latitude: string
  longitude: string
}

const dummyCategories = ["Restaurant", "Bar", "Club", "Cafe", "Lounge"]

const dummyPlaces: Place[] = [
  {
    id: 1,
    name: "Puzzzles Abuja",
    location: "Gwarimpa, Abuja",
    category: "Restaurant",
    rating: 4,
    images: [
      "https://www.yum.com/wps/wcm/connect/yumbrands/77ac5d27-1357-4792-9953-54b11f5ae7dd/yum-com-24-product-PH.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE.Z18_5QC4HBC039RJ406SQH4UBH3695-77ac5d27-1357-4792-9953-54b11f5ae7dd-oXSxcXb",
    ],
    weekdayHours: "9:00 AM - 10:00 PM",
    weekendHours: "10:00 AM - 11:00 PM",
  },
  {
    id: 2,
    name: "Coal City Bukka",
    location: "Gwarimpa, Abuja",
    category: "Restaurant",
    rating: 5,
    images: [
      "https://images.timbu.com/contents-11243d64aac14aaebb90558e1f19176e/5fdfaf56-462b-4f92-ae77-9580ae194e49.png",
    ],
    weekdayHours: "8:00 AM - 9:00 PM",
    weekendHours: "9:00 AM - 10:00 PM",
  },
]

export default function Places() {
  const [showActionModal, setShowActionModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState<{ show: boolean; parent: "add" | "edit" | null }>({
    show: false,
    parent: null,
  })
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [rating, setRating] = useState(0)
  const [bannerFiles, setBannerFiles] = useState<File[]>([])
  const [menuFile, setMenuFile] = useState<File | null>(null)
  const [menuPreviewUrl, setMenuPreviewUrl] = useState<string>("")
  const [isEditMode, setIsEditMode] = useState(false)
  const [formData, setFormData] = useState<FormData | null>(null)
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(null)

  const openActionModal = (place: Place) => {
    setSelectedPlace(place)
    setShowActionModal(true)
    selectedPlace
  }

  const handleAddPlace = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newFormData = new FormData(e.currentTarget)
    setFormData(newFormData)
    setShowAddModal(false)
    setShowDetailsModal(true)
  }

  const handleDetailsSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const detailsData = new FormData(e.currentTarget)

    // Combine all form data
    const requestData = new FormData()
    if (formData) {
      for (const [key, value] of formData.entries()) {
        requestData.append(key, value)
      }
    }
    for (const [key, value] of detailsData.entries()) {
      requestData.append(key, value)
    }
    requestData.append("rating", rating.toString())

    // Append banner files
    bannerFiles.forEach((file, index) => {
      requestData.append(`banner${index + 1}`, file)
    })

    // Append menu file if exists
    if (menuFile) {
      requestData.append("menuPdf", menuFile)
    }

    // Here you would typically send the requestData to your API
    console.log("Form submitted:", requestData)

    setShowDetailsModal(false)
    resetForm()
  }

  const handleCreateCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const categoryData = new FormData(e.currentTarget)

    // Here you would typically send category data to your API
    console.log("New category:", categoryData.get("category"))

    setShowCategoryModal({ show: false, parent: null })
  }

  const resetForm = () => {
    setRating(0)
    setBannerFiles([])
    setMenuFile(null)
    setMenuPreviewUrl("")
    menuPreviewUrl
    setIsEditMode(false)
    setFormData(null)
  }

  const handleMenuUpload = (file: File) => {
    setMenuFile(file)
    const url = URL.createObjectURL(file)
    setMenuPreviewUrl(url)
  }

  const handleLocationSelect = (location: SelectedLocation) => {
    setSelectedLocation(location)
    setShowLocationModal(false)
  }

  return (
    <div className="bg-white min-h-screen w-full">
      {/* Add Place Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="mb-6 bg-[#5E17EB] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#4B11C2]"
      >
        <span>Add Place</span>
        <span>+</span>
      </button>

      {/* Places Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dummyPlaces.map((place) => (
          <div key={place.id} className="bg-white rounded-lg overflow-hidden">
            <div className="flex h-32">
              {/* Left: Banner Image */}
              <div className="w-1/2 rounded-lg overflow-hidden">
                <img
                  src={place.images[0] || "/placeholder.svg"}
                  alt={place.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Right: Place Details */}
              <div className="w-1/2 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-gray-900">{place.name}</h3>
                  <p className="text-gray-700 text-sm">{place.location}</p>
                </div>
                <button onClick={() => openActionModal(place)} className="self-end p-2 hover:bg-gray-100 rounded-full">
                  <Trash2 className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Place Actions</h3>
              <button onClick={() => setShowActionModal(false)}>
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setIsEditMode(true)
                  setShowAddModal(true)
                  setShowActionModal(false)
                }}
                className="w-full py-2 text-left hover:bg-gray-100 rounded px-2 text-gray-800"
              >
                Edit
              </button>
              <button className="w-full py-2 text-left text-red-600 hover:bg-gray-100 rounded px-2">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Place Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{isEditMode ? "Edit Place" : "Add New Place"}</h3>
              <button onClick={() => setShowAddModal(false)}>
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            <form onSubmit={handleAddPlace} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <div className="relative">
                  <select
                    name="category"
                    required
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] text-gray-800 appearance-none"
                    onChange={(e) => {
                      if (e.target.value === "new") {
                        e.preventDefault()
                        setShowCategoryModal({ show: true, parent: isEditMode ? "edit" : "add" })
                      }
                    }}
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    {dummyCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                    <option value="new" className="text-[#5E17EB]">
                      + Create new category
                    </option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Place Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] text-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <div className="relative">
                  <input
                    name="location"
                    type="text"
                    required
                    className="w-full p-2 pl-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] text-gray-800"
                    value={
                      selectedLocation
                        ? `${selectedLocation.city}, ${selectedLocation.state}, ${selectedLocation.country}`
                        : ""
                    }
                    readOnly
                    onClick={() => setShowLocationModal(true)}
                  />
                  <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Place Description</label>
                <textarea
                  name="description"
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] text-gray-800"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-gray-400 hover:text-[#5E17EB]"
                    >
                      {star <= rating ? (
                        <Star className="h-6 w-6 fill-[#5E17EB] text-[#5E17EB]" />
                      ) : (
                        <Star className="h-6 w-6" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" className="w-full bg-[#5E17EB] text-white py-2 rounded-lg hover:bg-[#4B11C2]">
                Next
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal (Merged Banner Upload, Hours, and Menu) */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <button onClick={() => setShowDetailsModal(false)}>
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            <form onSubmit={handleDetailsSubmit} className="space-y-6">
              {/* Main Banner Upload */}
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer mb-4"
                onClick={() => document.getElementById("main-banner-upload")?.click()}
              >
                <input
                  id="main-banner-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const newFiles = [...bannerFiles]
                      newFiles[0] = file
                      setBannerFiles(newFiles)
                    }
                  }}
                />
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <p className="text-sm text-gray-400">Click to upload</p>
              </div>

              {/* Additional Banner Uploads */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {[1, 2].map((index) => (
                  <div
                    key={index}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer aspect-square flex items-center justify-center"
                    onClick={() => document.getElementById(`banner-upload-${index}`)?.click()}
                  >
                    <input
                      id={`banner-upload-${index}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const newFiles = [...bannerFiles]
                          newFiles[index] = file
                          setBannerFiles(newFiles)
                        }
                      }}
                    />
                    <Upload className="h-6 w-6 text-gray-400" />
                  </div>
                ))}
                <button
                  type="button"
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer aspect-square flex items-center justify-center"
                  onClick={() => document.getElementById("banner-upload-3")?.click()}
                >
                  <input
                    id="banner-upload-3"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const newFiles = [...bannerFiles]
                        newFiles[2] = file
                        setBannerFiles(newFiles)
                      }
                    }}
                  />
                  <Plus className="h-6 w-6 text-gray-400" />
                </button>
              </div>

              {/* Opening Hours */}
              <div className="space-y-3">
                <div className="relative">
                  <input
                    name="weekdayHours"
                    type="text"
                    required
                    placeholder="Opening hours"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] text-gray-800"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-[#5E17EB]/10">
                    <span className="text-xs font-medium text-[#5E17EB]">Week days</span>
                  </span>
                </div>
                <div className="relative">
                  <input
                    name="weekendHours"
                    type="text"
                    required
                    placeholder="Opening hours"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] text-gray-800"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-[#5E17EB]/10">
                    <span className="text-xs font-medium text-[#5E17EB]">Weekends</span>
                  </span>
                </div>
              </div>

              {/* Menu Upload */}
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer flex items-center gap-3"
                onClick={() => document.getElementById("menu-upload")?.click()}
              >
                <div className="bg-gray-50 rounded-lg p-3">
                  <Upload className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  id="menu-upload"
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleMenuUpload(file)
                  }}
                />
                <span className="text-sm text-gray-600">Upload menu PDF</span>
              </div>

              <button type="submit" className="w-full bg-[#5E17EB] text-white py-3 rounded-lg hover:bg-[#4B11C2]">
                save
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create Category Modal */}
      {showCategoryModal.show && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          style={{ zIndex: 60 }}
        >
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Create Category</h3>
              <button onClick={() => setShowCategoryModal({ show: false, parent: null })}>
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input
                  name="category"
                  type="text"
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] text-gray-800"
                />
              </div>
              <button type="submit" className="w-full bg-[#5E17EB] text-white py-2 rounded-lg hover:bg-[#4B11C2]">
                Create
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Location Selection Modal */}
      <LocationSelectionModal
        isVisible={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onSelectLocation={handleLocationSelect}
      />
    </div>
  )
}

