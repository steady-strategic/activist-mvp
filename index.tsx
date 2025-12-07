import React, { useState, useEffect, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Menu, 
  X, 
  Globe, 
  Users, 
  ArrowRight, 
  Heart, 
  Calendar, 
  ShieldCheck, 
  Layers,
  LayoutTemplate
} from 'lucide-react';

// --- TYPES & ARCHITECTURE DEFINITIONS ---

type TenantConfig = {
  id: string;
  name: string;
  slug: string; // Acts as subdomain
  description: string;
  theme: {
    primary: string; // Hex code
    secondary: string;
    accent: string;
  };
  features: string[];
};

// --- MOCK DATABASE (lib/db.ts) ---

const MOCK_TENANTS: Record<string, TenantConfig> = {
  'climate-action': {
    id: 't_01',
    name: 'Climate Action Now',
    slug: 'climate-action',
    description: 'Mobilizing communities for a sustainable future.',
    theme: {
      primary: '#166534', // green-800
      secondary: '#dcfce7', // green-100
      accent: '#22c55e', // green-500
    },
    features: ['events', 'donations', 'petition'],
  },
  'city-bikes': {
    id: 't_02',
    name: 'City Bike Initiative',
    slug: 'city-bikes',
    description: 'Reclaiming our streets for safer cycling.',
    theme: {
      primary: '#1e40af', // blue-800
      secondary: '#dbeafe', // blue-100
      accent: '#3b82f6', // blue-500
    },
    features: ['events', 'volunteers'],
  },
};

// --- SHARED UI COMPONENTS (components/ui/*.tsx) ---

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  style = {}
}: { 
  children?: ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'; 
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary: "text-white shadow-md hover:opacity-90",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
    outline: "border-2 border-current bg-transparent hover:bg-black/5",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-600",
  };

  // Primary variant uses dynamic style for multi-tenancy color injection
  const combinedClass = `${baseStyle} ${variant !== 'primary' ? variants[variant] : ''} ${className}`;
  
  return (
    <button onClick={onClick} className={combinedClass} style={style}>
      {children}
    </button>
  );
};

const Card = ({ 
  children, 
  className = '', 
  style = {} 
}: { 
  children?: ReactNode; 
  className?: string; 
  style?: React.CSSProperties; 
}) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm p-6 ${className}`} style={style}>
    {children}
  </div>
);

const Badge = ({ children, className = '', style = {} }: { children?: ReactNode; className?: string; style?: React.CSSProperties }) => (
  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${className}`} style={style}>
    {children}
  </span>
);

// --- LAYOUTS (app/layout.tsx & app/[tenant]/layout.tsx) ---

// 1. Host Layout (The SaaS Platform)
const HostLayout = ({ children, setRoute }: { children?: ReactNode; setRoute: (r: string) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setRoute('/')}>
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
              <Layers size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Activist<span className="text-brand-600">App</span></span>
          </div>
          
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <button className="hover:text-brand-600 transition-colors">Features</button>
            <button className="hover:text-brand-600 transition-colors">Pricing</button>
            <button className="hover:text-brand-600 transition-colors">Documentation</button>
          </nav>

          <div className="hidden md:flex gap-3">
            <Button variant="ghost" onClick={() => alert('Log in flow')}>Log in</Button>
            <Button variant="primary" className="bg-brand-600 hover:bg-brand-700" onClick={() => alert('Sign up flow')}>Start a Movement</Button>
          </div>

          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 flex flex-col gap-4">
           <button className="text-left font-medium text-slate-600">Features</button>
           <button className="text-left font-medium text-slate-600">Pricing</button>
           <Button variant="primary" className="bg-brand-600 w-full text-white">Get Started</Button>
        </div>
      )}

      <main className="flex-grow fade-in">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2024 Activist App Platform. Built for change.</p>
        </div>
      </footer>
    </div>
  );
};

// 2. Tenant Layout (The Movement Site)
const TenantLayout = ({ 
  children, 
  tenantConfig,
  setRoute 
}: { 
  children?: ReactNode; 
  tenantConfig: TenantConfig;
  setRoute: (r: string) => void;
}) => {
  // Inject tenant CSS variables or styles dynamically
  const { theme } = tenantConfig;

  return (
    <div className="min-h-screen flex flex-col font-sans fade-in" style={{ backgroundColor: '#fafafa' }}>
      <header 
        className="text-white shadow-lg"
        style={{ backgroundColor: theme.primary }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setRoute(`/t/${tenantConfig.slug}`)}>
            <div className="p-2 bg-white/20 rounded-full">
              <Globe size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight">{tenantConfig.name}</span>
          </div>
          <div className="flex gap-4">
             <Button 
               variant="primary" 
               style={{ backgroundColor: 'white', color: theme.primary }}
               className="font-bold"
               onClick={() => alert(`Donating to ${tenantConfig.name}`)}
             >
               Donate
             </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="py-8 text-center text-white/80" style={{ backgroundColor: theme.primary }}>
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-sm">Powered by <strong>ActivistApp</strong></p>
           <div className="flex gap-4 text-sm">
             <span className="cursor-pointer hover:underline">Privacy</span>
             <span className="cursor-pointer hover:underline">Terms</span>
           </div>
        </div>
      </footer>
    </div>
  );
};

// --- PAGES (app/page.tsx, app/[tenant]/page.tsx) ---

const HostHomePage = ({ navigateToTenant }: { navigateToTenant: (slug: string) => void }) => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 text-center max-w-4xl mx-auto">
        <Badge className="bg-brand-50 text-brand-700 border border-brand-100 mb-6 inline-block">
          v1.0 Public Beta
        </Badge>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
          Launch your movement <br className="hidden md:block" />
          <span className="text-brand-600">in minutes, not months.</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          The all-in-one platform for activists, non-profits, and community leaders. 
          Manage events, donations, and volunteers without writing a single line of code.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-brand-600 hover:bg-brand-700 text-lg px-8 py-4"
            onClick={() => navigateToTenant('climate-action')}
          >
            View Demo Campaign
          </Button>
          <Button variant="secondary" className="text-lg px-8 py-4">
            Read Manifesto
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: LayoutTemplate, title: "No-Code Builder", desc: "Drag-and-drop interface to build stunning campaign pages." },
              { icon: Users, title: "Volunteer CRM", desc: "Track signups, skills, and engagement in one secure database." },
              { icon: ShieldCheck, title: "Secure Donations", desc: "Enterprise-grade security for processing contributions." }
            ].map((f, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-lg flex items-center justify-center mb-4">
                  <f.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const TenantHomePage = ({ config }: { config: TenantConfig }) => {
  const { theme } = config;
  
  return (
    <>
      {/* Tenant Hero */}
      <section 
        className="py-20 px-4 text-center text-white"
        style={{ 
          background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)` 
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-md">
            {config.description}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join {config.name} in making a difference today. We need your help to achieve our goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              className="px-8 py-4 text-lg font-bold shadow-lg transform hover:-translate-y-1"
              style={{ backgroundColor: 'white', color: theme.primary }}
            >
              Join the Movement
            </Button>
            <Button 
              className="px-8 py-4 text-lg border-2 border-white hover:bg-white/10"
              style={{ color: 'white' }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Tenant Content / Action Center */}
      <section className="max-w-5xl mx-auto px-4 -mt-10 relative z-10 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="flex flex-col items-start gap-4 h-full border-t-4" style={{ borderColor: theme.accent }}>
            <div className="p-3 rounded-full bg-slate-50 text-slate-700">
              <Calendar size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Upcoming Events</h3>
              <p className="text-slate-600 mt-2">Join us at our next town hall or rally. Your presence matters.</p>
            </div>
            <Button variant="outline" className="mt-auto w-full">View Calendar</Button>
          </Card>

          <Card className="flex flex-col items-start gap-4 h-full border-t-4" style={{ borderColor: theme.accent }}>
            <div className="p-3 rounded-full bg-slate-50 text-slate-700">
              <Heart size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Support Our Cause</h3>
              <p className="text-slate-600 mt-2">Your donations help us print flyers, organize events, and spread the word.</p>
            </div>
            <Button 
              className="mt-auto w-full text-white font-semibold"
              style={{ backgroundColor: theme.accent }}
            >
              Donate Now
            </Button>
          </Card>
        </div>

        {/* Community Feed / Updates */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Latest Updates</h2>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-lg p-6 flex gap-4">
                <div className="w-16 h-16 bg-slate-200 rounded-md flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-lg text-slate-800">Community Outreach Success</h4>
                  <p className="text-slate-600 text-sm mb-2">Posted 2 days ago</p>
                  <p className="text-slate-700">We reached over 500 neighbors this weekend! Thanks to everyone who volunteered...</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// --- SIMULATED APP ROUTER & DEBUGGER ---

const App = () => {
  // Simple state-based router to simulate Next.js App Router
  // Routes: 
  // '/' -> Host Home
  // '/t/[slug]' -> Tenant Home
  
  const [currentPath, setCurrentPath] = useState('/');

  // Router Logic
  const navigate = (path: string) => {
    // Removed window.history.pushState to prevent SecurityError in sandbox environments
    setCurrentPath(path);
  };

  // Extract tenant slug from path
  const isTenantRoute = currentPath.startsWith('/t/');
  const tenantSlug = isTenantRoute ? currentPath.split('/')[2] : null;
  const tenantConfig = tenantSlug ? MOCK_TENANTS[tenantSlug] : null;

  // --- DEBUG TOOLS (Architecture Helper) ---
  // In a real app, this would be determined by subdomain
  const DebugSwitcher = () => (
    <div className="fixed bottom-4 right-4 z-50 bg-slate-900 text-white p-2 rounded-lg shadow-xl text-xs flex flex-col gap-2 opacity-90 hover:opacity-100 transition-opacity">
      <div className="font-bold border-b border-slate-700 pb-1">Architect View</div>
      <div className="flex gap-2">
        <button 
          onClick={() => navigate('/')}
          className={`px-2 py-1 rounded ${!isTenantRoute ? 'bg-brand-600' : 'bg-slate-700'}`}
        >
          Host
        </button>
        {Object.values(MOCK_TENANTS).map(t => (
          <button 
            key={t.id}
            onClick={() => navigate(`/t/${t.slug}`)}
            className={`px-2 py-1 rounded ${tenantSlug === t.slug ? 'bg-brand-600' : 'bg-slate-700'}`}
          >
            {t.slug}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <DebugSwitcher />
      
      {isTenantRoute && tenantConfig ? (
        <TenantLayout tenantConfig={tenantConfig} setRoute={navigate}>
          <TenantHomePage config={tenantConfig} />
        </TenantLayout>
      ) : (
        <HostLayout setRoute={navigate}>
          <HostHomePage navigateToTenant={(slug) => navigate(`/t/${slug}`)} />
        </HostLayout>
      )}
    </>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);