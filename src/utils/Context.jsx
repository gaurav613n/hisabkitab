import React, { createContext, useState, useEffect } from 'react'

export const StoreContext = createContext()

const Context = (props) => {
  const [expenses, setExpenses] = useState(() => {
    const localData = localStorage.getItem('expenses')
    return localData ? JSON.parse(localData) : []
  })

  const [desc, setdesc] = useState('')
  const [amount, setamount] = useState('')
  const [catergory, setcatergory] = useState('')

  const createExpense = (e) => {
  e.preventDefault()

  const newExpense = {
    id: crypto.randomUUID(),
    desc,
    amount,
    catergory
  }

  const updatedExpenses = [...expenses, newExpense]

  setExpenses(updatedExpenses)
  localStorage.setItem('expenses', JSON.stringify(updatedExpenses))

  setdesc('')
  setamount('')
  setcatergory('')
}


  const value = {
    expenses,
    setExpenses,
    desc,
    setdesc,
    amount,
    setamount,
    catergory,
    setcatergory,
    createExpense
  }

  useEffect(() => {
    console.log("Expenses in context:", expenses)
  }, [expenses])

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default Context
