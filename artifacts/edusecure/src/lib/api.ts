import {
  mockChildren,
  mockStudents,
  mockPayments,
  mockStats,
  mockAccessLog,
  Child,
  Student,
  Payment,
  Stats,
  AccessLog,
} from './mockData'

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}

export interface ChildFormData {
  firstName: string
  lastName: string
  dateNaissance: string
  sexe: string
  classe: string
  numero: string
  annee: string
  totalFees: number
  tranches: { amount: number; dueDate: string }[]
}

export async function loginUser(email: string, _password: string) {
  await new Promise((r) => setTimeout(r, 500))
  return {
    role: email.toLowerCase().includes('admin') ? 'admin' : 'parent',
    token: 'mock-jwt-token',
    user: { name: 'Akua Osei', email },
  }
}

export async function registerUser(_data: RegisterData) {
  await new Promise((r) => setTimeout(r, 500))
  return { success: true }
}

export async function getChildren(): Promise<Child[]> {
  return mockChildren
}

export async function addChild(data: ChildFormData) {
  await new Promise((r) => setTimeout(r, 500))
  return {
    success: true,
    child: {
      ...data,
      id: Date.now(),
      numero: `N°${Math.floor(1000 + Math.random() * 9000)}`,
    },
  }
}

export async function payTranche(_childId: number, _trancheN: number, _method: string) {
  await new Promise((r) => setTimeout(r, 800))
  return { success: true, transactionId: `TXN-${Date.now()}` }
}

export async function getAdminStudents(classe?: string): Promise<Student[]> {
  if (classe && classe !== 'Toutes') {
    return mockStudents.filter((s) => s.classe.startsWith(classe))
  }
  return mockStudents
}

export async function getAdminStats(): Promise<Stats> {
  return mockStats
}

export async function getAccessLog(): Promise<AccessLog[]> {
  return mockAccessLog
}

export async function getPayments(): Promise<Payment[]> {
  return mockPayments
}
