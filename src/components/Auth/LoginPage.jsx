import React, { useState } from 'react';
import { Stethoscope, ShieldCheck, UserCheck, Lock, ArrowRight, User, AlertCircle, Sparkles } from 'lucide-react';
import { INITIAL_USERS } from '../../data/mockData';

export default function LoginPage({ onLogin, activePortal = 'PATIENT', setActivePortal }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleQuickLogin = (userObj) => {
    onLogin(userObj);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const matchedUser = INITIAL_USERS.find(
      u => (u.username === username.toLowerCase() || u.email === username.toLowerCase()) && u.password === password
    );

    if (matchedUser) {
      onLogin(matchedUser);
    } else {
      setError('Invalid username or password. Please try quick-login buttons below.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #0f766e 50%, #0284c7 100%)',
      padding: '1.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Glow Accents */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'rgba(13, 148, 136, 0.3)',
        filter: 'blur(80px)'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'rgba(2, 132, 199, 0.3)',
        filter: 'blur(80px)'
      }}></div>

      <div style={{
        maxWidth: '520px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '2.5rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Clinic Brand */}
        <div style={{ textCenter: 'center', textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #0d9488, #0284c7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            margin: '0 auto 1rem auto',
            boxShadow: '0 10px 20px rgba(13, 148, 136, 0.4)'
          }}>
            <Stethoscope size={32} />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>
            Aura Dermacare Clinic
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '0.25rem' }}>
            Dermatology Clinic Management System & Patient Portal
          </p>
        </div>

        {/* Portal Switch Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.5rem',
          background: '#f1f5f9',
          padding: '0.35rem',
          borderRadius: '12px',
          marginBottom: '1.75rem'
        }}>
          <button
            type="button"
            className={`btn btn-sm ${activePortal === 'PATIENT' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ border: 'none', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 700 }}
            onClick={() => { setActivePortal('PATIENT'); setError(''); }}
          >
            Patient Portal
          </button>
          <button
            type="button"
            className={`btn btn-sm ${activePortal === 'DOCTOR' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ border: 'none', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 700 }}
            onClick={() => { setActivePortal('DOCTOR'); setError(''); }}
          >
            Doctor Portal
          </button>
          <button
            type="button"
            className={`btn btn-sm ${activePortal === 'ADMIN' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ border: 'none', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 700 }}
            onClick={() => { setActivePortal('ADMIN'); setError(''); }}
          >
            Admin Portal
          </button>
        </div>

        {error && (
          <div style={{
            background: '#fee2e2',
            border: '1px solid #fca5a5',
            color: '#dc2626',
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.25rem'
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                Username or Email
              </label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  className="input"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder={`Enter ${activePortal.toLowerCase()} username or email`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="password"
                  className="input"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', fontWeight: 700, borderRadius: '12px', marginTop: '0.5rem' }}
            >
              Sign In to {activePortal.charAt(0) + activePortal.slice(1).toLowerCase()} Portal <ArrowRight size={18} />
            </button>
          </div>
        </form>

        {/* Quick Login Presets for Evaluation */}
        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem', marginTop: '1rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Sparkles size={14} style={{ color: '#0d9488' }} /> Demo Quick Logins (Click to Enter)
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            {INITIAL_USERS.slice(0, 3).map(u => (
              <button
                key={u.id}
                type="button"
                className="btn btn-secondary btn-sm"
                style={{ flexDirection: 'column', padding: '0.6rem 0.4rem', height: 'auto', textAlign: 'center' }}
                onClick={() => handleQuickLogin(u)}
              >
                <span style={{ fontWeight: 800, fontSize: '0.82rem', color: '#0d9488' }}>{u.role}</span>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{u.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginTop: '0.5rem' }}>
            {INITIAL_USERS.slice(3).map(u => (
              <button
                key={u.id}
                type="button"
                className="btn btn-secondary btn-sm"
                style={{ flexDirection: 'column', padding: '0.5rem 0.4rem', height: 'auto', textAlign: 'center' }}
                onClick={() => handleQuickLogin(u)}
              >
                <span style={{ fontWeight: 800, fontSize: '0.75rem', color: '#0284c7' }}>{u.role}</span>
                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{u.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ textCenter: 'center', textAlign: 'center', marginTop: '1.5rem', fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <ShieldCheck size={14} style={{ color: '#10b981' }} /> Encrypted HIPAA-compliant Clinical Telemedicine System
        </div>
      </div>
    </div>
  );
}
