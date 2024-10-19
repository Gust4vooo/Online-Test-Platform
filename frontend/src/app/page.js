'use client'; 

import React from 'react'

import UserDashboard from '@/app/user/dashboard/page'
import authorAgreement from '@/app/authorAgreement/page'
import Pembayaran from '@/app/pembayaran/page'
import LandingPage from '@/app/landingpage/landingpage'
// import GuestDashboard from '@/app/guestDashboard/page'
// import landingpage from './src/app/user/landingpage/page'
import buatSoal from './author/buatSoal/page'

const page = () => {
  return (
    <div>
      <LandingPage />
      {/* <GuestDashboard /> */}
      {/* <landingpage /> */}
      <buatSoal/>
      {/* <authorAgreement /> */}
    </div>
  )
}

export default page
