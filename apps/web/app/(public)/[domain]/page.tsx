// apps/web/app/(public)/[domain]/page.tsx
import React from 'react';
import { TenantConfig } from '../../../../../packages/core/src/types';
import { Button, Card } from '../../../../../packages/ui/src/index';
import { Calendar, Heart, ArrowRight } from 'lucide-react';

export default function TenantPage({ tenant }: { tenant: TenantConfig }) {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] opacity-10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold text-[var(--color-primary)] mb-6 tracking-tight">
            {tenant.description}
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            We are building a movement. Join {tenant.name} today and help us create lasting change in our community.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="px-8 py-4 text-lg shadow-xl shadow-[var(--color-primary)]/20">
              Join the Movement
            </Button>
            <Button variant="outline" className="px-8 py-4 text-lg border-[var(--color-primary)] text-[var(--color-primary)]">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Action Grid */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-t-4 border-[var(--color-accent)] hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-lg">
                <Calendar size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Upcoming Events</h3>
                <p className="text-slate-600 mt-2 mb-6">
                  From town halls to street rallies, find out where we'll be next.
                </p>
                <Button variant="outline" className="w-full justify-between group">
                  View Calendar 
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </Card>

          <Card className="border-t-4 border-[var(--color-accent)] hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-lg">
                <Heart size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Donate to the Cause</h3>
                <p className="text-slate-600 mt-2 mb-6">
                  Your contribution fuels our operations. We rely on people like you.
                </p>
                <Button className="w-full justify-between group shadow-lg shadow-[var(--color-accent)]/20 bg-[var(--color-accent)] border-none">
                  Donate Now
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
