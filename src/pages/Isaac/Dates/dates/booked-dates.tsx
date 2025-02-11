"use client"

import { useState, useEffect, useCallback } from "react"
import { Search, ChevronLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import apiClient from "../../utils/apiClient"
import LoadingModal from "../../LoadingModal"

interface BookedDate {
  id: string
  pick_up_location: string
  booked_by: {
    first_name: string
    profilePhoto: {
      url: string
    }
  }
  matched_user: {
    first_name: string
    profilePhoto: {
      url: string
    }
  } | null
  security_booking_id: string | null
  car_booking_id: string | null
  is_solo: boolean
}

export default function BookedDates() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [bookedDates, setBookedDates] = useState<BookedDate[]>([])
  const [error, setError] = useState<string | null>(null)

  const fetchBookedDates = useCallback(async () => {
    try {
      const response = await apiClient.get<{ data: BookedDate[] }>("/admin/date/booked")
      console.log("API Response:", response.data)
      if (Array.isArray(response.data.data)) {
        setBookedDates(response.data.data)
      } else {
        console.error("Unexpected data structure:", response.data)
        setError("Unexpected data structure received from the server.")
      }
    } catch (err) {
      console.error("Error fetching booked dates:", err)
      setError("Failed to load booked dates. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBookedDates()
  }, [fetchBookedDates])

  return (
    <>
      {isLoading && <LoadingModal />}
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 component-border">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="w-8 h-8 text-gray-900" />
            </button>
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-600" />
              <input
                type="search"
                placeholder="Search"
                className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 text-sm text-gray-900 focus:border-[#5E17EB] focus:outline-none focus:ring-1 focus:ring-[#5E17EB]"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white overflow-hidden min-h-screen">
          <div className="border-b p-6">
            <h2 className="text-xl font-bold text-gray-900">Dates booked</h2>
          </div>

          {error ? (
            <div className="p-6 text-center text-red-500">{error}</div>
          ) : isLoading ? (
            <div className="p-6 text-center">Loading...</div>
          ) : bookedDates.length === 0 ? (
            <div className="p-6 text-center">No booked dates found.</div>
          ) : (
            <div className="divide-y">
              {bookedDates.map((date) => (
                <div key={date.id} className="flex items-center justify-start p-6 gap-8">
                  <div className="flex items-center space-x-4 flex-grow">
                    <div className="flex -space-x-2">
                      <img
                        src={date.booked_by.profilePhoto.url || "/placeholder.svg"}
                        alt={`${date.booked_by.first_name}'s profile`}
                        className="h-12 w-12 rounded-full border-2 border-white object-cover"
                      />
                      {!date.is_solo && date.matched_user && (
                        <img
                          src={date.matched_user.profilePhoto.url || "/placeholder.svg"}
                          alt={`${date.matched_user.first_name}'s profile`}
                          className="h-12 w-12 rounded-full border-2 border-white object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{date.pick_up_location}</h3>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <span className="rounded-full bg-[#F3E8FF] px-3 py-1 text-sm font-semibold text-[#5E17EB]">
                          {date.booked_by.first_name}
                        </span>
                        {!date.is_solo && date.matched_user && (
                          <span className="rounded-full bg-[#F3E8FF] px-3 py-1 text-sm font-semibold text-[#5E17EB]">
                            {date.matched_user.first_name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 flex-grow">
                    <div>
                      <div className="mb-1 text-sm font-bold text-gray-900">Security details</div>
                      <div className="flex gap-2">
                        <span className="rounded-full bg-[#F3E8FF] px-3 py-1 text-sm font-semibold text-[#5E17EB]">
                          {date.security_booking_id ? "Yes" : "No"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="mb-1 text-sm font-bold text-gray-900">Logistics</div>
                      <div className="flex gap-2">
                        <span className="rounded-full bg-[#F3E8FF] px-3 py-1 text-sm font-semibold text-[#5E17EB]">
                          {date.car_booking_id ? "Yes" : "No"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    to={`${date.id}`}
                    className="rounded-md bg-[#5E17EB] px-6 py-2 text-sm font-bold text-white hover:bg-[#4C11D1] transition-colors ml-auto"
                  >
                    View details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

