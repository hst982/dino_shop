import React from 'react'
import Header from '@/components/main/Header'
import Footer from '@/components/main/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dino Shop',
  description: 'Home page of Dino Shop',
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='app'>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
