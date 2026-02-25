import { X } from 'lucide-react';
import { useState, useEffect } from "react";

function NewExpense({ heading, setWindow, showCategory, formData, setFormData, selectedTransaction, refreshExpenses }) {
  const [Category, setCategory] = useState("");
  const [Description, setDescription] = useState("");
  const [Date, setDate] = useState("");
  const [Amount, setAmount] = useState("");
  const [isValid, setIsValid] = useState("");

  // Load selected transaction for editing
  useEffect(() => {
    if (selectedTransaction) {
      setCategory(selectedTransaction.category || "");
      setDescription(selectedTransaction.title || "");
      setDate(selectedTransaction.date || "");
      setAmount(selectedTransaction.amount || "");
    }
  }, [selectedTransaction]);

  async function saveTransaction() {
    if (!Category || !Description || !Date || !Amount) {
      setIsValid("alert");
      setTimeout(() => setIsValid(""), 2000);
      return;
    }

    const expenseData = {
      title: Description,
      amount: parseFloat(Amount),
      category: Category,
      date: Date
    };

    try {
      if (selectedTransaction) {
        // Update backend
        await fetch(`http://127.0.0.1:8000/expenses/${selectedTransaction.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(expenseData)
        });

        // Refresh from backend after update
        refreshExpenses();
      } else {
        // Add new
        const response = await fetch("http://127.0.0.1:8000/expenses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(expenseData)
        });
        const data = await response.json();
        setFormData([...formData, data]);
      }

      setWindow(false);
    } catch (error) {
      console.error("Error saving expense:", error);
    }
  }

  return (
    <div className="blurbackground">
      <div className="MainExpenseWindow">
        <div className="header flex">
          <h1>{heading || "Add Expense"}</h1>
          {isValid === "alert" && <h2 className="alert">Please fill all fields!</h2>}
          <button className="cancelBtn" onClick={() => setWindow(false)} title="Close">
            <X size={20} />
          </button>
        </div>

        <div className="expenseForm">
          <label>Date</label>
          <input type="date" value={Date} onChange={e => setDate(e.target.value)} className="expenseInput" />

          <label>Description</label>
          <textarea value={Description} onChange={e => setDescription(e.target.value)} className="expenseInput" />

          <label>Amount</label>
          <input type="number" value={Amount} onChange={e => setAmount(e.target.value)} className="expenseInput" />

          <label>Category</label>
          <select value={Category} onChange={e => setCategory(e.target.value)} className="expenseInput">
            <option value="" disabled>Select Category</option>
            {showCategory.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <div className='btnContainer'>
            <button className='SaveExpense' onClick={saveTransaction}>
              {selectedTransaction ? "Update" : "Save"}
            </button>
            <button className='ClearExpense' onClick={() => {setCategory(""); setDescription(""); setDate(""); setAmount("");}}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewExpense;