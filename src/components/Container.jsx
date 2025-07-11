import React from "react";
import Balance from "./Balance";
import Total from "./Total";
import Quantity from "./Quantity";
import ExpenseForm from "./ExpenseForm";
import Chart from './Chart'


const Container = () => {
  return (
    <div className="w-full h-full md:flex bg-white rounded-2xl p-5">
      <div className="flex flex-col gap-4 justify-between">
        <div className="flex gap-4">

        <Balance />
        <div className="flex gap-4 h-[30vh] w-[30vw]">
          <Total />
          <Quantity />
        </div>
        </div>
      <Chart/>

      </div>
        <ExpenseForm/>
    </div>
  );
};

export default Container;
