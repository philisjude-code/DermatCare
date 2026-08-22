// Dermatology Categories and Sub-Problem Mappings for Clinic Management System

export const DERMATOLOGY_CATEGORIES = [
  {
    id: 'skin',
    name: 'Skin Related',
    icon: 'Sparkles',
    description: 'Epidermal, dermal, and inflammatory skin conditions',
    problems: [
      'Acne',
      'Eczema',
      'Psoriasis',
      'Dermatitis',
      'Fungal infection',
      'Bacterial infection',
      'Viral infection',
      'Allergic reaction',
      'Pigmentation',
      'Vitiligo',
      'Rashes',
      'Itching',
      'Dry skin',
      'Moles',
      'Warts',
      'Skin lesions',
      'Other'
    ]
  },
  {
    id: 'hair',
    name: 'Hair Related',
    icon: 'Feather',
    description: 'Scalp disorders, alopecia, and trichological concerns',
    problems: [
      'Hair loss',
      'Alopecia',
      'Dandruff',
      'Scalp itching',
      'Scalp infection',
      'Hair thinning',
      'Patchy hair loss',
      'Premature greying',
      'Other'
    ]
  },
  {
    id: 'nail',
    name: 'Nail Related',
    icon: 'Shield',
    description: 'Onychology concerns, nail dystrophy, and infections',
    problems: [
      'Fungal nail infection',
      'Nail discoloration',
      'Brittle nails',
      'Nail thickening',
      'Nail deformity',
      'Nail separation',
      'Other'
    ]
  },
  {
    id: 'mucous',
    name: 'Mucous Membrane Related',
    icon: 'Activity',
    description: 'Oral, lip, and genital mucosal dermatological conditions',
    problems: [
      'Oral ulcers',
      'Mouth lesions',
      'Lip disorders',
      'Genital dermatological concerns',
      'Other'
    ]
  },
  {
    id: 'cosmetic',
    name: 'Cosmetic Dermatology',
    icon: 'Award',
    description: 'Aesthetic enhancement, anti-aging, and scar revisions',
    problems: [
      'Hyperpigmentation & Melasma',
      'Wrinkles & Fine Lines',
      'Acne Scars & Pitting',
      'Skin Sagging / Volume Loss',
      'Unwanted Hair / Hirsutism',
      'Tattoo / Birthmark Removal',
      'Other'
    ]
  },
  {
    id: 'pediatric',
    name: 'Pediatric Dermatology',
    icon: 'Smile',
    description: 'Infant, child, and adolescent skin disorders',
    problems: [
      'Diaper Rash / Dermatitis',
      'Cradle Cap (Seborrheic)',
      'Infantile Atopic Eczema',
      'Molluscum Contagiosum',
      'Vascular Birthmarks / Hemangioma',
      'Childhood Warts',
      'Other'
    ]
  },
  {
    id: 'sti',
    name: 'Sexually Transmitted Infections',
    icon: 'Lock',
    description: 'Venereology and intimate dermatological healthcare',
    problems: [
      'Genital Lesions / Ulcers',
      'Genital Warts (HPV)',
      'Genital Pruritus & Discharge',
      'Herpes Simplex Virus (HSV)',
      'Syphilis Screening & Lesions',
      'Other'
    ]
  },
  {
    id: 'other',
    name: 'Other Dermatological Concerns',
    icon: 'HelpCircle',
    description: 'General skin checkups, second opinions, and unclassified concerns',
    problems: [
      'Full Body Mole Check',
      'Pre-Surgical Evaluation',
      'Biopsy Request',
      'General Consultation',
      'Unspecified Concern'
    ]
  }
];

export const BODY_AREAS = [
  'Face (Centrofacial / Cheeks / Forehead / Chin)',
  'Scalp & Hairline',
  'Neck & Decollete',
  'Chest & Upper Back',
  'Lower Back & Abdomen',
  'Upper Arms & Elbows',
  'Forearms & Hands / Nails',
  'Thighs & Knees',
  'Lower Legs & Feet / Toenails',
  'Mucous Membranes (Lips / Mouth / Genitalia)',
  'Generalized / Widespread'
];

export const SEVERITY_LEVELS = [
  'Mild (Minimal impact, localized)',
  'Moderate (Noticeable discomfort, spreading)',
  'Severe (Intense itching/pain, extensive coverage)',
  'Critical (Acute flare, weeping lesions/infection)'
];
