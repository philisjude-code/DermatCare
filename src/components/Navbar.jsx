import React from 'react';
import { Sun, Moon, Search, Sparkles, Activity, ShieldCheck, UserCheck, LogOut } from 'lucide-react';
import { INITIAL_USERS } from '../data/mockData';

export default function Navbar({
  currentUser,
  setCurrentUser,
  theme,
  toggleTheme,
  searchQuery,
  setSearchQuery,
  clinicInfo,
  onLogout
}) {
  return (
    <header className="navbar no-print">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, maxWidth: '450px' }}>
        <div style={{ position: 'relative', width: '100%' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="input"
            style={{ paddingLeft: '2.4rem', borderRadius: '9999px', fontSize: '0.85rem' }}
            placeholder="Search patients, prescriptions, SKUs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Quick Role Switcher Selector for seamless testing */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--bg-app)', padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <UserCheck size={14} style={{ color: 'var(--primary)' }} />
          <select
            className="select"
            style={{ fontSize: '0.78rem', padding: '0.2rem', border: 'none', background: 'transparent' }}
            value={currentUser?.role || 'ADMIN'}
            onChange={(e) => {
              const targetRole = e.target.value;
              const foundUser = INITIAL_USERS.find(u => u.role === targetRole) || INITIAL_USERS[0];
              setCurrentUser(foundUser);
            }}
          >
            <option value="ADMIN">Role: ADMIN</option>
            <option value="DOCTOR">Role: DOCTOR</option>
            <option value="PATIENT">Role: PATIENT</option>
            <option value="RECEPTIONIST">Role: RECEPTIONIST</option>
            <option value="INVENTORY_MANAGER">Role: INVENTORY</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--primary-light)', padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.82rem', fontWeight: 600, color: 'var(--primary)' }}>
          <ShieldCheck size={16} />
          <span>{clinicInfo.name}</span>
        </div>

        <button
          onClick={toggleTheme}
          className="btn btn-secondary btn-sm"
          style={{ borderRadius: '50%', width: '38px', height: '38px', padding: 0 }}
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <button
          onClick={onLogout}
          className="btn btn-secondary btn-sm"
          title="Sign Out"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
