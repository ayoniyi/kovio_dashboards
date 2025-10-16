'use client'

import React from 'react'
import CustomerSettings from '@/components/dashboards/customer/settings'

export default function page() {
  return (
    <CustomerSettings onContinue={function (): void {
      throw new Error('Function not implemented.')
    } }    
    />
  )
}
