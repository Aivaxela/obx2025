import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemCost, setNewItemCost] = useState("");
  const [userName, setUserName] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);
  const [splitCount, setSplitCount] = useState(5);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem("obxUserName");
    if (storedName) {
      setUserName(storedName);
    } else {
      setShowNameInput(true);
    }

    const unsubscribe = onSnapshot(collection(db, "expenses"), (snapshot) => {
      const expensesList = [];
      snapshot.forEach((doc) => {
        expensesList.push({ id: doc.id, ...doc.data() });
      });
      setExpenses(expensesList);
    });

    return () => unsubscribe();
  }, []);

  const addExpense = async () => {
    if (newItemName.trim() && newItemCost.trim()) {
      const cost = parseFloat(newItemCost);
      if (isNaN(cost) || cost <= 0) {
        alert("Please enter a valid cost amount");
        return;
      }

      const expense = {
        itemName: newItemName.trim(),
        cost: Math.round(cost * 100) / 100,
        addedBy: userName || "Anonymous",
        addedAt: new Date().toLocaleString(),
      };

      try {
        await addDoc(collection(db, "expenses"), expense);
        setNewItemName("");
        setNewItemCost("");
      } catch (error) {
        console.error("Error adding expense:", error);
        alert("Failed to add expense. Please try again.");
      }
    }
  };

  const deleteExpense = async (id) => {
    const expense = expenses.find((expense) => expense.id === id);
    setExpenseToDelete(expense);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (expenseToDelete) {
      try {
        await deleteDoc(doc(db, "expenses", expenseToDelete.id));
      } catch (error) {
        console.error("Error deleting expense:", error);
        alert("Failed to delete expense. Please try again.");
      }
    }
    setShowDeleteConfirm(false);
    setExpenseToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setExpenseToDelete(null);
  };

  const handleNameSubmit = () => {
    if (userName.trim()) {
      localStorage.setItem("obxUserName", userName.trim());
      setShowNameInput(false);
    }
  };

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null || isNaN(amount)) {
      return "$0.00";
    }
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  const handleCostInput = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
      setNewItemCost(value);
    }
  };

  const calculateTotal = () => {
    return expenses
      .filter(
        (expense) =>
          expense.cost !== undefined &&
          expense.cost !== null &&
          !isNaN(expense.cost)
      )
      .reduce((total, expense) => total + expense.cost, 0);
  };

  const calculatePerPerson = () => {
    const total = calculateTotal();
    return splitCount > 0 ? total / splitCount : 0;
  };

  if (showNameInput) {
    return (
      <div className="max-w-2xl p-6 mx-auto">
        <h3 className="text-4xl my-4 font-bold text-orange-600 text-center">
          Join
        </h3>
        <div className="bg-yellow-200/50 rounded-xl p-6 border-2 border-black">
          <p className="text-3xl mb-4 text-center">
            Please enter your name to add expenses:
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your name"
              className="flex-1 px-4 py-2 text-3xl border-2 border-black rounded-lg"
              onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
            />
            <button
              onClick={handleNameSubmit}
              className="px-8 py-8 bg-orange-500 text-white text-3xl font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Start
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto py-4">
        <div className="text-center mb-8">
          <p className="text-3xl mb-2">
            Total expenses:{" "}
            <span className="font-bold text-blue-700">
              {formatCurrency(calculateTotal())}
            </span>
          </p>
          <div className="flex items-center justify-center gap-6 mb-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl">Split expenses:</span>
              <select
                value={splitCount}
                onChange={(e) => setSplitCount(parseInt(e.target.value))}
                className="text-4xl text-center px-3 py-1 border-2 border-gray-300 rounded-lg bg-white"
              >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">Total expense for each person:</span>
              <span className="font-bold text-blue-700 text-2xl">
                {formatCurrency(calculatePerPerson())}
              </span>
            </div>
          </div>
        </div>

        <div className="flex mb-10">
          <div className="flex flex-col w-9/12">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Item name..."
              className="px-8 py-8 text-3xl border-b-8 border-orange-400"
              onKeyDown={(e) => e.key === "Enter" && addExpense()}
            />
            <input
              type="text"
              value={newItemCost}
              onChange={handleCostInput}
              placeholder="Cost..."
              className="px-8 py-8 text-3xl"
              onKeyDown={(e) => e.key === "Enter" && addExpense()}
            />
          </div>
          <button
            onClick={addExpense}
            className="px-8 py-8 bg-green-500 w-3/12 text-white text-3xl font-semibold hover:bg-green-600 transition-colors"
          >
            Add
          </button>
        </div>

        {expenses.length === 0 ? (
          <div className="text-center text-3xl text-gray-600 py-8">
            No expenses yet! Add some expenses to get started.
          </div>
        ) : (
          <div className="space-y-2">
            {expenses
              .filter(
                (expense) =>
                  expense.cost !== undefined &&
                  expense.cost !== null &&
                  !isNaN(expense.cost)
              )
              .map((expense, index) => (
                <div
                  key={expense.id}
                  className={`flex justify-between items-center text-3xl w-full gap-6 text-left p-4 ${
                    index % 2 === 0 ? "bg-yellow-400/50" : "bg-yellow-100/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-blue-700">
                      {formatCurrency(expense.cost)}
                    </span>
                    <span className="text-3xl">{expense.itemName}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xl text-gray-600">
                      Added by {expense.addedBy}
                    </span>
                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="bg-red-500 text-white text-3xl rounded-md hover:bg-red-600 transition-all duration-200 w-12 h-12 flex justify-center items-center leading-none hover:scale-110"
                    >
                      <span className="transform -translate-y-0.5">×</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Delete Expense?
            </h3>
            <p className="text-xl text-gray-600 mb-8 text-center">
              Are you sure you want to delete "{expenseToDelete?.itemName}" (
              {formatCurrency(expenseToDelete?.cost)})? This action cannot be
              undone.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={cancelDelete}
                className="px-8 py-4 bg-gray-500 text-white text-2xl font-semibold rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-8 py-4 bg-red-500 text-white text-2xl font-semibold rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
