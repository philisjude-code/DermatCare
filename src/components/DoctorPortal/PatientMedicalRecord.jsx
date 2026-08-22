import React, { useState } from 'react';
import {
  User, Calendar, FileText, Stethoscope, BellRing, Package, Clock, ShieldAlert,
  CheckCircle2, ArrowLeft, Image as ImageIcon, Heart, Activity, AlertCircle
} from 'lucide-react';

export default function PatientMedicalRecord({
  patientId,
  patients,
  appointments,
  consultations,
  prescriptions,
  followups,
  sales,
  onBack
}) {
  const patient = patients.find(p => p.id === patientId) || patients[0];

  const patAppointments = appointments.filter(a => a.patientId === patient.id);
  const patConsultations = consultations.filter(c => c.patientId === patient.id);
  const patPrescriptions = prescriptions.filter(r => r.patientId === patient.id);
  const patFollowups = followups.filter(f => f.patientId === patient.id);
  const patPurchases = sales.filter(s => s.patientId === patient.id);

  // Compile Chronological Timeline Events
  const timelineEvents = [
    ...patAppointments.map(a => ({ type: 'APPOINTMENT', date: a.date, time: a.time, title: `Appointment Scheduled (${a.type})`, details: a.notes, status: a.status, raw: a })),
    ...patConsultations.map(c => ({ type: 'CONSULTATION', date: c.consultationDate, time: '10:00 AM', title: `Clinical Consultation: ${c.finalDiagnosis}`, details: c.examinationFindings, doctor: c.doctorName, raw: c })),
    ...patPrescriptions.map(r => ({ type: 'PRESCRIPTION', date: r.date, time: '10:30 AM', title: `Prescription Issued (${r.id})`, details: `Diagnosis: ${r.diagnosis} • ${r.medications.length} items prescribed`, raw: r })),
    ...patFollowups.map(f => ({ type: 'FOLLOWUP', date: f.dueDate, time: '11:00 AM', title: `Follow-Up Scheduled (${f.condition})`, details: f.customMessage, status: f.status, raw: f })),
    ...patPurchases.map(s => ({ type: 'PURCHASE', date: s.date.split(' ')[0], time: s.date.split(' ')[1] || '', title: `Product Purchase (${s.id})`, details: `Total: ₹${s.totalAmount.toFixed(2)}`, raw: s }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button className="btn btn-secondary btn-sm" onClick={onBack}>
            <ArrowLeft size={16} /> Back to Patients
          </button>
          <div>
            <h1 className="page-title">Electronic Medical Record (EMR)</h1>
            <p className="page-description">Patient ID: {patient.id} • Registered since {patient.createdDate || '2026-06-10'}</p>
          </div>
        </div>
      </div>

      {/* Patient Overview Summary Card */}
      <div className="card" style={{ background: 'linear-gradient(135deg, var(--bg-card), var(--primary-light))' }}>
        <div className="grid grid-cols-4" style={{ alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Patient Name</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>{patient.name}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{patient.age} yrs • {patient.gender} • DOB: {patient.dob || '2000-04-12'}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Contact Info</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{patient.phone}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{patient.email}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Skin Type & Primary Concern</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)' }}>{patient.fitzpatrickSkinType}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{patient.primaryConcern}</div>
          </div>

          <div style={{ background: 'var(--danger-bg)', padding: '0.75rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--danger)' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--danger)' }}>REGISTERED ALLERGIES</div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.1rem' }}>
              {patient.allergies || 'None'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Full Profile Info vs Chronological Medical Timeline */}
      <div className="grid grid-cols-3" style={{ alignItems: 'start' }}>
        {/* Left Column: Full Profile Breakdown */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <User size={18} style={{ color: 'var(--primary)' }} /> Profile & Medical History
          </h3>

          <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <strong style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'block' }}>EXISTING MEDICAL CONDITIONS</strong>
              <div style={{ fontWeight: 600 }}>{patient.existingConditions || 'None'}</div>
            </div>

            <div>
              <strong style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'block' }}>CURRENT MEDICATIONS</strong>
              <div style={{ fontWeight: 600 }}>{patient.currentMedications || 'None'}</div>
            </div>

            <div>
              <strong style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'block' }}>DERMATOLOGICAL HISTORY</strong>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>{patient.dermatologicalHistory || patient.medicalHistory}</div>
            </div>

            <div>
              <strong style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'block' }}>EMERGENCY CONTACT</strong>
              <div style={{ fontSize: '0.82rem' }}>{patient.emergencyContact || 'Not recorded'}</div>
            </div>

            <div>
              <strong style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'block' }}>HOME ADDRESS</strong>
              <div style={{ fontSize: '0.82rem' }}>{patient.address || 'Not recorded'}</div>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Chronological Medical Timeline */}
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={18} style={{ color: 'var(--primary)' }} /> Chronological Medical Timeline ({timelineEvents.length} Events)
          </h3>

          <div style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {timelineEvents.map((evt, idx) => {
              const badgeClass =
                evt.type === 'APPOINTMENT' ? 'badge-accent' :
                evt.type === 'CONSULTATION' ? 'badge-primary' :
                evt.type === 'PRESCRIPTION' ? 'badge-success' : 'badge-warning';

              return (
                <div key={idx} style={{ position: 'relative' }}>
                  {/* Timeline Dot */}
                  <div style={{
                    position: 'absolute',
                    left: '-2.15rem',
                    top: '0.2rem',
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: evt.type === 'CONSULTATION' ? 'var(--primary)' : evt.type === 'PRESCRIPTION' ? 'var(--success)' : 'var(--accent)',
                    border: '3px solid var(--bg-card)'
                  }}></div>

                  <div style={{ background: 'var(--bg-app)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <span className={`badge ${badgeClass}`}>{evt.type}</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{evt.date} {evt.time}</span>
                    </div>

                    <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)' }}>{evt.title}</div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{evt.details}</p>

                    {evt.raw?.examinationFindings && (
                      <div style={{ marginTop: '0.5rem', fontSize: '0.82rem', background: 'var(--bg-card)', padding: '0.6rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--primary)' }}>
                        <strong>Exam Findings:</strong> {evt.raw.examinationFindings}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
