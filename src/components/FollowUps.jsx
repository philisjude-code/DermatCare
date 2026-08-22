import React, { useState } from 'react';
import { BellRing, Send, Mail, MessageSquare, CheckCircle2, Plus, Clock, Eye, Sparkles, AlertTriangle } from 'lucide-react';

export default function FollowUps({ followups, setFollowups, patients, clinicInfo }) {
  const [selectedStatus, setSelectedStatus] = useState('ALL'); // 'ALL' | 'Upcoming' | 'Completed' | 'Missed' | 'Cancelled' | 'Rescheduled'
  const [showOutreachModal, setShowOutreachModal] = useState(false);
  const [activeFollowUp, setActiveFollowUp] = useState(null);

  // Outreach Modal State
  const [messageChannel, setMessageChannel] = useState('WhatsApp & Email');
  const [messageSubject, setMessageSubject] = useState('Dermatology Clinical Care Check-in');
  const [messageText, setMessageText] = useState('');
  const [sendSuccessToast, setSendSuccessToast] = useState(false);

  const templates = [
    {
      title: 'Retinoid Acclimation Check (Day 7)',
      subject: 'Aura Dermacare: Day 7 Tretinoin Routine Check-in',
      body: (name) => `Hi ${name}, this is Dr. Sarah Vance's office checking in on Day 7 of your retinoid routine. Are you experiencing mild redness or peeling? Remember to apply moisturizer 20 minutes after your retinoid and use SPF 50+ every morning. Reply if you need adjustments!`
    },
    {
      title: 'Chemical Peel Post-Care & SPF Reminder (Day 3)',
      subject: 'Aura Dermacare: Post-Chemical Peel Care Guidelines',
      body: (name) => `Dear ${name}, post-peel reminder from Aura Dermacare: Do not pick or force peeling skin. Hydrate frequently with gentle emollient and apply Mineral SPF 50+ every 3 hours. Contact clinic at +1 (555) 900-DERM if severe burning occurs.`
    },
    {
      title: 'Oral Isotretinoin Lab & Side-Effect Check (Day 30)',
      subject: 'Aura Dermacare: Monthly Blood Panel & Consultation Reminder',
      body: (name) => `Hi ${name}, please submit your monthly LFT & Lipid blood panel results to clinic@auradermacare.com prior to your upcoming prescription renewal consultation.`
    },
    {
      title: 'Routine Skincare & Acne Progress Check',
      subject: 'Aura Dermacare: How is your skin progressing?',
      body: (name) => `Dear ${name}, we hope your skin treatment routine is going well! Please let us know if you'd like to schedule your 4-week follow-up or reorder prescribed products.`
    }
  ];

  const handleOpenOutreach = (item) => {
    setActiveFollowUp(item);
    setMessageChannel(item.channel || 'WhatsApp & Email');
    setMessageSubject(`Aura Dermacare: Care Check-in for ${item.patientName}`);
    setMessageText(item.customMessage || templates[0].body(item.patientName));
    setShowOutreachModal(true);
    setSendSuccessToast(false);
  };

  const handleApplyTemplate = (tpl) => {
    if (!activeFollowUp) return;
    setMessageSubject(tpl.subject);
    setMessageText(tpl.body(activeFollowUp.patientName));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!activeFollowUp) return;

    const updated = followups.map(f => f.id === activeFollowUp.id ? {
      ...f,
      status: 'Completed',
      channel: messageChannel,
      customMessage: messageText,
      lastContact: new Date().toISOString().split('T')[0]
    } : f);

    setFollowups(updated);
    setSendSuccessToast(true);

    setTimeout(() => {
      setSendSuccessToast(false);
      setShowOutreachModal(false);
    }, 1500);
  };

  const handleStatusChange = (flwId, newStatus) => {
    setFollowups(followups.map(f => f.id === flwId ? { ...f, status: newStatus } : f));
  };

  const filteredFollowups = followups.filter(f => {
    if (selectedStatus === 'ALL') return true;
    return f.status.toLowerCase() === selectedStatus.toLowerCase();
  });

  const upcomingCount = followups.filter(f => f.status === 'Upcoming' || f.status === 'Pending').length;
  const completedCount = followups.filter(f => f.status === 'Completed').length;
  const missedCount = followups.filter(f => f.status === 'Missed').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Patient Follow-up & Care Outreach Desk</h1>
          <p className="page-description">Automated treatment check-ins, WhatsApp alerts, and post-procedure monitoring.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {['ALL', 'Upcoming', 'Completed', 'Missed', 'Rescheduled'].map(st => (
            <button
              key={st}
              className={`btn btn-sm ${selectedStatus === st ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedStatus(st)}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Widgets */}
      <div className="grid grid-cols-3">
        <div className="card" style={{ padding: '1rem 1.25rem', borderLeft: '4px solid var(--warning)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Upcoming Follow-ups</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--warning)' }}>{upcomingCount}</div>
        </div>

        <div className="card" style={{ padding: '1rem 1.25rem', borderLeft: '4px solid var(--success)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Completed Outreach</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--success)' }}>{completedCount}</div>
        </div>

        <div className="card" style={{ padding: '1rem 1.25rem', borderLeft: '4px solid var(--danger)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Missed / Overdue Follow-ups</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--danger)' }}>{missedCount}</div>
        </div>
      </div>

      {/* Grid of Follow-up Cards */}
      <div className="grid grid-cols-3">
        {filteredFollowups.map((item) => {
          const isDone = item.status === 'Completed';

          return (
            <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: `4px solid ${isDone ? 'var(--success)' : item.status === 'Missed' ? 'var(--danger)' : 'var(--warning)'}` }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <select
                    className="select"
                    style={{ fontSize: '0.75rem', padding: '0.2rem 0.4rem', width: 'auto' }}
                    value={item.status}
                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                  >
                    {['Upcoming', 'Completed', 'Missed', 'Cancelled', 'Rescheduled'].map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Due: {item.dueDate}</span>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.2rem' }}>{item.patientName}</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{item.condition}</div>

                <div style={{ background: 'var(--bg-app)', padding: '0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', color: 'var(--text-main)', border: '1px solid var(--border-color)', marginBottom: '1rem', fontStyle: 'italic' }}>
                  "{item.customMessage || 'Standard follow-up reminder pending.'}"
                </div>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <span><strong>Channel:</strong> {item.channel}</span>
                  <span><strong>Contact:</strong> {item.phone || item.email}</span>
                </div>
              </div>

              <div style={{ marginTop: '1.25rem', pt: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                <button
                  className={`btn ${isDone ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                  style={{ width: '100%' }}
                  onClick={() => handleOpenOutreach(item)}
                >
                  <Send size={14} /> {isDone ? 'Resend Outreach' : 'Launch Email / Message'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Outreach Simulation Modal */}
      {showOutreachModal && activeFollowUp && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '650px' }}>
            <div className="modal-header">
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Send size={18} style={{ color: 'var(--primary)' }} /> Send Follow-Up to {activeFollowUp.patientName}
              </h3>
              <button className="btn btn-secondary btn-sm" onClick={() => setShowOutreachModal(false)}>✕</button>
            </div>

            <form onSubmit={handleSendMessage}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {sendSuccessToast ? (
                  <div style={{ padding: '2rem', textAlign: 'center', background: 'var(--success-bg)', color: 'var(--success)', borderRadius: 'var(--radius-md)' }}>
                    <CheckCircle2 size={40} style={{ margin: '0 auto 0.5rem auto' }} />
                    <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Message Transmitted Successfully!</div>
                    <div style={{ fontSize: '0.85rem' }}>Sent via {messageChannel} to {activeFollowUp.phone || activeFollowUp.email}</div>
                  </div>
                ) : (
                  <>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Select Dermatology Template</label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {templates.map((tpl, i) => (
                          <button
                            key={i}
                            type="button"
                            className="btn btn-secondary btn-sm"
                            style={{ justifyContent: 'flex-start', textAlign: 'left' }}
                            onClick={() => handleApplyTemplate(tpl)}
                          >
                            <Sparkles size={14} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                            <span>{tpl.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2">
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Outreach Channel</label>
                        <select className="select" value={messageChannel} onChange={(e) => setMessageChannel(e.target.value)}>
                          <option value="WhatsApp & Email">WhatsApp & Email (Combined)</option>
                          <option value="Email Only">Email Only</option>
                          <option value="SMS / WhatsApp">SMS / WhatsApp Only</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Recipient Contact</label>
                        <input type="text" className="input" value={activeFollowUp.email || activeFollowUp.phone} readOnly style={{ background: 'var(--bg-app)' }} />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Message Subject</label>
                      <input type="text" className="input" value={messageSubject} onChange={(e) => setMessageSubject(e.target.value)} />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Message Body Content</label>
                      <textarea className="textarea" rows={5} value={messageText} onChange={(e) => setMessageText(e.target.value)} required />
                    </div>
                  </>
                )}
              </div>

              {!sendSuccessToast && (
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowOutreachModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">
                    <Send size={16} /> Send Now
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
