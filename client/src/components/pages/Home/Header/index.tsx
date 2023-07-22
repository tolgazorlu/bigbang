import React from 'react'
import Navbar from '../../../layouts/Navbar'
import Hero from './Hero'

const Header = () => {
  return (
    <div className='h-screen'>
        <Navbar />
        <Hero />
    </div>
  )
}

export default Header