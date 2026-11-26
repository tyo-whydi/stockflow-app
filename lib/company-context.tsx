'use client'

import { createContext, useContext } from 'react'

export type CompanyMembership = {
  companyId: string
  companyName: string
  role: 'admin' | 'manager' | 'staff'
}

type CompanyContextValue = {
  activeCompanyId: string
  activeCompanyName: string
  activeCompanyRole: CompanyMembership['role']
  memberships: CompanyMembership[]
  updateCompanyName: (companyId: string, name: string) => void
}

const CompanyContext = createContext<CompanyContextValue | null>(null)

export function CompanyContextProvider({
  value,
  children,
}: {
  value: CompanyContextValue
  children: React.ReactNode
}) {
  return <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
}

export function useCompanyContext() {
  const context = useContext(CompanyContext)
  if (!context) {
    throw new Error('useCompanyContext must be used within a CompanyContextProvider')
  }
  return context
}
