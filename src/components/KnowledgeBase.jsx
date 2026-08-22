import React, { useState } from 'react';
import { BookOpen, Search, Stethoscope, ShieldAlert, Sparkles, FileText, CheckCircle2, ChevronRight, Info } from 'lucide-react';

export default function KnowledgeBase({ conditions, setActiveTab, setPrefilledRxData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCondition, setSelectedCondition] = useState(conditions[0]);

  const filteredConditions = conditions.filter(c => {
    const query = searchQuery.toLowerCase();
    const matchesName = c.name.toLowerCase().includes(query) || c.category.toLowerCase().includes(query);
    const matchesCause = c.causes.some(cause => cause.toLowerCase().includes(query));
    const matchesSymptom = c.symptoms.some(sym => sym.toLowerCase().includes(query));
    const matchesMed = c.medications.some(m => m.name.toLowerCase().includes(query));
    return matchesName || matchesCause || matchesSymptom || matchesMed;
  });

  const handleUseInPrescription = (cond) => {
    // Format medications for Rx Generator
    const formattedMeds = cond.medications.map(m => ({
      name: m.name.split(' (')[0], // Extract clean medicine name
      dosage: 'Standard Clinical Dose',
      frequency: 'As per protocol',
      duration: '4 Weeks',
      instructions: m.note
    }));

    setPrefilledRxData({
      diagnosis: cond.name,
      medications: formattedMeds
    });

    setActiveTab('prescription');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">5. Dermatology Atlas: Cause, Medication & Treatment</h1>
          <p className="page-description">Clinical decision support system mapping causes, evidence-based medications, and procedures.</p>
        </div>
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="input"
            style={{ paddingLeft: '2.4rem' }}
            placeholder="Search cause, symptom, or drug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-3" style={{ alignItems: 'start' }}>
        {/* Left Column: Condition List */}
        <div className="card" style={{ padding: '0.85rem' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)', uppercase: true, padding: '0.5rem', marginBottom: '0.5rem' }}>
            Dermatological Conditions ({filteredConditions.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {filteredConditions.map(cond => {
              const isSelected = selectedCondition?.id === cond.id;
              return (
                <button
                  key={cond.id}
                  className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ justifyContent: 'space-between', textAlign: 'left', padding: '0.75rem 1rem' }}
                  onClick={() => setSelectedCondition(cond)}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{cond.name}</div>
                    <div style={{ fontSize: '0.74rem', opacity: isSelected ? 0.9 : 0.6 }}>{cond.category}</div>
                  </div>
                  <ChevronRight size={16} style={{ opacity: isSelected ? 1 : 0.4 }} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: Detailed Cause, Medication & Treatment Breakdown */}
        {selectedCondition && (
          <div className="card" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
              <div>
                <span className="badge badge-accent" style={{ marginBottom: '0.4rem' }}>{selectedCondition.category}</span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{selectedCondition.name}</h2>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Prevalence: {selectedCondition.prevalence}</div>
              </div>

              <button className="btn btn-primary" onClick={() => handleUseInPrescription(selectedCondition)}>
                <FileText size={16} /> Load Protocol into Rx Generator
              </button>
            </div>

            {/* Section 1: Causes & Etiology */}
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldAlert size={18} /> 1. Causes & Etiology
              </h3>
              <div className="grid grid-cols-2" style={{ gap: '0.75rem' }}>
                {selectedCondition.causes.map((cause, i) => (
                  <div key={i} style={{ background: 'var(--bg-app)', padding: '0.75rem 0.9rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: '0.86rem' }}>
                    • {cause}
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Recommended Medications */}
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Stethoscope size={18} /> 2. Pharmacological Medications
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {selectedCondition.medications.map((med, i) => (
                  <div key={i} style={{ background: 'var(--bg-app)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span className="badge badge-primary" style={{ fontSize: '0.7rem', marginBottom: '0.2rem' }}>{med.type}</span>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>{med.name}</div>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic', maxWidth: '300px', textAlign: 'right' }}>
                      {med.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Clinical Procedures & Treatments */}
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#a855f7', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={18} /> 3. Clinical Procedures & Treatments
              </h3>
              <div className="grid grid-cols-2" style={{ gap: '0.75rem' }}>
                {selectedCondition.treatments.map((t, i) => (
                  <div key={i} style={{ background: 'var(--bg-app)', padding: '0.75rem 0.9rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} style={{ color: '#a855f7', flexShrink: 0 }} />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Patient Skincare Guidelines */}
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--success)', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Info size={18} /> 4. Patient Skincare & Lifestyle Protocol
              </h3>
              <div style={{ background: 'var(--success-bg)', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.86rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {selectedCondition.patientSkincare.map((sk, i) => (
                  <div key={i}>✔ {sk}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
