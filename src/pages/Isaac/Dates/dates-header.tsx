import { Star } from "lucide-react"
import { Link } from "react-router"

export default function DatesHeader() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8 ">
      <div className="rounded-lg border bg-white p-4 flex flex-col justify-between h-48 component-border">
        <div>
          <h3 className="text-sm font-semibold text-gray-700">Total booked dates</h3>
          <div className="mt-1 text-4xl font-bold text-gray-900">200</div>
        </div>
        <Link to={`booked-dates`}>
        <button className="mt-2 w-full rounded-md bg-[#5E17EB] py-3 text-sm font-bold text-white hover:bg-[#4C11D1] transition-colors">
          View
        </button>
        </Link>
      </div>

      <div className="rounded-lg border bg-white p-4 flex flex-col justify-between h-48 component-border">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">Declined dates</h3>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
              4
            </span>
          </div>
          <div className="mt-1 text-4xl font-bold text-gray-900">20</div>
        </div>
        <Link to={`declined-dates`}>
        <button className="mt-2 w-full rounded-md bg-[#5E17EB] py-3 text-sm font-bold text-white hover:bg-[#4C11D1] transition-colors">
          View
        </button>
        </Link>
      </div>

      <div className="rounded-lg border bg-white p-4 flex flex-col justify-between h-48 component-border">
        <div>
          <h3 className="text-sm font-semibold text-gray-700">Customer feedback</h3>
          <div className="mt-1 flex space-x-1">
            {[...Array(4)].map((_, i) => (
              <Star key={i} className="h-8 w-8 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
        <Link to={``}>
        <button className="mt-2 w-full rounded-md bg-[#5E17EB] py-3 text-sm font-bold text-white hover:bg-[#4C11D1] transition-colors">
          View
        </button>
        </Link>
      </div>
    </div>
  )
}

