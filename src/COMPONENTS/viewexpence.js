import { useState, useEffect } from "react";
import { Trash2, Pen } from "lucide-react";
import NewExpense from "./newexpence"; // ✅ Import NewExpense

function ViewExpense({ setWindow, setSelectedTransaction }) {

    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editTransaction, setEditTransaction] = useState(null); // Track the transaction being edited

    // Fetch expenses from backend
    const fetchExpenses = async () => {
        try {
            const res = await fetch("https://expencebackend-production.up.railway.app");
            const data = await res.json();
            setExpenses(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching expenses:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    // Delete expense
    const deleteExpense = async (id) => {
        try {
            await fetch(`https://expencebackend-production.up.railway.app/${id}`, { method: "DELETE" });
            fetchExpenses();
        } catch (error) {
            console.error("Error deleting:", error);
        }
    };

    // Loading
    if (loading) return <h2>Loading expenses...</h2>;

    return (
        <div className="expenseListContainer">
            <h1>All Expenses</h1>

            {expenses.length === 0 ? (
                <h3>No Expenses Found</h3>
            ) : (
                expenses.map((expense) => (
                    <div key={expense.id} className="expenseItem">

                        <div className="expenseDetails">
                            <h3>{expense.title}</h3>
                            <p>Category: {expense.category}</p>
                            <p>Amount: Rs. {expense.amount}</p>
                            <p>Date: {expense.date}</p>
                        </div>

                        <div className="expenseActions">
                            {/* Edit button */}
                            <button
                                onClick={() => {
                                    setEditTransaction(expense); // Open edit modal
                                }}
                                className="editBtn"
                            >
                                <Pen size={18} />
                            </button>

                            {/* Delete button */}
                            <button
                                onClick={() => deleteExpense(expense.id)}
                                className="deleteBtn"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))
            )}

            {/* Inline Edit Modal */}
            {editTransaction && (
                <NewExpense
                    heading="Edit Expense"
                    setWindow={() => setEditTransaction(null)} // Close modal
                    formData={expenses}
                    setFormData={setExpenses} // Update local list
                    showCategory={[]} // Pass your categories if needed
                    selectedTransaction={editTransaction} // Pre-fill fields
                />
            )}
        </div>
    );
}

export default ViewExpense;