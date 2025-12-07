// apps/web/app/(admin)/layout.tsx
import React, { ReactNode } from 'react';
import { Layers, Settings, Users, BarChart3, LogOut, Home } from 'lucide-react';

export default function AdminLayout({ 
  children,
  navigate
}: { 
  children: ReactNode;
  navigate: (path: string) => void; 
}) {
  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed h-full">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
           <Layers className="text-blue-500 mr-2" />
           <span className="font-bold text-white tracking-wide">ActivistOS</span>
        </div>
        
        <nav className="flex-grow p-4 space-y-1">
          <div className="text-xs uppercase font-semibold text-slate-500 mb-2 px-2">Overview</div>
          <NavItem icon={Home} label="Dashboard" active />
          <NavItem icon={Users} label="Supporters" />
          <NavItem icon={BarChart3} label="Analytics" />
          
          <div className="text-xs uppercase font-semibold text-slate-500 mt-8 mb-2 px-2">Configuration</div>
          <NavItem icon={Settings} label="Settings" />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-2 text-sm hover:text-white transition-colors w-full text-left">
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-8">
          <h2 className="font-semibold text-slate-800">Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
              AD
            </div>
          </div>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

const NavItem = ({ icon: Icon, label, active }: any) => (
  <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${active ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}>
    <Icon size={18} />
    <span className="text-sm font-medium">{label}</span>
  </button>
);
