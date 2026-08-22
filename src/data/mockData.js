// Comprehensive Dataset for Dermatology Clinic Management System

export const INITIAL_USERS = [
  {
    id: 'USR-001',
    username: 'admin',
    password: 'password123',
    name: 'Clinic Administrator',
    email: 'admin@auradermacare.com',
    role: 'ADMIN',
    avatar: 'AD'
  },
  {
    id: 'USR-002',
    username: 'doctor',
    password: 'password123',
    name: 'Dr. Sarah Vance, MD',
    email: 'dr.vance@auradermacare.com',
    role: 'DOCTOR',
    specialty: 'Board Certified Dermatologist',
    licenseNo: 'MED-DERM-99402',
    avatar: 'SV'
  },
  {
    id: 'USR-003',
    username: 'patient',
    password: 'password123',
    name: 'Sophia Martinez',
    email: 'sophia.m@example.com',
    role: 'PATIENT',
    patientId: 'PAT-101',
    avatar: 'SM'
  },
  {
    id: 'USR-004',
    username: 'receptionist',
    password: 'password123',
    name: 'Jessica Alba',
    email: 'reception@auradermacare.com',
    role: 'RECEPTIONIST',
    avatar: 'JA'
  },
  {
    id: 'USR-005',
    username: 'inventory',
    password: 'password123',
    name: 'David Miller',
    email: 'stock@auradermacare.com',
    role: 'INVENTORY_MANAGER',
    avatar: 'DM'
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: 'SKU-1001',
    name: 'Tretinoin Cream 0.05%',
    category: 'Medication',
    brand: 'DermaPharma',
    manufacturer: 'DermaPharma Labs',
    supplier: 'PharmaSupply Co',
    batchNo: 'B-88392',
    stock: 45,
    minThreshold: 15,
    purchasePrice: 18.00,
    sellingPrice: 28.50,
    unitPrice: 28.50,
    unit: 'Tube (30g)',
    receivedDate: '2026-07-10',
    expiry: '2027-04-15',
    status: 'In Stock',
    description: 'First-line topical retinoid for comedonal & inflammatory acne and photoaging.'
  },
  {
    id: 'SKU-1002',
    name: 'Isotretinoin 20mg Softgels',
    category: 'Medication',
    brand: 'Roche',
    manufacturer: 'Roche SkinCare',
    supplier: 'Global Pharma Distributors',
    batchNo: 'ISO-9921',
    stock: 12,
    minThreshold: 20,
    purchasePrice: 45.00,
    sellingPrice: 64.00,
    unitPrice: 64.00,
    unit: 'Box (30 Caps)',
    receivedDate: '2026-06-15',
    expiry: '2026-11-30',
    status: 'Low Stock',
    description: 'Oral retinoid for severe nodulocystic recalcitrant acne vulgaris.'
  },
  {
    id: 'SKU-1003',
    name: 'Salicylic Acid 2% Foaming Cleanser',
    category: 'Cleanser',
    brand: 'CeraCare',
    manufacturer: 'CeraCare Derma',
    supplier: 'CeraCare Wholesalers',
    batchNo: 'SA-4410',
    stock: 80,
    minThreshold: 25,
    purchasePrice: 11.50,
    sellingPrice: 19.99,
    unitPrice: 19.99,
    unit: 'Bottle (200ml)',
    receivedDate: '2026-08-01',
    expiry: '2028-01-10',
    status: 'In Stock',
    description: 'Beta-hydroxy acid exfoliating cleanser for oily and acne-prone skin.'
  },
  {
    id: 'SKU-1004',
    name: 'Hydroquinone 4% Depigmenting Cream',
    category: 'Cream',
    brand: 'MelanoClear',
    manufacturer: 'MelanoClear Inc',
    supplier: 'Derma Direct',
    batchNo: 'HQ-1029',
    stock: 22,
    minThreshold: 10,
    purchasePrice: 20.00,
    sellingPrice: 35.00,
    unitPrice: 35.00,
    unit: 'Tube (25g)',
    receivedDate: '2026-07-22',
    expiry: '2026-09-20',
    status: 'In Stock',
    description: 'Tyrosinase inhibitor for refractory melasma and post-inflammatory hyperpigmentation.'
  },
  {
    id: 'SKU-1005',
    name: 'Doxycycline Hyclate 100mg',
    category: 'Medication',
    brand: 'PharmMed',
    manufacturer: 'PharmMed Global',
    supplier: 'PharmaSupply Co',
    batchNo: 'DOX-7712',
    stock: 95,
    minThreshold: 30,
    purchasePrice: 12.00,
    sellingPrice: 22.00,
    unitPrice: 22.00,
    unit: 'Strip (10 Tabs)',
    receivedDate: '2026-08-10',
    expiry: '2027-08-14',
    status: 'In Stock',
    description: 'Tetracycline antibiotic for moderate-to-severe inflammatory acne and papulopustular rosacea.'
  },
  {
    id: 'SKU-1006',
    name: 'Ketoconazole 2% Anti-Dandruff Shampoo',
    category: 'Shampoo',
    brand: 'ScalpCare',
    manufacturer: 'ScalpCare Med',
    supplier: 'ScalpCare Direct',
    batchNo: 'KETO-309',
    stock: 34,
    minThreshold: 15,
    purchasePrice: 9.00,
    sellingPrice: 16.50,
    unitPrice: 16.50,
    unit: 'Bottle (120ml)',
    receivedDate: '2026-07-05',
    expiry: '2027-12-01',
    status: 'In Stock',
    description: 'Broad spectrum antifungal for seborrheic dermatitis and tinea versicolor.'
  },
  {
    id: 'SKU-1007',
    name: 'Glycolic Acid 30% Peel Solution',
    category: 'Serum',
    brand: 'DermaPeel',
    manufacturer: 'DermaPeel Pro',
    supplier: 'Clinical Derma Supply',
    batchNo: 'GAP-501',
    stock: 8,
    minThreshold: 10,
    purchasePrice: 70.00,
    sellingPrice: 110.00,
    unitPrice: 110.00,
    unit: 'Vial (50ml)',
    receivedDate: '2026-05-18',
    expiry: '2026-10-15',
    status: 'Low Stock',
    description: 'Alpha-hydroxy clinical exfoliant solution for chemical peels.'
  },
  {
    id: 'SKU-1008',
    name: 'Minoxidil 5% Topical Solution',
    category: 'Serum',
    brand: 'HairRevive',
    manufacturer: 'HairRevive Labs',
    supplier: 'Trichology Supplies',
    batchNo: 'MIN-881',
    stock: 50,
    minThreshold: 20,
    purchasePrice: 18.00,
    sellingPrice: 32.00,
    unitPrice: 32.00,
    unit: 'Bottle (60ml)',
    receivedDate: '2026-08-05',
    expiry: '2027-06-30',
    status: 'In Stock',
    description: 'K-channel opener for androgenetic alopecia and hair density restoration.'
  },
  {
    id: 'SKU-1009',
    name: 'Mineral Broad-Spectrum SPF 50+ Sunscreen',
    category: 'Sunscreen',
    brand: 'SunShield',
    manufacturer: 'SunShield Derma',
    supplier: 'SunShield Direct',
    batchNo: 'SPF-902',
    stock: 110,
    minThreshold: 30,
    purchasePrice: 16.00,
    sellingPrice: 29.90,
    unitPrice: 29.90,
    unit: 'Tube (75ml)',
    receivedDate: '2026-08-12',
    expiry: '2028-05-18',
    status: 'In Stock',
    description: 'Zinc oxide non-comedogenic physical sunscreen suitable for post-procedure sensitive skin.'
  },
  {
    id: 'SKU-1010',
    name: 'Clobetasol Propionate 0.05% Ointment',
    category: 'Ointment',
    brand: 'SteroidMed',
    manufacturer: 'SteroidMed Co',
    supplier: 'PharmaSupply Co',
    batchNo: 'CLO-114',
    stock: 18,
    minThreshold: 12,
    purchasePrice: 14.00,
    sellingPrice: 24.50,
    unitPrice: 24.50,
    unit: 'Tube (30g)',
    receivedDate: '2026-06-20',
    expiry: '2027-02-28',
    status: 'In Stock',
    description: 'Super-high potency topical corticosteroid for acute severe plaque psoriasis and lichen planus.'
  }
];

export const INITIAL_INVENTORY = INITIAL_PRODUCTS;

export const INITIAL_TRANSACTIONS = [
  {
    id: 'TXN-901',
    date: '2026-08-22 09:30',
    type: 'SOLD',
    item: 'Tretinoin Cream 0.05%',
    qty: 2,
    unitPrice: 28.50,
    total: 57.00,
    patient: 'Sophia Martinez',
    patientId: 'PAT-101',
    doctor: 'Dr. Sarah Vance',
    notes: 'Prescription Rx-8012'
  },
  {
    id: 'TXN-902',
    date: '2026-08-21 16:45',
    type: 'RECEIVED',
    item: 'Salicylic Acid 2% Foaming Cleanser',
    qty: 50,
    unitPrice: 11.50,
    total: 575.00,
    vendor: 'CeraCare Wholesalers',
    invoiceNo: 'INV-88291',
    batchNo: 'SA-4410',
    expiry: '2028-01-10',
    notes: 'PO-8829 Shipment'
  },
  {
    id: 'TXN-903',
    date: '2026-08-21 14:15',
    type: 'SOLD',
    item: 'Isotretinoin 20mg Softgels',
    qty: 1,
    unitPrice: 64.00,
    total: 64.00,
    patient: 'Ethan Roberts',
    patientId: 'PAT-102',
    doctor: 'Dr. Sarah Vance',
    notes: 'Prescription Rx-8010'
  },
  {
    id: 'TXN-904',
    date: '2026-08-20 11:00',
    type: 'RECEIVED',
    item: 'Mineral Broad-Spectrum SPF 50+ Sunscreen',
    qty: 40,
    unitPrice: 16.00,
    total: 640.00,
    vendor: 'SunShield Direct',
    invoiceNo: 'INV-9901',
    batchNo: 'SPF-902',
    expiry: '2028-05-18',
    notes: 'Restock order'
  },
  {
    id: 'TXN-905',
    date: '2026-08-20 10:20',
    type: 'SOLD',
    item: 'Hydroquinone 4% Depigmenting Cream',
    qty: 1,
    unitPrice: 35.00,
    total: 35.00,
    patient: 'Priya Sharma',
    patientId: 'PAT-103',
    doctor: 'Dr. Sarah Vance',
    notes: 'Prescription Rx-8008'
  }
];

export const INITIAL_PATIENTS = [
  {
    id: 'PAT-101',
    name: 'Sophia Martinez',
    dob: '2000-04-12',
    age: 26,
    gender: 'Female',
    phone: '+1 (555) 234-8901',
    email: 'sophia.m@example.com',
    address: '742 Evergreen Terrace, Springfield',
    emergencyContact: 'Carlos Martinez (Brother) - +1 (555) 234-9999',
    fitzpatrickSkinType: 'Type III (Light Brown)',
    primaryConcern: 'Moderate Inflammatory Acne & Post-Acne Erythema',
    allergies: 'Penicillin, Fragrance in topicals',
    existingConditions: 'Polycystic Ovary Syndrome (PCOS), Mild Anemia',
    currentMedications: 'Spironolactone 50mg daily, Multivitamins',
    dermatologicalHistory: 'Hormonal acne flare-ups past 3 years. Used OTC benzoyl peroxide with mild irritation.',
    medicalHistory: 'Hormonal acne flare-ups past 3 years. Used OTC benzoyl peroxide with mild irritation.',
    createdDate: '2026-06-10'
  },
  {
    id: 'PAT-102',
    name: 'Ethan Roberts',
    dob: '1995-09-25',
    age: 31,
    gender: 'Male',
    phone: '+1 (555) 876-1234',
    email: 'ethan.r@example.com',
    address: '128 Pinecrest Way, Austin, TX',
    emergencyContact: 'Laura Roberts (Wife) - +1 (555) 876-4321',
    fitzpatrickSkinType: 'Type II (Fair, burns easily)',
    primaryConcern: 'Nodulocystic Recalcitrant Acne on Back & Face',
    allergies: 'None reported',
    existingConditions: 'None',
    currentMedications: 'Isotretinoin 20mg Softgels',
    dermatologicalHistory: 'Severe acne since teenage years, failed oral doxycycline.',
    medicalHistory: 'Completed 1 month of oral Doxycycline with minimal response. Baseline LFT & Lipid panel cleared for oral retinoids.',
    createdDate: '2026-07-02'
  },
  {
    id: 'PAT-103',
    name: 'Priya Sharma',
    dob: '1988-11-05',
    age: 38,
    gender: 'Female',
    phone: '+1 (555) 432-9087',
    email: 'priya.s@example.com',
    address: '405 Grand Avenue, Chicago, IL',
    emergencyContact: 'Rajesh Sharma (Spouse) - +1 (555) 432-1111',
    fitzpatrickSkinType: 'Type IV (Moderate Brown)',
    primaryConcern: 'Bilateral Malar Melasma & Solar Lentigines',
    allergies: 'Sulfa drugs',
    existingConditions: 'Hypothyroidism (Controlled)',
    currentMedications: 'Levothyroxine 75mcg',
    dermatologicalHistory: 'Melasma developed during second pregnancy 2 years ago.',
    medicalHistory: 'Worsened after pregnancy 2 years ago. Uses daily sunscreen, wants combination depigmenting therapy.',
    createdDate: '2026-05-18'
  },
  {
    id: 'PAT-104',
    name: 'Marcus Vance',
    dob: '1981-02-14',
    age: 45,
    gender: 'Male',
    phone: '+1 (555) 901-3456',
    email: 'marcus.v@example.com',
    address: '920 Oak Ridge Blvd, Seattle, WA',
    emergencyContact: 'Karen Vance (Sister) - +1 (555) 901-7788',
    fitzpatrickSkinType: 'Type III (Medium)',
    primaryConcern: 'Plaque Psoriasis on Elbows & Knees',
    allergies: 'Latex',
    existingConditions: 'Psoriatic Arthritis (Mild)',
    currentMedications: 'Clobetasol Propionate 0.05% Ointment',
    dermatologicalHistory: 'Diagnosed 5 years ago. Chronic plaque psoriasis with seasonal winter exacerbation.',
    medicalHistory: 'Diagnosed 5 years ago. Chronic plaque psoriasis with seasonal winter exacerbation.',
    createdDate: '2026-04-12'
  },
  {
    id: 'PAT-105',
    name: 'Elena Rostova',
    dob: '1997-07-30',
    age: 29,
    gender: 'Female',
    phone: '+1 (555) 654-7890',
    email: 'elena.r@example.com',
    address: '55 Beacon Street, Boston, MA',
    emergencyContact: 'Dmitri Rostov (Father) - +1 (555) 654-3322',
    fitzpatrickSkinType: 'Type I (Very Fair, always burns)',
    primaryConcern: 'Erythematotelangiectatic Rosacea & Facial Flushing',
    allergies: 'Aspirin',
    existingConditions: 'Sensitive skin syndrome',
    currentMedications: 'Ivermectin 1% Cream',
    dermatologicalHistory: 'Frequent flushing with hot drinks and sun exposure. Sensitive skin barrier.',
    medicalHistory: 'Frequent flushing with hot drinks and sun exposure. Sensitive skin barrier.',
    createdDate: '2026-08-01'
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: 'APT-501',
    patientId: 'PAT-101',
    patientName: 'Sophia Martinez',
    date: '2026-08-22',
    time: '10:00 AM',
    doctor: 'Dr. Sarah Vance, MD (Dermatology)',
    consultationCategory: 'Skin Related',
    problem: 'Acne',
    type: 'Acne & Skin Consultation',
    status: 'In Consultation',
    duration: '3 Months',
    symptoms: 'Inflammatory papules, blackheads, painful cysts around chin',
    severity: 'Moderate (Noticeable discomfort, spreading)',
    previousTreatment: 'OTC Benzoyl Peroxide 5% gel',
    allergies: 'Penicillin, Fragrance',
    notes: 'Follow-up for 6-week Tretinoin acclimation check.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1512290900673-455b8ef6c3b6?auto=format&fit=crop&w=400&q=80',
        name: 'chin_acne_flare.jpg'
      }
    ]
  },
  {
    id: 'APT-502',
    patientId: 'PAT-103',
    patientName: 'Priya Sharma',
    date: '2026-08-22',
    time: '11:30 AM',
    doctor: 'Dr. Sarah Vance, MD (Dermatology)',
    consultationCategory: 'Cosmetic Dermatology',
    problem: 'Hyperpigmentation & Melasma',
    type: 'Chemical Peel Session (Glycolic 30%)',
    status: 'Confirmed',
    duration: '2 Years',
    symptoms: 'Symmetrical dark patches over malar cheeks and upper lip',
    severity: 'Moderate (Noticeable discomfort, spreading)',
    previousTreatment: 'Hydroquinone 4% cream',
    allergies: 'Sulfa drugs',
    notes: 'Pre-peel priming done with hydroquinone 4%. Check for skin sensitivity before applying.'
  },
  {
    id: 'APT-503',
    patientId: 'PAT-102',
    patientName: 'Ethan Roberts',
    date: '2026-08-22',
    time: '02:00 PM',
    doctor: 'Dr. Sarah Vance, MD (Dermatology)',
    consultationCategory: 'Skin Related',
    problem: 'Acne',
    type: 'Isotretinoin Month 2 Review',
    status: 'Checked In',
    duration: '5 Years',
    symptoms: 'Deep nodulocystic lesions back and chest',
    severity: 'Severe (Intense itching/pain, extensive coverage)',
    previousTreatment: 'Oral Doxycycline 100mg',
    allergies: 'None',
    notes: 'Review lab results (Triglycerides & LFT) and evaluate cheilitis dryness side effects.'
  },
  {
    id: 'APT-504',
    patientId: 'PAT-104',
    patientName: 'Marcus Vance',
    date: '2026-08-23',
    time: '09:30 AM',
    doctor: 'Dr. Sarah Vance, MD (Dermatology)',
    consultationCategory: 'Skin Related',
    problem: 'Psoriasis',
    type: 'Psoriasis Follow-Up',
    status: 'Pending',
    duration: '5 Years',
    symptoms: 'Thick scaly erythematous plaques bilateral elbows and knees',
    severity: 'Moderate (Noticeable discomfort, spreading)',
    previousTreatment: 'Clobetasol 0.05% ointment',
    allergies: 'Latex',
    notes: 'Evaluate PASI score improvement after 4 weeks of Clobetasol application.'
  },
  {
    id: 'APT-505',
    patientId: 'PAT-105',
    patientName: 'Elena Rostova',
    date: '2026-08-23',
    time: '11:00 AM',
    doctor: 'Dr. Sarah Vance, MD (Dermatology)',
    consultationCategory: 'Skin Related',
    problem: 'Rashes',
    type: 'Rosacea Laser Consultation',
    status: 'Pending',
    duration: '1 Year',
    symptoms: 'Facial flushing, telangiectasia on cheeks',
    severity: 'Mild (Minimal impact, localized)',
    previousTreatment: 'Ivermectin 1% cream',
    allergies: 'Aspirin',
    notes: 'Patch test discussion for IPL / Vascular Laser treatment.'
  }
];

export const INITIAL_CONSULTATIONS = [
  {
    id: 'CNS-701',
    appointmentId: 'APT-501',
    patientId: 'PAT-101',
    patientName: 'Sophia Martinez',
    doctorName: 'Dr. Sarah Vance, MD',
    consultationDate: '2026-08-22',
    consultationCategory: 'Skin Related',
    problem: 'Acne',
    symptoms: 'Inflammatory papules, blackheads, painful cysts around chin',
    severity: 'Moderate',
    affectedBodyArea: 'Face (Centrofacial / Cheeks / Forehead / Chin)',
    examinationFindings: 'Multiple comedones, 8 inflammatory papules, 2 submandibular pustules. No scarring present.',
    clinicalNotes: 'Patient experiencing mild retinoid purge on week 2 of Tretinoin. Advised non-comedogenic hydration.',
    possibleDiagnosis: 'Acne Vulgaris (Grade II)',
    finalDiagnosis: 'Acne Vulgaris (Grade II Inflammatory)',
    treatmentPlan: 'Continue Tretinoin 0.05% at night with sandwich moisturizing technique. Add oral Doxycycline 100mg BD for 4 weeks.',
    additionalInstructions: 'Apply mineral SPF 50+ every morning. Avoid mechanical scrubs.',
    followUpRecommendation: '4 Weeks',
    status: 'In Consultation',
    prescriptionId: 'Rx-8012'
  }
];

export const INITIAL_PRESCRIPTIONS = [
  {
    id: 'Rx-8012',
    date: '2026-08-22',
    patientId: 'PAT-101',
    patientName: 'Sophia Martinez',
    age: 26,
    gender: 'Female',
    diagnosis: 'Acne Vulgaris (Grade II Inflammatory)',
    doctorName: 'Dr. Sarah Vance, MD',
    clinicName: 'Aura Dermacare & Laser Center',
    status: 'Approved',
    approvedByDoctor: true,
    medications: [
      {
        name: 'Tretinoin Cream 0.05%',
        dosage: 'Pea-sized amount',
        frequency: 'Once daily at Night',
        route: 'Topical Application',
        duration: '12 Weeks',
        instructions: 'Apply to clean dry face 20 mins after washing. Follow with gentle moisturizer.'
      },
      {
        name: 'Doxycycline Hyclate 100mg',
        dosage: '1 Capsule (100mg)',
        frequency: 'Twice daily after meals',
        route: 'Oral Route',
        duration: '4 Weeks',
        instructions: 'Take with full glass of water. Avoid lying down for 30 mins after taking.'
      },
      {
        name: 'Mineral Broad-Spectrum SPF 50+ Sunscreen',
        dosage: 'Generous layer (2 finger lengths)',
        frequency: 'Every morning & reapply 3h',
        route: 'Topical Application',
        duration: 'Ongoing',
        instructions: 'Mandatory daily sun protection during retinoid therapy.'
      }
    ],
    externalProducts: [
      'Salicylic Acid 2% Foaming Cleanser (Morning wash)',
      'Ceramide Hydrating Lotion'
    ],
    generalAdvice: 'Expect mild peeling and redness during the first 2-3 weeks (retinoid purge). Do not use abrasive scrubs or AHA/BHA exfoliants simultaneously.',
    followUpDate: '2026-09-22'
  },
  {
    id: 'Rx-8010',
    date: '2026-08-21',
    patientId: 'PAT-102',
    patientName: 'Ethan Roberts',
    age: 31,
    gender: 'Male',
    diagnosis: 'Severe Nodulocystic Acne Vulgaris',
    doctorName: 'Dr. Sarah Vance, MD',
    clinicName: 'Aura Dermacare & Laser Center',
    status: 'Approved',
    approvedByDoctor: true,
    medications: [
      {
        name: 'Isotretinoin 20mg Softgels',
        dosage: '1 Softgel (20mg)',
        frequency: 'Once daily with high-fat meal',
        route: 'Oral Route',
        duration: '30 Days',
        instructions: 'Take with food for optimal absorption. Apply lip balm frequently.'
      }
    ],
    externalProducts: [
      'Petroleum Jelly Lip Balm',
      'Gentle Non-Foaming Cleanser'
    ],
    generalAdvice: 'Avoid vitamin A supplements, blood donation, and direct sunlight. Perform monthly blood tests.',
    followUpDate: '2026-09-20'
  }
];

export const INITIAL_FOLLOWUPS = [
  {
    id: 'FLW-301',
    patientId: 'PAT-101',
    patientName: 'Sophia Martinez',
    consultationId: 'CNS-701',
    phone: '+1 (555) 234-8901',
    email: 'sophia.m@example.com',
    assignedDoctor: 'Dr. Sarah Vance, MD',
    condition: 'Acne Vulgaris - Retinoid Therapy',
    reason: 'Evaluate Tretinoin acclimation and Doxycycline response',
    dueDate: '2026-08-29',
    status: 'Upcoming',
    templateType: 'Retinoid Acclimation Check (Day 7)',
    channel: 'WhatsApp & Email',
    lastContact: '2026-08-22',
    notes: 'Patient advised to report severe peeling',
    customMessage: 'Hi Sophia, this is Aura Dermacare checking in on Day 7 of your Tretinoin 0.05% routine. Are you experiencing mild dryness or peeling? Please reply if you need moisturizer recommendation tweaks!'
  },
  {
    id: 'FLW-302',
    patientId: 'PAT-103',
    patientName: 'Priya Sharma',
    consultationId: 'CNS-700',
    phone: '+1 (555) 432-9087',
    email: 'priya.s@example.com',
    assignedDoctor: 'Dr. Sarah Vance, MD',
    condition: 'Glycolic Peel Post-Care',
    reason: 'Post-chemical peel erythema check',
    dueDate: '2026-08-24',
    status: 'Upcoming',
    templateType: 'Chemical Peel Post-Care & SPF Reminder',
    channel: 'SMS',
    lastContact: '2026-08-20',
    notes: 'Check for post-inflammatory hyperpigmentation',
    customMessage: 'Dear Priya, reminder after your chemical peel: avoid picking peeling skin, apply SPF 50+ mineral sunscreen every 3 hours, and keep skin hydrated. Call clinic if severe redness occurs.'
  },
  {
    id: 'FLW-303',
    patientId: 'PAT-102',
    patientName: 'Ethan Roberts',
    consultationId: 'CNS-698',
    phone: '+1 (555) 876-1234',
    email: 'ethan.r@example.com',
    assignedDoctor: 'Dr. Sarah Vance, MD',
    condition: 'Oral Isotretinoin Month 1 Check',
    reason: 'Blood panel review & lipid profile check',
    dueDate: '2026-08-21',
    status: 'Completed',
    templateType: 'Isotretinoin Lab & Side-Effect Check',
    channel: 'Email',
    lastContact: '2026-08-21',
    notes: 'Labs received. LFT normal.',
    customMessage: 'Hi Ethan, please remember to send your monthly LFT & Lipid blood panel results to clinic@auradermacare.com prior to your appointment tomorrow.'
  }
];

export const INITIAL_SALES = [
  {
    id: 'SALE-101',
    date: '2026-08-22 09:30',
    patientId: 'PAT-101',
    patientName: 'Sophia Martinez',
    items: [
      { productId: 'SKU-1001', name: 'Tretinoin Cream 0.05%', qty: 2, unitPrice: 28.50, total: 57.00 }
    ],
    subtotal: 57.00,
    discount: 0,
    totalAmount: 57.00,
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'SALE-102',
    date: '2026-08-21 14:15',
    patientId: 'PAT-102',
    patientName: 'Ethan Roberts',
    items: [
      { productId: 'SKU-1002', name: 'Isotretinoin 20mg Softgels', qty: 1, unitPrice: 64.00, total: 64.00 }
    ],
    subtotal: 64.00,
    discount: 0,
    totalAmount: 64.00,
    paymentStatus: 'Paid',
    paymentMethod: 'Debit Card'
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'LOG-001',
    timestamp: '2026-08-22 09:00:12',
    user: 'Dr. Sarah Vance',
    role: 'DOCTOR',
    action: 'Prescription Approval',
    details: 'Approved prescription Rx-8012 for patient Sophia Martinez (PAT-101).'
  },
  {
    id: 'LOG-002',
    timestamp: '2026-08-22 09:15:40',
    user: 'Dr. Sarah Vance',
    role: 'DOCTOR',
    action: 'Medical Record View',
    details: 'Accessed electronic medical record for patient Ethan Roberts (PAT-102).'
  },
  {
    id: 'LOG-003',
    timestamp: '2026-08-21 16:45:00',
    user: 'David Miller',
    role: 'INVENTORY_MANAGER',
    action: 'Stock Received',
    details: 'Received 50 units of Salicylic Acid 2% Cleanser (Batch SA-4410).'
  }
];

export const INITIAL_CONDITIONS = [
  {
    id: 'COND-01',
    name: 'Acne Vulgaris',
    category: 'Pilosebaceous Unit Disorder',
    prevalence: 'Extremely Common (85% of adolescents & young adults)',
    causes: [
      'Follicular hyperkeratinization blocking pores',
      'Increased sebum production driven by androgens',
      'Cutibacterium acnes (C. acnes) proliferation & inflammation',
      'Genetic predisposition, stress, and high-glycemic diet'
    ],
    symptoms: [
      'Open comedones (blackheads) & Closed comedones (whiteheads)',
      'Inflammatory papules and pustules',
      'Deep painful nodules and cysts in severe cases',
      'Post-inflammatory erythema (PIE) & Post-inflammatory hyperpigmentation (PIH)'
    ],
    medications: [
      { type: 'Topical First-line', name: 'Tretinoin 0.025% - 0.05% or Adapalene 0.1%', note: 'Normalizes follicular desquamation' },
      { type: 'Topical Antimicrobial', name: 'Benzoyl Peroxide 2.5% - 5%', note: 'Bactericidal, non-resistance forming' },
      { type: 'Oral Antibiotic', name: 'Doxycycline 100mg daily (Max 12 weeks)', note: 'For moderate-severe inflammatory lesions' },
      { type: 'Oral Retinoid', name: 'Isotretinoin 0.5 - 1.0 mg/kg/day', note: 'Curative for severe recalcitrant nodular acne' }
    ],
    treatments: [
      'Chemical Peels (Salicylic Acid 20-30%, Glycolic Acid)',
      'Intralesional Triamcinolone Acetonide Injection for severe cysts',
      'Comedone extraction under sterile clinical conditions',
      'LED Blue/Red Light Therapy'
    ],
    patientSkincare: [
      'Use non-comedogenic gentle foaming cleanser twice daily',
      'Apply oil-free lightweight hydrating moisturizer',
      'Apply non-comedogenic broad spectrum SPF 30+ daily',
      'Never squeeze or pop acne lesions to avoid permanent pitting scars'
    ]
  },
  {
    id: 'COND-02',
    name: 'Atopic Dermatitis (Eczema)',
    category: 'Inflammatory / Barrier Disruption',
    prevalence: 'Common (15-20% children, 1-3% adults)',
    causes: [
      'Filaggrin gene mutation (FLG) causing skin barrier dysfunction',
      'Immune dysregulation (Th2-skewed cytokine release)',
      'Environmental allergens, harsh soaps, dry climate, and stress'
    ],
    symptoms: [
      'Intense pruritus (itching) - key hallmark symptom',
      'Erythematous pruritic papules and plaques with scaling',
      'Lichenification (thickened skin) from chronic rubbing/scratching',
      'Dry skin (xerosis) and recurrent secondary staph infections'
    ],
    medications: [
      { type: 'Topical First-line', name: 'Hydrocortisone 1% or Triamcinolone 0.1% Cream', note: 'Short bursts for acute flare-ups' },
      { type: 'Topical Non-Steroid', name: 'Tacrolimus 0.03%-0.1% Ointment or Crisaborole', note: 'Steroid-sparing calcineurin inhibitor for face/folds' },
      { type: 'Oral Antihistamine', name: 'Cetirizine 10mg or Hydroxyzine 25mg', note: 'Symptomatic itch relief, especially at bedtime' },
      { type: 'Systemic Biologic', name: 'Dupilumab (Dupixent) IL-4/IL-13 inhibitor', note: 'For moderate to severe refractory eczema' }
    ],
    treatments: [
      'Soak-and-Smear technique (bath followed immediately by thick emollient)',
      'Wet wrap therapy for severe acute recalcitrant flares',
      'Narrowband UVB (NB-UVB) Phototherapy'
    ],
    patientSkincare: [
      'Apply thick ceramides-rich emollient cream within 3 minutes after bathing',
      'Avoid scented soaps, sulfates, hot showers, and wool clothing',
      'Use gentle fragrance-free synthetic cleansers (syndets)'
    ]
  },
  {
    id: 'COND-03',
    name: 'Melasma & Facial Hyperpigmentation',
    category: 'Pigmentary Disorder',
    prevalence: 'High in Fitzpatrick Skin Types III to V',
    causes: [
      'Melanocyte hyper-reactivity stimulated by UV radiation & Visible Light',
      'Hormonal triggers (Pregnancy, Oral Contraceptive Pills, Thyroid)',
      'Genetic susceptibility and chronic vascular inflammation'
    ],
    symptoms: [
      'Symmetrical hyperpigmented brown-grey macules and patches',
      'Typically affects Centrofacial, Malar (cheeks), and Mandibular zones',
      'Absence of preceding inflammation or itching'
    ],
    medications: [
      { type: 'Triple Combination Cream', name: 'Hydroquinone 4% + Tretinoin 0.05% + Fluocinolone 0.01%', note: 'Gold standard (Kligman formula) for 8-12 weeks' },
      { type: 'Topical Non-HQ', name: 'Azelaic Acid 15%-20% Gel or Tranexamic Acid 5%', note: 'Safe for long-term maintenance and pregnancy' },
      { type: 'Oral Agent', name: 'Oral Tranexamic Acid 250mg twice daily', note: 'Off-label vascular & melanogenic inhibitor for stubborn melasma' }
    ],
    treatments: [
      'Superficial Chemical Peels (Glycolic Acid 30-50%, Lactic Acid, TCA 15%)',
      'Low-fluence Q-switched Nd:YAG Laser (Laser Toning)',
      'Microneedling with Tranexamic Acid serum infusion'
    ],
    patientSkincare: [
      'Strict daily broad-spectrum Tinted SPF 50+ (Iron oxides block blue light)',
      'Reapply sunscreen every 2-3 hours and wear wide-brimmed hats outdoors',
      'Avoid heat sources (saunas, hot yoga) which stimulate melanocytes'
    ]
  },
  {
    id: 'COND-04',
    name: 'Psoriasis Vulgaris (Plaque Psoriasis)',
    category: 'Autoimmune Papulosquamous',
    prevalence: '2-3% of global population',
    causes: [
      'T-cell mediated autoimmune inflammation (IL-17, IL-23, TNF-alpha pathways)',
      'Accelerated epidermal keratinocyte turnover (3-4 days vs 28 days normal)',
      'Triggers: Streptococcal throat infection, Koebner phenomenon (trauma), stress, beta-blockers'
    ],
    symptoms: [
      'Well-demarcated erythematous plaques covered with silvery-white scales',
      'Predilection sites: Extensor surfaces (Elbows, Knees), Scalp, Umbilicus, Sacrum',
      'Auspitz sign (pinpoint bleeding upon scraping scale)',
      'Pitting of nails and subungual hyperkeratosis'
    ],
    medications: [
      { type: 'Topical Steroid/Vitamin D', name: 'Clobetasol 0.05% + Calcipotriene 0.005%', note: 'Synergistic anti-inflammatory & anti-proliferative' },
      { type: 'Topical Keratolytic', name: 'Salicylic Acid 6% Ointment or Coal Tar 5%', note: 'Descales thick hyperkeratotic plaques' },
      { type: 'Oral Systemic', name: 'Methotrexate 7.5 - 15mg weekly or Cyclosporine', note: 'Immunomodulatory systemic therapy' },
      { type: 'Biologic Targeted', name: 'Secukinumab (IL-17A) or Risankizumab (IL-23)', note: 'Near-complete PASI 90/100 skin clearance' }
    ],
    treatments: [
      'Narrowband UVB (NB-UVB) phototherapy 2-3 times per week',
      'Excimer 308nm Laser for localized resistant plaques',
      'Scalp descaling treatment protocols'
    ],
    patientSkincare: [
      'Keep skin thoroughly moisturized to minimize itching and scaling',
      'Do not aggressively scratch or peel off scales to prevent Koebnerization',
      'Maintain healthy BMI and avoid smoking/excess alcohol'
    ]
  },
  {
    id: 'COND-05',
    name: 'Alopecia Areata & Hair Loss',
    category: 'Trichology / Autoimmune',
    prevalence: '2% lifetime risk worldwide',
    causes: [
      'Autoimmune attack on hair follicle immune privilege site by CD8+ T cells',
      'Associated with thyroid autoimmune disease, vitiligo, and high psychological stress'
    ],
    symptoms: [
      'Smooth, round, circumscribed patchy hair loss on scalp or beard',
      'Characteristic "exclamation mark" hairs at the periphery of expanding patches',
      'Nail pitting or trachyonychia in severe forms (Alopecia Totalis / Universalis)'
    ],
    medications: [
      { type: 'Intralesional Steroid', name: 'Triamcinolone Acetonide (Kenalog) 5mg/ml injection', note: 'First-line for localized patch alopecia' },
      { type: 'Topical Growth Factor', name: 'Minoxidil 5% Solution / Foam twice daily', note: 'Promotes vascularity & extends anagen phase' },
      { type: 'Topical Steroid', name: 'Clobetasol 0.05% Foam or Solution', note: 'For scalp patch application twice daily' },
      { type: 'Oral JAK Inhibitor', name: 'Baricitinib 2mg - 4mg daily or Ritlecitinib', note: 'FDA approved for severe extensive scalp hair loss' }
    ],
    treatments: [
      'Intralesional corticosteroid micro-injections every 4-6 weeks',
      'Platelet-Rich Plasma (PRP) scalp injections',
      'Topical Immunotherapy (DPCP / Squaric acid dibutylester)'
    ],
    patientSkincare: [
      'Avoid harsh mechanical traction, tight ponytails, or chemical relaxers',
      'Use gentle scalp massager and sulfate-free trichology shampoos',
      'Protect exposed scalp patches with sunblock SPF 50+'
    ]
  },
  {
    id: 'COND-06',
    name: 'Rosacea',
    category: 'Vascular & Inflammatory',
    prevalence: 'Common in fair skin (5-10% of adults)',
    causes: [
      'Neurovascular dysregulation causing abnormal facial vasodilation',
      'Innate immune hyper-reactivity (elevated Cathelicidin LL-37)',
      'Demodex folliculorum mite overgrowth and trigger exposures (Spicy food, alcohol, heat, sun)'
    ],
    symptoms: [
      'Central facial erythema (flushing and persistent redness)',
      'Telangiectasias (visible tiny spider blood vessels)',
      'Papules and pustules (Papulopustular Rosacea) without comedones',
      'Ocular irritation (grittiness, blepharitis) and Phymatous changes (Rhinophyma in severe male cases)'
    ],
    medications: [
      { type: 'Topical Anti-Demodex', name: 'Ivermectin 1% Cream (Soolantra) once daily', note: 'Decreases Demodex density and reduces papules' },
      { type: 'Topical Anti-inflammatory', name: 'Metronidazole 0.75% Gel or Azelaic Acid 15% Gel', note: 'First-line mild papulopustular rosacea' },
      { type: 'Topical Vasoconstrictor', name: 'Brimonidine 0.33% Gel or Oxymetazoline 1%', note: 'Transient reduction of persistent facial redness (6-8 hours)' },
      { type: 'Oral Antibiotic', name: 'Doxycycline 40mg Modified Release (Sub-antimicrobial dose)', note: 'Anti-inflammatory action without gut dysbiosis' }
    ],
    treatments: [
      'Vascular Laser (Pulsed Dye Laser - PDL 595nm or IPL)',
      'Electrosurgery / CO2 Laser for Rhinophyma tissue re-shaping'
    ],
    patientSkincare: [
      'Identify and log individual triggers (hot beverages, wine, heat, emotional stress)',
      'Use physical Mineral (Zinc/Titanium) SPF 50+ daily',
      'Avoid alcohol-containing toners, menthol, camphor, and chemical exfoliants'
    ]
  }
];

export const CLINIC_INFO = {
  name: 'Aura Dermacare & Aesthetic Clinic',
  doctor: 'Dr. Sarah Vance, MD',
  specialty: 'Board Certified Dermatologist & Cosmetic Surgeon',
  licenseNo: 'MED-DERM-99402',
  address: 'Suite 405, Medical Arts Tower, 750 Wellness Way',
  phone: '+1 (555) 900-DERM',
  email: 'contact@auradermacare.com',
  website: 'www.auradermacare.com'
};
