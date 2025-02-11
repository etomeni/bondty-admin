import { HourglassIcon } from "lucide-react"

export default function NoPendingDates() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <HourglassIcon className="w-12 h-12 text-gray-400 mb-4" />
      <p className="text-xl font-semibold text-gray-600">There are no pending dates currently</p>
    </div>
  )
}

