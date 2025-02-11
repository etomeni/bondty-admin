import { ChevronLeft, Bell, Star } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { getDateById } from "./data/dates"

export default function DateDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const date = getDateById(Number(id))

  if (!date) return null

  return (
    <div className="min-h-screen bg-gray-50 p-4 component-border ">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell className="w-6 h-6 text-gray-900" />
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 bg-[#F3E8FF] rounded-lg p-4">
            <div className="text-sm font-medium text-[#5E17EB]">Date</div>
            <div className="font-semibold text-gray-900">{date.date}</div>
          </div>
          <div className="flex-1 bg-[#F3E8FF] rounded-lg p-4">
            <div className="text-sm font-medium text-[#5E17EB]">Time</div>
            <div className="font-semibold text-gray-900">{date.time}</div>
          </div>
          <div className="flex-1 bg-[#F3E8FF] rounded-lg p-4">
            <div className="text-sm font-medium text-[#5E17EB]">Type</div>
            <div className="font-semibold text-gray-900">{date.type}</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 mb-6 flex items-start gap-4">
          <img
            src={date.venue.image || "/placeholder.svg"}
            alt={date.venue.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h2 className="font-bold text-lg text-gray-900">{date.venue.name}</h2>
            <p className="text-gray-600 text-sm">{date.venue.address}</p>
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < date.venue.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {date.participantsDetails.map((participant, //index


        ) => (

          <div key={participant.name} className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={participant.image || "/placeholder.svg"}
                alt={participant.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-semibold text-gray-900">{participant.name}</span>
            </div>

            <div className="bg-white rounded-lg p-6">
              <div className="grid gap-4">
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Pick up location</div>
                  <div className="text-gray-600">{participant.pickupLocation}</div>
                </div>

                <div>
                  <div className="font-semibold text-gray-900 mb-1">Logistics</div>
                  <div className="text-gray-600">{participant.logistics}</div>
                </div>

                <div>
                  <div className="font-semibold text-gray-900 mb-1">Security</div>
                  <div className="flex gap-2 items-center">
                    <span className="text-gray-600">
                      {typeof participant.security === "string" ? participant.security : participant.security.details}
                    </span>
                    {typeof participant.security !== "string" && participant.security.gss && (
                      <span className="bg-[#F3E8FF] text-[#5E17EB] px-3 py-1 rounded-full text-sm font-medium">
                        GSS security: {participant.security.gss}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-gray-900 mb-1">Question</div>
                  <div className="text-gray-600">{participant.question}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

