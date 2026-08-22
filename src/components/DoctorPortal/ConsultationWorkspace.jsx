import React, { useState } from 'react';
import {
  Stethoscope, User, Calendar, FileText, CheckCircle2, Clock, Plus, Trash2,
  ShieldAlert, Image as ImageIcon, ArrowRight, Printer, AlertTriangle, Eye
} from 'lucide-react';
import { BODY_AREAS, SEVERITY_LEVELS } from '../../data/dermatologyCategories';

export default function ConsultationWorkspace({
  appointment,
  patient,
  stock,
  setStock,
  prescriptions,
  setPrescriptions,
  consultations,
  setConsultations,
  appointments,
  setAppointments,
  followups,
  setFollowups,
  clinicInfo,
  onClose,
  onViewMedicalRecord
}) {
  const [status, setStatus] = useState(appointment?.status || 'In Consultation');

  // Clinical Consultation Form State
  const [affectedArea, setAffectedArea] = useState(BODY_AREAS[0]);
  const [examFindings, setExamFindings] = useState('');
  const [clinicalNotes, setClinicalNotes] = useState(appointment?.notes || '');
  const [possibleDiag, setPossibleDiag] = useState(appointment?.problem || 'Acne Vulgaris');
  const [finalDiag, setFinalDiag] = useState(appointment?.problem || 'Acne Vulgaris Grade II');
  const [treatmentPlan, setTreatmentPlan] = useState('');
  const [additionalInst, setAdditionalInst] = useState('Apply moisturizer 20 minutes after topical treatments. Daily broad spectrum SPF 50+ mandatory.');
  const [followUpRec, setFollowUpRec] = useState('4 Weeks');
  const [followUpDate, setFollowUpDate] = useState('2026-09-22');

  // Doctor Prescription Builder
  const [prescribedMeds, setPrescribedMeds] = useState([
    {
      name: stock[0]?.name || 'Tretinoin Cream 0.05%',
      dosage: 'Pea-sized amount',
      frequency: 'Once daily at Night',
      route: 'Topical Application',
      duration: '12 Weeks',
      instructions: 'Apply thin layer on clean dry face.'
    }
  ]);

  const [externalProducts, setExternalProducts] = useState([
    'Salicylic Acid 2% Foaming Cleanser (Morning wash)',
    'Mineral Broad-Spectrum SPF 50+ Sunscreen'
  ]);
  const [newExtProduct, setNewExtProduct] = useState('');

  const [isApproved, setIsApproved] = useState(true); // Doctor approval toggle

  const handleAddMed = () => {
    setPrescribedMeds([
      ...prescribedMeds,
      {
        name: stock[0]?.name || 'Medication Name',
        dosage: 'Standard Dosage',
        frequency: 'Once daily',
        route: 'Topical Application',
        duration: '30 Days',
        instructions: 'As advised by doctor.'
      }
    ]);
  };

  const handleRemoveMed = (idx) => {
    setPrescribedMeds(prescribedMeds.filter((_, i) => i !== idx));
  };

  const handleMedChange = (idx, field, val) => {
    const updated = [...prescribedMeds];
    updated[idx][field] = val;
    setPrescribedMeds(updated);
  };

  const handleAddExtProduct = () => {
    if (!newExtProduct.trim()) return;
    setExternalProducts([...externalProducts, newExtProduct.trim()]);
    setNewExtProduct('');
  };

  const handleSaveConsultation = (e) => {
    e.preventDefault();
    if (!patient) return;

    // 1. Create Prescription (Requires Doctor Approval)
    const newRx = {
      id: `Rx-${Math.floor(8000 + Math.random() * 1000)}`,
      date: new Date().toISOString().split('T')[0],
      patientId: patient.id,
      patientName: patient.name,
      age: patient.age,
      gender: patient.gender,
      diagnosis: finalDiag,
      doctorName: clinicInfo.doctor,
      clinicName: clinicInfo.name,
      status: isApproved ? 'Approved' : 'Draft',
      approvedByDoctor: isApproved,
      medications: prescribedMeds,
      externalProducts: externalProducts,
      generalAdvice: additionalInst,
      followUpDate: followUpDate
    };

    if (isApproved) {
      setPrescriptions([newRx, ...prescriptions]);
    }

    // 2. Log Consultation Record
    const newConsultation = {
      id: `CNS-${Math.floor(700 + Math.random() * 300)}`,
      appointmentId: appointment?.id,
      patientId: patient.id,
      patientName: patient.name,
      doctorName: clinicInfo.doctor,
      consultationDate: new Date().toISOString().split('T')[0],
      consultationCategory: appointment?.consultationCategory || 'Skin Related',
      problem: appointment?.problem || possibleDiag,
      symptoms: appointment?.symptoms || clinicalNotes,
      severity: appointment?.severity || 'Moderate',
      affectedBodyArea: affectedArea,
      examinationFindings: examFindings,
      clinicalNotes: clinicalNotes,
      possibleDiagnosis: possibleDiag,
      finalDiagnosis: finalDiag,
      treatmentPlan: treatmentPlan,
      additionalInstructions: additionalInst,
      followUpRecommendation: followUpRec,
      status: 'Completed',
      prescriptionId: isApproved ? newRx.id : null
    };

    setConsultations([newConsultation, ...consultations]);

    // 3. Update Appointment Status to Completed
    if (appointment) {
      setAppointments(appointments.map(a => a.id === appointment.id ? { ...a, status: 'Completed' } : a));
    }

    // 4. Create Follow-Up Record if scheduled
    if (followUpDate) {
      const newFlw = {
        id: `FLW-${Math.floor(300 + Math.random() * 500)}`,
        patientId: patient.id,
        patientName: patient.name,
        consultationId: newConsultation.id,
        phone: patient.phone,
        email: patient.email,
        assignedDoctor: clinicInfo.doctor,
        condition: finalDiag,
        reason: `Follow-up for ${finalDiag} treatment monitoring`,
        dueDate: followUpDate,
        status: 'Upcoming',
        templateType: 'Routine Skincare & Acne Progress Check',
        channel: 'WhatsApp & Email',
        lastContact: new Date().toISOString().split('T')[0],
        customMessage: `Dear ${patient.name}, reminder for your upcoming follow-up consultation on ${followUpDate}.`
      };
      setFollowups([newFlw, ...followups]);
    }

    alert(`Consultation completed and prescription ${isApproved ? 'Approved' : 'Saved as Draft'}!`);
    if (onClose) onClose();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Consultation Header */}
      <div className="page-header" style={{ background: 'var(--bg-sidebar)', color: '#fff', padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-lg)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="badge badge-primary">{status}</span>
            <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Appt ID: {appointment?.id || 'APT-NEW'}</span>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '0.25rem', color: '#fff' }}>
            Clinical Consultation Workspace: {patient?.name}
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }} onClick={() => onViewMedicalRecord(patient?.id)}>
            <FileText size={16} /> Patient EMR Timeline
          </button>
          <button className="btn btn-secondary" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }} onClick={onClose}>
            Close
          </button>
        </div>
      </div>

      <form onSubmit={handleSaveConsultation}>
        <div className="grid grid-cols-3" style={{ alignItems: 'start' }}>
          {/* Left Column: Patient Case & Complaint Info */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={18} style={{ color: 'var(--primary)' }} /> Patient Case File
            </h3>

            <div style={{ background: 'var(--bg-app)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
              <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '0.2rem' }}>{patient?.name}</div>
              <div>Age / Gender: <strong>{patient?.age} y / {patient?.gender}</strong></div>
              <div>Fitzpatrick Skin: <strong>{patient?.fitzpatrickSkinType}</strong></div>
              <div>Phone: <strong>{patient?.phone}</strong></div>
              <div style={{ marginTop: '0.4rem', color: 'var(--danger)', fontWeight: 700 }}>
                Allergies: {patient?.allergies || 'None reported'}
              </div>
            </div>

            <div style={{ padding: '0.85rem', background: 'var(--primary-light)', borderRadius: 'var(--radius-md)', fontSize: '0.84rem' }}>
              <div style={{ fontWeight: 700, color: 'var(--primary)' }}>Chief Complaint & Category</div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', marginTop: '0.1rem' }}>{appointment?.consultationCategory || 'Skin Related'} - {appointment?.problem || 'Acne'}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Duration: {appointment?.duration || 'Unknown'} • Severity: {appointment?.severity || 'Moderate'}</div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.2rem' }}>Patient Symptoms</label>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', background: 'var(--bg-app)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                {appointment?.symptoms || 'No symptoms noted by patient.'}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.2rem' }}>Previous Treatments Tried</label>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', background: 'var(--bg-app)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                {appointment?.previousTreatment || 'None reported.'}
              </div>
            </div>

            {/* Uploaded Images Preview */}
            {appointment?.images && appointment.images.length > 0 && (
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ImageIcon size={16} style={{ color: 'var(--primary)' }} /> Patient Uploaded Clinical Images
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {appointment.images.map((img, i) => (
                    <a key={i} href={img.url} target="_blank" rel="noreferrer" style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)', display: 'block' }}>
                      <img src={img.url} alt={img.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Middle & Right: Doctor Clinical Inputs & Prescription Builder */}
          <div className="card" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Stethoscope size={18} style={{ color: 'var(--primary)' }} /> Clinical Examination & Diagnostic Assessment
            </h3>

            <div className="grid grid-cols-2">
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Affected Body Region</label>
                <select className="select" value={affectedArea} onChange={(e) => setAffectedArea(e.target.value)}>
                  {BODY_AREAS.map(ba => <option key={ba} value={ba}>{ba}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Differential / Possible Diagnosis</label>
                <input type="text" className="input" value={possibleDiag} onChange={(e) => setPossibleDiag(e.target.value)} required />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Clinical Examination & Physical Findings</label>
              <textarea className="textarea" rows={3} placeholder="Record lesion types (comedones, papules, pustules, plaques, scaling), distribution, and dermoscopy observations..." value={examFindings} onChange={(e) => setExamFindings(e.target.value)} required />
            </div>

            <div className="grid grid-cols-2">
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Confirmed Final Diagnosis</label>
                <input type="text" className="input" value={finalDiag} onChange={(e) => setFinalDiag(e.target.value)} style={{ fontWeight: 700, color: 'var(--primary)' }} required />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Recommended Follow-up Timeline</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <select className="select" value={followUpRec} onChange={(e) => setFollowUpRec(e.target.value)}>
                    <option value="1 Week">1 Week</option>
                    <option value="2 Weeks">2 Weeks</option>
                    <option value="4 Weeks">4 Weeks</option>
                    <option value="8 Weeks">8 Weeks</option>
                    <option value="3 Months">3 Months</option>
                  </select>
                  <input type="date" className="input" value={followUpDate} onChange={(e) => setFollowUpDate(e.target.value)} />
                </div>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Clinical Notes & Doctor Observations</label>
              <textarea className="textarea" rows={2} value={clinicalNotes} onChange={(e) => setClinicalNotes(e.target.value)} />
            </div>

            {/* Doctor-Approved Prescription Generator Workflow */}
            <div style={{ borderTop: '2px dashed var(--border-color)', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FileText size={18} style={{ color: 'var(--accent)' }} /> Prescription & Treatment Plan Generator
                </h4>
                <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddMed}>
                  <Plus size={14} /> Add Prescribed Medicine
                </button>
              </div>

              {/* Meds List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {prescribedMeds.map((med, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-app)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span className="badge badge-primary">Medicine #{idx + 1}</span>
                      {prescribedMeds.length > 1 && (
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => handleRemoveMed(idx)}>
                          <Trash2 size={12} /> Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2" style={{ gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input type="text" list="stock-list-options" className="input" placeholder="Select or type medicine name..." value={med.name} onChange={(e) => handleMedChange(idx, 'name', e.target.value)} required />
                      <input type="text" className="input" placeholder="Dosage (e.g. Pea-sized / 1 Cap)" value={med.dosage} onChange={(e) => handleMedChange(idx, 'dosage', e.target.value)} />
                    </div>
                    <datalist id="stock-list-options">
                      {stock.map(s => <option key={s.id} value={s.name} />)}
                    </datalist>

                    <div className="grid grid-cols-3" style={{ gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input type="text" className="input" placeholder="Frequency (e.g. Once daily at Night)" value={med.frequency} onChange={(e) => handleMedChange(idx, 'frequency', e.target.value)} />
                      <select className="select" value={med.route} onChange={(e) => handleMedChange(idx, 'route', e.target.value)}>
                        <option value="Topical Application">Topical Application</option>
                        <option value="Oral Route">Oral Route</option>
                        <option value="Intralesional Injection">Intralesional Injection</option>
                        <option value="Shampoo / Wash">Shampoo / Wash</option>
                      </select>
                      <input type="text" className="input" placeholder="Duration (e.g. 4 Weeks)" value={med.duration} onChange={(e) => handleMedChange(idx, 'duration', e.target.value)} />
                    </div>

                    <input type="text" className="input" placeholder="Special application notes..." value={med.instructions} onChange={(e) => handleMedChange(idx, 'instructions', e.target.value)} />
                  </div>
                ))}
              </div>

              {/* External OTC Products & Creams */}
              <div style={{ marginTop: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Recommended External Products (Creams, Cleansers, Sunscreens, Serums)</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input type="text" className="input" placeholder="e.g. Glycolic Acid Foaming Cleanser 100ml" value={newExtProduct} onChange={(e) => setNewExtProduct(e.target.value)} />
                  <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddExtProduct}>+ Add</button>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {externalProducts.map((p, i) => (
                    <span key={i} className="badge badge-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      {p} <button type="button" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => setExternalProducts(externalProducts.filter((_, idx) => idx !== i))}>✕</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Doctor Review and Approval Mandatory Toggle */}
              <div style={{ background: 'var(--success-bg)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--success)', marginTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 800, color: 'var(--success)', fontSize: '0.9rem' }}>Doctor Authorization & Review</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Prescriptions require explicit doctor approval before issuance to patients.</div>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, cursor: 'pointer' }}>
                  <input type="checkbox" checked={isApproved} onChange={(e) => setIsApproved(e.target.checked)} style={{ width: '18px', height: '18px' }} />
                  <span>Approve & Issue Rx</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={18} /> Complete Consultation & Issue Prescription
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
