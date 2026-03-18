// MOCK DATA — replace with real API response

export interface Tranche {
  n: number
  amount: number
  paid: boolean
  date: string | null
}

export interface Child {
  id: number
  name: string
  classe: string
  numero: string
  totalFees: number
  paid: number
  tranches: Tranche[]
  accessStatus: 'active' | 'suspended' | 'refused'
  dateInscription: string
}

export interface Student {
  id: number
  firstName: string
  lastName: string
  classe: string
  numero: string
  totalFees: number
  paid: number
  remaining: number
  accessStatus: 'active' | 'suspended' | 'refused'
  lastPaymentDate: string | null
}

export interface Payment {
  id: number
  childName: string
  tranche: string
  amount: number
  date: string
  method: string
  status: 'success' | 'pending' | 'failed'
}

export interface AccessLog {
  id: number
  studentName: string
  classe: string
  status: 'authorized' | 'refused'
  time: string
}

export interface Stats {
  totalStudents: number
  presentToday: number
  totalCollected: number
  pendingAmount: number
  activeCards: number
  suspendedCards: number
}

// MOCK DATA — replace with real API response
export const mockParent = {
  name: 'Akua Osei',
  email: 'akua@email.com',
  phone: '+229 90 12 34 56',
  address: 'Cotonou, Bénin',
}

// MOCK DATA — replace with real API response
export const mockChildren: Child[] = [
  {
    id: 1,
    name: 'Kwame Osei',
    classe: 'Terminale S',
    numero: 'N°2041',
    totalFees: 225000,
    paid: 150000,
    tranches: [
      { n: 1, amount: 75000, paid: true, date: '10 jan' },
      { n: 2, amount: 75000, paid: true, date: '12 fev' },
      { n: 3, amount: 75000, paid: false, date: null },
    ],
    accessStatus: 'active',
    dateInscription: '2025-09-15',
  },
  {
    id: 2,
    name: 'Ama Osei',
    classe: '3ème B',
    numero: 'N°1887',
    totalFees: 180000,
    paid: 60000,
    tranches: [
      { n: 1, amount: 60000, paid: true, date: '10 jan' },
      { n: 2, amount: 60000, paid: false, date: null },
      { n: 3, amount: 60000, paid: false, date: null },
    ],
    accessStatus: 'suspended',
    dateInscription: '2025-09-15',
  },
]

// MOCK DATA — replace with real API response
export const mockPayments: Payment[] = [
  {
    id: 1,
    childName: 'Kwame Osei',
    tranche: 'Tranche 2/3',
    amount: 75000,
    date: '12 fév 2026',
    method: 'Mobile Money',
    status: 'success',
  },
  {
    id: 2,
    childName: 'Kwame Osei',
    tranche: 'Tranche 1/3',
    amount: 75000,
    date: '10 jan 2026',
    method: 'Mobile Money',
    status: 'success',
  },
  {
    id: 3,
    childName: 'Ama Osei',
    tranche: 'Tranche 1/3',
    amount: 60000,
    date: '10 jan 2026',
    method: 'Carte bancaire',
    status: 'success',
  },
  {
    id: 4,
    childName: 'Kwame Osei',
    tranche: 'Tranche 3/3',
    amount: 75000,
    date: '14 mar 2026',
    method: 'Mobile Money',
    status: 'pending',
  },
  {
    id: 5,
    childName: 'Ama Osei',
    tranche: 'Tranche 2/3',
    amount: 60000,
    date: '12 fév 2026',
    method: 'Mobile Money',
    status: 'pending',
  },
  {
    id: 6,
    childName: 'Ama Osei',
    tranche: 'Tranche 3/3',
    amount: 60000,
    date: '14 mar 2026',
    method: 'Carte bancaire',
    status: 'pending',
  },
]

// MOCK DATA — replace with real API response
export const mockAccessLog: AccessLog[] = [
  { id: 1, studentName: 'Koffi Mensah', classe: 'Terminale S', status: 'authorized', time: '07:42' },
  { id: 2, studentName: 'Abena Adjovi', classe: '3ème A', status: 'authorized', time: '07:45' },
  { id: 3, studentName: 'Yao Ahoua', classe: '5ème B', status: 'refused', time: '07:51' },
  { id: 4, studentName: 'Fatoumata Diallo', classe: '1ère S', status: 'authorized', time: '07:53' },
  { id: 5, studentName: 'Kodjo Amevi', classe: '2nde A', status: 'authorized', time: '07:58' },
  { id: 6, studentName: 'Ama Osei', classe: '3ème B', status: 'refused', time: '08:02' },
  { id: 7, studentName: 'Akosua Boateng', classe: '6ème A', status: 'authorized', time: '08:05' },
  { id: 8, studentName: 'Senam Dossou', classe: '4ème A', status: 'authorized', time: '08:09' },
  { id: 9, studentName: 'Mawuli Agbeko', classe: 'Terminale A', status: 'refused', time: '08:15' },
  { id: 10, studentName: 'Bintou Sawadogo', classe: '2nde C', status: 'authorized', time: '08:18' },
]

// MOCK DATA — replace with real API response
export const mockStats: Stats = {
  totalStudents: 847,
  presentToday: 791,
  totalCollected: 45750000,
  pendingAmount: 12300000,
  activeCards: 791,
  suspendedCards: 56,
}

function makeStudent(
  id: number,
  firstName: string,
  lastName: string,
  classe: string,
  totalFees: number,
  paid: number,
  status: 'active' | 'suspended' | 'refused',
  lastDate: string | null,
): Student {
  return {
    id,
    firstName,
    lastName,
    classe,
    numero: `N°${1000 + id}`,
    totalFees,
    paid,
    remaining: totalFees - paid,
    accessStatus: status,
    lastPaymentDate: lastDate,
  }
}

// MOCK DATA — replace with real API response
export const mockStudents: Student[] = [
  // 6ème A
  makeStudent(1, 'Kofi', 'Mensah', '6ème A', 120000, 120000, 'active', '2026-01-10'),
  makeStudent(2, 'Abena', 'Adjovi', '6ème A', 120000, 80000, 'active', '2026-02-12'),
  makeStudent(3, 'Yao', 'Ahoua', '6ème A', 120000, 40000, 'suspended', '2026-01-10'),
  makeStudent(4, 'Sena', 'Dossou', '6ème A', 120000, 120000, 'active', '2026-02-14'),
  makeStudent(5, 'Mawuli', 'Agbeko', '6ème A', 120000, 0, 'refused', null),
  makeStudent(6, 'Akosua', 'Boateng', '6ème A', 120000, 80000, 'active', '2026-02-14'),
  makeStudent(7, 'Kwesi', 'Darko', '6ème A', 120000, 40000, 'suspended', '2026-01-10'),
  makeStudent(8, 'Efua', 'Asante', '6ème A', 120000, 120000, 'active', '2026-03-01'),

  // 6ème B
  makeStudent(9, 'Bintou', 'Sawadogo', '6ème B', 120000, 120000, 'active', '2026-01-15'),
  makeStudent(10, 'Issouf', 'Ouedraogo', '6ème B', 120000, 80000, 'active', '2026-02-15'),
  makeStudent(11, 'Rasmata', 'Zongo', '6ème B', 120000, 40000, 'suspended', '2026-01-15'),
  makeStudent(12, 'Wendlassida', 'Kabore', '6ème B', 120000, 0, 'refused', null),
  makeStudent(13, 'Fatoumata', 'Diallo', '6ème B', 120000, 120000, 'active', '2026-03-01'),
  makeStudent(14, 'Aminata', 'Coulibaly', '6ème B', 120000, 80000, 'active', '2026-02-14'),
  makeStudent(15, 'Seydou', 'Traore', '6ème B', 120000, 40000, 'suspended', '2026-01-15'),
  makeStudent(16, 'Mariam', 'Toure', '6ème B', 120000, 120000, 'active', '2026-01-15'),

  // 5ème A
  makeStudent(17, 'Kodjo', 'Amevi', '5ème A', 140000, 140000, 'active', '2026-01-10'),
  makeStudent(18, 'Ekoue', 'Akakpo', '5ème A', 140000, 93333, 'active', '2026-02-10'),
  makeStudent(19, 'Amewu', 'Fiagbe', '5ème A', 140000, 46666, 'suspended', '2026-01-10'),
  makeStudent(20, 'Sena', 'Kpogo', '5ème A', 140000, 140000, 'active', '2026-02-14'),
  makeStudent(21, 'Kafui', 'Dzitri', '5ème A', 140000, 0, 'refused', null),
  makeStudent(22, 'Akpene', 'Dogbe', '5ème A', 140000, 93333, 'active', '2026-02-14'),
  makeStudent(23, 'Enyonam', 'Nutakor', '5ème A', 140000, 46666, 'suspended', '2026-01-10'),
  makeStudent(24, 'Senam', 'Agbemafle', '5ème A', 140000, 140000, 'active', '2026-03-01'),

  // 5ème B
  makeStudent(25, 'Amara', 'Kouyate', '5ème B', 140000, 140000, 'active', '2026-01-12'),
  makeStudent(26, 'Djibril', 'Camara', '5ème B', 140000, 93333, 'active', '2026-02-12'),
  makeStudent(27, 'Kadiatou', 'Barry', '5ème B', 140000, 46666, 'suspended', '2026-01-12'),
  makeStudent(28, 'Mamadou', 'Bah', '5ème B', 140000, 0, 'refused', null),
  makeStudent(29, 'Aissatou', 'Sow', '5ème B', 140000, 140000, 'active', '2026-02-28'),
  makeStudent(30, 'Ibrahim', 'Balde', '5ème B', 140000, 93333, 'active', '2026-02-12'),
  makeStudent(31, 'Mariama', 'Jallo', '5ème B', 140000, 46666, 'suspended', '2026-01-12'),
  makeStudent(32, 'Ousmane', 'Diallo', '5ème B', 140000, 140000, 'active', '2026-01-12'),

  // 4ème A
  makeStudent(33, 'Awa', 'Traore', '4ème A', 160000, 160000, 'active', '2026-01-10'),
  makeStudent(34, 'Modibo', 'Keita', '4ème A', 160000, 106666, 'active', '2026-02-10'),
  makeStudent(35, 'Rokia', 'Sangare', '4ème A', 160000, 53333, 'suspended', '2026-01-10'),
  makeStudent(36, 'Drissa', 'Coulibaly', '4ème A', 160000, 0, 'refused', null),
  makeStudent(37, 'Kadidia', 'Doumbia', '4ème A', 160000, 160000, 'active', '2026-02-14'),
  makeStudent(38, 'Sory', 'Kone', '4ème A', 160000, 106666, 'active', '2026-02-14'),
  makeStudent(39, 'Tenin', 'Dembele', '4ème A', 160000, 53333, 'suspended', '2026-01-10'),
  makeStudent(40, 'Cheick', 'Diarra', '4ème A', 160000, 160000, 'active', '2026-03-01'),

  // 3ème A
  makeStudent(41, 'Aboubacar', 'Sylla', '3ème A', 175000, 175000, 'active', '2026-01-10'),
  makeStudent(42, 'Kadiatou', 'Conde', '3ème A', 175000, 116666, 'active', '2026-02-10'),
  makeStudent(43, 'Alpha', 'Diallo', '3ème A', 175000, 58333, 'suspended', '2026-01-10'),
  makeStudent(44, 'Mariama', 'Camara', '3ème A', 175000, 0, 'refused', null),
  makeStudent(45, 'Mamou', 'Balde', '3ème A', 175000, 175000, 'active', '2026-02-14'),
  makeStudent(46, 'Ibrahima', 'Kouyate', '3ème A', 175000, 116666, 'active', '2026-02-14'),
  makeStudent(47, 'Fatoumata', 'Barry', '3ème A', 175000, 58333, 'suspended', '2026-01-10'),
  makeStudent(48, 'Cellou', 'Bah', '3ème A', 175000, 175000, 'active', '2026-03-01'),

  // 3ème B
  makeStudent(49, 'Kwame', 'Osei', '3ème B', 175000, 175000, 'active', '2026-01-10'),
  makeStudent(50, 'Ama', 'Osei', '3ème B', 175000, 116666, 'active', '2026-02-10'),
  makeStudent(51, 'Nana', 'Asante', '3ème B', 175000, 58333, 'suspended', '2026-01-10'),
  makeStudent(52, 'Kwaku', 'Boateng', '3ème B', 175000, 0, 'refused', null),
  makeStudent(53, 'Akua', 'Darko', '3ème B', 175000, 175000, 'active', '2026-02-14'),
  makeStudent(54, 'Yaw', 'Mensah', '3ème B', 175000, 116666, 'active', '2026-02-14'),
  makeStudent(55, 'Adwoa', 'Adjei', '3ème B', 175000, 58333, 'suspended', '2026-01-10'),
  makeStudent(56, 'Kofi', 'Amoah', '3ème B', 175000, 175000, 'active', '2026-03-01'),

  // 2nde A
  makeStudent(57, 'Amidou', 'Ouattara', '2nde A', 200000, 200000, 'active', '2026-01-10'),
  makeStudent(58, 'Salimata', 'Bamba', '2nde A', 200000, 133333, 'active', '2026-02-10'),
  makeStudent(59, 'Seydou', 'Konate', '2nde A', 200000, 66666, 'suspended', '2026-01-10'),
  makeStudent(60, 'Mariam', 'Coulibaly', '2nde A', 200000, 0, 'refused', null),
  makeStudent(61, 'Brahima', 'Ouedraogo', '2nde A', 200000, 200000, 'active', '2026-02-14'),
  makeStudent(62, 'Minata', 'Sangare', '2nde A', 200000, 133333, 'active', '2026-02-14'),
  makeStudent(63, 'Lacina', 'Kourouma', '2nde A', 200000, 66666, 'suspended', '2026-01-10'),
  makeStudent(64, 'Nathalie', 'Adjoua', '2nde A', 200000, 200000, 'active', '2026-03-01'),

  // 2nde C
  makeStudent(65, 'Eric', 'Kouassi', '2nde C', 200000, 200000, 'active', '2026-01-10'),
  makeStudent(66, 'Patricia', 'Yao', '2nde C', 200000, 133333, 'active', '2026-02-10'),
  makeStudent(67, 'Constant', 'Kra', '2nde C', 200000, 66666, 'suspended', '2026-01-10'),
  makeStudent(68, 'Viviane', 'Ble', '2nde C', 200000, 0, 'refused', null),
  makeStudent(69, 'Fernand', 'Yapi', '2nde C', 200000, 200000, 'active', '2026-02-14'),
  makeStudent(70, 'Sophie', 'Gnagne', '2nde C', 200000, 133333, 'active', '2026-02-14'),
  makeStudent(71, 'Willy', 'Brou', '2nde C', 200000, 66666, 'suspended', '2026-01-10'),
  makeStudent(72, 'Laure', 'Kouame', '2nde C', 200000, 200000, 'active', '2026-03-01'),

  // 1ère A
  makeStudent(73, 'Jean-Baptiste', 'Akakpo', '1ère A', 215000, 215000, 'active', '2026-01-10'),
  makeStudent(74, 'Sylvie', 'Amewu', '1ère A', 215000, 143333, 'active', '2026-02-10'),
  makeStudent(75, 'Christian', 'Kpogo', '1ère A', 215000, 71666, 'suspended', '2026-01-10'),
  makeStudent(76, 'Pauline', 'Dzitri', '1ère A', 215000, 0, 'refused', null),
  makeStudent(77, 'Gilles', 'Dogbe', '1ère A', 215000, 215000, 'active', '2026-02-14'),
  makeStudent(78, 'Cécile', 'Nutakor', '1ère A', 215000, 143333, 'active', '2026-02-14'),
  makeStudent(79, 'Albert', 'Agbemafle', '1ère A', 215000, 71666, 'suspended', '2026-01-10'),
  makeStudent(80, 'Béatrice', 'Fiagbe', '1ère A', 215000, 215000, 'active', '2026-03-01'),

  // 1ère S
  makeStudent(81, 'Stanislas', 'Houenoude', '1ère S', 215000, 215000, 'active', '2026-01-10'),
  makeStudent(82, 'Clémence', 'Gbenou', '1ère S', 215000, 143333, 'active', '2026-02-10'),
  makeStudent(83, 'Rodrigue', 'Donoumassou', '1ère S', 215000, 71666, 'suspended', '2026-01-10'),
  makeStudent(84, 'Angèle', 'Houngnibo', '1ère S', 215000, 0, 'refused', null),
  makeStudent(85, 'Thierry', 'Dossouvi', '1ère S', 215000, 215000, 'active', '2026-02-14'),
  makeStudent(86, 'Joëlle', 'Amoussou', '1ère S', 215000, 143333, 'active', '2026-02-14'),
  makeStudent(87, 'Prosper', 'Koudolo', '1ère S', 215000, 71666, 'suspended', '2026-01-10'),
  makeStudent(88, 'Henriette', 'Fohounfo', '1ère S', 215000, 215000, 'active', '2026-03-01'),

  // Terminale A
  makeStudent(89, 'Innocent', 'Houssou', 'Terminale A', 225000, 225000, 'active', '2026-01-10'),
  makeStudent(90, 'Roseline', 'Ahounou', 'Terminale A', 225000, 150000, 'active', '2026-02-10'),
  makeStudent(91, 'Valentin', 'Adjamonsi', 'Terminale A', 225000, 75000, 'suspended', '2026-01-10'),
  makeStudent(92, 'Nadège', 'Zinsou', 'Terminale A', 225000, 0, 'refused', null),
  makeStudent(93, 'Achille', 'Agossou', 'Terminale A', 225000, 225000, 'active', '2026-02-14'),
  makeStudent(94, 'Florence', 'Avocevou', 'Terminale A', 225000, 150000, 'active', '2026-02-14'),
  makeStudent(95, 'Edgard', 'Hounto', 'Terminale A', 225000, 75000, 'suspended', '2026-01-10'),
  makeStudent(96, 'Suzanne', 'Djakpo', 'Terminale A', 225000, 225000, 'active', '2026-03-01'),

  // Terminale S
  makeStudent(97, 'Kwame', 'Osei', 'Terminale S', 225000, 150000, 'active', '2026-02-12'),
  makeStudent(98, 'Maïmouna', 'Hodonou', 'Terminale S', 225000, 225000, 'active', '2026-01-10'),
  makeStudent(99, 'Parfait', 'Gbodogbe', 'Terminale S', 225000, 75000, 'suspended', '2026-01-10'),
  makeStudent(100, 'Raissa', 'Azonhiho', 'Terminale S', 225000, 0, 'refused', null),
  makeStudent(101, 'Wilfried', 'Hedevi', 'Terminale S', 225000, 225000, 'active', '2026-02-14'),
  makeStudent(102, 'Sandrine', 'Akpo', 'Terminale S', 225000, 150000, 'active', '2026-02-14'),
  makeStudent(103, 'Désiré', 'Kossou', 'Terminale S', 225000, 75000, 'suspended', '2026-01-10'),
  makeStudent(104, 'Arielle', 'Amoussou', 'Terminale S', 225000, 225000, 'active', '2026-03-01'),
]
