import React from 'react';
import {
  LayoutDashboard, Package, FileText, Calendar, BellRing, BookOpen, Stethoscope,
  User, ShoppingBag, ArrowDownRight, BarChart3, Settings, ShieldCheck, LogOut
} from 'lucide-react';

export default function Sidebar({ currentUser, activeTab, setActiveTab, clinicInfo, onLogout }) {
  const userRole = currentUser?.role || 'DOCTOR';

  // Role-Based Navigation Config
  const getNavItems = () => {
    if (userRole === 'PATIENT') {
      return [
        { id: 'dashboard', label: 'My Patient Dashboard', icon: LayoutDashboard },
        { id: 'appointments', label: 'My Appointments', icon: Calendar },
        { id: 'prescriptions', label: 'My Prescriptions', icon: FileText },
        { id: 'followups', label: 'Follow-ups', icon: BellRing },
        { id: 'atlas', label: 'Dermatology Atlas', icon: BookOpen }
      ];
    }

    if (userRole === 'INVENTORY_MANAGER') {
      return [
        { id: 'inventory', label: 'Products & Inventory', icon: Package },
        { id: 'stock_received', label: 'Stock Received', icon: ArrowDownRight },
        { id: 'sales', label: 'Sales & POS Desk', icon: ShoppingBag },
        { id: 'reports', label: 'Inventory Reports', icon: BarChart3 }
      ];
    }

    // Default ADMIN / DOCTOR / RECEPTIONIST menu items
    const baseItems = [
      { id: 'dashboard', label: 'Clinic Overview', icon: LayoutDashboard },
      { id: 'appointments', label: 'Appointments Desk', icon: Calendar },
      { id: 'prescription', label: 'Rx Prescriptions', icon: FileText },
      { id: 'followups', label: 'Patient Follow-ups', icon: BellRing },
      { id: 'inventory', label: 'Products & Inventory', icon: Package },
      { id: 'stock_received', label: 'Stock Received', icon: ArrowDownRight },
      { id: 'sales', label: 'Sales & POS', icon: ShoppingBag },
      { id: 'atlas', label: 'Dermatology Atlas', icon: BookOpen }
    ];

    if (userRole === 'ADMIN') {
      baseItems.push(
        { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
        { id: 'settings', label: 'Settings & Audit Logs', icon: Settings }
      );
    }

    return baseItems;
  };

  const menuItems = getNavItems();

  return (
    <aside className="sidebar no-print">
      <div className="brand-header">
        <div className="brand-icon">
          <Stethoscope size={22} />
        </div>
        <div>
          <div className="brand-title">DermatCare</div>
          <div className="brand-subtitle">{userRole} Portal</div>
        </div>
      </div>

      <nav style={{ flex: 1, overflowY: 'auto' }}>
        <ul className="nav-list">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id} className="nav-item">
                <button
                  className={isActive ? 'active' : ''}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon size={18} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-footer" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div className="doctor-badge">
          <div className="avatar">{currentUser?.avatar || 'US'}</div>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {currentUser?.name || clinicInfo.doctor}
            </div>
            <div style={{ color: '#0d9488', fontSize: '0.73rem', fontWeight: 800 }}>Role: {userRole}</div>
          </div>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          style={{ width: '100%', background: 'rgba(255,255,255,0.08)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)' }}
          onClick={onLogout}
        >
          <LogOut size={14} /> Switch User / Logout
        </button>
      </div>
    </aside>
  );
}
