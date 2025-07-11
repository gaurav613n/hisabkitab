import React, { useContext, useState } from 'react'
import { StoreContext } from '../utils/Context'

const ExpenseForm = () => {

 const { setdesc, amount, setcatergory, desc, setamount, catergory,createExpense } = useContext(StoreContext)

  return (
    <div className='w-[40vw] h-[82vh] bg-white rounded-2xl ml-5 shadow-lg'>
      <form
      onSubmit={createExpense}
       className='w-full h-full flex flex-col justify-center gap-5 p-5'>
        <h1 className='text-center text-2xl'>Add New Expense</h1>
        <label className="text-gray-700">
          Description
          <input
            type="text"
            name="description"
            className="w-full mt-1 p-2 rounded-xl border outline-none border-gray-300 bg-white text-gray-900"
            placeholder="what do you spend now"
            required
            value={desc}
            onChange={e => setdesc(e.target.value)}
          />
        </label>
        <label className="text-gray-700">
          Price
          <input
            type="number"
            name="price"
            className="w-full mt-1 p-2 rounded-xl border outline-none border-gray-300 bg-white text-gray-900"
            placeholder="Enter price"
            min="0"
            step="0.01"
            required
            value={amount}
            onChange={e => setamount(e.target.value)}
          />
        </label>
        <label className="text-gray-700">
          Category
          <select
            name="category"
            className="w-full mt-1 p-2 rounded-xl border outline-none border-gray-300 bg-white text-gray-900"
            required
            value={catergory}
            onChange={e => setcatergory(e.target.value)}
          >
            <option value="">Select category</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="entertainment">Entertainment</option>
            <option value="utilities">Utilities</option>
          </select>
        </label>
        <button
          type="submit"
          className="mt-4 bg-black text-white py-2 px-4 cursor-pointer rounded-full hover:bg-zinc-900"
        >
          Add Expense
        </button>
      </form>
    </div>
  )
}

export default ExpenseForm