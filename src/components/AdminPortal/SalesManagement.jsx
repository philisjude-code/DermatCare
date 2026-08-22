import React, { useState } from 'react';
import { ShoppingBag, ArrowUpRight, Plus, CheckCircle2, History, Search, CreditCard, AlertTriangle, Printer } from 'lucide-react';

export default function SalesManagement({
  stock,
  setStock,
  sales,
  setSales,
  transactions,
  setTransactions,
  patients
}) {
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || 'WALK_IN');
  const [customerName, setCustomerName] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(stock[0]?.id || '');
  const [saleQty, setSaleQty] = useState(1);
  const [unitPrice, setUnitPrice] = useState(stock[0]?.sellingPrice || stock[0]?.unitPrice || 20);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [errorMessage, setErrorMessage] = useState('');
  const [successReceipt, setSuccessReceipt] = useState(null);

  const selectedProduct = stock.find(p => p.id === selectedProductId) || stock[0];

  const handleProductSelect = (prodId) => {
    setSelectedProductId(prodId);
    const prod = stock.find(p => p.id === prodId);
    if (prod) {
      setUnitPrice(prod.sellingPrice || prod.unitPrice || 20);
    }
  };

  const handleSaleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!selectedProduct) return;
    const qtyNum = parseInt(saleQty, 10);
    if (isNaN(qtyNum) || qtyNum <= 0) {
      setErrorMessage('Please enter a valid quantity greater than 0.');
      return;
    }

    // Validate stock sufficiency (Prevent negative inventory)
    if (selectedProduct.stock < qtyNum) {
      setErrorMessage(`Insufficient stock! ${selectedProduct.name} only has ${selectedProduct.stock} units available.`);
      return;
    }

    const calculatedSubtotal = qtyNum * parseFloat(unitPrice);
    const calculatedTotal = Math.max(0, calculatedSubtotal - parseFloat(discount || 0));

    let buyerName = customerName;
    if (selectedPatientId !== 'WALK_IN') {
      const pat = patients.find(p => p.id === selectedPatientId);
      buyerName = pat ? pat.name : 'Patient';
    } else if (!buyerName) {
      buyerName = 'Walk-in Customer';
    }

    // 1. Automatically Reduce Stock
    const updatedStock = stock.map(p => {
      if (p.id === selectedProductId) {
        const newStock = p.stock - qtyNum;
        return {
          ...p,
          stock: newStock,
          status: newStock === 0 ? 'Out of Stock' : newStock <= p.minThreshold ? 'Low Stock' : 'In Stock'
        };
      }
      return p;
    });

    setStock(updatedStock);

    // 2. Create Sale Record
    const newSale = {
      id: `SALE-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleString(),
      patientId: selectedPatientId !== 'WALK_IN' ? selectedPatientId : null,
      patientName: buyerName,
      items: [
        {
          productId: selectedProduct.id,
          name: selectedProduct.name,
          qty: qtyNum,
          unitPrice: parseFloat(unitPrice),
          total: calculatedSubtotal
        }
      ],
      subtotal: calculatedSubtotal,
      discount: parseFloat(discount || 0),
      totalAmount: calculatedTotal,
      paymentStatus: 'Paid',
      paymentMethod: paymentMethod
    };

    setSales([newSale, ...sales]);

    // 3. Create Auditable Inventory Transaction Record
    const newTxn = {
      id: `TXN-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleString(),
      type: 'SOLD',
      item: selectedProduct.name,
      productId: selectedProduct.id,
      qty: qtyNum,
      unitPrice: parseFloat(unitPrice),
      total: calculatedTotal,
      patient: buyerName,
      notes: `OTC Product Sale (${newSale.id})`
    };

    setTransactions([newTxn, ...transactions]);
    setSuccessReceipt(newSale);

    // Reset Form
    setSaleQty(1);
    setDiscount(0);
  };

  const totalSalesRevenue = sales.reduce((sum, s) => sum + s.totalAmount, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Sales & Point-of-Sale (POS) Checkout</h1>
          <p className="page-description">Dispense OTC skincare products, process patient sales, and track revenue.</p>
        </div>
      </div>

      {/* Revenue KPI Summary */}
      <div className="grid grid-cols-3">
        <div className="card" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Sales Completed</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{sales.length} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>transactions</span></div>
        </div>

        <div className="card" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Sales Revenue</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--success)' }}>₹{totalSalesRevenue.toFixed(2)}</div>
        </div>

        <div className="card" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Available Products</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{stock.length} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>SKUs</span></div>
        </div>
      </div>

      <div className="grid grid-cols-3" style={{ alignItems: 'start' }}>
        {/* Left Column: POS Checkout Form */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CreditCard size={18} style={{ color: 'var(--primary)' }} /> Product Sale Checkout
          </h3>

          {errorMessage && (
            <div style={{ padding: '0.75rem 1rem', background: 'var(--danger-bg)', color: 'var(--danger)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={16} /> {errorMessage}
            </div>
          )}

          {successReceipt ? (
            <div style={{ padding: '1.5rem', background: 'var(--success-bg)', color: 'var(--success)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <CheckCircle2 size={36} style={{ margin: '0 auto 0.5rem auto' }} />
              <div style={{ fontWeight: 800 }}>Sale Completed ({successReceipt.id})!</div>
              <div style={{ fontSize: '0.85rem', marginTop: '0.2rem' }}>Total: <strong>₹{successReceipt.totalAmount.toFixed(2)}</strong></div>
              <button className="btn btn-secondary btn-sm" style={{ marginTop: '0.85rem' }} onClick={() => setSuccessReceipt(null)}>
                Process Another Sale
              </button>
            </div>
          ) : (
            <form onSubmit={handleSaleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Customer / Patient</label>
                <select className="select" value={selectedPatientId} onChange={(e) => setSelectedPatientId(e.target.value)}>
                  <option value="WALK_IN">-- Walk-in OTC Customer --</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.phone})</option>
                  ))}
                </select>
              </div>

              {selectedPatientId === 'WALK_IN' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Customer Name</label>
                  <input type="text" className="input" placeholder="e.g. John Doe" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Select Product</label>
                <select className="select" value={selectedProductId} onChange={(e) => handleProductSelect(e.target.value)}>
                  {stock.map(p => (
                    <option key={p.id} value={p.id} disabled={p.stock === 0}>
                      {p.name} - Stock: {p.stock} ({p.unitPrice ? `₹${p.unitPrice}` : 'Out'})
                    </option>
                  ))}
                </select>
                {selectedProduct && (
                  <div style={{ fontSize: '0.78rem', color: selectedProduct.stock <= selectedProduct.minThreshold ? 'var(--danger)' : 'var(--text-muted)', marginTop: '0.25rem' }}>
                    Available Stock: <strong>{selectedProduct.stock} {selectedProduct.unit}</strong> (Min: {selectedProduct.minThreshold})
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Quantity</label>
                  <input type="number" min="1" max={selectedProduct?.stock || 100} className="input" value={saleQty} onChange={(e) => setSaleQty(e.target.value)} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Selling Price (₹)</label>
                  <input type="number" step="0.01" className="input" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} required />
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Discount (₹)</label>
                  <input type="number" step="0.01" className="input" value={discount} onChange={(e) => setDiscount(e.target.value)} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Payment Method</label>
                  <select className="select" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Cash">Cash</option>
                    <option value="UPI / Online">UPI / Online</option>
                  </select>
                </div>
              </div>

              <div style={{ background: 'var(--bg-app)', padding: '0.85rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>Total Chargeable Amount:</span>
                <span style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--success)' }}>
                  ₹{Math.max(0, ((parseInt(saleQty) || 0) * (parseFloat(unitPrice) || 0)) - (parseFloat(discount) || 0)).toFixed(2)}
                </span>
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem' }}>
                <CheckCircle2 size={16} /> Complete Sale & Deduct Inventory
              </button>
            </form>
          )}
        </div>

        {/* Right 2 Columns: Sales History Table */}
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <History size={18} style={{ color: 'var(--primary)' }} /> Product Sales Audit History ({sales.length})
          </h3>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Sale Ref & Date</th>
                  <th>Customer / Patient</th>
                  <th>Items Purchased</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {sales.map(s => (
                  <tr key={s.id}>
                    <td>
                      <div style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{s.id}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.date}</div>
                    </td>
                    <td style={{ fontWeight: 700 }}>{s.patientName}</td>
                    <td>
                      {s.items.map((it, idx) => (
                        <div key={idx} style={{ fontSize: '0.84rem' }}>
                          {it.name} <strong style={{ color: 'var(--primary)' }}>x{it.qty}</strong> (₹{it.total.toFixed(2)})
                        </div>
                      ))}
                    </td>
                    <td style={{ fontWeight: 800, color: 'var(--success)' }}>₹{s.totalAmount.toFixed(2)}</td>
                    <td><span className="badge badge-success">{s.paymentStatus}</span></td>
                    <td>{s.paymentMethod}</td>
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
