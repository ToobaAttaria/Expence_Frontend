import { useEffect } from "react";
import { X } from "lucide-react";

// Helper function to calculate weekly total
export function calculateWeeklyTotal(formData) {
    const today = new Date();
    today.setHours(23, 59, 59, 999); // end of today

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);
    oneWeekAgo.setHours(0, 0, 0, 0); // start of 7 days ago

    return formData
        .filter(item => {
            const itemDate = new Date(item.date); // backend: YYYY-MM-DD
            return itemDate >= oneWeekAgo && itemDate <= today;
        })
        .reduce((sum, item) => sum + Number(item.amount), 0);
}

function Weekly({ heading, formData, Price, setPrice, setWindow }) {

    // Compute last 7 days range
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);

    const formatDate = (date) => date.toISOString().split("T")[0]; // YYYY-MM-DD
    const start = formatDate(oneWeekAgo);
    const end = formatDate(today);

    const weeklyTransactions = formData.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= oneWeekAgo && itemDate <= today;
    });

    useEffect(() => {
        const totalAmount = weeklyTransactions.reduce((sum, item) => sum + Number(item.amount), 0);
        setPrice(totalAmount);
    }, [weeklyTransactions, setPrice]);

    return (
        <div className="blurbackground">
            <div className="MainWeeklyWindow">
                <div className="header flex">
                    <h1>{heading || "Weekly Summary"}</h1>
                    <button
                        className="cancelBtn"
                        title="Close"
                        onClick={() => setWindow(false)}
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="summaryContainer">
                    <div className="date">
                        <span>{start} - {end}</span>
                    </div>

                    <div className="details">
                        {weeklyTransactions.length > 0 ? (
                            weeklyTransactions.map(item => (
                                <details className="detail" key={item.id || item.date + item.amount}>
                                    <summary>{item.category} - {item.amount}</summary>
                                    <li><span>Date:</span> {item.date}</li>
                                    <li><span>Description:</span> {item.title || item.description}</li>
                                    <li><span>Amount:</span> {item.amount}</li>
                                </details>
                            ))
                        ) : (
                            <p>No transactions in the last 7 days.</p>
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

export default Weekly;