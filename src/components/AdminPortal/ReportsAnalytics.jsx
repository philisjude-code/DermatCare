import React from 'react';
import {
  BarChart3, TrendingUp, Calendar, Package, AlertTriangle, Users, CheckCircle2,
  PieChart as PieIcon, IndianRupee, Award
} from 'lucide-react';

export default function ReportsAnalytics({
  appointments,
  consultations,
  sales,
  stock,
  followups,
  patients
}) {
  // Category Breakdown Metrics
  const categoryCounts = {
    'Skin Related': appointments.filter(a => a.consultationCategory === 'Skin Related' || !a.consultationCategory).length,
    'Hair Related': appointments.filter(a => a.consultationCategory === 'Hair Related').length,
    'Nail Related': appointments.filter(a => a.consultationCategory === 'Nail Related').length,
    'Mucous Membrane Related': appointments.filter(a => a.consultationCategory === 'Mucous Membrane Related').length,
    'Cosmetic Dermatology': appointments.filter(a => a.consultationCategory === 'Cosmetic Dermatology').length,
    'Pediatric Dermatology': appointments.filter(a => a.consultationCategory === 'Pediatric Dermatology').length,
    'STI / Venereology': appointments.filter(a => a.consultationCategory === 'Sexually Transmitted Infections').length,
    'Other Concerns': appointments.filter(a => a.consultationCategory === 'Other Dermatological Concerns').length
  };

  const totalAppointments = appointments.length;
  const totalRevenue = sales.reduce((sum, s) => sum + s.totalAmount, 0);

  // Follow up completion rate
  const completedFollowups = followups.filter(f => f.status === 'Completed').length;
  const totalFollowups = followups.length;
  const followUpRate = totalFollowups > 0 ? Math.round((completedFollowups / totalFollowups) * 100) : 100;

  // Inventory Alerts
  const lowStockItems = stock.filter(s => s.stock <= s.minThreshold);
  const outOfStockItems = stock.filter(s => s.stock === 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Clinic Analytics & Performance Reports</h1>
          <p className="page-description">Real-time statistics on consultations, categories, revenue, and inventory performance.</p>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-4">
        <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Patients</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{patients.length}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--success)', marginTop: '0.2rem' }}>Registered Patients</div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--accent)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Appointments</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{totalAppointments}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Skin, Hair & Cosmetic</div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--success)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Monthly Revenue</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--success)' }}>₹{totalRevenue.toFixed(2)}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>From OTC & Prescriptions</div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #a855f7' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Follow-up Completion Rate</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#a855f7' }}>{followUpRate}%</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{completedFollowups} of {totalFollowups} completed</div>
        </div>
      </div>

      {/* Grid: Consultation Categories Breakdown Chart & Inventory Alerts */}
      <div className="grid grid-cols-2">
        {/* Consultation Categories Chart */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart3 size={18} style={{ color: 'var(--primary)' }} /> Cases by Dermatology Category
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const pct = totalAppointments > 0 ? Math.round((count / totalAppointments) * 100) : 0;
              return (
                <div key={cat}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    <span>{cat}</span>
                    <span style={{ color: 'var(--primary)' }}>{count} cases ({pct}%)</span>
                  </div>
                  <div style={{ height: '8px', background: 'var(--bg-app)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, var(--primary), var(--accent))', borderRadius: '9999px', transition: 'width 0.5s ease' }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Inventory & Stock Alert Health Card */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={18} style={{ color: 'var(--warning)' }} /> Inventory Health & Reorder Alerts
          </h3>

          {lowStockItems.length === 0 && outOfStockItems.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <CheckCircle2 size={40} style={{ color: 'var(--success)', margin: '0 auto 0.5rem auto' }} />
              <div>Inventory status is optimal. No reorder required.</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {lowStockItems.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', background: 'var(--warning-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--warning)' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Category: {item.category} • Batch: {item.batchNo}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="badge badge-warning">{item.stock} left</span>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>Min: {item.minThreshold}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
