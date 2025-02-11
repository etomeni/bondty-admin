import { useState, useEffect } from "react"
import { X } from "lucide-react"
import apiClient from "../utils/apiClient"

interface Attendee {
  id: number
  name: string
}

interface TicketsModalProps {
  isOpen: boolean
  onClose: () => void
  eventId: number
  eventTitle: string
}

const AVATAR_URL = "https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/60-512.png"

export default function TicketsModal({ isOpen, onClose, eventId, eventTitle }: TicketsModalProps) {
  const [attendees, setAttendees] = useState<Attendee[]>([])

  useEffect(() => {
    if (isOpen) {
      fetchAttendees()
    }
  }, [isOpen]) // Removed eventId from dependencies

  const fetchAttendees = async () => {
    try {
      const response = await apiClient.get(`admin/event/${eventId}/attendees`)
      setAttendees(response.data.data)
    } catch (error) {
      console.error("Error fetching attendees:", error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">{eventTitle}</h3>
          <button onClick={onClose} className="text-gray-800 hover:text-gray-900">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4">
          {attendees.map((attendee) => (
            <div key={attendee.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={AVATAR_URL || "/placeholder.svg"}
                  alt={attendee.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-medium text-gray-900">{attendee.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// export function getAttendeesCount(eventId: number): number {
//   // This function is no longer needed as we're fetching the count from the API
//   // in the Events component. You can remove this function or keep it as a placeholder.
//   return 0
// }

