import React from 'react'
import Navbar from './components/Navbar'
import Container from './components/Container'

const App = () => {
  return (
    <div className='w-full h-screen bg-[#000] p-3 flex flex-col gap-3'>
      <Navbar/>
      <Container/>
    </div>
  )
}

export default App