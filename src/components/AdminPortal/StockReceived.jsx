import React, { useState } from 'react';
import { Package, ArrowDownRight, Plus, CheckCircle2, History, Search, FileText } from 'lucide-react';

export default function StockReceived({ stock, setStock, transactions, setTransactions }) {
  const [selectedProductId, setSelectedProductId] = useState(stock[0]?.id || '');
  const [vendor, setVendor] = useState('');
  const [batchNo, setBatchNo] = useState('');
  const [qtyReceived, setQtyReceived] = useState(20);
  const [purchasePrice, setPurchasePrice] = useState(stock[0]?.purchasePrice || 15.00);
  const [expiryDate, setExpiryDate] = useState('2028-06-30');
  const [receivedDate, setReceivedDate] = useState(new Date().toISOString().split('T')[0]);
  const [invoiceNo, setInvoiceNo] = useState('');
  const [notes, setNotes] = useState('');
  const [successToast, setSuccessToast] = useState(false);

  const handleProductSelect = (prodId) => {
    setSelectedProductId(prodId);
    const prod = stock.find(p => p.id === prodId);
    if (prod) {
      setPurchasePrice(prod.purchasePrice || prod.unitPrice || 15.00);
      setVendor(prod.supplier || prod.manufacturer || '');
      setBatchNo(prod.batchNo || '');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const prod = stock.find(p => p.id === selectedProductId);
    if (!prod) return;

    const qtyNum = parseInt(qtyReceived, 10);
    if (isNaN(qtyNum) || qtyNum <= 0) return;

    // 1. Update Product Stock and Batch/Expiry info
    const updatedStock = stock.map(item => {
      if (item.id === selectedProductId) {
        return {
          ...item,
          stock: item.stock + qtyNum,
          batchNo: batchNo || item.batchNo,
          expiry: expiryDate || item.expiry,
          purchasePrice: parseFloat(purchasePrice) || item.purchasePrice,
          receivedDate: receivedDate,
          status: (item.stock + qtyNum) > item.minThreshold ? 'In Stock' : 'Low Stock'
        };
      }
      return item;
    });

    setStock(updatedStock);

    // 2. Create Auditable Inventory Transaction Record
    const newTxn = {
      id: `TXN-${Math.floor(100 + Math.random() * 900)}`,
      date: `${receivedDate} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      type: 'RECEIVED',
      item: prod.name,
      productId: prod.id,
      qty: qtyNum,
      unitPrice: parseFloat(purchasePrice),
      total: qtyNum * parseFloat(purchasePrice),
      vendor: vendor || 'Medical Supplier',
      invoiceNo: invoiceNo || 'INV-DIRECT',
      batchNo: batchNo || prod.batchNo,
      expiry: expiryDate,
      notes: notes || 'Incoming Stock Receipt'
    };

    setTransactions([newTxn, ...transactions]);
    setSuccessToast(true);

    setTimeout(() => {
      setSuccessToast(false);
      setQtyReceived(20);
      setInvoiceNo('');
      setNotes('');
    }, 2000);
  };

  const receivedTxns = transactions.filter(t => t.type === 'RECEIVED');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Stock Received Entry & Receiving Audit</h1>
          <p className="page-description">Log incoming vendor shipments, update available stock, and maintain batch traceability.</p>
        </div>
      </div>

      <div className="grid grid-cols-3" style={{ alignItems: 'start' }}>
        {/* Left Column: Stock Received Entry Form */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowDownRight size={18} style={{ color: 'var(--success)' }} /> Log Incoming Stock
          </h3>

          {successToast ? (
            <div style={{ padding: '1.5rem', background: 'var(--success-bg)', color: 'var(--success)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <CheckCircle2 size={36} style={{ margin: '0 auto 0.5rem auto' }} />
              <div style={{ fontWeight: 800 }}>Stock Successfully Received!</div>
              <div style={{ fontSize: '0.82rem', marginTop: '0.2rem' }}>Inventory count updated and transaction logged.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Select Product / Medicine</label>
                <select className="select" value={selectedProductId} onChange={(e) => handleProductSelect(e.target.value)}>
                  {stock.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.category}) - Current: {p.stock}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Quantity Received</label>
                  <input type="number" min="1" className="input" value={qtyReceived} onChange={(e) => setQtyReceived(e.target.value)} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Purchase Price (₹)</label>
                  <input type="number" step="0.01" className="input" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} required />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Supplier / Vendor Name</label>
                <input type="text" className="input" placeholder="e.g. CeraCare Wholesalers" value={vendor} onChange={(e) => setVendor(e.target.value)} required />
              </div>

              <div className="grid grid-cols-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Batch Number</label>
                  <input type="text" className="input" placeholder="e.g. B-99821" value={batchNo} onChange={(e) => setBatchNo(e.target.value)} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Expiry Date</label>
                  <input type="date" className="input" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Received Date</label>
                  <input type="date" className="input" value={receivedDate} onChange={(e) => setReceivedDate(e.target.value)} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Invoice / Ref No.</label>
                  <input type="text" className="input" placeholder="e.g. INV-9982" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Notes</label>
                <input type="text" className="input" placeholder="e.g. PO-8829 Shipment" value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>

              <div style={{ background: 'var(--bg-app)', padding: '0.75rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Total Purchase Cost:</span>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary)' }}>
                  ₹{((parseInt(qtyReceived) || 0) * (parseFloat(purchasePrice) || 0)).toFixed(2)}
                </span>
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem' }}>
                <CheckCircle2 size={16} /> Record Stock Receipt
              </button>
            </form>
          )}
        </div>

        {/* Right 2 Columns: Stock Received Receipts Audit Table */}
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <History size={18} style={{ color: 'var(--primary)' }} /> Incoming Shipments Log ({receivedTxns.length})
          </h3>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Txn ID & Date</th>
                  <th>Product Name</th>
                  <th>Supplier / Vendor</th>
                  <th>Batch / Expiry</th>
                  <th>Qty Received</th>
                  <th>Unit Cost</th>
                  <th>Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {receivedTxns.map(t => (
                  <tr key={t.id}>
                    <td>
                      <div style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{t.id}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.date}</div>
                    </td>
                    <td style={{ fontWeight: 700 }}>{t.item}</td>
                    <td>{t.vendor}</td>
                    <td>
                      <div style={{ fontSize: '0.82rem' }}>Batch: {t.batchNo || '-'}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Exp: {t.expiry || '-'}</div>
                    </td>
                    <td style={{ fontWeight: 800, color: 'var(--success)' }}>+{t.qty}</td>
                    <td>₹{t.unitPrice.toFixed(2)}</td>
                    <td style={{ fontWeight: 800 }}>₹{t.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
