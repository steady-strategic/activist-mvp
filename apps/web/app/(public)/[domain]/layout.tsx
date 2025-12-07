// apps/web/app/(public)/[domain]/layout.tsx
import React, { ReactNode } from 'react';
import { TenantConfig } from '../../../../../packages/core/src/types';
import { getThemeStyles } from '../../../../../packages/theme/src/index';
import { Globe } from 'lucide-react';
import { Button } from '../../../../../packages/ui/src/index';

export default function TenantLayout({ 
  children, 
  tenant,
  navigate
}: { 
  children: ReactNode; 
  tenant: TenantConfig; 
  navigate: (path: string) => void;
}) {
  const themeStyles = getThemeStyles(tenant.theme);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50" style={themeStyles}>
      {/* Header */}
      <header className="text-white shadow-lg sticky top-0 z-50 bg-[var(--color-primary)] transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="p-1.5 bg-white/20 rounded-lg">
              <Globe size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight">{tenant.name}</span>
          </div>
          <div className="flex gap-3">
             <Button 
               variant="ghost" 
               className="text-white hover:bg-white/10"
               onClick={() => navigate('/events')}
             >
               Events
             </Button>
             <Button 
               className="bg-white text-[var(--color-primary)] font-bold hover:bg-slate-100 border-none"
               onClick={() => navigate('/donate')}
             >
               Donate
             </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[var(--color-primary)] text-white/80 py-12 mt-auto">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-sm">
           <div className="col-span-2">
             <h4 className="font-bold text-white text-lg mb-4">{tenant.name}</h4>
             <p className="max-w-xs">{tenant.description}</p>
           </div>
           <div>
             <h5 className="font-bold text-white mb-4">Action</h5>
             <ul className="space-y-2">
               <li>Donate</li>
               <li>Volunteer</li>
               <li>Events</li>
             </ul>
           </div>
           <div>
             <h5 className="font-bold text-white mb-4">Legal</h5>
             <ul className="space-y-2">
               <li>Privacy Policy</li>
               <li>Terms of Service</li>
               <li>Powered by Activist.com</li>
             </ul>
           </div>
        </div>
      </footer>
    </div>
  );
}
