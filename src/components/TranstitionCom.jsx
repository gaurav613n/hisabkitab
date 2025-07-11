import React from "react";

const TranstitionCom = (props) => {
  return (
    <div className="w-full rounded-xl bg-white h-[9vh] flex px-10 items-center justify-between">
      <div>
        <h1 className="text-lg font-semibold">{props.desc}</h1>
        <h4 className="text-gray-400">{props.catergory}</h4>
      </div>
      <h1 className="text-gray-500">₹{props.amount}</h1>
    </div>
  );
};

export default TranstitionCom;
