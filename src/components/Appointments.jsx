import React, { useState } from 'react';
import { Calendar, Plus, User, Clock, CheckCircle2, XCircle, ArrowUpRight, Filter, Search, Stethoscope, FileText, Image as ImageIcon } from 'lucide-react';
import { DERMATOLOGY_CATEGORIES, SEVERITY_LEVELS } from '../data/dermatologyCategories';

export default function Appointments({
  appointments,
  setAppointments,
  patients,
  setPatients,
  setActiveTab,
  setSelectedPatientForRx,
  onOpenConsultation,
  onViewMedicalRecord
}) {
  const [activeFilter, setActiveFilter] = useState('ALL'); // 'ALL' | 'Pending' | 'Confirmed' | 'Checked In' | 'In Consultation' | 'Completed' | 'Cancelled'
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [registrationMode, setRegistrationMode] = useState('EXISTING');
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || '');

  // New Patient Fields
  const [newName, setNewName] = useState('');
  const [newDob, setNewDob] = useState('2000-01-15');
  const [newGender, setNewGender] = useState('Female');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newSkinType, setNewSkinType] = useState('Type III (Light Brown)');
  const [newAllergies, setNewAllergies] = useState('None');

  // Appointment Fields
  const [bookCategory, setBookCategory] = useState(DERMATOLOGY_CATEGORIES[0].id);
  const selectedCategoryObj = DERMATOLOGY_CATEGORIES.find(c => c.id === bookCategory) || DERMATOLOGY_CATEGORIES[0];
  const [bookProblem, setBookProblem] = useState(selectedCategoryObj.problems[0]);
  const [aptDate, setAptDate] = useState('2026-08-22');
  const [aptTime, setAptTime] = useState('11:00 AM');
  const [aptDuration, setAptDuration] = useState('2 Weeks');
  const [aptSeverity, setAptSeverity] = useState(SEVERITY_LEVELS[0]);
  const [aptSymptoms, setAptSymptoms] = useState('');
  const [aptPrevTreatment, setAptPrevTreatment] = useState('');

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    let targetPatientId = selectedPatientId;
    let targetPatientName = '';

    if (registrationMode === 'NEW') {
      if (!newName) return;
      const createdPat = {
        id: `PAT-${Math.floor(100 + Math.random() * 900)}`,
        name: newName,
        dob: newDob,
        age: 26,
        gender: newGender,
        phone: newPhone || '+1 (555) 000-0000',
        email: newEmail || `${newName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        fitzpatrickSkinType: newSkinType,
        allergies: newAllergies || 'None',
        existingConditions: 'None',
        currentMedications: 'None',
        dermatologicalHistory: 'New patient registered.',
        medicalHistory: 'New patient registered.',
        createdDate: new Date().toISOString().split('T')[0]
      };
      setPatients([createdPat, ...patients]);
      targetPatientId = createdPat.id;
      targetPatientName = createdPat.name;
    } else {
      const existing = patients.find(p => p.id === selectedPatientId);
      targetPatientName = existing ? existing.name : 'Unknown Patient';
    }

    const newApt = {
      id: `APT-${Math.floor(500 + Math.random() * 500)}`,
      patientId: targetPatientId,
      patientName: targetPatientName,
      date: aptDate,
      time: aptTime,
      doctor: 'Dr. Sarah Vance, MD (Dermatology)',
      consultationCategory: selectedCategoryObj.name,
      problem: bookProblem,
      type: `${selectedCategoryObj.name} - ${bookProblem}`,
      status: 'Confirmed',
      duration: aptDuration,
      symptoms: aptSymptoms,
      severity: aptSeverity,
      previousTreatment: aptPrevTreatment || 'None',
      notes: aptSymptoms || 'Appointment registered via clinic desk.'
    };

    setAppointments([newApt, ...appointments]);
    setShowModal(false);
    setNewName('');
    setAptSymptoms('');
  };

  const handleStatusChange = (aptId, newStatus) => {
    setAppointments(appointments.map(a => a.id === aptId ? { ...a, status: newStatus } : a));
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesFilter = activeFilter === 'ALL' || apt.status === activeFilter;
    const matchesSearch = apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (apt.problem && apt.problem.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          apt.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          apt.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Appointment Desk & Schedule Management</h1>
          <p className="page-description">Register patients, filter consultation categories, and launch doctor consultations.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={16} /> Register New Appointment
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.4rem', background: 'var(--bg-card)', padding: '0.35rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
          {['ALL', 'Pending', 'Confirmed', 'Checked In', 'In Consultation', 'Completed', 'Cancelled'].map(filter => (
            <button
              key={filter}
              className={`btn btn-sm ${activeFilter === filter ? 'btn-primary' : 'btn-secondary'}`}
              style={{ border: 'none' }}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="input"
            style={{ paddingLeft: '2.4rem' }}
            placeholder="Search patient or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Appointment Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Appt ID & Time</th>
              <th>Patient Name</th>
              <th>Category & Problem</th>
              <th>Symptoms / Duration</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((apt) => (
              <tr key={apt.id}>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{apt.time}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{apt.date} • {apt.id}</div>
                </td>
                <td>
                  <div style={{ fontWeight: 700 }}>{apt.patientName}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {apt.patientId}</div>
                </td>
                <td>
                  <div style={{ fontWeight: 700 }}>{apt.problem || apt.type}</div>
                  <span className="badge badge-accent" style={{ fontSize: '0.7rem' }}>{apt.consultationCategory || 'Skin Related'}</span>
                </td>
                <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)', maxWidth: '220px' }}>
                  {apt.symptoms || apt.notes}
                  {apt.duration && <div style={{ fontSize: '0.72rem', color: 'var(--primary)' }}>Duration: {apt.duration}</div>}
                </td>
                <td>
                  <select
                    className="select"
                    style={{ fontSize: '0.78rem', padding: '0.25rem 0.5rem', width: 'auto' }}
                    value={apt.status}
                    onChange={(e) => handleStatusChange(apt.id, e.target.value)}
                  >
                    {['Pending', 'Confirmed', 'Checked In', 'In Consultation', 'Completed', 'Cancelled', 'No Show', 'Rescheduled'].map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      className="btn btn-primary btn-sm"
                      title="Open Consultation Workspace"
                      onClick={() => {
                        handleStatusChange(apt.id, 'In Consultation');
                        if (onOpenConsultation) onOpenConsultation(apt);
                      }}
                    >
                      <Stethoscope size={14} /> Consult
                    </button>

                    <button
                      className="btn btn-secondary btn-sm"
                      title="View Medical EMR Record"
                      onClick={() => {
                        if (onViewMedicalRecord) onViewMedicalRecord(apt.patientId);
                      }}
                    >
                      <FileText size={14} /> EMR
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Registration Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '700px' }}>
            <div className="modal-header">
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Register Patient Appointment</h3>
              <button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <form onSubmit={handleRegisterSubmit}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Patient Registration Mode</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <button type="button" className={`btn ${registrationMode === 'EXISTING' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setRegistrationMode('EXISTING')}>
                      Select Existing Patient
                    </button>
                    <button type="button" className={`btn ${registrationMode === 'NEW' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setRegistrationMode('NEW')}>
                      + Register New Patient
                    </button>
                  </div>
                </div>

                {registrationMode === 'EXISTING' ? (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Select Patient</label>
                    <select className="select" value={selectedPatientId} onChange={(e) => setSelectedPatientId(e.target.value)}>
                      {patients.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.gender}, {p.age}y) - {p.phone}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div style={{ background: 'var(--bg-app)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div className="grid grid-cols-2">
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.2rem' }}>Full Name</label>
                        <input type="text" className="input" placeholder="e.g. Chloe Bennett" value={newName} onChange={(e) => setNewName(e.target.value)} required />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.2rem' }}>Date of Birth</label>
                        <input type="date" className="input" value={newDob} onChange={(e) => setNewDob(e.target.value)} required />
                      </div>
                    </div>

                    <div className="grid grid-cols-2">
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.2rem' }}>Phone</label>
                        <input type="text" className="input" placeholder="+1 (555) 000-0000" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.2rem' }}>Email</label>
                        <input type="email" className="input" placeholder="patient@example.com" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--danger)', marginBottom: '0.2rem' }}>Known Allergies</label>
                      <input type="text" className="input" placeholder="e.g. Penicillin, Latex" value={newAllergies} onChange={(e) => setNewAllergies(e.target.value)} />
                    </div>
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>1. Consultation Category</label>
                  <select className="select" value={bookCategory} onChange={(e) => {
                    setBookCategory(e.target.value);
                    const catObj = DERMATOLOGY_CATEGORIES.find(c => c.id === e.target.value);
                    if (catObj) setBookProblem(catObj.problems[0]);
                  }}>
                    {DERMATOLOGY_CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>2. Specific Concern / Problem</label>
                  <select className="select" value={bookProblem} onChange={(e) => setBookProblem(e.target.value)}>
                    {selectedCategoryObj.problems.map(prob => <option key={prob} value={prob}>{prob}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Appointment Date</label>
                    <input type="date" className="input" value={aptDate} onChange={(e) => setAptDate(e.target.value)} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Time Slot</label>
                    <select className="select" value={aptTime} onChange={(e) => setAptTime(e.target.value)}>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="03:30 PM">03:30 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Chief Symptoms / Notes</label>
                  <input type="text" className="input" placeholder="Describe symptoms or clinical notes..." value={aptSymptoms} onChange={(e) => setAptSymptoms(e.target.value)} />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Confirm Registration</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
