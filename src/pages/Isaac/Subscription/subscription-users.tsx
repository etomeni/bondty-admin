import { useState } from 'react';
import { Search, Settings, ChevronLeft } from 'lucide-react';

interface User {
  id: number;
  name: string;
  avatar: string;
  dueDate: {
    start: string;
    end: string;
  };
}

interface SubscriptionUsersProps {
  planName: string;
  onBack: () => void;
}

const mockUsers: User[] = [
  { id: 1, name: 'Ada', avatar: 'https://cdn2.stylecraze.com/wp-content/uploads/2013/06/Different-Beautiful-American-Girls.jpg.webp', dueDate: { start: '17 October', end: '17 November' } },
  { id: 2, name: 'Michelle', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCG5fSW2o3mPb4IkYaCadpDrLJGQ6FuPGO_VkcfUcB_UFhdKikVk_THjtbrLpVUuMAfKo&usqp=CAU', dueDate: { start: '17 October', end: '17 November' } },
  { id: 3, name: 'Daniel', avatar: 'https://images.unsplash.com/photo-1672675225389-4d7b6f231f5b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5pZ2VyaWFuJTIwbWFufGVufDB8fDB8fHww', dueDate: { start: '17 October', end: '17 November' } },
  { id: 4, name: 'Embassy', avatar: 'https://images.unsplash.com/photo-1680443418917-df6db955b9e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fG5pZ2VyaWFuJTIwbWFufGVufDB8fDB8fHww', dueDate: { start: '17 October', end: '17 November' } },
  { id: 5, name: 'Francis', avatar: 'https://cdn2.stylecraze.com/wp-content/uploads/2013/06/Different-Beautiful-American-Girls.jpg.webp', dueDate: { start: '17 October', end: '17 November' } },
  { id: 6, name: 'Michelle', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCG5fSW2o3mPb4IkYaCadpDrLJGQ6FuPGO_VkcfUcB_UFhdKikVk_THjtbrLpVUuMAfKo&usqp=CAU', dueDate: { start: '17 October', end: '17 November' } },
  { id: 7, name: 'Daniel', avatar: 'https://images.unsplash.com/photo-1672675225389-4d7b6f231f5b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5pZ2VyaWFuJTIwbWFufGVufDB8fDB8fHww', dueDate: { start: '17 October', end: '17 November' } },
  { id: 8, name: 'Embassy', avatar: 'https://images.unsplash.com/photo-1680443418917-df6db955b9e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fG5pZ2VyaWFuJTIwbWFufGVufDB8fDB8fHww', dueDate: { start: '17 October', end: '17 November' } },
];

export default function SubscriptionUsers({ planName, onBack }: SubscriptionUsersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>(mockUsers);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleSendMail = (userId: number) => {
    // Implement send mail functionality
    console.log('Sending mail to user:', userId);
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen component-border ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg w-[300px] focus:outline-none focus:ring-2 focus:ring-[#6C27FF] bg-white"
              />
            </div>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-[2fr,2fr,2fr] px-6 py-4 border-b bg-gray-50">
            <div className="text-sm font-medium text-gray-500">{planName}</div>
            <div className="text-sm font-medium text-gray-500">Due date</div>
            <div className="text-sm font-medium text-gray-500">Action</div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredUsers.map(user => (
              <div key={user.id} className="grid grid-cols-[2fr,2fr,2fr] px-6 py-4 items-center">
                <div className="flex items-center gap-4">
                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium text-gray-900">{user.name}</span>
                </div>
                <div className="text-gray-600">
                  {user.dueDate.start} - {user.dueDate.end}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleRemoveUser(user.id)}
                    className="px-4 py-2 rounded-lg bg-[#6C27FF]/10 text-[#6C27FF] hover:bg-[#6C27FF]/20 transition-colors text-sm font-medium"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleSendMail(user.id)}
                    className="px-4 py-2 rounded-lg bg-[#6C27FF] text-white hover:bg-[#5820CC] transition-colors text-sm font-medium"
                  >
                    Send a mail
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}