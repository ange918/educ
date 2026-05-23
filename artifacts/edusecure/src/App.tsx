import React from 'react'
import { Switch, Route, Router as WouterRouter } from 'wouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import WelcomePage from '@/pages/WelcomePage'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import AdminLayout from '@/pages/admin/AdminLayout'
import AdminDashboard from '@/pages/admin/DashboardPage'
import StudentsPage from '@/pages/admin/StudentsPage'
import NotificationsPage from '@/pages/admin/NotificationsPage'
import SettingsPage from '@/pages/admin/SettingsPage'
import ParentLayout from '@/pages/parent/ParentLayout'
import ParentDashboard from '@/pages/parent/DashboardPage'
import ChildrenPage from '@/pages/parent/ChildrenPage'
import PaymentsPage from '@/pages/parent/PaymentsPage'
import ProfilePage from '@/pages/parent/ProfilePage'

const queryClient = new QueryClient()

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A1628]">
      <div className="text-center">
        <h1 className="text-4xl font-display font-bold text-white mb-2">404</h1>
        <p className="text-slate-400">Page non trouvée</p>
        <a href="/" className="mt-4 inline-block text-[#2563EB] hover:underline">Retour à l'accueil</a>
      </div>
    </div>
  )
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={WelcomePage} />
      <Route path="/auth/login" component={LoginPage} />
      <Route path="/auth/register" component={RegisterPage} />

      <Route path="/admin/dashboard">
        <AdminLayout><AdminDashboard /></AdminLayout>
      </Route>
      <Route path="/admin/students">
        <AdminLayout><StudentsPage /></AdminLayout>
      </Route>
      <Route path="/admin/notifications">
        <AdminLayout><NotificationsPage /></AdminLayout>
      </Route>
      <Route path="/admin/settings">
        <AdminLayout><SettingsPage /></AdminLayout>
      </Route>

      <Route path="/parent/dashboard">
        <ParentLayout><ParentDashboard /></ParentLayout>
      </Route>
      <Route path="/parent/children">
        <ParentLayout><ChildrenPage /></ParentLayout>
      </Route>
      <Route path="/parent/payments">
        <ParentLayout><PaymentsPage /></ParentLayout>
      </Route>
      <Route path="/parent/profile">
        <ParentLayout><ProfilePage /></ParentLayout>
      </Route>

      <Route component={NotFound} />
    </Switch>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  )
}

export default App
