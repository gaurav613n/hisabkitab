import React, { useContext } from 'react'
import TranstitionCom from './TranstitionCom'
import { StoreContext } from '../utils/Context'

const HIstory = () => {
  const { expenses } = useContext(StoreContext)
  return (
    <div className='w-full h-full flex flex-col gap-y-4 items-center px-3'>
      <h1 className='text-2xl font-semibold text-center mb-5'>Recenet</h1>
      {
        expenses.length > 0 ? (
          expenses.map((expense) => (
            <TranstitionCom key={expense.id} catergory={expense.catergory} desc={expense.desc} amount={expense.amount}/>
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <h1 className="text-gray-500">No expenses recorded yet.</h1>
          </div>
        )
      }
         <div className="w-full rounded-xl bg-white h-[9vh] flex px-10 items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-all duration-[.30s]">
      <h1>View All</h1>
    </div>
    </div>
  )
}

export default HIstory