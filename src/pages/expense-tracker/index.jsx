import React from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();

  const onSubmit = async (e) => {
    e.preventDefault();
    addTransaction({
      description:"Haircut",
      transactionAmount:22,
      transactionType:"expense"
    });
  };
  
  return (
    <>
      <div className="bg-red-100 flex justify-between p-20">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Expense Tracker
        </h1>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {" "}
          Balance: $0.00
        </h1>
      </div>

      <div className="bg-red-200 flex justify-between p-10">
        <div>income $0.00</div>
        <div>expenses $0.00</div>
      </div>

      <form
        className="add-transaction flex justify-center bg-red-300"
        onSubmit={onSubmit}
      >
        <input type="text" placeholder="Description" required />
        <input type="number" placeholder="Amount" required />
        <input type="radio" id="expense" value="expense" />
        <label htmlFor="expense">Expense</label>
        <input type="radio" id="income" value="income" />
        <label htmlFor="income">Income</label>
        <button className="bg-gray-200" type="submit">
          Add transaction
        </button>
      </form>

      <div className="bg-red-400">Transactions</div>
    </>
  );
};
