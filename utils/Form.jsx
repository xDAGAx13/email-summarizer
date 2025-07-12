import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = () => {
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-6 p-4 text-xl">
      {/* From Date Picker */}
      <div className="flex flex-col items-center">
        <label className="mb-2 font-semibold text-gray-700">From</label>
        <DatePicker
          className="w-40 text-center border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-700 font-medium"
          selected={from}
          onChange={(date) => setFrom(date)}
        />
      </div>

      {/* To Date Picker */}
      <div className="flex flex-col items-center">
        <label className="mb-2 font-semibold text-gray-700">To</label>
        <DatePicker
          className="w-40 text-center border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-700 font-medium"
          selected={to}
          onChange={(date) => setTo(date)}
        />
      </div>
    </div>
  );
};

export default Form;
