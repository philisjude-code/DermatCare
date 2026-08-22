import React from 'react';
import { Package, FileText, Calendar, BellRing, AlertTriangle, ArrowUpRight, Plus, ArrowDownRight, CheckCircle2, BookOpen, Users, IndianRupee, ShoppingBag, BarChart3, Stethoscope } from 'lucide-react';

export default function Dashboard({
  stock,
  appointments,
  prescriptions,
  followups,
  sales,
  patients,
  setActiveTab,
  setSelectedPatientForRx,
  onOpenConsultation,
  onViewMedicalRecord
}) {
  const lowStockItems = stock.filter(item => item.stock <= item.minThreshold && item.stock > 0);
  const outOfStockItems = stock.filter(item => item.stock === 0);
  const todaysAppointments = appointments.filter(apt => apt.date === '2026-08-22');
  const pendingAppointments = appointments.filter(apt => apt.status === 'Pending' || apt.status === 'Confirmed');
  const completedConsultations = appointments.filter(apt => apt.status === 'Completed');
  const upcomingFollowups = followups.filter(f => f.status === 'Upcoming' || f.status === 'Pending');
  const missedFollowups = followups.filter(f => f.status === 'Missed');

  const totalSalesRevenue = sales.reduce((sum, s) => sum + s.totalAmount, 0);
  const todaysSales = sales.filter(s => s.date.includes('2026-08-22'));
  const todaysSalesRevenue = todaysSales.reduce((sum, s) => sum + s.totalAmount, 0);
  const totalStockValue = stock.reduce((sum, item) => sum + (item.stock * (item.sellingPrice || item.unitPrice || 0)), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Clinic Control Center & Dashboard</h1>
          <p className="page-description">Overview of today's appointments, clinical consultations, inventory alerts, and revenue.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={() => setActiveTab('sales')}>
            <ShoppingBag size={16} /> Sales POS
          </button>
          <button className="btn btn-secondary" onClick={() => setActiveTab('inventory')}>
            <Package size={16} /> Manage Stock
          </button>
          <button className="btn btn-primary" onClick={() => setActiveTab('appointments')}>
            <Plus size={16} /> New Appointment
          </button>
        </div>
      </div>

      {/* Row 1: Primary Stats Cards */}
      <div className="grid grid-cols-4">
        <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Total Patients</span>
            <div style={{ background: 'var(--primary-light)', padding: '0.4rem', borderRadius: 'var(--radius-sm)', color: 'var(--primary)' }}>
              <Users size={20} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{patients.length}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
            Registered EMR Profiles
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--accent)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Today's Appointments</span>
            <div style={{ background: 'var(--accent-light)', padding: '0.4rem', borderRadius: 'var(--radius-sm)', color: 'var(--accent)' }}>
              <Calendar size={20} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{todaysAppointments.length}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
            {pendingAppointments.length} Pending • {completedConsultations.length} Completed
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--success)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Monthly Sales & Revenue</span>
            <div style={{ background: 'var(--success-bg)', padding: '0.4rem', borderRadius: 'var(--radius-sm)', color: 'var(--success)' }}>
              <IndianRupee size={20} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--success)' }}>₹{totalSalesRevenue.toFixed(2)}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
            Today: ₹{todaysSalesRevenue.toFixed(2)} ({todaysSales.length} sales)
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--warning)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Follow-ups & Alerts</span>
            <div style={{ background: 'var(--warning-bg)', padding: '0.4rem', borderRadius: 'var(--radius-sm)', color: 'var(--warning)' }}>
              <BellRing size={20} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{upcomingFollowups.length}</div>
          <div style={{ fontSize: '0.8rem', color: missedFollowups.length > 0 ? 'var(--danger)' : 'var(--text-muted)', marginTop: '0.3rem' }}>
            {missedFollowups.length} Missed Follow-ups
          </div>
        </div>
      </div>

      {/* Row 2: Secondary Stats & Quick Action Bar */}
      <div className="card" style={{ background: 'linear-gradient(135deg, var(--bg-card), var(--primary-light))' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Clinic Module Shortcuts</h3>
        <div className="grid grid-cols-4">
          <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', padding: '0.85rem', height: 'auto' }} onClick={() => setActiveTab('appointments')}>
            <Calendar size={22} style={{ color: 'var(--primary)' }} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700 }}>Appointments & Consults</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Register & launch workspace</div>
            </div>
          </button>

          <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', padding: '0.85rem', height: 'auto' }} onClick={() => setActiveTab('prescription')}>
            <FileText size={22} style={{ color: 'var(--accent)' }} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700 }}>Prescriptions Generator</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Approve & Print Rx</div>
            </div>
          </button>

          <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', padding: '0.85rem', height: 'auto' }} onClick={() => setActiveTab('stock_received')}>
            <ArrowDownRight size={22} style={{ color: 'var(--success)' }} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700 }}>Stock Received Desk</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Log incoming shipments</div>
            </div>
          </button>

          <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', padding: '0.85rem', height: 'auto' }} onClick={() => setActiveTab('sales')}>
            <ShoppingBag size={22} style={{ color: '#a855f7' }} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700 }}>Product Sales & POS</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>OTC checkout & receipts</div>
            </div>
          </button>
        </div>
      </div>

      {/* Row 3: Main Grid - Today's Appointments & Low Stock Warnings */}
      <div className="grid grid-cols-2">
        {/* Today's Appointments & Consultations */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Today's Consultations ({todaysAppointments.length})</h3>
            <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('appointments')}>View All</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {todaysAppointments.map((apt) => (
              <div key={apt.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-app)' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{apt.patientName}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{apt.time} • Category: {apt.consultationCategory || 'Skin Related'}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className={`badge ${apt.status === 'In Consultation' ? 'badge-primary' : apt.status === 'Completed' ? 'badge-success' : 'badge-accent'}`}>
                    {apt.status}
                  </span>
                  <button
                    className="btn btn-primary btn-sm"
                    title="Open Doctor Consultation Workspace"
                    onClick={() => {
                      if (onOpenConsultation) onOpenConsultation(apt);
                    }}
                  >
                    <Stethoscope size={14} /> Consult
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock & Out of Stock Warnings */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={18} style={{ color: 'var(--warning)' }} />
              Inventory Alerts ({lowStockItems.length + outOfStockItems.length})
            </h3>
            <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('inventory')}>Stock Desk</button>
          </div>

          {lowStockItems.length === 0 && outOfStockItems.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <CheckCircle2 size={32} style={{ color: 'var(--success)', marginBottom: '0.5rem' }} />
              <div>All dermatological medicines & products are adequately stocked!</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {outOfStockItems.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--danger-bg)', background: 'var(--danger-bg)' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Category: {item.category}</div>
                  </div>
                  <span className="badge badge-danger">Out of Stock</span>
                </div>
              ))}

              {lowStockItems.map((item) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--warning-bg)', background: 'var(--warning-bg)' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Category: {item.category}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, color: 'var(--warning)', fontSize: '0.95rem' }}>
                      {item.stock} {item.unit} left
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Min: {item.minThreshold}</div>
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
