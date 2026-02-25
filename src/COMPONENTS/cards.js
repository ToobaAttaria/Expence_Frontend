import { calculateTodayTotal } from "./todayExpense";
import { calculateWeeklyTotal } from "./weeklyExpense";
import Monthly, { calculateMonthlyTotal } from './monthly';
import Today from "./todayExpense";
import Weekly from "./weeklyExpense";
import { useState } from "react";

export default function Card({ title, window, setWindow, formData }) {
    let totalAmount = 0;
    const [Price, setPrice] = useState("")

    if (title === "Today") totalAmount = calculateTodayTotal(formData);
    if (title === "Weekly") totalAmount = calculateWeeklyTotal(formData);
    if (title === "Monthly") totalAmount = calculateMonthlyTotal(formData);

    return (
        <div className="card">
            <h1>{title}</h1>
            <p>{totalAmount} $</p>
            <button onClick={() => setWindow(title)}>View</button>

            {window === "Today" && <Today heading="Today's Summary" formData={formData} Price={Price} setPrice={setPrice} />}
            {window === "Weekly" && <Weekly heading="Weekly's Summary" formData={formData} Price={Price} setPrice={setPrice} />}
            {window === "Monthly" && <Monthly heading="Monthly's Summary" formData={formData} Price={Price} setPrice={setPrice} />}
        </div>
    );
}