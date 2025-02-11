import { Loader2 } from "lucide-react"

export default function LoadingModal() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center">
        <Loader2 className="h-12 w-12 text-[#5E17EB] animate-spin" />
        <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    </div>
  )
}

