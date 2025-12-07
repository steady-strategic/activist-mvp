// apps/web/app/(admin)/dashboard/page.tsx
import React, { useState, useEffect } from 'react';
import { Card, Button } from '../../../../../packages/ui/src/index';
import { getTenants, createTenant, deleteTenant } from '../../../lib/db';
import { TenantConfig } from '../../../../../../packages/core/src/types';
import { Plus, Trash2, RefreshCw, Globe, ExternalLink } from 'lucide-react';

export default function DashboardPage({ switchDomain }: { switchDomain: (domain: string) => void }) {
  const [campaigns, setCampaigns] = useState<TenantConfig[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: ''
  });

  // Hydrate data on mount
  useEffect(() => {
    setCampaigns(getTenants());
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.slug) return;

    const slug = formData.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');

    if (getTenants().find(t => t.slug === slug)) {
      alert('This domain slug is already in use.');
      return;
    }

    const newTenant: TenantConfig = {
      id: `t_${Date.now()}`,
      name: formData.name,
      slug: slug,
      description: formData.description || 'A new grassroots movement.',
      theme: {
        // Generate a random bold color for the primary theme
        primary: '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'),
        secondary: '#f8fafc',
        accent: '#3b82f6'
      },
      features: ['events']
    };

    createTenant(newTenant);
    setCampaigns(getTenants()); // Refresh list
    setFormData({ name: '', slug: '', description: '' }); // Reset form
  };

  const handleDelete = (slug: string) => {
    if (window.confirm(`Are you sure you want to delete the campaign "${slug}"?`)) {
      deleteTenant(slug);
      setCampaigns(getTenants());
    }
  };

  const handleRebuild = (slug: string) => {
    // In a real app, this would trigger a Vercel deploy or cache invalidation
    alert(`Triggered rebuild for ${slug}.activist.com`);
  };

  return (
    <div className="space-y-10">
      
      {/* 1. CREATE CAMPAIGN */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-blue-600 text-white p-1 rounded">
            <Plus size={16} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Create Campaign</h2>
        </div>
        
        <Card className="bg-white border-slate-200 shadow-sm">
          <form onSubmit={handleCreate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Campaign Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Save Our Parks"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Domain Slug</label>
                <div className="flex items-center">
                  <input 
                    type="text" 
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="save-parks"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                  <div className="bg-slate-100 border border-l-0 border-slate-300 px-3 py-2 rounded-r-lg text-slate-500 text-sm font-medium">
                    .activist.com
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Mission Description</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Briefly describe the goal of this movement..."
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-y"
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                Generate Campaign Site
              </Button>
            </div>
          </form>
        </Card>
      </section>

      {/* 2. ACTIVE CAMPAIGNS LIST */}
      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Active Campaigns</h2>
        <div className="grid gap-4">
          {campaigns.length === 0 && (
            <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 text-slate-500">
              <Globe size={48} className="mx-auto text-slate-300 mb-3" />
              <p className="font-medium">No campaigns found.</p>
              <p className="text-sm">Create your first campaign above to get started.</p>
            </div>
          )}

          {campaigns.map((tenant) => (
            <Card key={tenant.id} className="group hover:border-blue-300 transition-colors p-5">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* Tenant Info */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm shrink-0" 
                    style={{ backgroundColor: tenant.theme.primary }}
                  >
                    {tenant.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg leading-tight">{tenant.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-mono text-xs border border-slate-200">
                        {tenant.slug}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 w-full md:w-auto border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
                  <Button 
                    variant="outline" 
                    className="flex-1 md:flex-initial text-slate-600 hover:text-blue-600 hover:border-blue-200"
                    onClick={() => handleRebuild(tenant.slug)}
                    title="Rebuild Assets"
                  >
                    <RefreshCw size={16} />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex-1 md:flex-initial text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50"
                    onClick={() => handleDelete(tenant.slug)}
                    title="Delete Campaign"
                  >
                    <Trash2 size={16} />
                  </Button>

                  <div className="h-8 w-px bg-slate-200 mx-1 hidden md:block"></div>

                  <Button 
                    className="flex-1 md:flex-initial bg-slate-800 text-white hover:bg-slate-900"
                    onClick={() => switchDomain(`${tenant.slug}.activist.com`)}
                  >
                    <span className="mr-2">Visit Site</span>
                    <ExternalLink size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. OVERVIEW / STATS (Moved to bottom) */}
      <section className="pt-8 border-t border-slate-200">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Globe size={18} className="text-slate-400" /> 
          Platform Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="Total Supporters" value="12,450" trend="+12%" />
          <StatCard label="Donations (MTD)" value="$45,200" trend="+5%" />
          <StatCard label="Active Campaigns" value={campaigns.length.toString()} trend={`${campaigns.length > 2 ? '+1' : '0'} vs last week`} />
        </div>
      </section>
    </div>
  );
}

const StatCard = ({ label, value, trend }: any) => (
  <Card className="bg-slate-50 border-slate-200">
    <div className="text-slate-500 text-sm font-medium mb-1">{label}</div>
    <div className="text-2xl font-bold text-slate-900">{value}</div>
    <div className="text-emerald-600 text-xs font-bold uppercase tracking-wide mt-2">{trend}</div>
  </Card>
);
