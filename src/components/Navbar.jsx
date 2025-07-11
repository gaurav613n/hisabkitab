import React from "react";

const Navbar = () => {
  return (
    <div className="w-full px-8 h-[8vh] md:flex hidden  items-center justify-between">
      <h1 className="text-white">Expense tracker</h1>
      <div className="flex gap-5">
        {
          ["dashboard", "transactions", "reports","setting","help"].map((item)=>{
            return (
              <h4
                key={item}
                className="text-gray-500 capitalize cursor-pointer hover:text-white transition-all duration-300"
              >
                {item}
              </h4>
            );
          })
        }
      </div>
      <h1 className="text-gray-500">track your expenses</h1>
    </div>
  );
};

export default Navbar;
