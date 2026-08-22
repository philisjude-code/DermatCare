import React, { useState } from 'react';
import { Package, Plus, ArrowDownRight, ArrowUpRight, Search, Filter, AlertTriangle, CheckCircle2, History, IndianRupee, Edit } from 'lucide-react';

export default function Inventory({ stock, setStock, transactions, setTransactions, onNavigateStockReceived, onNavigateSales }) {
  const [activeSubTab, setActiveSubTab] = useState('inventory'); // 'inventory' | 'history'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [showStockModal, setShowStockModal] = useState(false);

  // Form State for Stock Movement
  const [movementType, setMovementType] = useState('RECEIVED');
  const [selectedItemId, setSelectedItemId] = useState(stock[0]?.id || '');
  const [quantity, setQuantity] = useState(10);
  const [unitPrice, setUnitPrice] = useState(stock[0]?.sellingPrice || stock[0]?.unitPrice || 0);
  const [counterparty, setCounterparty] = useState('');
  const [notes, setNotes] = useState('');

  const categories = ['ALL', ...new Set(stock.map(i => i.category))];

  const filteredStock = stock.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.manufacturer && item.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleItemSelect = (id) => {
    setSelectedItemId(id);
    const item = stock.find(i => i.id === id);
    if (item) {
      setUnitPrice(item.sellingPrice || item.unitPrice || 0);
    }
  };

  const handleStockSubmit = (e) => {
    e.preventDefault();
    const item = stock.find(i => i.id === selectedItemId);
    if (!item) return;

    const qtyNum = parseInt(quantity, 10);
    if (isNaN(qtyNum) || qtyNum <= 0) return;

    if (movementType === 'SOLD' && item.stock < qtyNum) {
      alert(`Cannot sell ${qtyNum} units! Current stock is only ${item.stock}.`);
      return;
    }

    const newStockCount = movementType === 'RECEIVED' ? item.stock + qtyNum : item.stock - qtyNum;
    const updatedStockList = stock.map(i => i.id === selectedItemId ? {
      ...i,
      stock: newStockCount,
      status: newStockCount === 0 ? 'Out of Stock' : newStockCount <= i.minThreshold ? 'Low Stock' : 'In Stock'
    } : i);
    setStock(updatedStockList);

    const newTxn = {
      id: `TXN-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleString(),
      type: movementType,
      item: item.name,
      qty: qtyNum,
      unitPrice: parseFloat(unitPrice),
      total: qtyNum * parseFloat(unitPrice),
      [movementType === 'SOLD' ? 'patient' : 'vendor']: counterparty || (movementType === 'SOLD' ? 'Walk-in Patient' : 'Medical Supplier'),
      notes: notes || (movementType === 'RECEIVED' ? 'Shipment Received' : 'Direct OTC Sale')
    };

    setTransactions([newTxn, ...transactions]);
    setShowStockModal(false);
    setQuantity(10);
    setCounterparty('');
    setNotes('');
  };

  const totalStockValue = stock.reduce((sum, item) => sum + (item.stock * (item.sellingPrice || item.unitPrice || 0)), 0);
  const lowStockCount = stock.filter(item => item.stock <= item.minThreshold).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Products & Inventory Management</h1>
          <p className="page-description">Manage dermatological product categories, prices, stock levels, and audit logs.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {onNavigateStockReceived && (
            <button className="btn btn-secondary" onClick={onNavigateStockReceived}>
              <ArrowDownRight size={16} /> Stock Received Desk
            </button>
          )}
          {onNavigateSales && (
            <button className="btn btn-secondary" onClick={onNavigateSales}>
              <ArrowUpRight size={16} /> Sales & POS Desk
            </button>
          )}
          <button className="btn btn-primary" onClick={() => setShowStockModal(true)}>
            <Plus size={16} /> Quick Stock Movement Log
          </button>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-3">
        <div className="card" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Active SKUs</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{stock.length} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>products</span></div>
        </div>
        <div className="card" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Low Stock / Reorder Needed</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: lowStockCount > 0 ? 'var(--danger)' : 'var(--success)' }}>
            {lowStockCount} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>items</span>
          </div>
        </div>
        <div className="card" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Inventory Valuation</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
            ₹{totalStockValue.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Filters & Table */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="input"
            style={{ paddingLeft: '2.4rem' }}
            placeholder="Search product name, SKU, or brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={16} style={{ color: 'var(--text-muted)' }} />
          <select className="select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'ALL' ? 'All Categories' : cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>SKU / Product Name</th>
              <th>Category</th>
              <th>Available Stock</th>
              <th>Min Stock</th>
              <th>Selling Price</th>
              <th>Batch / Expiry</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStock.map((item) => {
              const isLow = item.stock <= item.minThreshold;
              const isOut = item.stock === 0;

              return (
                <tr key={item.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{item.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{item.id} • {item.manufacturer || item.brand}</div>
                  </td>
                  <td><span className="badge badge-accent">{item.category}</span></td>
                  <td>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: isOut ? 'var(--danger)' : isLow ? 'var(--warning)' : 'var(--text-main)' }}>
                      {item.stock}
                    </span>{' '}
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.unit}</span>
                  </td>
                  <td>{item.minThreshold}</td>
                  <td style={{ fontWeight: 700 }}>₹{(item.sellingPrice || item.unitPrice || 0).toFixed(2)}</td>
                  <td>
                    <div style={{ fontSize: '0.82rem' }}>Batch: {item.batchNo}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Exp: {item.expiry}</div>
                  </td>
                  <td>
                    {isOut ? (
                      <span className="badge badge-danger">Out of Stock</span>
                    ) : isLow ? (
                      <span className="badge badge-warning">Low Stock</span>
                    ) : (
                      <span className="badge badge-success">In Stock</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setSelectedItemId(item.id);
                        setUnitPrice(item.sellingPrice || item.unitPrice || 0);
                        setShowStockModal(true);
                      }}
                    >
                      Update Log
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Stock In / Out Modal */}
      {showStockModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Record Stock Movement</h3>
              <button className="btn btn-secondary btn-sm" onClick={() => setShowStockModal(false)}>✕</button>
            </div>

            <form onSubmit={handleStockSubmit}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Movement Type</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <button type="button" className={`btn ${movementType === 'RECEIVED' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setMovementType('RECEIVED')}>
                      <ArrowDownRight size={16} /> Stock Received (In)
                    </button>
                    <button type="button" className={`btn ${movementType === 'SOLD' ? 'btn-danger' : 'btn-secondary'}`} onClick={() => setMovementType('SOLD')}>
                      <ArrowUpRight size={16} /> Stock Sold (Out)
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Select Product</label>
                  <select className="select" value={selectedItemId} onChange={(e) => handleItemSelect(e.target.value)}>
                    {stock.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.name} ({item.stock} in stock)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Quantity</label>
                    <input type="number" min="1" className="input" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Unit Price (₹)</label>
                    <input type="number" step="0.01" className="input" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} required />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    {movementType === 'SOLD' ? 'Patient Name' : 'Supplier Name'}
                  </label>
                  <input type="text" className="input" placeholder={movementType === 'SOLD' ? 'e.g. Sophia Martinez' : 'e.g. CeraCare Wholesalers'} value={counterparty} onChange={(e) => setCounterparty(e.target.value)} />
                </div>

                <div style={{ background: 'var(--bg-app)', padding: '0.85rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Calculated Total Amount:</span>
                  <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary)' }}>
                    ₹{((parseInt(quantity) || 0) * (parseFloat(unitPrice) || 0)).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowStockModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Stock Log</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
