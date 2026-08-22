import React, { useState } from 'react';
import {
  User, Calendar, FileText, BellRing, Package, Plus, Sparkles, Upload, Clock,
  CheckCircle2, AlertTriangle, Eye, Printer, Edit2, ShieldAlert, Heart, ChevronRight
} from 'lucide-react';
import { DERMATOLOGY_CATEGORIES, SEVERITY_LEVELS } from '../../data/dermatologyCategories';

export default function PatientDashboard({
  currentUser,
  patients,
  setPatients,
  appointments,
  setAppointments,
  prescriptions,
  consultations,
  followups,
  sales,
  clinicInfo
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'book' | 'appointments' | 'prescriptions' | 'followups' | 'purchases' | 'profile'
  const [showRxModal, setShowRxModal] = useState(null); // active rx for preview

  // Patient profile lookup
  const patientData = patients.find(p => p.id === currentUser.patientId) || patients[0];

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(patientData.name);
  const [editDob, setEditDob] = useState(patientData.dob || '2000-04-12');
  const [editGender, setEditGender] = useState(patientData.gender || 'Female');
  const [editPhone, setEditPhone] = useState(patientData.phone);
  const [editEmail, setEditEmail] = useState(patientData.email);
  const [editAddress, setEditAddress] = useState(patientData.address || '');
  const [editEmergency, setEditEmergency] = useState(patientData.emergencyContact || '');
  const [editAllergies, setEditAllergies] = useState(patientData.allergies);
  const [editConditions, setEditConditions] = useState(patientData.existingConditions || 'None');
  const [editMeds, setEditMeds] = useState(patientData.currentMedications || 'None');
  const [editDermaHist, setEditDermaHist] = useState(patientData.dermatologicalHistory || '');

  // Calculate age from DOB
  const calculateAge = (dobString) => {
    if (!dobString) return patientData.age || 26;
    const birthDate = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedPatient = {
      ...patientData,
      name: editName,
      dob: editDob,
      age: calculateAge(editDob),
      gender: editGender,
      phone: editPhone,
      email: editEmail,
      address: editAddress,
      emergencyContact: editEmergency,
      allergies: editAllergies,
      existingConditions: editConditions,
      currentMedications: editMeds,
      dermatologicalHistory: editDermaHist,
      medicalHistory: editDermaHist
    };

    setPatients(patients.map(p => p.id === patientData.id ? updatedPatient : p));
    setIsEditingProfile(false);
  };

  // Appointment Booking Wizard State
  const [bookCategory, setBookCategory] = useState(DERMATOLOGY_CATEGORIES[0].id);
  const selectedCategoryObj = DERMATOLOGY_CATEGORIES.find(c => c.id === bookCategory) || DERMATOLOGY_CATEGORIES[0];
  const [bookProblem, setBookProblem] = useState(selectedCategoryObj.problems[0]);
  const [bookDescription, setBookDescription] = useState('');
  const [bookDuration, setBookDuration] = useState('2 Weeks');
  const [bookSymptoms, setBookSymptoms] = useState('');
  const [bookSeverity, setBookSeverity] = useState(SEVERITY_LEVELS[0]);
  const [bookPrevTreatment, setBookPrevTreatment] = useState('');
  const [bookDate, setBookDate] = useState('2026-08-25');
  const [bookTime, setBookTime] = useState('10:00 AM');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const mockUploads = files.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    setUploadedFiles([...uploadedFiles, ...mockUploads]);
  };

  const handleBookSubmit = (e) => {
    e.preventDefault();

    const newApt = {
      id: `APT-${Math.floor(500 + Math.random() * 500)}`,
      patientId: patientData.id,
      patientName: patientData.name,
      date: bookDate,
      time: bookTime,
      doctor: 'Dr. Sarah Vance, MD (Dermatology)',
      consultationCategory: selectedCategoryObj.name,
      problem: bookProblem,
      type: `${selectedCategoryObj.name} - ${bookProblem}`,
      status: 'Pending',
      duration: bookDuration,
      symptoms: bookSymptoms || bookDescription,
      severity: bookSeverity,
      previousTreatment: bookPrevTreatment || 'None',
      allergies: patientData.allergies,
      notes: bookDescription,
      images: uploadedFiles
    };

    setAppointments([newApt, ...appointments]);
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setActiveTab('appointments');
    }, 2000);
  };

  // Filtered Patient Data
  const myAppointments = appointments.filter(a => a.patientId === patientData.id);
  const myPrescriptions = prescriptions.filter(r => r.patientId === patientData.id);
  const myFollowups = followups.filter(f => f.patientId === patientData.id);
  const myPurchases = sales.filter(s => s.patientId === patientData.id);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Patient Welcome Header */}
      <div className="page-header" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', color: '#fff', padding: '1.75rem 2rem', borderRadius: 'var(--radius-xl)' }}>
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Patient Care Portal
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.2rem', color: '#ffffff' }}>
            Welcome back, {patientData.name}
          </h1>
          <p style={{ fontSize: '0.9rem', opacity: 0.9, marginTop: '0.25rem' }}>
            Patient ID: <strong>{patientData.id}</strong> • Age: <strong>{calculateAge(patientData.dob)} yrs ({patientData.gender})</strong> • Phone: <strong>{patientData.phone}</strong>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary" style={{ background: '#ffffff', color: 'var(--text-main)', border: 'none' }} onClick={() => setActiveTab('book')}>
            <Plus size={16} /> Book Appointment
          </button>
          <button className="btn btn-secondary" style={{ background: 'rgba(255,255,255,0.2)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.4)' }} onClick={() => setActiveTab('profile')}>
            <User size={16} /> View Profile
          </button>
        </div>
      </div>

      {/* Patient Portal Navigation Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        {[
          { id: 'overview', label: 'Dashboard Overview', icon: User },
          { id: 'book', label: '+ Book Appointment', icon: Calendar },
          { id: 'appointments', label: `My Appointments (${myAppointments.length})`, icon: Clock },
          { id: 'prescriptions', label: `My Prescriptions (${myPrescriptions.length})`, icon: FileText },
          { id: 'followups', label: `Follow-Ups (${myFollowups.length})`, icon: BellRing },
          { id: 'purchases', label: `Purchase History (${myPurchases.length})`, icon: Package },
          { id: 'profile', label: 'My Medical Profile', icon: Heart }
        ].map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              className={`btn ${activeTab === t.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ whiteSpace: 'nowrap', borderRadius: 'var(--radius-md)' }}
              onClick={() => setActiveTab(t.id)}
            >
              <Icon size={16} /> {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Quick Metrics */}
          <div className="grid grid-cols-4">
            <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Appointments</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{myAppointments.filter(a => a.status !== 'Completed' && a.status !== 'Cancelled').length}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '0.2rem' }}>Next: {myAppointments[0]?.date || 'None'}</div>
            </div>

            <div className="card" style={{ borderLeft: '4px solid var(--accent)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Prescriptions Issued</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{myPrescriptions.length}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Doctor Approved</div>
            </div>

            <div className="card" style={{ borderLeft: '4px solid var(--warning)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Upcoming Follow-ups</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{myFollowups.filter(f => f.status === 'Upcoming' || f.status === 'Pending').length}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--warning)', marginTop: '0.2rem' }}>Clinical Care Reminders</div>
            </div>

            <div className="card" style={{ borderLeft: '4px solid var(--success)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Registered Allergies</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--danger)', marginTop: '0.4rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {patientData.allergies || 'None'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2">
            {/* Recent Appointments */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Upcoming & Recent Appointments</h3>
                <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('book')}>Book New</button>
              </div>

              {myAppointments.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No appointments scheduled.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {myAppointments.slice(0, 3).map(apt => (
                    <div key={apt.id} style={{ padding: '0.85rem 1rem', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>{apt.type}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{apt.date} at {apt.time} • Category: {apt.consultationCategory || 'Skin'}</div>
                      </div>
                      <span className={`badge ${apt.status === 'Confirmed' || apt.status === 'Completed' ? 'badge-success' : apt.status === 'In Consultation' ? 'badge-primary' : 'badge-warning'}`}>
                        {apt.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Doctor Prescriptions */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Doctor Approved Prescriptions</h3>
                <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('prescriptions')}>View All</button>
              </div>

              {myPrescriptions.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No prescriptions issued yet.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {myPrescriptions.map(rx => (
                    <div key={rx.id} style={{ padding: '0.85rem 1rem', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{rx.diagnosis}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Date: {rx.date} • {rx.medications.length} Medications Prescribed</div>
                      </div>
                      <button className="btn btn-primary btn-sm" onClick={() => setShowRxModal(rx)}>
                        <Eye size={14} /> View Rx
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Book Appointment Wizard */}
      {activeTab === 'book' && (
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.4rem' }}>Book a Dermatological Consultation</h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Select your concern category and share details so our medical team can prepare for your visit.
          </p>

          {bookingSuccess ? (
            <div style={{ padding: '2.5rem', textAlign: 'center', background: 'var(--success-bg)', color: 'var(--success)', borderRadius: 'var(--radius-lg)' }}>
              <CheckCircle2 size={48} style={{ margin: '0 auto 0.75rem auto' }} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Appointment Requested Successfully!</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.4rem' }}>
                Your appointment is now <strong>Pending Confirmation</strong>. Clinic staff will confirm your time slot shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleBookSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Step 1: Category Selection */}
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  1. Select Consultation Category <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <div className="grid grid-cols-4" style={{ gap: '0.65rem' }}>
                  {DERMATOLOGY_CATEGORIES.map(cat => {
                    const isSel = bookCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        className={`btn ${isSel ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ flexDirection: 'column', padding: '0.85rem 0.5rem', height: 'auto', textAlign: 'center' }}
                        onClick={() => {
                          setBookCategory(cat.id);
                          setBookProblem(cat.problems[0]);
                        }}
                      >
                        <span style={{ fontWeight: 700, fontSize: '0.86rem' }}>{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Specific Problem Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  2. Select Specific Concern / Condition <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <select className="select" value={bookProblem} onChange={(e) => setBookProblem(e.target.value)}>
                  {selectedCategoryObj.problems.map(prob => (
                    <option key={prob} value={prob}>{prob}</option>
                  ))}
                </select>
              </div>

              {/* Step 3: Detailed Description & Symptoms */}
              <div className="grid grid-cols-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    Duration of Problem
                  </label>
                  <select className="select" value={bookDuration} onChange={(e) => setBookDuration(e.target.value)}>
                    <option value="Less than 1 Week">Less than 1 Week</option>
                    <option value="1 to 4 Weeks">1 to 4 Weeks</option>
                    <option value="1 to 6 Months">1 to 6 Months</option>
                    <option value="More than 6 Months">More than 6 Months / Chronic</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    Perceived Severity
                  </label>
                  <select className="select" value={bookSeverity} onChange={(e) => setBookSeverity(e.target.value)}>
                    {SEVERITY_LEVELS.map(sev => <option key={sev} value={sev}>{sev}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                  Detailed Symptoms & Chief Complaint
                </label>
                <textarea
                  className="textarea"
                  rows={3}
                  placeholder="Describe your symptoms (itching, pain, redness, peeling, swelling, flare triggers)..."
                  value={bookSymptoms}
                  onChange={(e) => setBookSymptoms(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                  Previous Treatments Tried (OTC or Prescribed)
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g. Benzoyl peroxide wash, hydrocortisone cream, antibiotics..."
                  value={bookPrevTreatment}
                  onChange={(e) => setBookPrevTreatment(e.target.value)}
                />
              </div>

              {/* Step 4: Photo / Document Attachment */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                  Optional Upload: Photos of Affected Area or Past Medical Records
                </label>
                <div style={{ border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem', textAlign: 'center', background: 'var(--bg-app)' }}>
                  <Upload size={24} style={{ color: 'var(--primary)', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Click to attach clinical skin photos or documents</div>
                  <input type="file" multiple accept="image/*,.pdf" style={{ display: 'none' }} id="file-upload-input" onChange={handleFileUpload} />
                  <button type="button" className="btn btn-secondary btn-sm" style={{ marginTop: '0.6rem' }} onClick={() => document.getElementById('file-upload-input').click()}>
                    Select Files
                  </button>
                </div>
                {uploadedFiles.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                    {uploadedFiles.map((f, i) => (
                      <div key={i} style={{ background: 'var(--primary-light)', padding: '0.35rem 0.75rem', borderRadius: '9999px', fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 600 }}>
                        📷 {f.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Step 5: Appointment Schedule */}
              <div className="grid grid-cols-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    Preferred Date
                  </label>
                  <input type="date" className="input" value={bookDate} onChange={(e) => setBookDate(e.target.value)} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    Preferred Time Slot
                  </label>
                  <select className="select" value={bookTime} onChange={(e) => setBookTime(e.target.value)}>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:30 PM">03:30 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={18} /> Confirm & Request Appointment
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Tab 3: Appointments List */}
      {activeTab === 'appointments' && (
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>My Appointment Records</h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Appt ID & Date</th>
                  <th>Category & Problem</th>
                  <th>Attending Physician</th>
                  <th>Symptoms & Notes</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {myAppointments.map(apt => (
                  <tr key={apt.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{apt.time}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{apt.date} • {apt.id}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{apt.problem || apt.type}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{apt.consultationCategory || 'Skin Related'}</div>
                    </td>
                    <td style={{ fontSize: '0.85rem' }}>{apt.doctor}</td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)', maxWidth: '250px' }}>{apt.symptoms || apt.notes}</td>
                    <td>
                      <span className={`badge ${apt.status === 'Completed' ? 'badge-success' : apt.status === 'In Consultation' ? 'badge-primary' : apt.status === 'Cancelled' ? 'badge-danger' : 'badge-warning'}`}>
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: My Prescriptions */}
      {activeTab === 'prescriptions' && (
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Doctor Issued Prescriptions</h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Rx ID & Date</th>
                  <th>Diagnosis</th>
                  <th>Doctor</th>
                  <th>Medications</th>
                  <th>Follow-up Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {myPrescriptions.map(rx => (
                  <tr key={rx.id}>
                    <td>
                      <div style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{rx.id}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{rx.date}</div>
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{rx.diagnosis}</td>
                    <td>{rx.doctorName}</td>
                    <td>{rx.medications.length} Prescribed Items</td>
                    <td>{rx.followUpDate || 'None'}</td>
                    <td>
                      <button className="btn btn-primary btn-sm" onClick={() => setShowRxModal(rx)}>
                        <Printer size={14} /> View / Print Letterhead
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Follow-ups */}
      {activeTab === 'followups' && (
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Follow-Up Schedule & Care Notifications</h3>
          <div className="grid grid-cols-2">
            {myFollowups.map(flw => (
              <div key={flw.id} style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem', background: 'var(--bg-app)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="badge badge-warning">{flw.status}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Due: {flw.dueDate}</span>
                </div>
                <h4 style={{ fontWeight: 700, fontSize: '1rem' }}>{flw.condition}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.4rem 0' }}>Reason: {flw.reason || flw.notes}</p>
                <div style={{ background: 'var(--bg-card)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', fontStyle: 'italic', borderLeft: '3px solid var(--primary)' }}>
                  "{flw.customMessage}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Purchases */}
      {activeTab === 'purchases' && (
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Product & Medication Purchase History</h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Sale ID & Date</th>
                  <th>Items Purchased</th>
                  <th>Amount</th>
                  <th>Payment Status</th>
                  <th>Method</th>
                </tr>
              </thead>
              <tbody>
                {myPurchases.map(s => (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{s.id}<br/><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.date}</span></td>
                    <td>
                      {s.items.map((it, i) => (
                        <div key={i} style={{ fontSize: '0.85rem' }}>{it.name} (x{it.qty})</div>
                      ))}
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--primary)' }}>₹{s.totalAmount.toFixed(2)}</td>
                    <td><span className="badge badge-success">{s.paymentStatus}</span></td>
                    <td>{s.paymentMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 7: My Profile */}
      {activeTab === 'profile' && (
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Patient Medical Profile</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Keep your contact details, emergency contacts, and allergies up to date.</p>
            </div>
            <button className="btn btn-secondary" onClick={() => setIsEditingProfile(!isEditingProfile)}>
              <Edit2 size={16} /> {isEditingProfile ? 'Cancel Editing' : 'Edit Profile'}
            </button>
          </div>

          {isEditingProfile ? (
            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="grid grid-cols-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Full Name</label>
                  <input type="text" className="input" value={editName} onChange={(e) => setEditName(e.target.value)} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Date of Birth</label>
                  <input type="date" className="input" value={editDob} onChange={(e) => setEditDob(e.target.value)} required />
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Gender</label>
                  <select className="select" value={editGender} onChange={(e) => setEditGender(e.target.value)}>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Phone Number</label>
                  <input type="text" className="input" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} required />
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Email Address</label>
                  <input type="email" className="input" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Emergency Contact</label>
                  <input type="text" className="input" value={editEmergency} onChange={(e) => setEditEmergency(e.target.value)} placeholder="Name & Phone" />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Home Address</label>
                <input type="text" className="input" value={editAddress} onChange={(e) => setEditAddress(e.target.value)} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--danger)', marginBottom: '0.3rem' }}>Known Allergies</label>
                <input type="text" className="input" value={editAllergies} onChange={(e) => setEditAllergies(e.target.value)} placeholder="e.g. Penicillin, Fragrances, Latex" />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Existing Medical Conditions</label>
                <input type="text" className="input" value={editConditions} onChange={(e) => setEditConditions(e.target.value)} placeholder="e.g. PCOS, Asthma, Thyroid" />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Current Medications</label>
                <input type="text" className="input" value={editMeds} onChange={(e) => setEditMeds(e.target.value)} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Dermatological History</label>
                <textarea className="textarea" rows={3} value={editDermaHist} onChange={(e) => setEditDermaHist(e.target.value)} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditingProfile(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Profile Changes</button>
              </div>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="grid grid-cols-2" style={{ background: 'var(--bg-app)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <div><strong>Full Name:</strong> {patientData.name}</div>
                <div><strong>Date of Birth:</strong> {patientData.dob || '2000-04-12'} ({calculateAge(patientData.dob)} yrs)</div>
                <div style={{ marginTop: '0.5rem' }}><strong>Gender:</strong> {patientData.gender}</div>
                <div style={{ marginTop: '0.5rem' }}><strong>Fitzpatrick Skin Type:</strong> {patientData.fitzpatrickSkinType}</div>
                <div style={{ marginTop: '0.5rem' }}><strong>Phone:</strong> {patientData.phone}</div>
                <div style={{ marginTop: '0.5rem' }}><strong>Email:</strong> {patientData.email}</div>
              </div>

              <div style={{ padding: '1rem', background: 'var(--danger-bg)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--danger)' }}>
                <strong style={{ color: 'var(--danger)' }}>Known Allergies:</strong> {patientData.allergies || 'None'}
              </div>

              <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)' }}>
                  <strong>Existing Medical Conditions:</strong>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{patientData.existingConditions || 'None'}</div>
                </div>
                <div style={{ padding: '1rem', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)' }}>
                  <strong>Current Medications:</strong>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{patientData.currentMedications || 'None'}</div>
                </div>
              </div>

              <div style={{ padding: '1rem', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)' }}>
                <strong>Dermatological History:</strong>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>{patientData.dermatologicalHistory || 'No previous recorded conditions.'}</p>
              </div>

              <div style={{ padding: '1rem', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)' }}>
                <strong>Emergency Contact:</strong>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{patientData.emergencyContact || 'Not provided'}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Prescription Preview Modal */}
      {showRxModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '850px' }}>
            <div className="modal-header no-print">
              <h3 style={{ fontWeight: 700 }}>Prescription Reference ({showRxModal.id})</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-primary btn-sm" onClick={() => window.print()}>
                  <Printer size={14} /> Print / Download PDF
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => setShowRxModal(null)}>✕</button>
              </div>
            </div>

            <div className="modal-body">
              <div className="prescription-letterhead printable-area">
                <div className="rx-header-top">
                  <div>
                    <div className="rx-clinic-name">{clinicInfo.name}</div>
                    <div className="rx-doctor-title">{clinicInfo.doctor}</div>
                    <div className="rx-clinic-details">Board Certified Dermatologist • Lic #: MED-DERM-99402</div>
                  </div>
                  <div style={{ textAlign: 'right' }} className="rx-clinic-details">
                    <div>{clinicInfo.address}</div>
                    <div>Phone: {clinicInfo.phone}</div>
                    <div>{clinicInfo.email}</div>
                  </div>
                </div>

                <div className="rx-patient-bar">
                  <div><strong>Patient:</strong> {showRxModal.patientName}</div>
                  <div><strong>Age / Gender:</strong> {showRxModal.age} y / {showRxModal.gender}</div>
                  <div><strong>Date:</strong> {showRxModal.date}</div>
                  <div><strong>Ref:</strong> {showRxModal.id}</div>
                </div>

                <div style={{ marginBottom: '1rem', fontSize: '0.95rem' }}>
                  <strong>Clinical Diagnosis:</strong> <span style={{ color: '#0d9488', fontWeight: 700 }}>{showRxModal.diagnosis}</span>
                </div>

                <div className="rx-symbol">Rx</div>

                <div style={{ marginBottom: '2rem' }}>
                  {showRxModal.medications.map((med, idx) => (
                    <div key={idx} className="rx-med-item">
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className="rx-med-name">{idx + 1}. {med.name}</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{med.duration}</div>
                      </div>
                      <div className="rx-med-details">
                        <span><strong>Dosage:</strong> {med.dosage}</span>
                        <span><strong>Frequency:</strong> {med.frequency}</span>
                      </div>
                      {med.instructions && <div className="rx-med-inst">➜ Note: {med.instructions}</div>}
                    </div>
                  ))}
                </div>

                {showRxModal.generalAdvice && (
                  <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #0d9488', fontSize: '0.85rem' }}>
                    <strong>Doctor Instructions:</strong> {showRxModal.generalAdvice}
                    {showRxModal.followUpDate && (
                      <div style={{ marginTop: '0.4rem', fontWeight: 700, color: '#0d9488' }}>
                        Next Follow-up Date: {showRxModal.followUpDate}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
