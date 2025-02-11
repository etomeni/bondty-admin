import { Search, Bell } from 'lucide-react'

interface User {
  name: string;
  image: string;
}

interface Row {
  users: User[];
  dateRange: string;
}

export default function Bonded() {
  // Create array of rows for demonstration
  const rows: Row[] = Array(9).fill({
    users: [
      { name: 'Maria', image: 'https://photosbook.in/wp-content/uploads/cute-girl-pic67.jpg' },
      { name: 'Joseph', image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600' }
    ],
    dateRange: '13th may 2024 - 14 June 2024'
  })

  return (
    <div className="w-full min-h-screen bg-white component-border">
      <div className="p-6">
        {/* Search Header */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 w-full max-w-[200px] rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2">
            <Bell className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full ">
            {/* Table Header */}
            <thead className="bg-gray-150 border rounded-lg">
              <tr className="text-left text-sm text-gray-700  ">
                <th className="px-6 py-4">Users</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">
              {rows.map((row, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {row.users.map((user: User, userIdx: number) => (
                          <div key={userIdx} className="h-10 w-10 rounded-full border-2 border-white overflow-hidden">
                            <img
                              src={user.image || "/placeholder.svg"}
                              alt={user.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        {row.users.map((user: User, userIdx: number) => (
                          <span
                            key={userIdx}
                            className="px-2 py-1 rounded-md text-xs bg-[#5E17EB]/30 text-[#5E17EB]"
                          >
                            {user.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-800">{row.dateRange}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-6 py-2 bg-[#5E17EB] text-white text-sm font-medium rounded-md hover:bg-[#5E17EB]/90 transition-colors">
                      Notify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}