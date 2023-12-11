import React from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useState } from "react";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();

  // default values
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const onSubmit = async (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
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
        <input
          type="text"
          placeholder="Description"
          required
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          required
          onChange={(e) => setTransactionAmount(e.target.value)}
        />
        <input
          type="radio"
          id="expense"
          value="expense"
          checked={transactionType === "expense"}
          onChange={(e) => setTransactionType(e.target.value)}
        />
        <label htmlFor="expense">Expense</label>
        <input
          type="radio"
          id="income"
          value="income"
          checked={transactionType === "income"}
          onChange={(e) => setTransactionType(e.target.value)}
        />
        <label htmlFor="income">Income</label>
        <button className="bg-gray-200" type="submit">
          Add transaction
        </button>
      </form>

      <div className="bg-red-400">Transactions</div>
    </>
  );
};
