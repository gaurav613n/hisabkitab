import React from 'react'

const Balance = () => {
  return (
    <div className='w-[30vw] h-[30vh] bg-[#9def96] rounded-3xl p-5 flex flex-col justify-between items-start'>
        <div>
        <h1 className='text-xl'>Total Balance</h1>
        <h1 className='text-4xl font-semibold mt-3'>₹ 12,00,000</h1>
        </div>
        <div>
            <button className='py-3 px-15 cursoir-pointer hover:bg-[#161616] transition-all cursor-pointer bg-black text-white rounded-full'>Add Balance</button>
        </div>
    </div>
  )
}

export default Balance