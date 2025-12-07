import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { middleware } from './apps/web/middleware';
import { Button } from './packages/ui/src/index';
import { Laptop } from 'lucide-react';

// Import Pages & Layouts
import TenantLayout from './apps/web/app/(public)/[domain]/layout';
import TenantPage from './apps/web/app/(public)/[domain]/page';
import AdminLayout from './apps/web/app/(admin)/layout';
import DashboardPage from './apps/web/app/(admin)/dashboard/page';

// --- HOST LANDING PAGE (Simple placeholder for the 'activist.com' marketing site) ---
const HostLandingPage = ({ navigate }: { navigate: (path: string) => void }) => (
  <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 text-center font-sans">
    <div className="mb-8 p-4 bg-blue-600/20 rounded-2xl border border-blue-500/30">
      <Laptop size={48} className="text-blue-400" />
    </div>
    <h1 className="text-4xl md:text-6xl font-bold mb-6">Activist<span className="text-blue-500">OS</span></h1>
    <p className="text-slate-400 text-xl max-w-2xl mb-10">
      The operating system for social change. Deploy powerful campaign sites in seconds using our multi-tenant infrastructure.
    </p>
    <div className="flex gap-4">
      <Button onClick={() => alert('Sign up not implemented')}>Get Started</Button>
      <Button variant="outline" className="border-slate-700 hover:bg-slate-800" onClick={() => alert('Docs not implemented')}>Documentation</Button>
    </div>
  </div>
);

// --- 404 PAGE ---
const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-slate-300 mb-4">404</h1>
      <p className="text-slate-600">Site not found.</p>
    </div>
  </div>
);

// --- APP ROUTER SIMULATION ---
const App = () => {
  // State to simulate browser URL and Hostname
  // In a real app, this comes from the request headers
  const [currentUrl, setCurrentUrl] = useState('/');
  const [currentDomain, setCurrentDomain] = useState('activist.com');

  // "Navigate" function updates internal state instead of pushing to history (Security fix)
  const navigate = (path: string) => setCurrentUrl(path);

  // --- MIDDLEWARE EXECUTION ---
  const routeContext = middleware(currentUrl, currentDomain);

  // --- RENDER LOGIC ---
  const renderContent = () => {
    switch (routeContext.type) {
      case 'admin':
        return (
          <AdminLayout navigate={navigate}>
            {/* Simple router for admin pages */}
            <DashboardPage />
          </AdminLayout>
        );
      
      case 'public':
        return (
          <TenantLayout tenant={routeContext.tenant} navigate={navigate}>
             {/* Simple router for tenant pages */}
             <TenantPage tenant={routeContext.tenant} />
          </TenantLayout>
        );

      case 'public-host':
        return <HostLandingPage navigate={navigate} />;

      default:
        return <NotFoundPage />;
    }
  };

  // --- DEBUGGER (To switch domains in simulation) ---
  const DomainSwitcher = () => (
    <div className="fixed bottom-4 right-4 z-[100] bg-slate-900 text-white p-3 rounded-xl shadow-2xl border border-slate-700 text-xs font-sans">
      <div className="font-bold text-slate-400 mb-2 uppercase tracking-wider">Simulate Domain</div>
      <div className="flex flex-col gap-2">
        <button 
          onClick={() => setCurrentDomain('activist.com')}
          className={`px-3 py-2 rounded text-left transition-colors ${currentDomain === 'activist.com' ? 'bg-blue-600' : 'bg-slate-800 hover:bg-slate-700'}`}
        >
          activist.com <span className="opacity-50 ml-2">(Host)</span>
        </button>
        <button 
          onClick={() => setCurrentDomain('app.activist.com')}
          className={`px-3 py-2 rounded text-left transition-colors ${currentDomain === 'app.activist.com' ? 'bg-blue-600' : 'bg-slate-800 hover:bg-slate-700'}`}
        >
          app.activist.com <span className="opacity-50 ml-2">(Admin)</span>
        </button>
        <button 
          onClick={() => setCurrentDomain('climate-action.activist.com')}
          className={`px-3 py-2 rounded text-left transition-colors ${currentDomain === 'climate-action.activist.com' ? 'bg-blue-600' : 'bg-slate-800 hover:bg-slate-700'}`}
        >
          climate-action... <span className="opacity-50 ml-2">(Tenant)</span>
        </button>
        <button 
          onClick={() => setCurrentDomain('city-bikes.activist.com')}
          className={`px-3 py-2 rounded text-left transition-colors ${currentDomain === 'city-bikes.activist.com' ? 'bg-blue-600' : 'bg-slate-800 hover:bg-slate-700'}`}
        >
          city-bikes... <span className="opacity-50 ml-2">(Tenant)</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {renderContent()}
      <DomainSwitcher />
    </>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
