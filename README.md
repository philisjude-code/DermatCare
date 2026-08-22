# DermPulse - Dermatology Clinic Management System

**DermPulse** is a complete, modern Dermatology Clinic Management System built with React, Vite, and custom CSS design tokens.

## Features

- **Role-Based Authentication**: Portals and login flows for `ADMIN`, `DOCTOR`, `PATIENT`, `RECEPTIONIST`, and `INVENTORY_MANAGER`.
- **Patient Portal & Booking Wizard**: Full profile management, category-based appointment booking (Skin, Hair, Nail, Mucous Membrane, Cosmetic, Pediatric, STI, etc.) with problem selection, symptom duration, severity ratings, image uploads, and doctor-approved Rx viewer.
- **Doctor Consultation Workspace & EMR**: Complete clinical consultation view with examination findings, affected body area, diagnosis, doctor-approved prescription builder, and chronological medical timeline.
- **Prescription Management**: Doctor authorization workflow, letterhead generator with doctor signature line & stamp, print/PDF export.
- **Inventory, Stock Received & Sales/POS**: Product catalog, batch & expiry tracking, incoming shipment logs (`STOCK_RECEIVED`), point-of-sale checkout (`SALE`), and low-stock alerts.
- **Analytics & HIPAA Audit Trail**: Performance metrics, consultation category charts, revenue summaries, and security audit logs.

## Setup & Running

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```
