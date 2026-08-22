import React, { useState, useEffect } from 'react';
import { FileText, Printer, Plus, Trash2, CheckCircle2, User, Sparkles, Shield, Eye, Download, AlertTriangle } from 'lucide-react';

export default function Prescription({
  patients,
  stock,
  setStock,
  prescriptions,
  setPrescriptions,
  transactions,
  setTransactions,
  clinicInfo,
  selectedPatientId,
  prefilledRxData
}) {
  const [viewMode, setViewMode] = useState('create'); // 'create' | 'preview' | 'list'
  const [selectedPatient, setSelectedPatient] = useState(
    patients.find(p => p.id === selectedPatientId) || patients[0]
  );

  useEffect(() => {
    if (selectedPatientId) {
      const found = patients.find(p => p.id === selectedPatientId);
      if (found) setSelectedPatient(found);
    }
  }, [selectedPatientId, patients]);

  useEffect(() => {
    if (prefilledRxData) {
      if (prefilledRxData.diagnosis) setDiagnosis(prefilledRxData.diagnosis);
      if (prefilledRxData.medications && prefilledRxData.medications.length > 0) {
        setMedications(prefilledRxData.medications);
      }
    }
  }, [prefilledRxData]);

  const [diagnosis, setDiagnosis] = useState('Acne Vulgaris (Grade II Inflammatory)');
  const [generalAdvice, setGeneralAdvice] = useState('Apply moisturizer 20 minutes after topical treatments. Mandatory daily broad spectrum SPF 50+ sunscreen.');
  const [followUpDate, setFollowUpDate] = useState('2026-09-22');
  const [isApproved, setIsApproved] = useState(true);

  const [medications, setMedications] = useState([
    {
      name: 'Tretinoin Cream 0.05%',
      dosage: 'Pea-sized amount',
      frequency: 'Once daily at Night',
      route: 'Topical Application',
      duration: '12 Weeks',
      instructions: 'Apply thin layer on clean dry face. Avoid corners of nose and eyes.'
    },
    {
      name: 'Mineral Broad-Spectrum SPF 50+ Sunscreen',
      dosage: 'Generous layer',
      frequency: 'Every morning',
      route: 'Topical Application',
      duration: 'Ongoing',
      instructions: 'Reapply every 3 hours during daylight hours.'
    }
  ]);

  const [activePrescriptionForPreview, setActivePrescriptionForPreview] = useState(null);

  const handleAddMedication = () => {
    setMedications([
      ...medications,
      {
        name: stock[0]?.name || 'Custom Medication',
        dosage: '1 Application / Tablet',
        frequency: 'Once daily',
        route: 'Topical Application',
        duration: '30 Days',
        instructions: 'Take as directed by doctor.'
      }
    ]);
  };

  const handleRemoveMedication = (index) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleMedicationChange = (index, field, value) => {
    const updated = [...medications];
    updated[index][field] = value;
    setMedications(updated);
  };

  const handleGeneratePrescription = (e) => {
    e.preventDefault();
    if (!selectedPatient) return;

    const newRx = {
      id: `Rx-${Math.floor(8000 + Math.random() * 1000)}`,
      date: new Date().toISOString().split('T')[0],
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      age: selectedPatient.age,
      gender: selectedPatient.gender,
      diagnosis: diagnosis,
      doctorName: clinicInfo.doctor,
      clinicName: clinicInfo.name,
      status: isApproved ? 'Approved' : 'Draft',
      approvedByDoctor: isApproved,
      medications: [...medications],
      generalAdvice: generalAdvice,
      followUpDate: followUpDate
    };

    // Deduct stock for matched prescribed medicines upon doctor approval
    if (isApproved) {
      let updatedStock = [...stock];
      const newTxns = [];

      medications.forEach(med => {
        const stockIdx = updatedStock.findIndex(s => s.name === med.name);
        if (stockIdx !== -1 && updatedStock[stockIdx].stock > 0) {
          updatedStock[stockIdx] = {
            ...updatedStock[stockIdx],
            stock: updatedStock[stockIdx].stock - 1,
            status: (updatedStock[stockIdx].stock - 1) === 0 ? 'Out of Stock' : (updatedStock[stockIdx].stock - 1) <= updatedStock[stockIdx].minThreshold ? 'Low Stock' : 'In Stock'
          };

          newTxns.push({
            id: `TXN-${Math.floor(100 + Math.random() * 900)}`,
            date: new Date().toLocaleString(),
            type: 'SOLD',
            item: med.name,
            qty: 1,
            unitPrice: updatedStock[stockIdx].sellingPrice || updatedStock[stockIdx].unitPrice || 20,
            total: updatedStock[stockIdx].sellingPrice || updatedStock[stockIdx].unitPrice || 20,
            patient: selectedPatient.name,
            doctor: clinicInfo.doctor,
            notes: `Dispensed on Approved Prescription ${newRx.id}`
          });
        }
      });

      if (newTxns.length > 0) {
        setStock(updatedStock);
        setTransactions([...newTxns, ...transactions]);
      }
    }

    setPrescriptions([newRx, ...prescriptions]);
    setActivePrescriptionForPreview(newRx);
    setViewMode('preview');
  };

  const currentPreviewRx = activePrescriptionForPreview || {
    id: 'Rx-PREVIEW',
    date: new Date().toISOString().split('T')[0],
    patientId: selectedPatient?.id || 'PAT-101',
    patientName: selectedPatient?.name || 'Sophia Martinez',
    age: selectedPatient?.age || 26,
    gender: selectedPatient?.gender || 'Female',
    diagnosis: diagnosis,
    doctorName: clinicInfo.doctor,
    clinicName: clinicInfo.name,
    medications: medications,
    generalAdvice: generalAdvice,
    followUpDate: followUpDate
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="page-header no-print">
        <div>
          <h1 className="page-title">Doctor Prescription Management Workflow</h1>
          <p className="page-description">Draft, approve, and generate printable clinic prescriptions.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className={`btn ${viewMode === 'create' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setViewMode('create')}>
            <Plus size={16} /> New Prescription
          </button>
          <button className={`btn ${viewMode === 'preview' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setViewMode('preview')}>
            <Eye size={16} /> Printable Preview
          </button>
          <button className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setViewMode('list')}>
            <FileText size={16} /> Prescriptions Repository ({prescriptions.length})
          </button>
        </div>
      </div>

      {/* Mode 1: Create Prescription Form */}
      {viewMode === 'create' && (
        <form onSubmit={handleGeneratePrescription} className="no-print">
          <div className="grid grid-cols-3" style={{ alignItems: 'start' }}>
            {/* Left: Patient Selector */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={18} style={{ color: 'var(--primary)' }} /> Select Patient
              </h3>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Registered Patient</label>
                <select
                  className="select"
                  value={selectedPatient?.id}
                  onChange={(e) => setSelectedPatient(patients.find(p => p.id === e.target.value))}
                >
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.gender}, {p.age}y)</option>
                  ))}
                </select>
              </div>

              {selectedPatient && (
                <div style={{ background: 'var(--bg-app)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: '0.84rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.3rem' }}>{selectedPatient.name}</div>
                  <div style={{ color: 'var(--text-muted)' }}><strong>Skin Type:</strong> {selectedPatient.fitzpatrickSkinType}</div>
                  <div style={{ color: 'var(--text-muted)' }}><strong>Allergies:</strong> <span style={{ color: 'var(--danger)', fontWeight: 600 }}>{selectedPatient.allergies}</span></div>
                  <div style={{ color: 'var(--text-muted)', marginTop: '0.2rem' }}><strong>Primary Concern:</strong> {selectedPatient.primaryConcern}</div>
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Dermatological Diagnosis</label>
                <input
                  type="text"
                  className="input"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="e.g. Acne Vulgaris Grade II"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Recommended Follow-Up Date</label>
                <input
                  type="date"
                  className="input"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                />
              </div>

              <div style={{ background: 'var(--success-bg)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--success)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.86rem' }}>
                  <input type="checkbox" checked={isApproved} onChange={(e) => setIsApproved(e.target.checked)} style={{ width: '16px', height: '16px' }} />
                  <span>Approve & Authorize Prescription</span>
                </label>
              </div>
            </div>

            {/* Middle & Right: Medications List */}
            <div className="card" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Prescribed Medications & Formulations</h3>
                <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddMedication}>
                  <Plus size={14} /> Add Formulation
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {medications.map((med, index) => (
                  <div key={index} style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem', background: 'var(--bg-app)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span className="badge badge-primary">Formulation #{index + 1}</span>
                      {medications.length > 1 && (
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => handleRemoveMedication(index)}>
                          <Trash2 size={14} /> Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2" style={{ marginBottom: '0.75rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.2rem' }}>Medication Name</label>
                        <input
                          type="text"
                          list="stock-items-list-2"
                          className="input"
                          value={med.name}
                          onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                          placeholder="Select or type medicine..."
                          required
                        />
                        <datalist id="stock-items-list-2">
                          {stock.map(s => <option key={s.id} value={s.name} />)}
                        </datalist>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.2rem' }}>Dosage / Amount</label>
                        <input
                          type="text"
                          className="input"
                          value={med.dosage}
                          onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                          placeholder="e.g. Pea-sized amount / 1 Cap"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3" style={{ marginBottom: '0.75rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.2rem' }}>Frequency</label>
                        <input
                          type="text"
                          className="input"
                          value={med.frequency}
                          onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                          placeholder="e.g. Once daily at Night"
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.2rem' }}>Route</label>
                        <select className="select" value={med.route || 'Topical Application'} onChange={(e) => handleMedicationChange(index, 'route', e.target.value)}>
                          <option value="Topical Application">Topical Application</option>
                          <option value="Oral Route">Oral Route</option>
                          <option value="Intralesional Injection">Intralesional Injection</option>
                          <option value="Shampoo Wash">Shampoo Wash</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.2rem' }}>Duration</label>
                        <input
                          type="text"
                          className="input"
                          value={med.duration}
                          onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                          placeholder="e.g. 4 Weeks / 30 Days"
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.2rem' }}>Special Application Instructions</label>
                      <input
                        type="text"
                        className="input"
                        value={med.instructions}
                        onChange={(e) => handleMedicationChange(index, 'instructions', e.target.value)}
                        placeholder="e.g. Apply to clean dry skin 20 mins after washing."
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>General Clinical Advice & Instructions</label>
                <textarea
                  className="textarea"
                  rows={3}
                  value={generalAdvice}
                  onChange={(e) => setGeneralAdvice(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.75rem' }}>
                  <CheckCircle2 size={18} /> {isApproved ? 'Approve & Issue Prescription' : 'Save Prescription Draft'}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Mode 2: Printable Letterhead Preview */}
      {viewMode === 'preview' && (
        <div>
          <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Showing Letterhead for <strong>{currentPreviewRx.patientName}</strong> ({currentPreviewRx.id})
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-secondary" onClick={() => setViewMode('create')}>Back to Form</button>
              <button className="btn btn-primary" onClick={() => window.print()}>
                <Printer size={16} /> Print / Save as PDF
              </button>
            </div>
          </div>

          <div className="prescription-letterhead printable-area">
            <div className="rx-header-top">
              <div>
                <div className="rx-clinic-name">{currentPreviewRx.clinicName}</div>
                <div className="rx-doctor-title">{currentPreviewRx.doctorName}</div>
                <div className="rx-clinic-details">Board Certified Dermatologist • Lic #: MED-DERM-99402</div>
              </div>
              <div style={{ textAlign: 'right' }} className="rx-clinic-details">
                <div>Suite 405, Medical Arts Tower</div>
                <div>750 Wellness Way • Phone: +1 (555) 900-DERM</div>
                <div>www.auradermacare.com</div>
              </div>
            </div>

            <div className="rx-patient-bar">
              <div><strong>Patient Name:</strong> {currentPreviewRx.patientName}</div>
              <div><strong>Age / Gender:</strong> {currentPreviewRx.age} yrs / {currentPreviewRx.gender}</div>
              <div><strong>Date:</strong> {currentPreviewRx.date}</div>
              <div><strong>Rx Reference:</strong> {currentPreviewRx.id}</div>
            </div>

            <div style={{ marginBottom: '1rem', fontSize: '0.95rem' }}>
              <strong>Clinical Diagnosis:</strong> <span style={{ color: '#0d9488', fontWeight: 700 }}>{currentPreviewRx.diagnosis}</span>
            </div>

            <div className="rx-symbol">Rx</div>

            <div style={{ marginBottom: '2rem' }}>
              {currentPreviewRx.medications.map((med, idx) => (
                <div key={idx} className="rx-med-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="rx-med-name">{idx + 1}. {med.name}</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>{med.duration}</div>
                  </div>
                  <div className="rx-med-details">
                    <span><strong>Dosage:</strong> {med.dosage}</span>
                    <span><strong>Frequency:</strong> {med.frequency}</span>
                  </div>
                  {med.instructions && (
                    <div className="rx-med-inst">➜ Note: {med.instructions}</div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #0d9488', fontSize: '0.85rem', marginBottom: '2rem' }}>
              <strong>General Advice:</strong> {currentPreviewRx.generalAdvice}
              {currentPreviewRx.followUpDate && (
                <div style={{ marginTop: '0.4rem', fontWeight: 700, color: '#0d9488' }}>
                  Next Recommended Follow-Up: {currentPreviewRx.followUpDate}
                </div>
              )}
            </div>

            <div className="rx-footer">
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                <div>Computer generated official dermatological prescription.</div>
                <div>Valid for 30 days from issuance date.</div>
              </div>
              <div className="rx-signature-box">
                <div className="rx-sig-line">Dr. Sarah Vance</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1e293b' }}>Doctor's Signature & Stamp</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Saved Prescriptions History List */}
      {viewMode === 'list' && (
        <div className="card no-print">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Prescription Repository</h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Rx ID & Date</th>
                  <th>Patient Name</th>
                  <th>Diagnosis</th>
                  <th>Status</th>
                  <th>Medicines</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((rx) => (
                  <tr key={rx.id}>
                    <td>
                      <div style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{rx.id}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{rx.date}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{rx.patientName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{rx.age} yrs • {rx.gender}</div>
                    </td>
                    <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{rx.diagnosis}</td>
                    <td>
                      <span className={`badge ${rx.status === 'Approved' ? 'badge-success' : 'badge-warning'}`}>
                        {rx.status || 'Approved'}
                      </span>
                    </td>
                    <td>{rx.medications.length} items</td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          setActivePrescriptionForPreview(rx);
                          setViewMode('preview');
                        }}
                      >
                        <Eye size={14} /> View Letterhead
                      </button>
                    </td>
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
