import type React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, X, ImageIcon, ChevronDown, MapPin } from "lucide-react"
import Security from "./security"
import apiClient from "../utils/apiClient"
import LocationSelectionModal from "../locationselection"
import "./scrollbar-hide.css"
import { useNavigate } from "react-router-dom"

interface LocationData {
  city: string
  state: string
  country: string
  latitude: string
  longitude: string
}

// interface CarFormData {
//   id?: string
//   price: number
//   category_id: string
//   brand_id: string
//   location: LocationData
//   car_image?: File
// }

interface Car {
  id: string
  currency: string
  location: string
  brand_id: string
  category_id: string
  target_id: string
  target_type: string
  about: string
  rental_price: string
  image_url: string
  provider_name: string
  created_at: string
  updated_at: string
}

interface Brand {
  id: string
  name: string
  created_at: string
  updated_at: string
}

interface Category {
  id: string
  name: string
  created_at: string
  updated_at: string
}

export default function CarsManagement() {
  const [activeTab, setActiveTab] = useState("cars")
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null)
  const [editingCar, setEditingCar] = useState<Car | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isAddBrandModalOpen, setIsAddBrandModalOpen] = useState(false)
  const [cars, setCars] = useState<Car[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null)
  const [selectedBrand, setSelectedBrand] = useState(editingCar?.brand_id || "");
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchCars()
    fetchBrands()
    fetchCategories()
  }, [])

  const fetchCars = async () => {
    try {
      const response = await apiClient.get("/admin/car/all")
      setCars(response.data.data)
    } catch (err) {
      setError("Oops! something is wrong try reloading this tab");
  }
  }

  const fetchBrands = async () => {
    try {
      const response = await apiClient.get("/admin/car/all-brands")
      setBrands(response.data.data)
    } catch (err) {
      setError("Oops! something is wrong try reloading this tab");
  }
  }

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get("/admin/car/all-categories")
      setCategories(response.data.data)
    } catch (err) {
      setError("Oops! something is wrong try reloading this tab");
  }
  }

  const handleAddCar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const carImage = formData.get("car_image");
    
    if (!carImage) {
      setError("Please select an image");
      return;
    }
  
    if (!selectedLocation) {
      setError("Please select a location");
      return;
    }
  
    const requestData = new FormData();
    // For nested location object, create it as a JSON string
    const locationData = JSON.stringify({
      city: selectedLocation.city,
      state: selectedLocation.state,
      country: selectedLocation.country,
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude
    });
  
    requestData.append('location', locationData);
    requestData.append('price', formData.get("price") as string);
    requestData.append('category_id', formData.get("category_id") as string);
    requestData.append('brand_id', formData.get("brand_id") as string);
    requestData.append('car_image', carImage);
  
    console.log('FormData entries:');
    for (let pair of requestData.entries()) {
      console.log(pair[0], pair[1]);
    }
  
    try {
      let response;
      if (editingCar) {
        requestData.append('id', editingCar.id);
        response = await apiClient.patch("/admin/car/edit", requestData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        response = await apiClient.post("/admin/car/new", requestData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      console.log('API Response:', response.data);
      
      fetchCars();
      setIsAddCarModalOpen(false);
      setEditingCar(null);
      setSelectedImage(null);
      setSelectedLocation(null);
    } catch (err) {
      console.error('API Error:', err);
      setError("Oops! Something is wrong. Try reloading this tab");
    }
  };
  
  

  const handleAddBrand = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    try {
      await apiClient.post("/admin/car/new-brand", { name })
      fetchBrands()
      setIsAddBrandModalOpen(false)
    } catch (err) {
      setError("Oops! something is wrong try reloading this tab");
  }
  }

  const handleDelete = async (id: string) => {
    try {
      await apiClient.delete(`/admin/car/delete/${id}`)
      fetchCars()
      setDeleteConfirmation(null)
    } catch (err) {
      setError("Oops! something is wrong try reloading this tab");
  }
  }

  const handleLocationSelect = (location: LocationData) => {
    setSelectedLocation(location)
  }

  
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (value === "addBrand") {
      setIsAddBrandModalOpen(true);
      setSelectedBrand(""); // Keep the selected brand unchanged
    } else {
      setSelectedBrand(value);
    }
  };

  selectedBrand


  return (
    <div className="min-h-screen bg-white border border-gray-200 component-border">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-8 h-8 text-gray-900" />
          </button>
        </div>

        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
              <X className="h-6 w-6 text-red-500" />
            </span>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("cars")}
              className={`pb-1 ${activeTab === "cars" ? "text-black font-medium border-b-2 border-black" : "text-gray-500 hover:text-gray-700"}`}
            >
              Cars
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`pb-1 ${activeTab === "security" ? "text-black font-medium border-b-2 border-black" : "text-gray-500 hover:text-gray-700"}`}
            >
              Security
            </button>
          </div>
          {activeTab === "cars" && (
            <button
              onClick={() => setIsAddCarModalOpen(true)}
              className="bg-[#E9E3FF] text-[#6C38FF] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#DCD3FF]"
            >
              Add Cars
              <span className="text-xl">+</span>
            </button>
          )}
        </div>

        {activeTab === "cars" ? (
          <div className="w-full">
            <div className="grid grid-cols-3 bg-gray-200 p-4 border-y border-gray-200 rounded-lg">
              <div className="text-gray-800 font-medium">Car</div>
              <div className="text-gray-800 font-medium">Price</div>
              <div className="text-gray-800 font-medium">Action</div>
            </div>

            <div className="divide-y divide-gray-200">
              {cars.map((car) => (
                <div key={car.id} className="grid grid-cols-3 p-4 items-center relative">
                  <div className="flex items-center gap-4 group">
  <span className="w-32 truncate text-gray-800 font-medium ">
    {car.provider_name}
  </span>
  <img
    src={car.image_url || "/placeholder.svg"}
    alt={car.provider_name}
    className="w-20 h-15 rounded-lg object-cover"
  />
</div>
                  <div className="text-gray-700">${car.rental_price}</div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setDeleteConfirmation(car.id)}
                      className="bg-[#E9E3FF] text-[#5B2FD9] px-4 py-2 rounded-lg hover:bg-[#DCD3FF]"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setEditingCar(car)
                        setIsAddCarModalOpen(true)
                      }}
                      className="bg-[#6C38FF] text-white px-6 py-2 rounded-lg hover:bg-[#5B2FD9]"
                    >
                      Edit
                    </button>
                  </div>
                  {deleteConfirmation === car.id && (
                    <div className="absolute right-0 top-[-60px] bg-white border border-gray-200 rounded-lg p-4 shadow-lg text-gray-700">
                      <p className="mb-2 text-gray-700">Are you sure you want to delete this car?</p>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setDeleteConfirmation(null)}
                          className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleDelete(car.id)}
                          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Security />
        )}
      </div>

      {isAddCarModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white p-6 w-full max-w-[400px] max-h-[90vh] overflow-y-auto scrollbar-hide">
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setIsAddCarModalOpen(false)
                  setEditingCar(null)
                  setSelectedImage(null)
                  setSelectedLocation(null)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCar} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Category</label>
                <div className="relative w-full">
                  <select
                    name="category_id"
                    className="w-full p-3 bg-[#6C38FF] text-white rounded-lg appearance-none pr-10 text-gray-700"
                    defaultValue={editingCar?.category_id || ""}
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-5 h-5 text-white absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-700" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Car Brand</label>
                <div className="relative w-full">
                <select
        name="brand_id"
        className="w-full p-3 border border-gray-200 rounded-lg appearance-none pr-10 bg-white text-gray-700"
        value={selectedBrand}
        onChange={handleSelectChange}
      >
        <option value="addBrand">Add Brand</option>

        {brands.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </select>

                  <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-700" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Rental price</label>
                <input
                  type="number"
                  name="price"
                  placeholder="200"
                  className="w-full p-3 border border-gray-200 rounded-lg bg-white text-gray-700"
                  defaultValue={editingCar?.rental_price || ""}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Location</label>
                <div
                  className="w-full p-3 border border-gray-200 rounded-lg bg-white flex items-center justify-between cursor-pointer text-gray-700"
                  onClick={() => setIsLocationModalOpen(true)}
                >
                  {selectedLocation ? (
                    <span>{`${selectedLocation.city}, ${selectedLocation.state}, ${selectedLocation.country}`}</span>
                  ) : (
                    <span className="text-gray-400">Select location</span>
                  )}
                  <MapPin className="w-5 h-5 text-gray-600" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Upload car image</label>
                <div className="relative">
                  <input
                    type="file"
                    name="car_image"
                    accept="image/*"
                    className="hidden"
                    id="car-image"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setSelectedImage(URL.createObjectURL(file))
                      }
                    }}
                  />
                  {selectedImage ? (
                    <div className="relative inline-block">
                      <img
                        src={selectedImage || "/placeholder.svg"}
                        alt="Selected car"
                        className="w-32 h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedImage(null)
                          const input = document.getElementById("car-image") as HTMLInputElement
                          if (input) input.value = ""
                        }}
                        className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm text-gray-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="car-image"
                      className="w-32 h-24 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50"
                    >
                      <ImageIcon className="w-8 h-8 text-gray-300" />
                    </label>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#6C38FF] text-white py-3 rounded-lg hover:bg-[#5B2FD9] transition-colors"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}

      {isAddBrandModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-700">Add Brand</h2>
              <button onClick={() => setIsAddBrandModalOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddBrand}>
              <div className="mb-4">
                <label className="block mb-2 text-gray-600">Brand Name</label>
                <input type="text" name="name" className="w-full p-2 border rounded text-gray-900" />
              </div>
              <button type="submit" className="w-full bg-[#6C38FF] text-white px-4 py-2 rounded-lg hover:bg-[#5B2FD9]">
                Add Brand
              </button>
            </form>
          </div>
        </div>
      )}
      <LocationSelectionModal
        isVisible={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelectLocation={handleLocationSelect}
      />
    </div>
  )
}

