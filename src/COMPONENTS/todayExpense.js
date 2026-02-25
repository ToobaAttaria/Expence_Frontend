import { X } from 'lucide-react';
import { useEffect } from 'react';

// Helper function to calculate today's total
export function calculateTodayTotal(formData) {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0]; // YYYY-MM-DD
    return formData
        .filter((item) => item.date === todayStr)
        .reduce((sum, item) => sum + Number(item.amount), 0);
}

function Today({ heading, formData, Price, setPrice, setWindow }) {

    useEffect(() => {
        const today = new Date();
        const todayStr = today.toISOString().split("T")[0]; // YYYY-MM-DD

        const todayTransactions = formData.filter(item => item.date === todayStr);
        const totalAmount = todayTransactions.reduce((sum, item) => sum + Number(item.amount), 0);

        setPrice(totalAmount);
    }, [formData, setPrice]); // run whenever formData changes

    const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const todayTransactions = formData.filter(item => item.date === todayStr);

    return (
        <div className="blurbackground">
            <div className="MainTodayWindow">
                <div className="header flex">
                    <h1>{heading || "Today's Summary"}</h1>
                    <button
                        className="cancelBtn"
                        title="Close"
                        onClick={() => setWindow(false)}
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className='summaryContainer'>
                    <div className='date'>
                        <span>Date : </span>
                        <span>{todayStr}</span>
                    </div>

                    <div className='details'>
                        {todayTransactions.length > 0 ? (
                            todayTransactions.map((item, index) => (
                                <details className="detail" key={item.id || index}>
                                    <summary>{item.category} - {item.amount}</summary>
                                    <li><span>Date:</span> {item.date}</li>
                                    <li><span>Description:</span> {item.title || item.description}</li>
                                    <li><span>Amount:</span> {item.amount}</li>
                                </details>
                            ))
                        ) : (
                            <p>No transactions for today.</p>
                        )}
                    </div>

                    <div className="flex">
                        <h1>Total Amount : </h1>
                        <p>{Price} $</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Today;