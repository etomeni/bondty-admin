import { useState } from 'react';
import { Bell, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Orders from './Orders';
import StoreTab from './StoreTab';

interface StatCardProps {
  title: string;
  value: string;
  hasViewButton?: boolean;
  link?: string;
}



function StatCard({ title, value, hasViewButton = false, link }: StatCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg text-center component-border ">
      <h3 className="text-sm text-gray-600 font-semibold">{title}</h3>
      <p className="text-4xl font-bold mt-1 text-gray-900 flex justify-center items-center">{value}</p>
      {hasViewButton && link && (
        <Link to={link}>
          <button className="w-full mt-2 bg-[#5E17EB] text-white py-3 rounded text-sm font-bold">
            View
          </button>
        </Link>
      )}
    </div>
  );
}

function Header() {
  return (
    <div className="space-y-4  ">
      <div className="flex justify-between items-center">
        <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-white text-gray-700 hover:bg-gray-50 font-semibold">
          <ChevronLeft size={30} />
        </button>
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-200 rounded-full">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 ">
        <StatCard title="Total sales made" value="$2,000" />
        <StatCard title="Completed orders" value="200" hasViewButton link="/admin/completed-orders" />
        <StatCard title="Pending gifts" value="20" hasViewButton link="/admin/pending-orders" />
        <StatCard title="Declined gifts" value="5" hasViewButton link="/admin/declined-orders" />
      </div>
    </div>
  );
}

function Tabs({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: 'orders' | 'store') => void }) {
  return (
    <div className="mb-4 mt-6 rounded-lg p-0.5 ">

      <nav className="flex gap-4">
        <button 
          onClick={() => setActiveTab('orders')}
          className={`pb-2 px-1 font-semibold ${activeTab === 'orders' ? 'border-b-2 border-[#5E17EB] text-[#5E17EB]' : 'text-gray-500'}`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab('store')}
          className={`pb-2 px-1 font-semibold ${activeTab === 'store' ? 'border-b-2 border-[#5E17EB] text-[#5E17EB]' : 'text-gray-500'}`}
        >
          Store
        </button>
      </nav>
    </div>
  );
}

export default function Store() {
  const [activeTab, setActiveTab] = useState<'orders' | 'store'>('orders');

  return (
    <div className="bg-white min-h-screen p-6 font-semibold component-border">
      <Header />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'orders' ? (
        <Orders />
      ) : (
        <div className="bg-white rounded-lg p-6 text-center text-gray-500 font-semibold component-border">
          <StoreTab />
        </div>
      )}
    </div>
  );
}