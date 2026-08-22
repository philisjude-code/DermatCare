import React, { useState } from 'react';
import { Settings, ShieldCheck, Lock, User, FileText, History, CheckCircle2 } from 'lucide-react';
import { INITIAL_USERS } from '../../data/mockData';

export default function SettingsAudit({ clinicInfo, setClinicInfo, auditLogs }) {
  const [activeSubTab, setActiveSubTab] = useState('clinic'); // 'clinic' | 'users' | 'audit'
  const [name, setName] = useState(clinicInfo.name);
  const [doctor, setDoctor] = useState(clinicInfo.doctor);
  const [specialty, setSpecialty] = useState(clinicInfo.specialty);
  const [licenseNo, setLicenseNo] = useState(clinicInfo.licenseNo);
  const [address, setAddress] = useState(clinicInfo.address);
  const [phone, setPhone] = useState(clinicInfo.phone);
  const [email, setEmail] = useState(clinicInfo.email);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveClinic = (e) => {
    e.preventDefault();
    setClinicInfo({
      ...clinicInfo,
      name,
      doctor,
      specialty,
      licenseNo,
      address,
      phone,
      email
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Clinic Settings & Security Audit Logs</h1>
          <p className="page-description">Manage clinic credentials, user role assignments, and HIPAA security audit logs.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className={`btn btn-sm ${activeSubTab === 'clinic' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveSubTab('clinic')}>
            Clinic Profile
          </button>
          <button className={`btn btn-sm ${activeSubTab === 'users' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveSubTab('users')}>
            User Roles ({INITIAL_USERS.length})
          </button>
          <button className={`btn btn-sm ${activeSubTab === 'audit' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveSubTab('audit')}>
            Audit Logs ({auditLogs.length})
          </button>
        </div>
      </div>

      {activeSubTab === 'clinic' && (
        <div className="card" style={{ maxWidth: '750px', margin: '0 auto', width: '100%' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Settings size={18} style={{ color: 'var(--primary)' }} /> Update Clinic Profile & Medical Credentials
          </h3>

          {saveSuccess ? (
            <div style={{ padding: '1.5rem', background: 'var(--success-bg)', color: 'var(--success)', borderRadius: 'var(--radius-md)', textAlign: 'center', marginBottom: '1rem' }}>
              <CheckCircle2 size={36} style={{ margin: '0 auto 0.5rem auto' }} />
              <div style={{ fontWeight: 800 }}>Clinic Profile Updated Successfully!</div>
            </div>
          ) : (
            <form onSubmit={handleSaveClinic} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div className="grid grid-cols-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Clinic Name</label>
                  <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Lead Dermatologist</label>
                  <input type="text" className="input" value={doctor} onChange={(e) => setDoctor(e.target.value)} required />
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Medical Specialty</label>
                  <input type="text" className="input" value={specialty} onChange={(e) => setSpecialty(e.target.value)} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Medical License Number</label>
                  <input type="text" className="input" value={licenseNo} onChange={(e) => setLicenseNo(e.target.value)} required />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Clinic Address</label>
                <input type="text" className="input" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>

              <div className="grid grid-cols-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Phone Contact</label>
                  <input type="text" className="input" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Email Address</label>
                  <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-primary">
                  <CheckCircle2 size={16} /> Save Clinic Settings
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {activeSubTab === 'users' && (
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Registered System Users & Role Permissions</h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>User Name</th>
                  <th>Username / Email</th>
                  <th>Assigned Role</th>
                  <th>Access Scope</th>
                </tr>
              </thead>
              <tbody>
                {INITIAL_USERS.map(u => (
                  <tr key={u.id}>
                    <td style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{u.id}</td>
                    <td style={{ fontWeight: 700 }}>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`badge ${u.role === 'ADMIN' ? 'badge-danger' : u.role === 'DOCTOR' ? 'badge-primary' : u.role === 'PATIENT' ? 'badge-success' : 'badge-accent'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {u.role === 'ADMIN' ? 'Full Clinic Administrative Control' :
                       u.role === 'DOCTOR' ? 'Clinical Workspace & EMR Access' :
                       u.role === 'PATIENT' ? 'Personal Profile & Appointments' : 'Front-desk / Inventory Operations'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSubTab === 'audit' && (
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <History size={18} style={{ color: 'var(--primary)' }} /> HIPAA Privacy Audit Log
          </h3>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Log ID & Timestamp</th>
                  <th>User</th>
                  <th>Role</th>
                  <th>Action Type</th>
                  <th>Event Details</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map(l => (
                  <tr key={l.id}>
                    <td>
                      <div style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{l.id}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{l.timestamp}</div>
                    </td>
                    <td style={{ fontWeight: 700 }}>{l.user}</td>
                    <td><span className="badge badge-accent">{l.role}</span></td>
                    <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{l.action}</td>
                    <td style={{ fontSize: '0.85rem' }}>{l.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
