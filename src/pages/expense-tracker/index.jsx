import { useState } from "react";
import { signOut } from "firebase/auth";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase-config";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  // default values
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const { balance, income, expenses } = transactionTotals;

  const onSubmit = async (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription("");
    setTransactionAmount("");
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="bg-red-100 flex justify-between p-20">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {name}'s Expense Tracker
        </h1>

        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {balance >= 0 ? (
            <span>${balance}</span>
          ) : (
            <span>-${balance * -1}</span>
          )}
        </h1>

        {profilePhoto && (
          <div>
            <img src={profilePhoto} alt="profilePicture"></img>
            <button onClick={signUserOut}>Sign Out</button>
          </div>
        )}
      </div>

      <div className="bg-red-200 flex justify-between p-10">
        <div>income ${income}</div>
        <div>expenses ${expenses}</div>
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
          value={description}
        />
        <input
          type="number"
          placeholder="Amount"
          required
          onChange={(e) => setTransactionAmount(e.target.value)}
          value={transactionAmount}
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
      <ul>
        {transactions.map((transaction) => {
          const { id, description, transactionAmount, transactionType } =
            transaction;
          return (
            <li key={id}>
              <h3>{description}</h3>
              <p>
                ${transactionAmount} ---{" "}
                <label
                  style={{
                    color: transactionType === "expense" ? "red" : "green",
                  }}
                >
                  {transactionType}
                </label>
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
};
