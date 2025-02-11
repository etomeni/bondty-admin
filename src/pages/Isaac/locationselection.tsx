"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Modal from "react-modal"
import { Search, Check, MapPin, X } from "lucide-react"

const API_KEY = "AIzaSyCKGOncl1C9CKmSzx9ExmibDumfVSJWl6s"

interface Location {
  place_id: string
  description: string
  structured_formatting: {
    main_text: string
    secondary_text: string
  }
}

interface AddressInfo {
  city: string
  state: string
  country: string
  latitude: string
  longitude: string
}

interface LocationSelectionModalProps {
  isVisible: boolean
  onClose: () => void
  onSelectLocation: (location: AddressInfo) => void
}

const LocationSelectionModal: React.FC<LocationSelectionModalProps> = ({ isVisible, onClose, onSelectLocation }) => {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [autocompleteService, setAutocompleteService] = useState<google.maps.places.AutocompleteService | null>(null)
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null)

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`
      script.async = true
      script.defer = true
      document.head.appendChild(script)

      script.onload = () => {
        const service = new window.google.maps.places.AutocompleteService()
        setAutocompleteService(service)
      }
    }

    if (!window.google) {
      loadGoogleMapsScript()
    } else {
      const service = new window.google.maps.places.AutocompleteService()
      setAutocompleteService(service)
    }
  }, [])

  useEffect(() => {
    const searchLocations = async () => {
      if (!searchQuery || !autocompleteService) return

      setLoading(true)

      try {
        const request: google.maps.places.AutocompletionRequest = {
          input: searchQuery,
          types: ["geocode"],
        }

        autocompleteService.getPlacePredictions(
          request,
          (
            predictions: google.maps.places.AutocompletePrediction[] | null,
            status: google.maps.places.PlacesServiceStatus,
          ) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
              const formattedLocations: Location[] = predictions.map((prediction) => ({
                place_id: prediction.place_id,
                description: prediction.description,
                structured_formatting: prediction.structured_formatting,
              }))
              setLocations(formattedLocations)
            } else {
              console.error("Error fetching location predictions:", status)
            }
          },
        )
      } catch (error) {
        console.error("Error fetching locations:", error)
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(() => searchLocations(), 500)
    return () => clearTimeout(timeoutId)
  }, [searchQuery, autocompleteService])

  const extractAddressComponents = (addressComponents: google.maps.GeocoderAddressComponent[]): AddressInfo => {
    const componentMap: { [key: string]: string } = {}
    addressComponents.forEach((component) => {
      const type = component.types[0]
      componentMap[type] = component.long_name
      if (type === "administrative_area_level_1") {
        componentMap.state_short = component.short_name
      }
      if (type === "country") {
        componentMap.country_short = component.short_name
      }
    })

    return {
      city: componentMap.locality || componentMap.administrative_area_level_2 || "",
      state: componentMap.administrative_area_level_1 || "",
      country: componentMap.country || "",
      latitude: "",
      longitude: "",
    }
  }

  const handleLocationSelect = async (location: Location) => {
    try {
      const geocoder = new window.google.maps.Geocoder()
      const placeDetails = await new Promise<google.maps.GeocoderResult>((resolve, reject) => {
        geocoder.geocode({ placeId: location.place_id }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
            resolve(results[0])
          } else {
            reject(new Error("Failed to retrieve location details."))
          }
        })
      })

      const { geometry, address_components } = placeDetails
      const coords = geometry.location

      // Extract address components
      const addressInfo = extractAddressComponents(address_components)

      setSelectedLocationId(location.place_id)

      // Pass the location data directly to parent component
      onSelectLocation({
        ...addressInfo,
        latitude: coords.lat().toString(),
        longitude: coords.lng().toString(),
      })

      setTimeout(() => {
        onClose()
        setSelectedLocationId(null)
      }, 500)
    } catch (error) {
      console.error("Error processing location selection:", error)
    }
  }

  return (
    <Modal
      isOpen={isVisible}
      onRequestClose={onClose}
      className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-auto p-6 max-h-[80vh] overflow-hidden"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60"
      style={{
        overlay: { zIndex: 1100 },
      }}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Select Location</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="flex items-center space-x-2 mb-4 bg-gray-100 rounded-lg p-3">
          <Search size={20} className="text-[#5E17EB]" />
          <input
            type="text"
            className="w-full outline-none bg-transparent placeholder-gray-400 text-gray-700 text-sm"
            placeholder="Search locations"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="border-t-4 border-[#5E17EB] rounded-full w-8 h-8 animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-y-auto flex-grow -mx-6 px-6">
            <ul className="space-y-2">
              {locations.map((location) => (
                <li
                  key={location.place_id}
                  onClick={() => handleLocationSelect(location)}
                  className={`cursor-pointer hover:bg-purple-50 p-4 rounded-md text-gray-700 text-sm flex items-center justify-between transition-colors duration-200 ${
                    selectedLocationId === location.place_id ? "bg-purple-100" : ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <MapPin size={18} className="text-[#5E17EB]" />
                    <span>{location.description}</span>
                  </div>
                  {selectedLocationId === location.place_id && <Check size={18} className="text-[#5E17EB]" />}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default LocationSelectionModal

