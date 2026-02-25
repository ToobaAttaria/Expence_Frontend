import { Edit, Trash } from 'lucide-react';
import NewExpense from "./newexpence";
import { useState, useEffect } from "react";

export default function Transaction({ showCategory, formData, setFormData }) {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [window, setWindow] = useState(null);

  // Fetch all expenses from backend
  const fetchExpenses = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/expenses");
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchExpenses();
  }, [setFormData]);

  // Edit button: open NewExpense with selected transaction
  function EditBtn(index) {
    setSelectedTransaction(formData[index]);
    setWindow("Edit");
  }

  // Delete button
  async function DelBtn(index) {
    const id = formData[index].id;
    try {
      await fetch(`http://127.0.0.1:8000/expenses/${id}`, { method: "DELETE" });
      fetchExpenses(); // Refresh after delete
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  }

  return (
    <div className="transaction">
      <div className="TransactionHeader">
        <span>Date</span>
        <span>Category</span>
        <span>Amount</span>
        <span></span>
      </div>

      <div className="transactionDisplay">
        {formData.map((item, index) => (
          <div key={item.id} className="transactionRow">
            <span>{item.date}</span>
            <span>{item.category}</span>
            <span>{item.amount}</span>
            <div className='btnContainer'>
              <span onClick={() => EditBtn(index)}>
                <Edit size={16} />
              </span>
              <span onClick={() => DelBtn(index)} title="Delete">
                <Trash size={16} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {window === "Edit" && (
        <NewExpense
          heading="Edit Expense"
          setWindow={setWindow}
          showCategory={showCategory}
          formData={formData}
          setFormData={setFormData}
          selectedTransaction={selectedTransaction}
          refreshExpenses={fetchExpenses} // Pass refresh function
        />
      )}
    </div>
  );
}